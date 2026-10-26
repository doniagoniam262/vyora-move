import { Link } from 'wouter';
import { ArrowUpRight, BookOpen, Dumbbell, Salad } from 'lucide-react';
import { useVYORAProfile } from '@/lib/profile-context';
import { useLocale } from '@/lib/locale';

export function GoalPlanPanel() {
  const profile = useVYORAProfile();
  const { locale } = useLocale();
  if (!profile || profile.goal !== 'gain-weight') return null;

  const isArabic = locale === 'ar';
  const resistanceDays = Math.min(profile.sessionsPerWeek, 4);
  const weeklyFocus =
    profile.sessionsPerWeek > 4
      ? isArabic
        ? `${resistanceDays} أيام مقاومة، والأيام الإضافية للتعافي أو الحركة الخفيفة`
        : `${resistanceDays} resistance days; use extra days for recovery or light movement`
      : profile.sessionsPerWeek < 2
        ? isArabic
        ? 'يمكن البدء بعدد الجلسات المختار، ثم زيادته تدريجيًا إذا كان التعافي جيدًا'
          : 'Start with your chosen frequency and increase gradually if recovery feels good'
        : isArabic
          ? `${resistanceDays} جلسات مقاومة أسبوعيًا مع يوم راحة بين الجلسات قدر الإمكان`
          : `${resistanceDays} strength sessions per week, with a rest day between sessions when possible`;

  const meals = isArabic
    ? [
        ['إفطار', 'بيض أو فول، خبز، ولبن أو زبادي.'],
        ['وجبة خفيفة', 'موز مع زبادي ومكسرات إن كانت مناسبة لك.'],
        ['غداء', 'أرز أو بطاطس، مع دجاج أو بقوليات وخضار.'],
        ['وجبة خفيفة', 'ساندويتش جبن أو حمص مع ثمرة فاكهة.'],
        ['عشاء', 'جبن أو بيض أو بقوليات مع خبز وخضار.'],
      ]
    : [
        ['Breakfast', 'Eggs or beans, bread, and milk or yogurt.'],
        ['Snack', 'Banana with yogurt and nuts if suitable for you.'],
        ['Lunch', 'Rice or potatoes with chicken or beans and vegetables.'],
        ['Snack', 'Cheese or hummus sandwich with a piece of fruit.'],
        ['Dinner', 'Cheese, eggs, or beans with bread and vegetables.'],
      ];

  return (
    <section className="card-dark space-y-4 border border-primary/20 p-4 sm:p-5" data-testid="panel-gain-weight-plan">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Dumbbell size={21} />
        </span>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            {isArabic ? 'خطة مخصصة لهدفك' : 'PERSONALIZED TO YOUR GOAL'}
          </span>
          <h2 className="mt-1 text-base font-extrabold">
            {isArabic ? 'زيادة وزن تدريجية وقوة' : 'Gradual weight gain and strength'}
          </h2>
          <p className="mt-1 text-xs leading-6 text-muted-foreground">{weeklyFocus}</p>
        </div>
        <Link
          href="/plans/gain-weight-plan"
          data-testid="link-gain-weight-plan"
          aria-label={isArabic ? 'افتح خطة القوة' : 'Open strength plan'}
          className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"
        >
          <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-background/45 p-3.5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Dumbbell size={16} className="text-primary" />
            {isArabic ? 'التدريب' : 'Training'}
          </div>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">
            {isArabic
              ? 'خطة مقاومة منزلية للجسم كاملًا. زيدي التكرار أو اختاري نسخة أصعب بالتدريج، واتركي وقتًا للتعافي.'
              : 'A full-body home resistance plan. Gradually add reps or choose a harder variation, and leave time to recover.'}
          </p>
          <Link
            href="/plans/gain-weight-plan"
            data-testid="button-start-gain-weight-plan"
            className="btn-lime focus-ring mt-3 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs"
          >
            <BookOpen size={14} />
            {isArabic ? 'عرض تمارين الخطة' : 'View plan exercises'}
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-background/45 p-3.5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Salad size={16} className="text-primary" />
            {isArabic ? 'نموذج وجبات يومي' : 'Sample daily meals'}
          </div>
          <ul className="mt-2 space-y-2">
            {meals.map(([title, description]) => (
              <li key={title} className="flex gap-2 text-xs leading-5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  <b>{title}:</b> <span className="text-muted-foreground">{description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="border-t border-border pt-3 text-[11px] leading-5 text-muted-foreground">
        {isArabic
          ? 'إرشادات عامة وليست خطة سعرات طبية. تُزاد الكميات تدريجيًا حسب الشهية والاحتياج، ويُنصح باستشارة مختص عند وجود نقص وزن أو حالة صحية.'
          : 'General guidance, not a medical calorie prescription. Increase portions gradually to suit your appetite and needs; consult a professional if you are underweight or have a health condition.'}
      </p>
    </section>
  );
}
