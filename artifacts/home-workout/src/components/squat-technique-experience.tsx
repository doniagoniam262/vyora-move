import { useState, type ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
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
import { muscleNames, type MuscleId } from '@/lib/movement-details';
import { exerciseFormErrorGuidesFor } from '@/lib/exercise-form-errors';
import { exerciseComparisonImages } from '@/lib/exercise-comparison-images';

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
  const errors = exerciseFormErrorGuidesFor(exercise.id);
  const comparison = exerciseComparisonImages(exercise.id, gender);
  const missingReferenceLabel = isArabic
    ? gender === 'female'
      ? 'صورة الأنثى لهذا التمرين لم تُرسل بعد'
      : 'صورة الذكر لهذا التمرين لم تُرسل بعد'
    : gender === 'female'
      ? 'Female reference not sent yet'
      : 'Male reference not sent yet';
  const commonError = errors[0];
  const levelLabel = isArabic
    ? ({ beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' }[exercise.level] ?? exercise.level)
    : ({ beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }[exercise.level] ?? exercise.level);
  const equipmentByExercise: Record<string, { ar: string; en: string }> = {
    'pull-up': { ar: 'بار عقلة', en: 'Pull-up bar' },
    deadlift: { ar: 'بار أو دامبلز', en: 'Barbell or dumbbells' },
    'bench-press': { ar: 'مقعد وبار', en: 'Bench and barbell' },
    'bicep-curl': { ar: 'دامبلز', en: 'Dumbbells' },
    'shoulder-press': { ar: 'دامبلز', en: 'Dumbbells' },
  };
  const equipment = equipmentByExercise[exercise.id] ?? { ar: 'وزن الجسم', en: 'Bodyweight' };

  return (
    <div className="space-y-4" data-testid={`exercise-technique-experience-${exercise.id}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <section className="card-dark overflow-hidden p-3 sm:p-4" data-testid={`exercise-static-comparison-${exercise.id}`}>
        <header className="mb-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="VYORA" className="h-6 w-auto shrink-0" />
            <span className="truncate text-xs font-extrabold tracking-wide text-white">MOVE</span>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#080d15] p-1" role="group" aria-label={isArabic ? 'اختيار نوع الشخصية' : 'Choose demonstration'}>
            {(['female', 'male'] as const).map((option) => (
              <button
                type="button"
                key={option}
                aria-pressed={gender === option}
                data-testid={`button-exercise-gender-${option}`}
                onClick={() => onGenderChange(option)}
                className="rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors"
                style={gender === option ? { background: accent, color: '#090909' } : { color: '#a5afbd' }}
              >
                {option === 'female' ? (isArabic ? 'أنثى' : 'Female') : (isArabic ? 'ذكر' : 'Male')}
              </button>
            ))}
          </div>
        </header>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4" dir="rtl">
          <article className="min-w-0 overflow-hidden rounded-xl border border-emerald-400/30 bg-emerald-950/20 p-2 sm:p-3" data-testid={`exercise-correct-image-${exercise.id}`}>
            <h2 className="mb-2 flex items-center justify-center gap-1.5 text-center text-[11px] font-extrabold text-emerald-300 sm:text-sm">
              <Check size={16} aria-hidden="true" /> {isArabic ? 'الأداء الصحيح' : 'Correct form'}
            </h2>
            {comparison ? (
              <img
                src={comparison.correct}
                alt={isArabic ? `صورة توضيحية للأداء الصحيح لتمرين ${exercise.name}` : `Correct form for ${exercise.latin}`}
                className="aspect-[16/10] w-full rounded-lg border border-emerald-300/20 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex aspect-[16/10] w-full items-center justify-center rounded-lg bg-white/5 px-3 text-center text-xs text-slate-400" role="img" aria-label={missingReferenceLabel}>
                {missingReferenceLabel}
              </div>
            )}
            <p className="mt-2 text-center text-[10px] leading-4 text-slate-300 sm:text-xs">
              {exercise.instructions[0] ?? (isArabic ? 'اتبعي خطوات الحركة بالأسفل.' : 'Follow the steps below.')}
            </p>
          </article>

          <article className="min-w-0 overflow-hidden rounded-xl border border-rose-400/30 bg-rose-950/20 p-2 sm:p-3" data-testid={`exercise-common-mistake-image-${exercise.id}`}>
            <h2 className="mb-2 flex items-center justify-center gap-1.5 text-center text-[11px] font-extrabold text-rose-300 sm:text-sm">
              <X size={16} aria-hidden="true" /> {isArabic ? 'خطأ شائع' : 'Common mistake'}
            </h2>
            {comparison ? (
              <img
                src={comparison.mistake}
                alt={isArabic ? `صورة توضيحية لخطأ شائع في ${exercise.name}` : `Common form mistake for ${exercise.latin}`}
                className="aspect-[16/10] w-full rounded-lg border border-rose-300/20 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex aspect-[16/10] w-full items-center justify-center rounded-lg bg-white/5 px-3 text-center text-xs text-slate-400" role="img" aria-label={missingReferenceLabel}>
                {missingReferenceLabel}
              </div>
            )}
            <p className="mt-2 text-center text-[10px] font-bold leading-4 text-slate-200 sm:text-xs">
              {commonError?.title[locale] ?? (isArabic ? 'حافظي على التحكم في الحركة' : 'Keep the movement controlled')}
            </p>
            {commonError && (
              <p className="mt-1 text-center text-[10px] leading-4 text-slate-400">
                {isArabic ? 'التصحيح: ' : 'Correction: '}{commonError.correction[locale]}
              </p>
            )}
          </article>
        </div>
        <p className="mt-3 flex items-start gap-2 text-[10px] leading-5 text-slate-400">
          <ShieldCheck size={14} className="mt-0.5 shrink-0 text-emerald-300" />
          {isArabic ? 'صور ثابتة للتوضيح فقط؛ أوقفي الحركة إذا شعرتِ بألم.' : 'Still reference images only; stop if you feel pain.'}
        </p>
      </section>

      <section className="grid gap-3 lg:grid-cols-[.92fr_1.08fr_1fr]">
        <div className="card-dark p-4" data-testid={`exercise-target-muscles-${exercise.id}`}>
          <h2 className="text-sm font-extrabold">{isArabic ? 'العضلات المستهدفة' : 'Target muscles'}</h2>
          <p className="mt-2 text-[11px] leading-5 text-muted-foreground">{isArabic ? 'الأسماء فقط، بدون أي رسومات تشريحية.' : 'Muscle names only, with no anatomy figures.'}</p>
          <p className="mt-4 text-[11px] font-bold" style={{ color: accent }}>{isArabic ? 'العضلات الأساسية' : 'Primary muscles'}</p>
          <ul className="mt-2 space-y-2">
            {primary.map((muscle) => (
              <li key={muscle} className="rounded-lg border border-white/[.07] bg-white/[.025] px-3 py-2 text-xs">
                <span className="font-semibold text-muted-foreground">{isArabic ? 'العضلة: ' : 'Muscle: '}</span>{muscleNames[muscle][locale]}
              </li>
            ))}
          </ul>
          {secondary.length > 0 && (
            <>
              <p className="mt-4 text-[11px] font-bold text-muted-foreground">{isArabic ? 'عضلات مساعدة' : 'Supporting muscles'}</p>
              <ul className="mt-2 space-y-2">
                {secondary.map((muscle) => (
                  <li key={muscle} className="rounded-lg border border-white/[.07] bg-white/[.025] px-3 py-2 text-xs">
                    <span className="font-semibold text-muted-foreground">{isArabic ? 'العضلة: ' : 'Muscle: '}</span>{muscleNames[muscle][locale]}
                  </li>
                ))}
              </ul>
            </>
          )}
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
        <div>
          <section className="card-dark p-4" data-testid={`exercise-workout-info-${exercise.id}`}>
            <h2 className="text-sm font-extrabold">{isArabic ? 'المعلومات الأساسية' : 'Exercise details'}</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <InfoTile icon={<Dumbbell size={16} />} label={isArabic ? 'الأدوات' : 'Equipment'} value={equipment[locale]} accent={accent} />
              <InfoTile icon={<Gauge size={16} />} label={isArabic ? 'المستوى' : 'Level'} value={levelLabel} accent={accent} />
              <InfoTile icon={<Timer size={16} />} label={isArabic ? 'المجموعات' : 'Sets'} value={`${exercise.sets}`} accent={accent} />
              <InfoTile icon={<Play size={16} />} label={isArabic ? 'التكرارات' : 'Reps'} value={`${exercise.reps ?? 12}`} accent={accent} />
            </div>
          </section>
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
