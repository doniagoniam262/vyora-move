import { useEffect, useState, type ReactNode } from 'react';
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
import { exerciseFormErrorGuidesFor } from '@/lib/exercise-form-errors';
import { exerciseVideoSource } from '@/lib/exercise-video-sources';

type Locale = 'ar' | 'en';

export function ExerciseTechniqueExperience({
  exercise,
  locale,
  gender,
  onGenderChange,
  primary,
  secondary,
  showStartButton = true,
}: {
  exercise: Exercise;
  locale: Locale;
  gender: UserGender;
  onGenderChange: (gender: UserGender) => void;
  primary: MuscleId[];
  secondary: MuscleId[];
  showStartButton?: boolean;
}) {
  const isArabic = locale === 'ar';
  const accent = gender === 'female' ? '#FF2D8E' : '#6C9CFF';
  const [videoError, setVideoError] = useState(false);
  const videoSource = exerciseVideoSource(exercise.id, gender);
  const errors = exerciseFormErrorGuidesFor(exercise.id);
  useEffect(() => {
    setVideoError(false);
  }, [videoSource?.src]);
  const mediaFrameClass = videoSource?.orientation === 'portrait'
    ? 'aspect-[9/16] max-h-[560px]'
    : 'aspect-video max-h-[560px]';
  const levelLabel = isArabic
    ? ({ beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' }[exercise.level] ?? exercise.level)
    : ({ beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }[exercise.level] ?? exercise.level);

  return (
    <div className="space-y-4" data-testid={`exercise-technique-experience-${exercise.id}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <section className="grid gap-4 lg:grid-cols-[.92fr_1.08fr]" dir="ltr">
        <article className="overflow-hidden rounded-[1.35rem] border border-emerald-400/20 bg-[#0b1420] p-3" dir={isArabic ? 'rtl' : 'ltr'}>
          <header className="mb-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-200">
              <Check size={15} /> {videoSource?.exerciseSpecific
                ? (isArabic ? 'فيديو الحركة' : 'Exercise demo')
                : (isArabic ? 'فيديو توضيحي مؤقت' : 'Temporary exercise footage')}
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
          <p className="mb-3 text-[11px] leading-5 text-slate-400" aria-live="polite" data-testid="exercise-gender-guidance">
            {isArabic
              ? videoSource?.genderMatched
                ? gender === 'female'
                  ? 'العرض الحالي بنسخة الأنثى، ويمكنك التبديل سريعًا من الأعلى.'
                  : 'العرض الحالي بنسخة الذكر، ويمكنك التبديل سريعًا من الأعلى.'
                : 'المقطع العام نفسه للجنسين مؤقتًا؛ اختيارك يخصص اللون والخريطة والتوجيه فقط.'
              : videoSource?.genderMatched
                ? gender === 'female'
                  ? 'Female demonstration is selected. Switch quickly above.'
                  : 'Male demonstration is selected. Switch quickly above.'
                : 'The same general clip is temporarily used for both genders; selection personalizes the anatomy and coaching tone.'}
          </p>
          {videoSource && !videoError ? (
            <video
              key={videoSource.src}
              controls
              playsInline
              preload="metadata"
              aria-label={isArabic
                ? videoSource.exerciseSpecific ? `فيديو توضيحي حقيقي لأداء ${exercise.name}` : 'فيديو رياضي عام مؤقت'
                : videoSource.exerciseSpecific ? `Real ${exercise.latin} exercise demonstration` : 'Temporary general exercise footage'}
              data-testid={`exercise-real-video-${gender}`}
              onError={() => setVideoError(true)}
              className={`${mediaFrameClass} w-full rounded-xl bg-black object-contain`}
            >
              <source
                src={videoSource.src}
                type={videoSource.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
              />
              {videoSource.fallbackSrc && <source src={videoSource.fallbackSrc} type="video/mp4" />}
            </video>
          ) : (
            <div
              className={`flex ${mediaFrameClass} w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[radial-gradient(ellipse_at_center,#14233a_0%,#090d14_70%)] px-6 text-center`}
              data-testid="exercise-video-unavailable"
            >
              <CircleHelp size={34} style={{ color: accent }} />
              <h3 className="mt-4 text-base font-bold">{videoError ? (isArabic ? 'تعذّر تحميل الفيديو' : 'Video could not be loaded') : (isArabic ? 'الفيديو غير متوفر' : 'Video is unavailable')}</h3>
              <p className="mt-2 max-w-xs text-xs leading-6 text-slate-400">
                {videoError
                  ? (isArabic ? 'تحققي من الاتصال ثم افتحي مصدر الفيديو الأصلي.' : 'Check your connection, then open the original video source.')
                  : (isArabic ? 'لا يوجد مصدر فيديو مضبوط لهذه الحركة.' : 'No video source is configured for this movement.')}
              </p>
              {videoSource && <a href={videoSource.pageUrl} target="_blank" rel="noreferrer" className="mt-3 text-xs font-bold underline" style={{ color: accent }}>{isArabic ? 'فتح المصدر' : 'Open source'}</a>}
            </div>
          )}
          {videoSource && !videoError && (
            <p className="mt-2 text-[10px] leading-5 text-slate-500">
              {videoSource.external ? (
                <>
                  {isArabic ? 'المصدر: ' : 'Source: '}
                  <a href={videoSource.pageUrl} target="_blank" rel="noreferrer" className="underline hover:text-slate-300">{videoSource.creator}</a>
                  {' · '}
                  <a href={videoSource.licenseUrl} target="_blank" rel="noreferrer" className="underline hover:text-slate-300">{videoSource.license}</a>
                </>
              ) : (
                isArabic ? 'فيديو توضيحي محفوظ ضمن أصول ڤايورا.' : 'Demonstration video included with VYORA assets.'
              )}
            </p>
          )}
          {videoSource && !videoSource.exerciseSpecific && (
            <p className="mt-2 rounded-lg border border-amber-300/15 bg-amber-300/[.05] px-3 py-2 text-[10px] leading-5 text-amber-100/75" data-testid="exercise-video-temporary-note">
              {isArabic
                ? 'تنبيه: هذا مقطع عام مؤقت وليس شرحًا مصورًا خاصًا بهذه الحركة. اتبعي خطوات الأداء المكتوبة حتى يُضاف فيديو مطابق للتمرين.'
                : 'Note: this is temporary general footage, not a filmed demonstration of this exact movement. Follow the written steps until exercise-specific footage is added.'}
            </p>
          )}
          <p className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-slate-400">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-300" />
            {isArabic ? 'عرض تعليمي فقط؛ لا يحل محل تقييم مدرب ولا يضمن ملاءمة الحركة لكل حالة.' : 'For instruction only; it is not coaching assessment and may not suit every condition.'}
          </p>
        </article>

        <article className="overflow-hidden rounded-[1.35rem] border border-rose-400/20 bg-[#17121a] p-3 sm:p-4" dir={isArabic ? 'rtl' : 'ltr'} data-testid={`exercise-common-mistakes-${exercise.id}`}>
          <header className="mb-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-rose-400/10 px-3 py-1.5 text-xs font-bold text-rose-200">
              <X size={15} /> {isArabic ? `أخطاء شائعة في ${exercise.name}` : `Common ${exercise.latin} mistakes`}
            </span>
            <p className="mt-2 text-[11px] leading-5 text-slate-400">
              {isArabic ? `أخطاء خاصة بحركة ${exercise.name} مع السبب وطريقة التصحيح.` : `Movement-specific ${exercise.latin} mistakes with causes and corrections.`}
            </p>
          </header>
          <div className="grid gap-3 sm:grid-cols-3">
            {errors.map((error) => (
              <section key={error.id} className="overflow-hidden rounded-xl border border-white/[.08] bg-[#0c111a] p-2.5" data-testid={`exercise-error-${exercise.id}-${error.id}`}>
                {error.image ? (
                  <div className="relative">
                    <img src={error.image} alt={error.title[locale]} className="h-40 w-full rounded-lg object-cover" loading="lazy" />
                    <span className="absolute left-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white shadow-lg" aria-label={isArabic ? 'خطأ شائع' : 'Common mistake'}>
                      <X size={17} />
                    </span>
                  </div>
                ) : (
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/15 text-rose-300" aria-label={isArabic ? 'خطأ شائع' : 'Common mistake'}>
                    <X size={17} />
                  </span>
                )}
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
          <p className="mt-2 text-xs leading-5 text-muted-foreground" data-testid="exercise-gender-coaching-tone">
            {isArabic
              ? gender === 'female'
                ? 'ابدئي بإيقاع مريح، وركّزي على الحركة المتحكَّم بها. توقفي إذا شعرتِ بألم حاد.'
                : 'ابدأ بإيقاع مريح، وركّز على الحركة المتحكَّم بها. توقف إذا شعرت بألم حاد.'
              : 'Start at a comfortable pace, focus on controlled movement, and stop if you feel sharp pain.'}
          </p>
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
          <section className="card-dark p-4" data-testid={`exercise-workout-info-${exercise.id}`}>
            <h2 className="text-sm font-extrabold">{isArabic ? 'المعلومات الأساسية' : 'Exercise details'}</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <InfoTile icon={<Dumbbell size={16} />} label={isArabic ? 'الأدوات' : 'Equipment'} value={exercise.id === 'deadlift' ? (isArabic ? 'دامبل أو بار خفيف' : 'Light dumbbells or barbell') : (isArabic ? 'وزن الجسم' : 'Bodyweight')} accent={accent} />
              <InfoTile icon={<Gauge size={16} />} label={isArabic ? 'المستوى' : 'Level'} value={levelLabel} accent={accent} />
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

      {showStartButton ? (
        <Link href={`/session/${exercise.id}`} data-testid="button-start-exercise" className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-extrabold text-black" style={{ background: accent }}>
          <Play size={18} fill="currentColor" />{isArabic ? 'ابدأ التمرين' : 'Start exercise'}<ArrowUpRight size={17} />
        </Link>
      ) : (
        <p className="card-dark text-center text-xs leading-6 text-muted-foreground" data-testid="text-public-preview-only">
          {isArabic ? 'معاينة عامة للقراءة فقط — تسجيل الدخول مطلوب لبدء الجلسة.' : 'Public read-only preview — sign in to start a workout session.'}
        </p>
      )}
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
