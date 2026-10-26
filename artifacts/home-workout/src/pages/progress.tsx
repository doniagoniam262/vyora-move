import { Link } from 'wouter';
import { Check, History } from 'lucide-react';
import { useSessions, useSettings, fmtDate, weekDays, weekStart } from '@/lib/store';
import { EmptyState } from '@/components/vyora';
import { formatTime } from '@/lib/data';

export default function ProgressPage() {
  const sessions = useSessions();
  const [settings] = useSettings();
  const start = weekStart();
  const week = sessions.filter((s) => new Date(s.completedAt) >= start).length;
  const totalSec = sessions.reduce((a, s) => a + s.durationSeconds, 0);
  const totalEx = sessions.reduce((a, s) => a + s.completedCount, 0);
  const days = weekDays(sessions);
  const max = Math.max(1, ...days.map((d) => d.count));
  const names = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
  const ratio = Math.min(1, week / settings.weeklyGoal);
  const h = Math.floor(totalSec / 3600);
  return (
    <div className="page-enter space-y-5">
      <h1 className="text-3xl font-extrabold">تقدمي</h1>
      <div className="grid gap-3 md:grid-cols-[1fr_1fr]">
        <div className="card-dark flex items-center gap-5 p-5" data-testid="card-week-ring">
          <div className="relative h-24 w-24 shrink-0"><svg viewBox="0 0 100 100" className="timer-ring h-full w-full"><circle cx="50" cy="50" r="44" fill="none" stroke="hsl(120 3% 15%)" strokeWidth="8" /><circle cx="50" cy="50" r="44" fill="none" stroke="#A4F477" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${ratio * 276} 276`} /></svg><span className="num absolute inset-0 grid place-items-center text-xl font-bold" data-testid="text-week-ratio">{week}/{settings.weeklyGoal}</span></div>
          <div><b>جلسات هذا الأسبوع</b><p className="mt-1 text-xs text-muted-foreground">هدفك {settings.weeklyGoal} جلسات. يمكنك تعديله من المزيد.</p></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="card-dark p-4"><span className="text-xs text-muted-foreground">إجمالي الجلسات</span><b data-testid="stat-total-sessions" className="num mt-1 block text-3xl text-primary">{sessions.length}</b></div>
          <div className="card-dark p-4"><span className="text-xs text-muted-foreground">إجمالي الوقت</span><b data-testid="stat-total-time" className="num mt-1 block text-3xl text-primary">{h > 0 ? `${h}:${String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0')}` : formatTime(totalSec)}</b></div>
          <div className="card-dark col-span-2 p-4"><span className="text-xs text-muted-foreground">تمارين مكتملة</span><b data-testid="stat-total-exercises" className="num mt-1 block text-3xl text-primary">{totalEx}</b></div>
        </div>
      </div>
      <section className="card-dark p-5"><h2 className="font-extrabold">نشاط الأسبوع</h2>
        <div className="mt-4 flex h-28 items-end gap-2">{days.map((d, i) => <div key={i} className="flex flex-1 flex-col items-center gap-1.5"><div data-testid={`bar-day-${i}`} title={`${d.count}`} className={`w-full rounded-md ${d.count ? 'bg-primary' : 'bg-muted'}`} style={{ height: `${d.count ? 20 + (d.count / max) * 80 : 8}%` }} /><span className="text-[10px] text-muted-foreground">{names[i].slice(0, 3)}</span></div>)}</div>
      </section>
      <h2 className="pt-2 text-lg font-extrabold">أحدث الجلسات</h2>
      {sessions.length === 0 ? <EmptyState testId="empty-history" icon={<History size={26} />} title="سجلك يبدأ بجلسة" body="لا جلسات محفوظة بعد. أكمل جلسة قصيرة وستظهر هنا بإحصاءات حقيقية."><Link href="/plans" data-testid="link-progress-plans" className="btn-lime focus-ring rounded-xl px-6 py-2.5 text-sm">اختر خطة</Link></EmptyState>
        : <ul className="space-y-2.5">{sessions.slice(0, 30).map((s) => <li key={s.id} data-testid={`row-session-${s.id}`} className="card-dark flex items-center gap-3 p-3.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-primary"><Check size={16} /></span><span className="flex-1"><b className="block text-sm">{s.planName}</b><span className="text-[11px] text-muted-foreground">{fmtDate(s.completedAt)} · {s.completedCount} تمارين</span></span><span className="num text-sm font-bold">{formatTime(s.durationSeconds)}</span></li>)}</ul>}
    </div>
  );
}
