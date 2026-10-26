import { Link } from 'wouter';
import { ChevronLeft, Clock3 } from 'lucide-react';
import { categoryLabel, levelLabel, planExercises, type Exercise, type WorkoutPlan } from '@/lib/data';
import { SmartImg, Tag } from '@/components/vyora';
import { useLocale } from '@/lib/locale';
import { localizeExercise, localizePlan } from '@/lib/localized-data';

export function ExerciseRow({ ex }: { ex: Exercise }) {
  const { locale } = useLocale();
  ex = localizeExercise(ex, locale);
  return (
    <Link href={`/exercises/${ex.id}`} data-testid={`card-exercise-${ex.id}`} className="card-dark focus-ring lift press group flex items-center gap-3 p-2">
      <SmartImg src={ex.image} alt={ex.name} className="h-16 w-20 shrink-0 rounded-lg" testId={`img-exercise-${ex.id}`} />
      <span className="min-w-0 flex-1">
        <b className="block truncate text-sm">{ex.name}</b>
        {locale === 'ar' && <span className="latin block text-[11px] text-muted-foreground" dir="ltr">{ex.latin}</span>}
        <span className="mt-1.5 flex flex-wrap gap-1.5"><Tag>{locale === 'ar' ? categoryLabel(ex.category) : ({full:'Full body',upper:'Upper body',lower:'Lower body',abs:'Core',warmup:'Warm-up',stretch:'Stretching'} as Record<string,string>)[ex.category]}</Tag><Tag tone="dim">{locale === 'ar' ? levelLabel(ex.level) : ex.level === 'beginner' ? 'Beginner' : 'Intermediate'}</Tag></span>
      </span>
      <ChevronLeft size={18} className={`shrink-0 text-muted-foreground transition-transform ${locale === 'ar' ? 'ml-2 group-hover:-translate-x-1' : 'mr-2 rotate-180 group-hover:translate-x-1'}`} />
    </Link>
  );
}

export function PlanCard({ plan }: { plan: WorkoutPlan }) {
  const { locale } = useLocale();
  plan = localizePlan(plan, locale);
  const count = planExercises(plan).length;
  return (
    <article data-testid={`card-plan-${plan.id}`} className="card-dark lift relative overflow-hidden">
      <SmartImg src={plan.image} alt={plan.name} className="absolute inset-0 h-full w-full" />
      <div className={`absolute inset-0 ${locale === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#070a08] via-[#070a08]/85 to-[#070a08]/20`} />
      <div className="relative flex min-h-[6.5rem] items-center justify-between gap-3 p-3.5">
        <div className="min-w-0">
          <h3 className="text-base font-extrabold">{plan.name}</h3>
          <p className="mt-0.5 text-[11px] leading-5 text-white/70">{plan.frequency} · {plan.minutes} {locale === 'ar' ? 'دقيقة' : 'min'} · {count} {locale === 'ar' ? 'تمارين' : 'exercises'}</p>
        </div>
        <Link href={`/plans/${plan.id}`} data-testid={`link-plan-${plan.id}`} className="btn-lime focus-ring press inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs">{locale === 'ar' ? 'عرض التفاصيل' : 'View details'} <Clock3 size={13} /></Link>
      </div>
    </article>
  );
}
