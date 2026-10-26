import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { ArrowLeft, ArrowUpLeft, BarChart3, Check, ChevronLeft, Clock3, Dumbbell, History, House, Pause, Play, RotateCcw, SkipForward, Sparkles, X } from 'lucide-react';
import { formatTime, readHistory, saveSession, STORAGE, workouts, type Level, type SavedSession, type Workout } from '@/lib/workout-data';

const navItems = [
  { href: '/', label: 'الرئيسية', Icon: House, id: 'home' },
  { href: '/workouts', label: 'التمارين', Icon: Dumbbell, id: 'workouts' },
  { href: '/history', label: 'سجلّي', Icon: History, id: 'history' },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return (
    <div className="site-shell grain" dir="rtl">
      <header className="top-nav sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-9">
          <Link href="/" data-testid="link-brand-home" className="focus-ring flex items-center gap-3 rounded-xl">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground"><span className="text-lg font-bold">ت</span></span>
            <span className="leading-tight"><span className="block text-[15px] font-bold tracking-tight">تِمرين البيت</span><span className="mt-0.5 block text-[10px] tracking-[.16em] text-muted-foreground">حركة على مزاجك</span></span>
          </Link>
          <nav aria-label="التنقل الرئيسي" className="flex items-center gap-1 rounded-2xl bg-muted/70 p-1">
            {navItems.map(({ href, label, Icon, id }) => (
              <Link key={href} href={href} data-testid={`link-nav-${id}`} aria-current={location === href ? 'page' : undefined} className={`nav-link focus-ring flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${location === href ? 'active' : ''}`}>
                <Icon size={16} strokeWidth={1.8} /><span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>
          <span className="hidden text-xs font-semibold text-muted-foreground md:block">مساحتك، إيقاعك</span>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mx-auto mt-16 max-w-7xl border-t border-border px-5 py-7 text-center text-xs text-muted-foreground md:px-9">
        حركات بسيطة، ومساحة لك. اختر الإيقاع الذي يناسبك اليوم.
      </footer>
    </div>
  );
}

function readSelection(): { level: Level; minutes: number } {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE.selection) ?? '{}');
    return { level: parsed.level === 'intermediate' ? 'intermediate' : 'beginner', minutes: [8, 12, 16].includes(parsed.minutes) ? parsed.minutes : 8 };
  } catch { return { level: 'beginner', minutes: 8 }; }
}
function storeSelection(level: Level, minutes: number) {
  try { localStorage.setItem(STORAGE.selection, JSON.stringify({ level, minutes })); } catch { /* selection remains in current view */ }
}
function workoutFor(level: Level, minutes: number) {
  return workouts.find((w) => w.level === level && w.minutes === minutes) ?? workouts.find((w) => w.level === level) ?? workouts[0];
}

function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}

export function HomePage() {
  const initial = readSelection();
  const [level, setLevel] = useState<Level>(initial.level);
  const [minutes, setMinutes] = useState(initial.minutes);
  const [, setLocation] = useLocation();
  const chosen = workoutFor(level, minutes);
  const latest = readHistory()[0];
  const updateLevel = (value: Level) => { setLevel(value); storeSelection(value, minutes); };
  const updateMinutes = (value: number) => { setMinutes(value); storeSelection(level, value); };
  return (
    <div className="page-enter mx-auto max-w-7xl px-5 pb-8 pt-8 md:px-9 md:pt-12">
      <section className="relative overflow-hidden rounded-[2rem] bg-[#174f45] px-6 py-9 text-[#f7f2e7] md:px-12 md:py-14">
        <div className="absolute -left-20 -top-28 h-80 w-80 rounded-full border border-[#d8a06e]/25" />
        <div className="absolute -left-7 -top-16 h-56 w-56 rounded-full border border-[#d8a06e]/25" />
        <div className="relative grid items-center gap-9 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-xl">
            <Pill className="bg-[#d8a06e]/20 text-[#f2c89f]"><Sparkles size={13} className="ml-1.5" />خطوة صغيرة تكفي</Pill>
            <h1 className="mt-6 text-4xl font-bold leading-[1.32] tracking-tight md:text-6xl">بيتك مكان<br /><span className="text-[#e7ba82]">حركتك الجديدة.</span></h1>
            <p className="mt-5 max-w-md text-base leading-8 text-[#d4e3d8] md:text-lg">تمارين بوزن الجسم، بلا تجهيزات وبلا ضغط. اختر وقتك، ونحن نرتّب لك جلسة مناسبة.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#c0d5c8]">
              <span className="flex items-center gap-2"><Clock3 size={15} /> من ٨ إلى ١٦ دقيقة</span>
              <span className="h-1 w-1 rounded-full bg-[#e7ba82]" />
              <span>تتحرك في مساحتك</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-8 rounded-[48%] bg-[#e2b17d]/15 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/15 bg-[#f4eddc] p-5 text-[#174f45] shadow-[0_28px_55px_rgba(5,32,27,.25)] md:p-7">
              <div className="flex items-start justify-between">
                <div><p className="text-xs font-semibold text-[#58756b]">جلسة اليوم</p><h2 className="mt-2 text-2xl font-bold">{chosen.title}</h2></div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e8d1ad]"><Dumbbell size={21} /></span>
              </div>
              <p className="mt-2 text-sm text-[#58756b]">{chosen.subtitle}</p>
              <div className="mt-6 flex items-center gap-3 border-y border-[#174f45]/10 py-4">
                <span className="text-3xl font-bold tracking-tight">{chosen.minutes}</span><span className="text-sm text-[#58756b]">دقائق لك<br />ولحركتك</span>
                <span className="mr-auto rounded-full bg-[#174f45]/10 px-3 py-1.5 text-xs font-bold">{chosen.exercises.length} حركات</span>
              </div>
              <button onClick={() => setLocation(`/session/${chosen.id}`)} data-testid="button-start-recommendation" className="focus-ring mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#e88361] px-5 py-4 font-bold text-[#34231b] transition hover:bg-[#f09775] active:scale-[.99]">
                ابدأ الجلسة <ArrowLeft size={18} />
              </button>
              <p className="mt-3 text-center text-[11px] text-[#688077]">تقدر توقف أو تعدّل الإيقاع في أي وقت</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-[1.7rem] border border-border bg-card p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <div><p className="text-xs font-semibold tracking-wide text-primary">على مقاس يومك</p><h2 className="mt-1 text-2xl font-bold">خلّنا نختار البداية</h2></div>
            <span className="text-sm font-semibold text-muted-foreground">١ / ٢</span>
          </div>
          <div className="mt-7">
            <p className="mb-3 text-sm font-bold">مستواك اليوم</p>
            <div className="grid grid-cols-2 gap-3">
              {([{ value: 'beginner', title: 'بدايتي', detail: 'حركة سهلة ووقت للراحة' }, { value: 'intermediate', title: 'أتحرك من قبل', detail: 'إيقاع أكثر نشاطًا' }] as const).map((item) => (
                <button key={item.value} onClick={() => updateLevel(item.value)} aria-pressed={level === item.value} data-testid={`button-level-${item.value}`} className={`focus-ring rounded-2xl border p-4 text-right transition ${level === item.value ? 'border-primary bg-primary/8 shadow-[inset_0_0_0_1px_hsl(var(--primary))]' : 'border-border bg-background hover:border-primary/40'}`}>
                  <span className="flex items-center justify-between font-bold">{item.title}{level === item.value && <Check size={16} className="text-primary" />}</span>
                  <span className="mt-1.5 block text-xs leading-5 text-muted-foreground">{item.detail}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-3 text-sm font-bold">كم عندك من الوقت؟</p>
            <div className="flex flex-wrap gap-2">
              {[8, 12, 16].map((value) => <button key={value} onClick={() => updateMinutes(value)} aria-pressed={minutes === value} data-testid={`button-duration-${value}`} className={`focus-ring rounded-full border px-5 py-2.5 text-sm font-bold transition ${minutes === value ? 'border-[#174f45] bg-[#174f45] text-[#f7f2e7]' : 'border-border bg-background hover:border-primary'}`}>{value} دقائق</button>)}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-[1.7rem] bg-[#e9c995] p-6 text-[#2a3b31] md:p-8">
          <div>
            <p className="text-xs font-bold tracking-wide text-[#716044]">إيقاع أهدأ، أثر أجمل</p>
            <h2 className="mt-3 max-w-sm text-3xl font-bold leading-snug">ما تحتاج مساحة كبيرة. بس مساحة لنفسك.</h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[#5b5c48]">كل حركة معها شرح واضح وخيار أبسط. خذ استراحة متى ما احتجت، وخلي راحتك هي المقياس.</p>
          </div>
          <Link href="/workouts" data-testid="link-home-workouts" className="focus-ring mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#2a3b31] px-5 py-3 text-sm font-bold text-[#f7f2e7] transition hover:bg-[#385346]">استكشف كل الجلسات <ArrowLeft size={16} /></Link>
        </div>
      </section>
      <section className="mt-8 flex flex-col gap-4 rounded-[1.5rem] border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
        <div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f0d9cf] text-[#a34e38]"><BarChart3 size={21} /></span><div><p className="font-bold">كل حركة لها مكانها</p><p className="mt-1 text-sm text-muted-foreground">{latest ? `آخر جلسة: ${latest.workoutTitle}` : 'جلساتك المكتملة تظهر هنا، لتشوف تقدمك بطريقتك.'}</p></div></div>
        <Link href="/history" data-testid="link-home-history" className="focus-ring inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-primary hover:bg-primary/8">شوف سجلك <ChevronLeft size={17} /></Link>
      </section>
    </div>
  );
}

export function WorkoutsPage() {
  const [level, setLevel] = useState<'all' | Level>('all');
  const visible = workouts.filter((w) => level === 'all' || w.level === level);
  return (
    <div className="page-enter mx-auto max-w-7xl px-5 py-9 md:px-9 md:py-12">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><Pill className="bg-[#e7c994]/50 text-[#715b34]">مكتبة الحركة</Pill><h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">جلسات تناسبك</h1><p className="mt-3 text-muted-foreground">اختَر جلسة، وابدأ من المكان الذي أنت فيه.</p></div>
        <div className="flex gap-2" role="group" aria-label="تصفية حسب المستوى">
          {([{ value: 'all', label: 'الكل' }, { value: 'beginner', label: 'بدايتي' }, { value: 'intermediate', label: 'أتحرك من قبل' }] as const).map((option) => <button key={option.value} onClick={() => setLevel(option.value)} aria-pressed={level === option.value} data-testid={`filter-workouts-${option.value}`} className={`focus-ring rounded-full border px-4 py-2.5 text-xs font-bold transition ${level === option.value ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-primary'}`}>{option.label}</button>)}
        </div>
      </div>
      <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((workout, index) => <WorkoutCard key={workout.id} workout={workout} index={index} />)}
      </div>
      <div className="mt-8 rounded-2xl border border-dashed border-primary/35 bg-primary/5 p-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">تذكير لطيف:</strong> حرّك جسمك ضمن مدى مريح، واختر النسخة الأسهل متى رغبت. هذه الجلسات عامة وليست بديلًا عن توجيه مختص.</div>
    </div>
  );
}

function WorkoutCard({ workout, index }: { workout: Workout; index: number }) {
  const theme = workout.accent === 'coral' ? 'bg-[#f0d8ce] text-[#843f2c]' : workout.accent === 'gold' ? 'bg-[#f0dfb5] text-[#6d5828]' : 'bg-[#d5e4d8] text-[#315747]';
  return (
    <article data-testid={`card-workout-${workout.id}`} className="lift overflow-hidden rounded-[1.7rem] border border-border bg-card">
      <div className={`relative flex h-36 items-end justify-between overflow-hidden p-5 ${theme}`}>
        <div className="absolute -left-7 -top-16 h-48 w-48 rounded-full border border-current/15" />
        <div className="absolute -left-1 -top-9 h-32 w-32 rounded-full border border-current/15" />
        <span className="relative text-[11px] font-bold uppercase tracking-[.12em]">{workout.label}</span>
        <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-current/15 bg-white/25"><Dumbbell size={22} strokeWidth={1.6} /></span>
        <span className="absolute left-5 top-5 font-mono text-5xl font-extrabold opacity-[.17]">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-5 md:p-6">
        <h2 className="text-2xl font-bold">{workout.title}</h2><p className="mt-1 text-sm text-muted-foreground">{workout.subtitle}</p>
        <div className="mt-5 flex flex-wrap gap-2"><Pill className="bg-muted text-muted-foreground"><Clock3 size={13} className="ml-1.5" />{workout.minutes} دقائق</Pill><Pill className="bg-muted text-muted-foreground">{workout.exercises.length} حركات</Pill><Pill className="bg-muted text-muted-foreground">{workout.level === 'beginner' ? 'مبتدئ' : 'متوسط'}</Pill></div>
        <div className="mt-5 border-t border-border pt-4"><p className="text-xs font-bold text-muted-foreground">في هذه الجلسة</p><p className="mt-2 text-sm leading-6">{workout.exercises.slice(0, 3).map((e) => e.name).join(' · ')}{workout.exercises.length > 3 ? ' وغيرها' : ''}</p></div>
        <Link href={`/session/${workout.id}`} data-testid={`link-start-workout-${workout.id}`} className="focus-ring mt-5 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground transition hover:brightness-110">ابدأ الجلسة <ArrowLeft size={16} /></Link>
      </div>
    </article>
  );
}

type Phase = 'exercise' | 'rest';
export function SessionPage() {
  const params = useParams<{ workoutId: string }>();
  const [, setLocation] = useLocation();
  const workout = workouts.find((item) => item.id === params.workoutId);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('exercise');
  const [remaining, setRemaining] = useState(workout?.exercises[0]?.duration ?? 0);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const current = workout?.exercises[index];
  const totalItems = workout ? workout.exercises.length * 2 - 1 : 0;
  const itemProgress = workout ? (index * 2 + (phase === 'rest' ? 1 : 0)) / Math.max(1, totalItems) : 0;
  useEffect(() => {
    if (!running || completed || !workout) return;
    const timer = window.setInterval(() => {
      setElapsed((v) => v + 1);
      if (remaining > 1) { setRemaining(remaining - 1); return; }
      if (phase === 'exercise' && current?.restAfter) {
        setDoneCount((count) => count + 1);
        setPhase('rest');
        setRemaining(current.restAfter);
        return;
      }
      if (phase === 'rest' || index === workout.exercises.length - 1) {
        if (index === workout.exercises.length - 1) {
          setDoneCount((count) => Math.max(count, workout.exercises.length));
          setRunning(false);
          setCompleted(true);
          setRemaining(0);
          return;
        }
        setIndex(index + 1);
        setPhase('exercise');
        setRemaining(workout.exercises[index + 1].duration);
        return;
      }
      if (current?.restAfter) {
        setPhase('rest');
        setRemaining(current.restAfter);
      } else {
        setDoneCount((count) => count + 1);
        setIndex(index + 1);
        setPhase('exercise');
        setRemaining(workout.exercises[index + 1].duration);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, completed, workout, phase, current, index, remaining]);

  const finish = () => {
    if (!workout || completed) return;
    const record: SavedSession = { id: `${Date.now()}-${workout.id}`, workoutId: workout.id, workoutTitle: workout.title, completedAt: new Date().toISOString(), durationSeconds: Math.max(elapsed, 1), exerciseCount: Math.max(doneCount, index + (phase === 'rest' ? 1 : 0)) };
    saveSession(record);
    setRunning(false); setCompleted(true);
  };
  const next = () => {
    if (!workout) return;
    if (phase === 'exercise') setDoneCount((count) => count + 1);
    if (phase === 'rest') {
      if (index >= workout.exercises.length - 1) { finish(); return; }
      setIndex((i) => i + 1); setPhase('exercise'); setRemaining(workout.exercises[index + 1].duration); return;
    }
    if (current?.restAfter) { setPhase('rest'); setRemaining(current.restAfter); return; }
    if (index >= workout.exercises.length - 1) { finish(); return; }
    setIndex((i) => i + 1); setRemaining(workout.exercises[index + 1].duration);
  };
  const leave = () => {
    if (elapsed > 0 && !completed && !window.confirm('تريد الخروج من الجلسة؟ لن تُضاف إلى سجلك إلا بعد إكمالها.')) return;
    setRunning(false); setLocation('/workouts');
  };
  if (!workout) return <div className="mx-auto max-w-3xl px-5 py-20 text-center"><h1 className="text-3xl font-bold">ما لقينا هالجلسة</h1><p className="mt-3 text-muted-foreground">اختر جلسة من المكتبة وابدأ من جديد.</p><Link href="/workouts" data-testid="link-session-invalid-workouts" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">استكشف الجلسات</Link></div>;
  if (completed) return <div className="page-enter mx-auto max-w-3xl px-5 py-12 md:py-20"><div className="rounded-[2rem] bg-primary px-7 py-10 text-center text-primary-foreground md:px-14 md:py-14"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e8c994] text-[#24483b]"><Check size={30} /></span><p className="mt-6 text-sm font-semibold text-primary-foreground/75">جلسة مكتملة</p><h1 className="mt-2 text-4xl font-bold">أحسنت. وصلت لهنا.</h1><p className="mx-auto mt-4 max-w-md leading-7 text-primary-foreground/80">كل حركة أخذت لها وقتها. خذ لحظة لنفسك، وسجّلت جلستك في سجلّك.</p><div className="mx-auto mt-8 flex max-w-sm justify-center gap-8 border-y border-primary-foreground/20 py-5"><div><b className="block text-2xl">{formatTime(elapsed)}</b><span className="text-xs text-primary-foreground/70">وقت الحركة</span></div><div><b className="block text-2xl">{doneCount || workout.exercises.length}</b><span className="text-xs text-primary-foreground/70">حركات مكتملة</span></div></div><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/history" data-testid="link-session-history" className="focus-ring rounded-xl bg-[#e8c994] px-5 py-3.5 font-bold text-[#24483b]">شوف سجلّك</Link><Link href="/" data-testid="link-session-home" className="focus-ring rounded-xl border border-primary-foreground/25 px-5 py-3.5 font-bold">ارجع للرئيسية</Link></div></div></div>;
  return (
    <div className="page-enter mx-auto max-w-5xl px-5 py-7 md:px-9 md:py-10">
      <div className="flex items-center justify-between"><button onClick={leave} data-testid="button-exit-session" className="focus-ring flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-muted"><X size={17} /> خروج آمن</button><Pill className="bg-primary/10 text-primary">{workout.title}</Pill></div>
      <div className="mt-6 flex items-center justify-between text-xs font-semibold text-muted-foreground"><span data-testid="text-session-progress">الحركة {index + 1} من {workout.exercises.length}</span><span data-testid="text-session-time">الوقت الكلي {formatTime(elapsed)}</span></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div data-testid="progress-session" className="h-full rounded-full bg-secondary transition-all duration-500" style={{ width: `${Math.max(itemProgress * 100, index === 0 && phase === 'exercise' ? 4 : 0)}%` }} /></div>
      <div className="mt-7 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
        <section className="relative flex min-h-[430px] flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-[#174f45] px-6 py-10 text-center text-[#f7f2e7]">
          <div className="absolute -left-16 -top-24 h-72 w-72 rounded-full border border-white/10" /><div className="absolute -left-2 -top-10 h-48 w-48 rounded-full border border-white/10" />
          <Pill className={phase === 'rest' ? 'bg-[#e7c994] text-[#2e4437]' : 'bg-white/10 text-[#cddfd2]'}>{phase === 'rest' ? 'استراحة قصيرة' : current?.focus}</Pill>
          <h1 data-testid="text-current-exercise" className="relative mt-6 text-3xl font-bold md:text-4xl">{phase === 'rest' ? 'خذ نفسًا وارتَح' : current?.name}</h1>
          <p data-testid="text-exercise-instruction" className="relative mt-3 max-w-md text-sm leading-7 text-[#d4e3d8]">{phase === 'rest' ? 'اشرب ماء إذا رغبت، واستعد للحركة التالية على راحتك.' : current?.cue}</p>
          {phase === 'exercise' && current?.easier && <p className="relative mt-3 max-w-sm rounded-xl bg-white/8 px-4 py-2 text-xs leading-6 text-[#cddfd2]">نسخة أبسط: {current.easier}</p>}
          <div className="relative mt-8 grid h-40 w-40 place-items-center rounded-full border border-white/15 bg-white/5">
            <svg className="timer-ring absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="2" /><circle cx="50" cy="50" r="45" fill="none" stroke="#e9bd83" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={`${(Math.max(0, remaining) / Math.max(1, phase === 'rest' ? current?.restAfter ?? 15 : current?.duration ?? 1)) * 283} 283`} /></svg>
            <div><span data-testid="text-remaining-time" className="block font-mono text-4xl font-bold tracking-tight" dir="ltr">{formatTime(remaining)}</span><span className="mt-1 block text-xs text-[#cddfd2]">{phase === 'rest' ? 'استراحة' : current?.reps ? `${current.reps} تكرارات تقريبًا` : 'حركة بالوقت'}</span></div>
          </div>
          <p className="relative mt-5 text-xs text-[#b8d0c2]">{running ? 'خذ الحركة بإيقاعك' : 'اضغط ابدأ عندما تكون جاهزًا'}</p>
        </section>
        <aside className="rounded-[2rem] border border-border bg-card p-5 md:p-6">
          <div className="flex items-center justify-between"><div><p className="text-xs font-semibold text-muted-foreground">خريطة الجلسة</p><h2 className="mt-1 text-xl font-bold">{workout.exercises.length} حركات بسيطة</h2></div><span className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold">{workout.minutes} د</span></div>
          <ol className="mt-5 space-y-2">
            {workout.exercises.map((exercise, i) => <li key={exercise.id} data-testid={`step-exercise-${exercise.id}`} className={`flex items-center gap-3 rounded-xl p-3 text-sm ${index === i ? 'bg-primary/8 text-primary' : i < index ? 'text-muted-foreground' : ''}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${i < index ? 'bg-primary text-primary-foreground' : i === index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{i < index ? <Check size={14} /> : String(i + 1).padStart(2, '0')}</span><span className="min-w-0 flex-1"><b className="block truncate">{exercise.name}</b><span className="mt-0.5 block text-[11px] text-muted-foreground">{exercise.focus} · {exercise.duration} ثانية</span></span></li>)}
          </ol>
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
            <button onClick={() => setRunning((value) => !value)} data-testid={running ? 'button-pause-session' : 'button-start-session'} className="focus-ring flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3.5 font-bold text-[#34231b] transition hover:brightness-105 active:scale-[.98]">{running ? <><Pause size={17} /> إيقاف مؤقت</> : <><Play size={17} /> {elapsed ? 'كمّل الجلسة' : 'ابدأ الحركة'}</>}</button>
            <button onClick={next} data-testid="button-skip-exercise" aria-label="تجاوز إلى الخطوة التالية" className="focus-ring grid w-12 place-items-center rounded-xl border border-border bg-background text-primary hover:bg-primary/8"><SkipForward size={18} /></button>
          </div>
          <button onClick={finish} data-testid="button-finish-session" className="focus-ring mt-2 w-full rounded-xl px-3 py-2.5 text-xs font-bold text-muted-foreground hover:bg-muted">إنهاء الجلسة وحفظها</button>
        </aside>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground"><RotateCcw size={14} /> تقدر تتوقف أو تخرج في أي وقت</div>
    </div>
  );
}

export function HistoryPage() {
  const [sessions, setSessions] = useState<SavedSession[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);
  useEffect(() => { setSessions(readHistory()); }, []);
  const stats = useMemo(() => ({
    count: sessions.length,
    minutes: Math.round(sessions.reduce((sum, item) => sum + item.durationSeconds, 0) / 60),
    exercises: sessions.reduce((sum, item) => sum + item.exerciseCount, 0),
  }), [sessions]);
  const clear = () => { try { localStorage.setItem(STORAGE.history, '[]'); } catch { /* state still clears for this view */ } setSessions([]); setConfirmClear(false); };
  const prettyDate = (value: string) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'تاريخ غير محدد' : new Intl.DateTimeFormat('ar', { weekday: 'long', day: 'numeric', month: 'long' }).format(date);
  };
  return (
    <div className="page-enter mx-auto max-w-6xl px-5 py-9 md:px-9 md:py-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><Pill className="bg-[#d5e4d8] text-[#315747]">خطواتك محفوظة هنا</Pill><h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">سجلّ الحركة</h1><p className="mt-3 text-muted-foreground">ملخص واقعي لجلساتك المكتملة، من جهازك فقط.</p></div>{sessions.length > 0 && <button onClick={() => setConfirmClear(true)} data-testid="button-clear-history" className="focus-ring w-fit rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:border-destructive/40 hover:text-destructive">مسح السجل</button>}</div>
      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        {[{ label: 'جلسات مكتملة', value: stats.count, suffix: 'جلسة', tone: 'bg-[#d5e4d8] text-[#315747]' }, { label: 'وقت الحركة', value: stats.minutes, suffix: 'دقيقة', tone: 'bg-[#f0d8ce] text-[#843f2c]' }, { label: 'حركات أنجزتها', value: stats.exercises, suffix: 'حركة', tone: 'bg-[#f0dfb5] text-[#6d5828]' }].map((stat) => <div key={stat.label} data-testid={`stat-${stat.label}`} className={`rounded-2xl p-5 ${stat.tone}`}><span className="text-xs font-bold">{stat.label}</span><div className="mt-2 flex items-baseline gap-2"><b className="font-mono text-4xl">{stat.value}</b><span className="text-xs font-semibold">{stat.suffix}</span></div></div>)}
      </section>
      {sessions.length === 0 ? <div className="mt-7 rounded-[2rem] border border-dashed border-border bg-card px-6 py-14 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-muted text-primary"><History size={24} /></span><h2 data-testid="text-history-empty" className="mt-5 text-2xl font-bold">سجلك يبدأ بحركة</h2><p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">ما فيه جلسات مكتملة للحين. اختر جلسة قصيرة، وبعدها تلقاها هنا مع ملخص وقتك.</p><Link href="/workouts" data-testid="link-history-empty-workouts" className="focus-ring mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">اختر جلسة <ArrowLeft size={16} /></Link></div> :
        <div className="mt-7 space-y-3">{sessions.map((item) => <article key={item.id} data-testid={`row-session-${item.id}`} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"><Check size={21} /></span><div><h2 data-testid={`text-history-workout-${item.id}`} className="font-bold">{item.workoutTitle}</h2><p className="mt-1 text-xs text-muted-foreground">{prettyDate(item.completedAt)}</p></div></div><div className="flex items-center gap-6 border-t border-border pt-3 text-xs sm:border-0 sm:pt-0"><span><b className="block text-base" dir="ltr">{formatTime(item.durationSeconds)}</b><span className="text-muted-foreground">وقت الجلسة</span></span><span><b className="block text-base">{item.exerciseCount}</b><span className="text-muted-foreground">حركات</span></span><Link href={`/session/${item.workoutId}`} data-testid={`link-repeat-${item.id}`} className="focus-ring mr-auto inline-flex items-center gap-1 rounded-xl px-3 py-2 font-bold text-primary hover:bg-primary/8">كرّرها <ArrowUpLeft size={15} /></Link></div></article>)}</div>}
      {confirmClear && <div role="dialog" aria-modal="true" aria-labelledby="clear-title" className="fixed inset-0 z-50 grid place-items-center bg-[#172b24]/55 p-5"><div className="w-full max-w-sm rounded-3xl bg-card p-6 shadow-2xl"><h2 id="clear-title" className="text-xl font-bold">تمسح كل الجلسات؟</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">ما نقدر نرجّعها بعد المسح.</p><div className="mt-6 flex gap-2"><button autoFocus onClick={clear} data-testid="button-confirm-clear-history" className="focus-ring flex-1 rounded-xl bg-destructive px-4 py-3 font-bold text-destructive-foreground">امسح السجل</button><button onClick={() => setConfirmClear(false)} data-testid="button-cancel-clear-history" className="focus-ring flex-1 rounded-xl border border-border px-4 py-3 font-bold">خلّه</button></div></div></div>}
    </div>
  );
}
