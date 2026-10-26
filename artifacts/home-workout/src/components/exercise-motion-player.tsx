import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import type { Exercise } from '@/lib/data';
import { MotionIllustration, type MotionVariant } from '@/components/motion-illustration';
import './exercise-motion-player.css';

type MotionFamily = 'squat' | 'bridge' | 'lunge' | 'plank' | 'press' | 'step' | 'stretch' | 'core';
type MotionConfig = { variant: MotionVariant; family: MotionFamily };

const movementMotion: Record<string, MotionConfig> = {
  march: { variant: 'step', family: 'step' },
  'shoulder-circles': { variant: 'reach', family: 'step' },
  squat: { variant: 'squat', family: 'squat' },
  'glute-bridge': { variant: 'bridge', family: 'bridge' },
  lunge: { variant: 'lunge', family: 'lunge' },
  'jacks-low': { variant: 'step', family: 'step' },
  'mountain-climber': { variant: 'plank', family: 'plank' },
  'incline-push': { variant: 'press', family: 'press' },
  'chair-dip': { variant: 'press', family: 'press' },
  plank: { variant: 'plank', family: 'plank' },
  crunch: { variant: 'plank', family: 'core' },
  bicycle: { variant: 'step', family: 'core' },
  hamstring: { variant: 'stretch', family: 'stretch' },
  'childs-pose': { variant: 'stretch', family: 'stretch' },
  'wall-push-up': { variant: 'press', family: 'press' },
  'prone-w-raise': { variant: 'reach', family: 'stretch' },
  'wall-sit': { variant: 'squat', family: 'squat' },
  'calf-raise': { variant: 'step', family: 'step' },
  'dead-bug': { variant: 'plank', family: 'core' },
  'side-plank': { variant: 'plank', family: 'plank' },
  'fire-hydrant': { variant: 'bridge', family: 'core' },
  'hip-hinge': { variant: 'lunge', family: 'stretch' },
  'pike-push-up': { variant: 'press', family: 'press' },
};

export function ExerciseMotionPlayer({
  exercise,
  locale,
}: {
  exercise: Pick<Exercise, 'id' | 'name' | 'instructions'>;
  locale: 'ar' | 'en';
}) {
  const isArabic = locale === 'ar';
  const config = movementMotion[exercise.id] ?? { variant: 'squat' as const, family: 'squat' as const };
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const steps = exercise.instructions.slice(0, 3);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStep((current) => (current + 1) % Math.max(steps.length, 1)), 1500);
    return () => window.clearInterval(timer);
  }, [playing, steps.length]);

  useEffect(() => {
    setPlaying(false);
    setStep(0);
  }, [exercise.id]);

  const moveStep = (direction: -1 | 1) => {
    setPlaying(false);
    setStep((current) => (current + direction + Math.max(steps.length, 1)) % Math.max(steps.length, 1));
  };

  const stage = isArabic
    ? ['الاستعداد', 'أداء الحركة', 'العودة'][step] ?? 'أداء الحركة'
    : ['Set up', 'Perform', 'Return'][step] ?? 'Perform';

  return (
    <section
      className="movement-demo overflow-hidden rounded-[1.4rem] border border-border bg-card"
      dir={isArabic ? 'rtl' : 'ltr'}
      data-testid={`exercise-motion-player-${exercise.id}`}
      aria-label={isArabic ? `عرض حركي: ${exercise.name}` : `Movement demo: ${exercise.name}`}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-primary">
            {isArabic ? 'عرض حركي داخل التطبيق' : 'In-app movement demo'}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {isArabic ? 'رسم توضيحي صامت · يتكرر عند التشغيل' : 'Silent vector sequence · loops while playing'}
          </p>
        </div>
        <span className="latin rounded-full border border-border px-2.5 py-1 text-[9px] tracking-[.12em] text-muted-foreground" dir="ltr">
          VYORA · DEMO
        </span>
      </header>

      <div className={`movement-demo__screen movement-demo--${config.family} ${playing ? 'is-playing' : ''}`}>
        <div className="movement-demo__figure">
          <MotionIllustration
            variant={config.variant}
            label={isArabic ? `رسم حركة ${exercise.name}` : `${exercise.name} movement illustration`}
            className="h-full w-full text-foreground"
          />
        </div>
        <div className="movement-demo__screen-label">
          <span className="text-[10px] font-bold text-primary">{stage}</span>
          <span className="latin text-[10px] text-muted-foreground" dir="ltr">
            {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center gap-2" aria-label={isArabic ? 'مراحل الحركة' : 'Movement stages'}>
          {steps.map((cue, index) => (
            <button
              key={`${exercise.id}-stage-${index}`}
              type="button"
              onClick={() => { setPlaying(false); setStep(index); }}
              aria-label={`${isArabic ? 'المرحلة' : 'Stage'} ${index + 1}`}
              aria-current={step === index ? 'step' : undefined}
              data-testid={`button-motion-stage-${exercise.id}-${index + 1}`}
              className={`focus-ring h-1.5 flex-1 rounded-full transition-colors ${step === index ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
        <p className="min-h-12 text-sm leading-6" aria-live="polite" data-testid={`text-motion-cue-${exercise.id}`}>
          {steps[step] ?? exercise.name}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => moveStep(-1)}
            aria-label={isArabic ? 'المرحلة السابقة' : 'Previous stage'}
            data-testid={`button-motion-previous-${exercise.id}`}
            className="focus-ring press grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground hover:text-foreground"
          >
            {isArabic ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setPlaying((current) => !current)}
            aria-pressed={playing}
            data-testid={`button-motion-play-${exercise.id}`}
            className="focus-ring press inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground"
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
            {playing
              ? (isArabic ? 'إيقاف الحركة' : 'Pause demo')
              : (isArabic ? 'تشغيل الحركة' : 'Play demo')}
          </button>
          <button
            type="button"
            onClick={() => moveStep(1)}
            aria-label={isArabic ? 'المرحلة التالية' : 'Next stage'}
            data-testid={`button-motion-next-${exercise.id}`}
            className="focus-ring press grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground hover:text-foreground"
          >
            {isArabic ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
          <button
            type="button"
            onClick={() => { setPlaying(false); setStep(0); }}
            aria-label={isArabic ? 'إعادة العرض' : 'Restart demo'}
            data-testid={`button-motion-reset-${exercise.id}`}
            className="focus-ring press grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground hover:text-foreground"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
