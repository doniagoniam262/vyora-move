import { useEffect, useRef, useState } from 'react';
import {
  FilesetResolver,
  PoseLandmarker,
  type NormalizedLandmark,
} from '@mediapipe/tasks-vision';
import { Activity, Camera, CameraOff, ShieldCheck } from 'lucide-react';
import { useLocale } from '@/lib/locale';
import { useVYORAProfile } from '@/lib/profile-context';
import type { UserGender } from '@/lib/profile';

type CameraStatus = 'starting' | 'ready' | 'error' | 'stopped';
type CameraError = 'unsupported' | 'permission' | 'device' | 'model' | 'playback' | 'tracking';
type Metric = { value: number; indicator: number };
type Metrics = { knee: Metric; trunk: Metric; lateral: Metric } | null;

const CONNECTIONS: Array<[number, number]> = [
  [11, 13], [13, 15], [12, 14], [14, 16], [11, 12], [23, 24],
  [11, 23], [12, 24], [23, 25], [25, 27], [24, 26], [26, 28],
  [27, 29], [29, 31], [28, 30], [30, 32],
];

const pointVisible = (point: NormalizedLandmark | undefined) =>
  Boolean(point && (point.visibility ?? 1) >= 0.45);

const midpoint = (a: NormalizedLandmark, b: NormalizedLandmark) => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

const angleFromVertical = (dx: number, dy: number) =>
  (Math.atan2(Math.abs(dx), Math.abs(dy)) * 180) / Math.PI;

function measurePose(points: NormalizedLandmark[]): Metrics {
  const needed = [11, 12, 23, 24, 25, 26, 27, 28];
  if (needed.some((index) => !pointVisible(points[index]))) return null;

  const leftHip = points[23];
  const rightHip = points[24];
  const leftKnee = points[25];
  const rightKnee = points[26];
  const leftAnkle = points[27];
  const rightAnkle = points[28];
  const shoulders = midpoint(points[11], points[12]);
  const hips = midpoint(leftHip, rightHip);

  // Approximate front-view knee tracking deviation from the hip-to-ankle line.
  const leftKneeDeviation = angleFromVertical(
    leftKnee.x - (leftHip.x + leftAnkle.x) / 2,
    leftHip.y - leftAnkle.y,
  );
  const rightKneeDeviation = angleFromVertical(
    rightKnee.x - (rightHip.x + rightAnkle.x) / 2,
    rightHip.y - rightAnkle.y,
  );
  const knee = (leftKneeDeviation + rightKneeDeviation) / 2;

  // These are two-dimensional image angles; camera orientation affects them.
  const trunk = angleFromVertical(shoulders.x - hips.x, shoulders.y - hips.y);
  const shoulderWidth = Math.max(0.001, Math.abs(points[11].x - points[12].x));
  const lateral = (Math.atan2(
    Math.abs(points[11].y - points[12].y),
    shoulderWidth,
  ) * 180) / Math.PI;

  const indicator = (value: number, limit: number) =>
    Math.min(100, Math.round((value / limit) * 100));
  return {
    knee: { value: knee, indicator: indicator(knee, 18) },
    trunk: { value: trunk, indicator: indicator(trunk, 45) },
    lateral: { value: lateral, indicator: indicator(lateral, 15) },
  };
}

function drawPose(
  canvas: HTMLCanvasElement,
  points: NormalizedLandmark[],
  accent: string,
) {
  const context = canvas.getContext('2d');
  if (!context) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = Math.max(2, canvas.width * 0.004);
  context.lineCap = 'round';
  context.strokeStyle = accent;

  CONNECTIONS.forEach(([from, to]) => {
    const a = points[from];
    const b = points[to];
    if (!pointVisible(a) || !pointVisible(b)) return;
    context.beginPath();
    context.moveTo(a.x * canvas.width, a.y * canvas.height);
    context.lineTo(b.x * canvas.width, b.y * canvas.height);
    context.stroke();
  });

  points.forEach((point) => {
    if (!pointVisible(point)) return;
    context.beginPath();
    context.fillStyle = '#fff';
    context.arc(
      point.x * canvas.width,
      point.y * canvas.height,
      Math.max(3, canvas.width * 0.006),
      0,
      Math.PI * 2,
    );
    context.fill();
  });
}

export default function LiveAnalysis() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const profile = useVYORAProfile();
  const { locale } = useLocale();
  const isArabic = locale === 'ar';
  const [gender, setGender] = useState<UserGender>(profile?.gender ?? 'female');
  const genderRef = useRef<UserGender>(profile?.gender ?? 'female');
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [cameraAttempt, setCameraAttempt] = useState(0);
  const [status, setStatus] = useState<CameraStatus>('starting');
  const [error, setError] = useState<CameraError | null>(null);
  const [metrics, setMetrics] = useState<Metrics>(null);
  const [personDetected, setPersonDetected] = useState(false);

  useEffect(() => {
    if (profile?.gender) setGender(profile.gender);
  }, [profile?.gender]);

  useEffect(() => {
    genderRef.current = gender;
  }, [gender]);

  useEffect(() => {
    if (!cameraEnabled) {
      setStatus('stopped');
      setMetrics(null);
      setPersonDetected(false);
      return;
    }

    let disposed = false;
    let frameRequest = 0;
    let mediaStream: MediaStream | null = null;
    let landmarker: PoseLandmarker | null = null;
    let lastUiUpdate = 0;

    const releaseCamera = () => {
      mediaStream?.getTracks().forEach((track) => track.stop());
      mediaStream = null;
      if (videoRef.current) videoRef.current.srcObject = null;
    };

    const init = async () => {
      setStatus('starting');
      setError(null);
      setMetrics(null);
      setPersonDetected(false);

      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('camera-unsupported');
        }

        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm',
        );
        if (disposed) return;

        const modelAssetPath =
          'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task';
        try {
          landmarker = await PoseLandmarker.createFromOptions(vision, {
            baseOptions: { modelAssetPath, delegate: 'GPU' },
            runningMode: 'VIDEO',
            numPoses: 1,
          });
        } catch {
          landmarker = await PoseLandmarker.createFromOptions(vision, {
            baseOptions: { modelAssetPath, delegate: 'CPU' },
            runningMode: 'VIDEO',
            numPoses: 1,
          });
        }
        if (disposed) {
          landmarker.close();
          landmarker = null;
          return;
        }

        mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 960 },
            height: { ideal: 720 },
          },
        });
        if (disposed) {
          releaseCamera();
          landmarker.close();
          landmarker = null;
          return;
        }

        const video = videoRef.current;
        if (!video) throw new Error('camera-device');
        video.srcObject = mediaStream;
        await video.play();
        if (disposed) return;
        setStatus('ready');

        const loop = (timestamp: number) => {
          if (disposed) return;
          const activeVideo = videoRef.current;
          const canvas = canvasRef.current;
          if (
            activeVideo &&
            canvas &&
            landmarker &&
            activeVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
            activeVideo.videoWidth > 0 &&
            activeVideo.videoHeight > 0
          ) {
            try {
              if (
                canvas.width !== activeVideo.videoWidth ||
                canvas.height !== activeVideo.videoHeight
              ) {
                canvas.width = activeVideo.videoWidth;
                canvas.height = activeVideo.videoHeight;
              }
              const result = landmarker.detectForVideo(activeVideo, timestamp);
              const points = result.landmarks?.[0];
              if (points) {
                drawPose(canvas, points, genderRef.current === 'female' ? '#FF2D8E' : '#6C9CFF');
                if (timestamp - lastUiUpdate > 180) {
                  setPersonDetected(true);
                  setMetrics(measurePose(points));
                  lastUiUpdate = timestamp;
                }
              } else {
                canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
                if (timestamp - lastUiUpdate > 350) {
                  setPersonDetected(false);
                  setMetrics(null);
                  lastUiUpdate = timestamp;
                }
              }
            } catch {
              if (!disposed) {
                setError('tracking');
                setStatus('error');
              }
              return;
            }
          }
          frameRequest = requestAnimationFrame(loop);
        };
        frameRequest = requestAnimationFrame(loop);
      } catch (caught) {
        if (disposed) return;
        const name = caught instanceof DOMException ? caught.name : '';
        const message = caught instanceof Error ? caught.message : '';
        const nextError: CameraError =
          message === 'camera-unsupported'
            ? 'unsupported'
            : message === 'camera-device'
              ? 'device'
              : name === 'NotAllowedError' || name === 'SecurityError'
                ? 'permission'
                : name === 'NotFoundError' || name === 'NotReadableError'
                  ? 'device'
                  : landmarker
                    ? 'playback'
                    : 'model';
        setError(nextError);
        setStatus('error');
        releaseCamera();
        landmarker?.close();
        landmarker = null;
      }
    };

    void init();
    return () => {
      disposed = true;
      cancelAnimationFrame(frameRequest);
      releaseCamera();
      landmarker?.close();
      landmarker = null;
    };
  }, [cameraEnabled, cameraAttempt]);

  const accent = gender === 'female' ? '#FF2D8E' : '#6C9CFF';
  const text = (ar: string, en: string) => (isArabic ? ar : en);
  const errorMessage: Record<CameraError, string> = {
    unsupported: text('هذا المتصفح لا يتيح تشغيل الكاميرا.', 'This browser does not provide camera access.'),
    permission: text('اسمحي باستخدام الكاميرا من إعدادات المتصفح ثم أعيدي المحاولة.', 'Allow camera access in your browser settings, then try again.'),
    device: text('تعذّر الوصول إلى الكاميرا. تأكدي من عدم استخدامها في تطبيق آخر.', 'Could not access a camera. Check that another app is not using it.'),
    model: text('تعذّر تحميل نموذج تحليل الحركة. تحققي من الاتصال ثم أعيدي المحاولة.', 'The pose model could not be loaded. Check your connection and retry.'),
    playback: text('تعذّر بدء بث الكاميرا. أعيدي المحاولة بعد السماح بالوصول.', 'The camera stream could not start. Retry after granting access.'),
    tracking: text('توقف تحليل الإطارات. أوقفي الكاميرا ثم أعيدي تشغيلها.', 'Frame analysis stopped. Turn the camera off and on again.'),
  };

  const metricColor = (indicator: number) =>
    indicator > 60 ? 'text-rose-400' : indicator > 30 ? 'text-amber-300' : 'text-emerald-300';
  const metricCards = [
    {
      id: 'knee',
      title: text('انحراف مسار الركبة', 'Knee tracking deviation'),
      metric: metrics?.knee,
    },
    {
      id: 'trunk',
      title: text('ميل الجذع في الصورة', 'Trunk lean in image'),
      metric: metrics?.trunk,
    },
    {
      id: 'lateral',
      title: text('ميل خط الكتفين', 'Shoulder-line tilt'),
      metric: metrics?.lateral,
    },
  ];

  return (
    <div className="page-enter mx-auto max-w-7xl space-y-4" dir={isArabic ? 'rtl' : 'ltr'} data-testid="page-live-analysis">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold" style={{ color: accent }}>
            <Activity size={16} /> VYORA MOVE
          </span>
          <h1 className="mt-1 text-2xl font-extrabold">{text('تحليل الحركة المباشر', 'Live movement analysis')}</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {text('تُعالج الصورة داخل جهازك ولا يتم رفعها أو حفظها.', 'Video is processed on your device and is not uploaded or saved.')}
          </p>
        </div>
        <div className="flex items-center gap-2" role="group" aria-label={text('اختيار عرض الجنس', 'Choose gender view')}>
          {(['female', 'male'] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={gender === option}
              data-testid={`live-analysis-gender-${option}`}
              onClick={() => setGender(option)}
              className="focus-ring rounded-full border border-border px-4 py-2 text-xs font-bold transition-colors"
              style={gender === option ? { backgroundColor: option === 'female' ? '#FF2D8E' : '#6C9CFF', color: '#090909' } : undefined}
            >
              {option === 'female' ? text('أنثى', 'Female') : text('ذكر', 'Male')}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
        <section className="card-dark overflow-hidden p-3 sm:p-4">
          <div className="relative mx-auto aspect-[3/4] max-h-[72vh] overflow-hidden rounded-2xl bg-black sm:aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 h-full w-full object-cover"
              aria-label={text('عرض الكاميرا للتحليل المحلي', 'Camera preview for on-device analysis')}
              data-testid="live-analysis-camera"
            />
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              aria-label={text('نقاط تقدير وضعية الجسم', 'Pose landmark overlay')}
              data-testid="live-analysis-pose-overlay"
            />
            {status !== 'ready' && (
              <div className="absolute inset-0 grid place-items-center bg-black/65 p-5 text-center">
                <div className="max-w-sm">
                  {status === 'starting' ? (
                    <Camera className="mx-auto text-white/75" size={30} />
                  ) : status === 'error' ? (
                    <CameraOff className="mx-auto text-rose-300" size={30} />
                  ) : (
                    <CameraOff className="mx-auto text-white/70" size={30} />
                  )}
                  <p className="mt-3 text-sm font-bold">
                    {status === 'starting'
                      ? text('جارٍ تشغيل الكاميرا وتحميل نموذج الحركة…', 'Starting camera and loading the pose model…')
                      : status === 'error'
                        ? errorMessage[error ?? 'model']
                        : text('الكاميرا متوقفة.', 'Camera is off.')}
                  </p>
                </div>
              </div>
            )}
            {status === 'ready' && (
              <div className="absolute bottom-3 start-3 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[11px] font-bold text-white">
                <span className={`me-2 inline-block h-2 w-2 rounded-full ${personDetected ? 'bg-emerald-400' : 'bg-amber-300'}`} />
                {personDetected
                  ? text('تم رصد الجسم', 'Body detected')
                  : text('قفي/قف كاملًا أمام الكاميرا', 'Stand fully in view of the camera')}
              </div>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs leading-5 text-muted-foreground">
              {text('اختيار العرض الحالي:', 'Current view:')}{' '}
              <b style={{ color: accent }}>{gender === 'female' ? text('أنثى', 'Female') : text('ذكر', 'Male')}</b>
              {' · '}
              {text('اختيار العرض لا يغيّر بروفايلك.', 'This quick switch does not change your profile.')}
            </p>
            <button
              type="button"
              data-testid="button-live-analysis-camera"
              onClick={() => {
                if (status === 'error') {
                  setCameraEnabled(true);
                  setCameraAttempt((attempt) => attempt + 1);
                } else {
                  setCameraEnabled((enabled) => !enabled);
                }
              }}
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-bold"
            >
              {cameraEnabled && status !== 'error' ? <CameraOff size={15} /> : <Camera size={15} />}
              {status === 'error'
                ? text('إعادة المحاولة', 'Retry camera')
                : cameraEnabled
                  ? text('إيقاف الكاميرا', 'Stop camera')
                  : text('تشغيل الكاميرا', 'Start camera')}
            </button>
          </div>
        </section>

        <section className="space-y-3" aria-label={text('مؤشرات الحركة', 'Movement indicators')}>
          {metricCards.map(({ id, title, metric }) => (
            <article key={id} className="card-dark p-4" data-testid={`live-analysis-metric-${id}`}>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xs font-bold text-muted-foreground">{title}</h2>
                <span className={`latin text-xs font-extrabold ${metric ? metricColor(metric.indicator) : 'text-muted-foreground'}`} dir="ltr">
                  {metric ? `${metric.indicator}%` : '--'}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-[width] duration-200"
                  style={{
                    width: `${metric?.indicator ?? 0}%`,
                    backgroundColor: metric
                      ? metric.indicator > 60 ? '#fb7185' : metric.indicator > 30 ? '#fbbf24' : '#34d399'
                      : '#536070',
                  }}
                />
              </div>
              <div className="mt-3 rounded-xl border border-white/[.06] bg-white/[.025] px-3 py-2 text-center">
                <span className="block text-[10px] text-muted-foreground">{text('قراءة تقريبية', 'Approximate reading')}</span>
                <b className="latin mt-0.5 block text-lg" dir="ltr">{metric ? `${metric.value.toFixed(1)}°` : '--'}</b>
              </div>
            </article>
          ))}
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[.06] p-4 text-xs leading-6 text-amber-100/80" data-testid="live-analysis-disclaimer">
            <p className="flex items-start gap-2">
              <ShieldCheck className="mt-1 shrink-0 text-amber-300" size={16} />
              <span>{text(
                'هذه مؤشرات تقريبية من صورة ثنائية الأبعاد وليست تشخيصًا أو تقييمًا طبيًا. زاوية الكاميرا والإضاءة والملابس قد تغيّر القراءات؛ لا تعتمدي عليها لتحديد إصابة أو سلامة الحركة.',
                'These are approximate 2D image indicators, not a medical diagnosis or validated form assessment. Camera angle, lighting, and clothing can affect readings; do not use them to determine injury or exercise safety.',
              )}</span>
            </p>
            <p className="mt-2 border-t border-amber-200/10 pt-2">
              {text(
                'لرؤية الجسم بوضوح، ضعي الهاتف ثابتًا وأظهري الجسم كاملًا. قياس الركبة أفضل من الأمام، وميل الجذع أوضح من الجانب.',
                'Place the phone steadily and keep your full body in frame. Knee tracking is clearer from the front; trunk lean is clearer from the side.',
              )}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
