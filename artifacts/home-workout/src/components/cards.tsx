import { Link } from 'wouter';
import { ChevronLeft, Clock3 } from 'lucide-react';
import { categoryLabel, levelLabel, planExercises, type Exercise, type WorkoutPlan } from '@/lib/data';
import { SmartImg, Tag } from '@/components/vyora';

export function ExerciseRow({ ex }: { ex: Exercise }) {
  return (
    <Link href={`/exercises/${ex.id}`} data-testid={`card-exercise-${ex.id}`} className="card-dark focus-ring lift press group flex items-center gap-3 p-2">
      <SmartImg src={ex.image} alt={ex.name} className="h-16 w-20 shrink-0 rounded-lg" testId={`img-exercise-${ex.id}`} />
      <span className="min-w-0 flex-1">
        <b className="block truncate text-sm">{ex.name}</b>
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
      <div className="absolute inset-0 bg-gradient-to-l from-[#070a08] via-[#070a08]/85 to-[#070a08]/20" />
      <div className="relative flex min-h-[6.5rem] items-center justify-between gap-3 p-3.5">
        <div className="min-w-0">
          <h3 className="text-base font-extrabold">{plan.name}</h3>
          <p className="mt-0.5 text-[11px] leading-5 text-white/70">{plan.frequency} · {plan.minutes} دقيقة · {count} تمارين</p>
        </div>
        <Link href={`/plans/${plan.id}`} data-testid={`link-plan-${plan.id}`} className="btn-lime focus-ring press inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs">عرض التفاصيل <Clock3 size={13} /></Link>
      </div>
    </article>
  );
}
