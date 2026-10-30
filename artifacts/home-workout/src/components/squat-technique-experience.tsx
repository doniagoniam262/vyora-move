import { useState, type ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
  CircleHelp,
  Dumbbell,
  Gauge,
  Lightbulb,
  Play,
  ShieldCheck,
  Timer,
  X,
} from 'lucide-react';
import { Link } from 'wouter';
import type { Exercise } from '@/lib/data';
import type { UserGender } from '@/lib/profile';
import type { MuscleId } from '@/lib/movement-details';
import { AnatomyPair } from '@/components/anatomy-pair';
import { MuscleMap } from '@/components/muscle-map';

type Locale = 'ar' | 'en';

const squatErrors = [
  {
    id: 'knees',
    title: { ar: 'انهيار الركبتين للداخل', en: 'Knees collapsing inward' },
    cause: {
      ar: 'قد يحدث عند ضعف التحكم في الورك أو عند زيادة الحمل والسرعة عن قدرة الجسم.',
      en: 'This can happen when hip control is limited or the load and speed exceed current capacity.',
    },
    correction: {
      ar: 'خفّف عمق الحركة، ووجّه الركبتين برفق نحو أصابع القدمين مع إبقاء القدمين ثابتتين.',
      en: 'Reduce depth and gently track your knees toward your toes while keeping both feet grounded.',
    },
    graphic: 'knees' as const,
  },
  {
    id: 'back',
    title: { ar: 'تقوّس أو انحناء الظهر', en: 'Back rounding or over-arching' },
    cause: {
      ar: 'غالبًا ينتج عن محاولة النزول أعمق من مدى الحركة المريح أو فقدان شدّ الجذع.',
      en: 'Often caused by dropping deeper than your comfortable range or losing trunk control.',
    },
    correction: {
      ar: 'شدّ البطن باعتدال، وحافظ على الجذع ثابتًا، واكتفِ بمدى تستطيع التحكم فيه.',
      en: 'Brace gently, keep your trunk steady, and use only a range you can control.',
    },
    graphic: 'back' as const,
  },
  {
    id: 'depth',
    title: { ar: 'النزول أقل من المدى المتحكَّم به', en: 'Rushing or cutting the range short' },
    cause: {
      ar: 'قد يكون السبب التسرع أو اختيار عمق غير مناسب للتوازن والمرونة الحاليين.',
      en: 'Rushing or choosing a depth that does not suit current balance and mobility may cause this.',
    },
    correction: {
      ar: 'انزل ببطء إلى عمق مريح مع بقاء الكعبين على الأرض، ثم زد المدى تدريجيًا.',
      en: 'Lower slowly to a comfortable depth with heels down, then build range gradually.',
    },
    graphic: 'depth' as const,
  },
];

function SquatErrorVisual({ variant, locale }: { variant: 'knees' | 'back' | 'depth'; locale: Locale }) {
  const label = locale === 'ar' ? 'رسم توضيحي لوضعية السكوات' : 'Squat form illustration';
  const highlight = '#fb526c';
  return (
    <svg viewBox="0 0 180 120" role="img" aria-label={label} className="h-28 w-full">
      <defs>
        <linearGradient id={`squat-bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#111f34" />
          <stop offset="1" stopColor="#0b101a" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="178" height="118" rx="15" fill={`url(#squat-bg-${variant})`} />
      <path d="M18 96H162" stroke="#6b7b91" strokeWidth="2" strokeLinecap="round" />
      <circle cx="76" cy="22" r="8" fill="#d6dae1" />
      <path d="M72 31L66 53L88 65L104 52" fill="none" stroke="#c6ceda" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M68 51L51 63L44 83" fill="none" stroke="#c6ceda" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {variant === 'knees' ? (
        <>
          <path d="M87 63L73 78L78 94M102 53L111 74L98 94" fill="none" stroke="#c6ceda" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M73 78L88 86M111 74L96 84" stroke={highlight} strokeWidth="4" strokeLinecap="round" />
          <path d="M66 69L80 84M118 66L102 84" stroke={highlight} strokeWidth="2" strokeDasharray="4 4" />
        </>
      ) : variant === 'back' ? (
        <>
          <path d="M87 65L83 79L77 94M103 52L116 69L130 84L147 85" fill="none" stroke="#c6ceda" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M68 47Q82 60 102 53" fill="none" stroke={highlight} strokeWidth="4" strokeLinecap="round" />
          <path d="M61 42L72 33" stroke={highlight} strokeWidth="2" strokeDasharray="4 4" />
        </>
      ) : (
        <>
          <path d="M87 65L78 78L78 94M103 52L119 67L123 83L144 84" fill="none" stroke="#c6ceda" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 69H149" stroke={highlight} strokeWidth="2" strokeDasharray="5 5" />
          <path d="M154 58V88M150 62L154 57L158 62M150 84L154 89L158 84" fill="none" stroke={highlight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      <circle cx="154" cy="21" r="10" fill="#fb526c" fillOpacity=".16" stroke={highlight} />
      <path d="M150 17L158 25M158 17L150 25" stroke={highlight} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SquatTechniqueExperience({
  exercise,
  locale,
  gender,
  onGenderChange,
  primary,
  secondary,
}: {
  exercise: Exercise;
  locale: Locale;
  gender: UserGender;
  onGenderChange: (gender: UserGender) => void;
  primary: MuscleId[];
  secondary: MuscleId[];
}) {
  const isArabic = locale === 'ar';
  const accent = gender === 'female' ? '#FF2D8E' : '#6C9CFF';
  const [videoError, setVideoError] = useState(false);
  const femaleVideo = `${import.meta.env.BASE_URL}videos/squat-female-8s.mp4`;
  const videoAvailable = gender === 'female' && !videoError;

  return (
    <div className="space-y-4" data-testid="squat-technique-experience" dir={isArabic ? 'rtl' : 'ltr'}>
      <section className="grid gap-4 lg:grid-cols-[.92fr_1.08fr]" dir="ltr">
        <article className="overflow-hidden rounded-[1.35rem] border border-emerald-400/20 bg-[#0b1420] p-3" dir={isArabic ? 'rtl' : 'ltr'}>
          <header className="mb-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-200">
              <Check size={15} /> {isArabic ? 'الأداء الصحيح' : 'Correct form'}
            </span>
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#080d15] p-1" role="group" aria-label={isArabic ? 'اختيار نوع الشخصية' : 'Choose demonstration'}>
              {(['female', 'male'] as const).map((option) => (
                <button
                  type="button"
                  key={option}
                  aria-pressed={gender === option}
                  data-testid={`button-exercise-gender-${option}`}
                  onClick={() => {
                    setVideoError(false);
                    onGenderChange(option);
                  }}
                  className="rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors"
                  style={gender === option ? { background: accent, color: '#090909' } : { color: '#a5afbd' }}
                >
                  {option === 'female' ? (isArabic ? 'أنثى' : 'Female') : (isArabic ? 'ذكر' : 'Male')}
                </button>
              ))}
            </div>
          </header>
          {videoAvailable ? (
            <video
              key={femaleVideo}
              src={femaleVideo}
              controls
              playsInline
              preload="metadata"
              aria-label={isArabic ? 'فيديو توضيحي حقيقي لأداء السكوات' : 'Real squat exercise demonstration'}
              data-testid="squat-real-video-female"
              onError={() => setVideoError(true)}
              className="aspect-[9/16] max-h-[560px] w-full rounded-xl bg-black object-contain"
            />
          ) : (
            <div
              className="flex aspect-[9/16] max-h-[560px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[radial-gradient(ellipse_at_center,#14233a_0%,#090d14_70%)] px-6 text-center"
              data-testid="squat-video-unavailable"
            >
              <CircleHelp size={34} style={{ color: accent }} />
              <h3 className="mt-4 text-base font-bold">{isArabic ? 'الفيديو الرجالي غير متوفر بعد' : 'Male video is not available yet'}</h3>
              <p className="mt-2 max-w-xs text-xs leading-6 text-slate-400">
                {isArabic
                  ? 'لا يوجد ملف فيديو رجالي حقيقي داخل المشروع حتى الآن. لن نعرض رسمًا متحركًا على أنه فيديو.'
                  : 'There is no real male video asset in the project yet. We will not present an animation as a real video.'}
              </p>
            </div>
          )}
          <p className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-slate-400">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-300" />
            {isArabic ? 'عرض تعليمي فقط؛ لا يحل محل تقييم مدرب ولا يضمن ملاءمة الحركة لكل حالة.' : 'For instruction only; it is not coaching assessment and may not suit every condition.'}
          </p>
        </article>

        <article className="overflow-hidden rounded-[1.35rem] border border-rose-400/20 bg-[#17121a] p-3 sm:p-4" dir={isArabic ? 'rtl' : 'ltr'} data-testid="squat-common-mistakes">
          <header className="mb-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-rose-400/10 px-3 py-1.5 text-xs font-bold text-rose-200">
              <X size={15} /> {isArabic ? 'أخطاء شائعة في السكوات' : 'Common squat mistakes'}
            </span>
            <p className="mt-2 text-[11px] leading-5 text-slate-400">
              {isArabic ? 'رسوم توضيحية مستقلة لكل خطأ، وتظهر مع اختيار الجنس الحالي.' : 'Separate visual guides for each mistake, shown with the selected gender.'}
            </p>
          </header>
          <div className="grid gap-3 sm:grid-cols-3">
            {squatErrors.map((error) => (
              <section key={error.id} className="overflow-hidden rounded-xl border border-white/[.08] bg-[#0c111a] p-2.5" data-testid={`squat-error-${error.id}`}>
                <SquatErrorVisual variant={error.graphic} locale={locale} />
                <h3 className="mt-2 min-h-10 text-xs font-extrabold leading-5">{error.title[locale]}</h3>
                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  <b className="text-slate-200">{isArabic ? 'السبب: ' : 'Why: '}</b>{error.cause[locale]}
                </p>
                <p className="mt-2 border-t border-white/[.08] pt-2 text-[11px] leading-5 text-slate-300">
                  <b style={{ color: accent }}>{isArabic ? 'التصحيح: ' : 'Correct it: '}</b>{error.correction[locale]}
                </p>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-3 lg:grid-cols-[.92fr_1.08fr_1fr]">
        <div className="card-dark p-4">
          <h2 className="text-sm font-extrabold">{isArabic ? 'العضلات المستهدفة' : 'Target muscles'}</h2>
          <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{isArabic ? 'اللون يبدّل حسب اختيار Female أو Male.' : 'Accent color follows the Female or Male selection.'}</p>
          <div className="mt-2">
            <AnatomyPair primary={primary} secondary={secondary} gender={gender} locale={locale} />
          </div>
        </div>
        <section className="card-dark p-4">
          <h2 className="text-sm font-extrabold">{isArabic ? 'طريقة الأداء الصحيحة' : 'Correct technique'}</h2>
          <ol className="mt-3 space-y-3">
            {exercise.instructions.map((step, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs leading-6">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: accent }}>{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-xl border border-white/[.07] bg-white/[.025] p-3">
            <h3 className="flex items-center gap-2 text-xs font-bold"><Lightbulb size={15} style={{ color: accent }} />{isArabic ? 'نصيحة أداء' : 'Form tip'}</h3>
            <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{isArabic ? 'ابدأ بوزن الجسم، وحافظ على الكعبين ثابتين، وتوقف عند الألم الحاد.' : 'Start with bodyweight, keep your heels grounded, and stop if you feel sharp pain.'}</p>
          </div>
        </section>
        <div className="space-y-3">
          <section className="card-dark p-4" data-testid="squat-workout-info">
            <h2 className="text-sm font-extrabold">{isArabic ? 'المعلومات الأساسية' : 'Exercise details'}</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <InfoTile icon={<Dumbbell size={16} />} label={isArabic ? 'الأدوات' : 'Equipment'} value={isArabic ? 'وزن الجسم' : 'Bodyweight'} accent={accent} />
              <InfoTile icon={<Gauge size={16} />} label={isArabic ? 'المستوى' : 'Level'} value={isArabic ? 'مبتدئ' : 'Beginner'} accent={accent} />
              <InfoTile icon={<Timer size={16} />} label={isArabic ? 'المجموعات' : 'Sets'} value={`${exercise.sets}`} accent={accent} />
              <InfoTile icon={<Play size={16} />} label={isArabic ? 'التكرارات' : 'Reps'} value={`${exercise.reps ?? 12}`} accent={accent} />
            </div>
          </section>
          <MuscleMap primary={primary} secondary={secondary} locale={locale} />
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="card-dark flex items-start gap-3 p-4">
          <AlertTriangle className="mt-0.5 shrink-0 text-amber-300" size={18} />
          <div><h3 className="text-xs font-bold">{isArabic ? 'ملاحظة أمان' : 'Safety note'}</h3><p className="mt-1 text-xs leading-6 text-muted-foreground">{exercise.safety}</p></div>
        </div>
        <div className="card-dark flex items-start gap-3 p-4">
          <Lightbulb className="mt-0.5 shrink-0" style={{ color: accent }} size={18} />
          <div><h3 className="text-xs font-bold">{isArabic ? 'تعديل أسهل' : 'Easier option'}</h3><p className="mt-1 text-xs leading-6 text-muted-foreground">{exercise.easier}</p></div>
        </div>
      </div>

      <Link href={`/session/${exercise.id}`} data-testid="button-start-exercise" className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-extrabold text-black" style={{ background: accent }}>
        <Play size={18} fill="currentColor" />{isArabic ? 'ابدأ التمرين' : 'Start exercise'}<ArrowUpRight size={17} />
      </Link>
    </div>
  );
}

function InfoTile({ icon, label, value, accent }: { icon: ReactNode; label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl border border-white/[.07] bg-[#0c1119] p-3">
      <div className="flex items-center gap-2 text-[10px] text-slate-400" style={{ color: accent }}>{icon}{label}</div>
      <p className="mt-1 text-sm font-extrabold">{value}</p>
    </div>
  );
}
