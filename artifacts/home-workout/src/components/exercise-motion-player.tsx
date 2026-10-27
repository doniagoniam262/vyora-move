import { ArrowDown, CheckCircle2, ListChecks } from 'lucide-react';
import type { Exercise } from '@/lib/data';
import { FitnessVisual } from './fitness-visual';

/** Exercise coaching cards, intentionally static: no player or character animation. */
export function ExerciseMotionPlayer({
  exercise,
  locale,
}: {
  exercise: Pick<Exercise, 'id' | 'name' | 'instructions'>;
  locale: 'ar' | 'en';
}) {
  const isArabic = locale === 'ar';
  return (
    <section
      className="overflow-hidden rounded-[1.4rem] border border-border bg-card shadow-[0_16px_48px_rgba(0,0,0,.12)]"
      dir={isArabic ? 'rtl' : 'ltr'}
      data-testid={`exercise-motion-player-${exercise.id}`}
      aria-label={isArabic ? `دليل أداء ${exercise.name}` : `${exercise.name} technique guide`}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <span className="inline-flex items-center gap-2 text-sm font-bold"><ListChecks size={18} className="text-primary" />{isArabic ? 'دليل الأداء' : 'Technique guide'}</span>
        <span className="latin text-[10px] font-bold tracking-[.16em] text-primary" dir="ltr">VYORA MOVE</span>
      </header>
      <div className="grid grid-cols-[80px_1fr] items-center gap-4 border-b border-border bg-gradient-to-l from-primary/[.08] to-transparent p-5 sm:grid-cols-[100px_1fr]">
        <FitnessVisual identity={exercise.id} label="" className="aspect-square rounded-2xl" />
        <div>
          <h3 className="text-lg font-bold">{exercise.name}</h3>
          <p className="mt-1 text-xs leading-6 text-muted-foreground">{isArabic ? 'خطوات واضحة. أداء متحكم به. تدريب بثقة.' : 'Clear steps. Controlled technique. Train with confidence.'}</p>
        </div>
      </div>
      <ol className="space-y-3 p-4 sm:p-5">
        {exercise.instructions.map((instruction, index) => (
          <li key={`${exercise.id}-${index}`} className="flex items-start gap-3 rounded-2xl border border-white/[.055] bg-gradient-to-br from-white/[.04] to-transparent p-4">
            <span className="latin grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-xs font-bold text-primary" dir="ltr">{String(index + 1).padStart(2, '0')}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-7">{instruction}</p>
            </div>
            {index === exercise.instructions.length - 1 ? <CheckCircle2 size={16} className="mt-2 shrink-0 text-primary/70" aria-hidden="true" /> : <ArrowDown size={14} className="mt-2 shrink-0 text-muted-foreground/50" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </section>
  );
}
