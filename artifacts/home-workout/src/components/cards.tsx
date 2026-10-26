import { Link } from 'wouter';
import { ChevronLeft, Clock3 } from 'lucide-react';
import { categoryLabel, levelLabel, planExercises, type Exercise, type WorkoutPlan } from '@/lib/data';
import { SmartImg, Tag } from '@/components/vyora';

export function ExerciseRow({ ex }: { ex: Exercise }) {
  return (
    <Link href={`/exercises/${ex.id}`} data-testid={`card-exercise-${ex.id}`} className="card-dark focus-ring lift press group flex items-center gap-4 p-2.5">
      <SmartImg src={ex.image} alt={ex.name} className="h-20 w-24 shrink-0 rounded-xl" testId={`img-exercise-${ex.id}`} />
      <span className="min-w-0 flex-1">
        <b className="block truncate text-base">{ex.name}</b>
        <span className="latin block text-[11px] text-muted-foreground" dir="ltr">{ex.latin}</span>
        <span className="mt-1.5 flex flex-wrap gap-1.5"><Tag>{categoryLabel(ex.category)}</Tag><Tag tone="dim">{levelLabel(ex.level)}</Tag></span>
      </span>
      <ChevronLeft size={18} className="ml-2 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1" />
    </Link>
  );
}

export function PlanCard({ plan }: { plan: WorkoutPlan }) {
  const count = planExercises(plan).length;
  return (
    <article data-testid={`card-plan-${plan.id}`} className="card-dark lift relative overflow-hidden">
      <SmartImg src={plan.image} alt={plan.name} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/70 to-black/30" />
      <div className="relative flex min-h-[9.5rem] flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-extrabold">{plan.name}</h3>
          <p className="mt-1 max-w-[16rem] text-xs leading-6 text-white/75">{plan.frequency} · {plan.minutes} دقيقة · {count} تمارين</p>
        </div>
        <Link href={`/plans/${plan.id}`} data-testid={`link-plan-${plan.id}`} className="btn-lime focus-ring press mt-4 inline-flex w-fit items-center gap-1.5 rounded-xl px-5 py-2 text-sm">عرض التمارين <Clock3 size={14} /></Link>
      </div>
    </article>
  );
}
