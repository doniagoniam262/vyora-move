import { Link } from 'wouter';
import { Bell, Film, Play } from 'lucide-react';
import { exercises, planById, plans, planExercises, categoryLabel, scheduledPlanForDay } from '@/lib/data';
import { useSessions, useSettings, useWeeklySchedule, weekDays, weekStart } from '@/lib/store';
import { SmartImg, Logo } from '@/components/vyora';
import { PlanCard } from '@/components/cards';

export default function HomePage() {
  const sessions = useSessions();
  const [settings] = useSettings();
  const [schedule] = useWeeklySchedule();
  const day = new Date().getDay();
  const today = planById(['ten-minute', 'beginner-plan', 'twenty-minute'][day % 3]) ?? plans[0];
  const daily = [0, 1, 2].map((i) => exercises[(day * 3 + i * 4 + 2) % exercises.length]);
  const start = weekStart();
  const weekCount = sessions.filter((s) => new Date(s.completedAt) >= start).length;
  const days = weekDays(sessions);
  const pct = Math.min(100, (weekCount / settings.weeklyGoal) * 100);
  const names = ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'];
  const scheduledToday = schedule.days.includes(day);
  const scheduledPlan = scheduledPlanForDay(schedule, day);
  return (
    <div className="page-enter space-y-3.5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">مرحبًا،</p>
          <h1 className="text-xl font-extrabold">مرحبًا بك</h1>
          <p className="mt-1 text-sm text-muted-foreground">خطوة جديدة نحو جسم أكثر نشاطًا.</p>
        </div>
        <Link href="/progress" data-testid="link-home-notifications" aria-label="تقدمك" className="focus-ring press grid h-11 w-11 place-items-center rounded-full border border-border bg-card"><Bell size={18} /></Link>
      </div>

      <section data-testid="card-today-challenge" className="card-dark relative overflow-hidden">
        <SmartImg src={today.image} alt={today.name} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/95 via-black/70 to-black/30" />
        <div className="relative flex min-h-[10.5rem] flex-col justify-between p-4 md:min-h-[16rem] md:p-8">
          <div>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">تحدي اليوم</span>
            <h2 className="mt-3 text-xl font-extrabold md:text-4xl" data-testid="text-today-name">{today.name}</h2>
            <p className="mt-0.5 max-w-xs text-xs leading-6 text-white/75">{today.minutes} دقيقة · {planExercises(today).length} تمارين · بدون معدات</p>
          </div>
          <Link href={`/session/${today.id}`} data-testid="button-start-today" className="btn-lime focus-ring press mt-4 inline-flex w-fit items-center gap-2 rounded-lg px-8 py-2 text-sm"><Play size={16} fill="currentColor" />ابدأ الآن</Link>
        </div>
      </section>

      <section className="card-dark p-3.5" data-testid="card-personal-schedule">
        <div className="flex items-center justify-between gap-3">
          <div><h2 className="text-sm font-extrabold">جدولك الأسبوعي</h2><p className="mt-0.5 text-[11px] text-muted-foreground">{schedule.days.length ? `${schedule.days.length} أيام تدريب · ${schedule.level === 'beginner' ? 'مبتدئ' : 'متوسط'} · حتى ${schedule.minutes} دقيقة` : 'حدّد أيامك ومستواك لاقتراح خطة مناسبة.'}</p></div>
          <Link href="/more" data-testid="link-edit-schedule" className="focus-ring rounded-lg px-2 py-1.5 text-xs font-bold text-primary">{schedule.days.length ? 'تعديل' : 'إعداد الجدول'}</Link>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1.5" aria-label="أيام جدول التدريب">
          {[{ day: 0, label: 'ح' }, { day: 1, label: 'ن' }, { day: 2, label: 'ث' }, { day: 3, label: 'ر' }, { day: 4, label: 'خ' }, { day: 5, label: 'ج' }, { day: 6, label: 'س' }].map(({ day: weekday, label }) => {
            const selected = schedule.days.includes(weekday);
            return <span key={weekday} data-testid={`home-schedule-day-${weekday}`} title={selected ? 'يوم تدريب' : 'راحة'} className={`rounded-lg py-1.5 text-center text-[11px] font-bold ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{label}</span>;
          })}
        </div>
        {scheduledToday && scheduledPlan
          ? <Link href={`/session/${scheduledPlan.id}`} data-testid="button-start-scheduled" className="btn-lime focus-ring press mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm"><Play size={15} fill="currentColor" />تمرين اليوم · {scheduledPlan.name} · حوالي {scheduledPlan.minutes} دقائق</Link>
          : schedule.days.length > 0
            ? <p className="mt-3 text-xs text-muted-foreground" data-testid="text-schedule-rest">{schedule.days.includes((day + 1) % 7) ? 'موعدك القادم غدًا.' : 'اليوم راحة حسب جدولك. خذ وقتك واستأنف في يوم التدريب القادم.'}</p>
            : null}
      </section>

      <section data-testid="card-weekly-progress" className="card-dark p-3.5">
        <div className="flex items-center justify-between"><h2 className="text-sm font-extrabold">جلسات مكتملة هذا الأسبوع</h2><span className="num text-lg font-bold text-primary" data-testid="text-weekly-count">{weekCount}/{settings.weeklyGoal}</span></div>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={settings.weeklyGoal} aria-valuenow={Math.min(weekCount, settings.weeklyGoal)}><div data-testid="bar-weekly" className="h-full rounded-full bg-primary transition-[width] duration-700" style={{ width: `${pct}%` }} /></div>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {days.map((d, i) => <div key={i} data-testid={`dot-day-${i}`} className={`rounded-lg py-1.5 text-center text-[11px] font-bold ${d.count ? 'bg-primary text-primary-foreground' : d.today ? 'border border-primary/60 text-primary' : 'bg-muted text-muted-foreground'}`}>{names[i]}</div>)}
        </div>
        {weekCount === 0 && <p className="mt-3 text-xs text-muted-foreground">لا جلسات هذا الأسبوع بعد. أول جلسة قصيرة تبدأ المشوار.</p>}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-base font-extrabold">تمارينك اليومية</h2><Link href="/exercises" data-testid="link-home-all-exercises" className="focus-ring text-xs font-bold text-primary">عرض الكل</Link></div>
        <div className="grid grid-cols-3 gap-2">
          {daily.map((ex) => (
            <Link key={ex.id} href={`/exercises/${ex.id}`} data-testid={`card-daily-${ex.id}`} className="card-dark focus-ring lift press overflow-hidden">
              <SmartImg src={ex.image} alt={ex.name} className="aspect-[4/3] w-full" />
              <div className="p-2"><b className="block truncate text-xs">{ex.name}</b><span className="text-[11px] text-muted-foreground">{categoryLabel(ex.category)} · {ex.duration} ث</span></div>
            </Link>
          ))}
        </div>
      </section>

      <Link href="/videos" data-testid="card-home-videos" className="card-dark focus-ring lift flex items-center gap-3 p-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary"><Film size={23} /></span>
        <span className="min-w-0 flex-1">
          <b className="block">تمارين بالفيديو</b>
          <span className="mt-1 block text-xs text-muted-foreground">مدربات ومدربون وخيارات تناسب كل مستوى</span>
        </span>
        <Play size={18} className="shrink-0 text-primary" />
      </Link>

      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-base font-extrabold">خطط مقترحة</h2><Link href="/plans" data-testid="link-home-all-plans" className="focus-ring text-xs font-bold text-primary">كل الخطط</Link></div>
        <div className="grid gap-2.5 md:grid-cols-3">{plans.map((p) => <PlanCard key={p.id} plan={p} />)}</div>
      </section>

      <section className="card-dark flex items-center gap-4 p-4"><Logo full /></section>
    </div>
  );
}
