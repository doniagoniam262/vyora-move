import { Link } from 'wouter';
import { Bell, Play } from 'lucide-react';
import { exercises, planById, plans, planExercises, categoryLabel } from '@/lib/data';
import { useSessions, useSettings, weekDays, weekStart } from '@/lib/store';
import { SmartImg, Logo } from '@/components/vyora';
import { PlanCard } from '@/components/cards';

export default function HomePage() {
  const sessions = useSessions();
  const [settings] = useSettings();
  const day = new Date().getDay();
  const today = planById(['ten-minute', 'beginner-plan', 'twenty-minute'][day % 3]) ?? plans[0];
  const daily = [0, 1, 2].map((i) => exercises[(day * 3 + i * 4 + 2) % exercises.length]);
  const start = weekStart();
  const weekCount = sessions.filter((s) => new Date(s.completedAt) >= start).length;
  const days = weekDays(sessions);
  const pct = Math.min(100, (weekCount / settings.weeklyGoal) * 100);
  const names = ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'];
  return (
    <div className="page-enter space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">مرحبًا،</p>
          <h1 className="text-3xl font-extrabold">يا بطل</h1>
          <p className="mt-1 text-sm text-muted-foreground">ابدأ خطوتك نحو جسم أكثر نشاطًا.</p>
        </div>
        <Link href="/progress" data-testid="link-home-notifications" aria-label="تقدمك" className="focus-ring press grid h-11 w-11 place-items-center rounded-full border border-border bg-card"><Bell size={18} /></Link>
      </div>

      <section data-testid="card-today-challenge" className="card-dark relative overflow-hidden">
        <SmartImg src={today.image} alt={today.name} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/95 via-black/70 to-black/20" />
        <div className="relative flex min-h-[15rem] flex-col justify-between p-5 md:min-h-[19rem] md:p-8">
          <div>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">تحدي اليوم</span>
            <h2 className="mt-3 text-2xl font-extrabold md:text-4xl" data-testid="text-today-name">{today.name}</h2>
            <p className="mt-1 max-w-xs text-sm leading-7 text-white/75">{today.minutes} دقيقة · {planExercises(today).length} تمارين · بدون معدات</p>
          </div>
          <Link href={`/session/${today.id}`} data-testid="button-start-today" className="btn-lime focus-ring press mt-6 inline-flex w-fit items-center gap-2 rounded-xl px-8 py-3"><Play size={16} fill="currentColor" />ابدأ الآن</Link>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-extrabold">تمارينك اليومية</h2><Link href="/exercises" data-testid="link-home-all-exercises" className="focus-ring text-xs font-bold text-primary">عرض الكل</Link></div>
        <div className="grid grid-cols-3 gap-3">
          {daily.map((ex) => (
            <Link key={ex.id} href={`/exercises/${ex.id}`} data-testid={`card-daily-${ex.id}`} className="card-dark focus-ring lift press overflow-hidden">
              <SmartImg src={ex.image} alt={ex.name} className="aspect-[4/5] w-full" />
              <div className="p-2.5"><b className="block truncate text-sm">{ex.name}</b><span className="text-[11px] text-muted-foreground">{categoryLabel(ex.category)} · {ex.duration} ث</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section data-testid="card-weekly-progress" className="card-dark p-5">
        <div className="flex items-center justify-between"><h2 className="font-extrabold">جلسات مكتملة هذا الأسبوع</h2><span className="num text-2xl font-bold text-primary" data-testid="text-weekly-count">{weekCount}/{settings.weeklyGoal}</span></div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={settings.weeklyGoal} aria-valuenow={Math.min(weekCount, settings.weeklyGoal)}><div data-testid="bar-weekly" className="h-full rounded-full bg-primary transition-[width] duration-700" style={{ width: `${pct}%` }} /></div>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {days.map((d, i) => <div key={i} data-testid={`dot-day-${i}`} className={`rounded-lg py-1.5 text-center text-[11px] font-bold ${d.count ? 'bg-primary text-primary-foreground' : d.today ? 'border border-primary/60 text-primary' : 'bg-muted text-muted-foreground'}`}>{names[i]}</div>)}
        </div>
        {weekCount === 0 && <p className="mt-3 text-xs text-muted-foreground">لا جلسات هذا الأسبوع بعد. أول جلسة قصيرة تبدأ المشوار.</p>}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-extrabold">خطط مقترحة</h2><Link href="/plans" data-testid="link-home-all-plans" className="focus-ring text-xs font-bold text-primary">كل الخطط</Link></div>
        <div className="grid gap-3 md:grid-cols-3">{plans.map((p) => <PlanCard key={p.id} plan={p} />)}</div>
      </section>

      <section className="card-dark flex items-center gap-4 p-5"><Logo full /></section>
    </div>
  );
}
