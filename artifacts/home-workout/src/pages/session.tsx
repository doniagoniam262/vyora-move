import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { ArrowLeft, Check, Pause, Play, RotateCcw, Square, X, SearchX } from 'lucide-react';
import { buildSteps, exerciseById, formatTime, planById, planExercises, type Exercise, type Step } from '@/lib/data';
import { newSessionId, saveSession, useSettings } from '@/lib/store';
import { EmptyState, Modal, SmartImg } from '@/components/vyora';
import { useLocale } from '@/lib/locale';
import { localizeExercise, localizePlan } from '@/lib/localized-data';

type S = { idx: number; phase: 'work' | 'rest'; remaining: number; running: boolean; elapsed: number; completed: string[]; done: boolean };
type A = { t: 'tick' } | { t: 'toggle' } | { t: 'restart' } | { t: 'next' } | { t: 'finish' };

function makeReducer(steps: Step[], rest: number) {
  const advance = (s: S, counted: boolean): S => {
    if (s.done) return s;
    if (s.phase === 'work') {
      const st = steps[s.idx];
      let completed = s.completed;
      if (counted && st.set === st.sets && !completed.includes(st.ex.id)) completed = [...completed, st.ex.id];
      if (s.idx >= steps.length - 1) return { ...s, completed, done: true, running: false, remaining: 0 };
      if (rest > 0) return { ...s, completed, phase: 'rest', remaining: rest };
      return { ...s, completed, idx: s.idx + 1, remaining: steps[s.idx + 1].ex.duration };
    }
    return { ...s, idx: s.idx + 1, phase: 'work', remaining: steps[s.idx + 1].ex.duration };
  };
  return (s: S, a: A): S => {
    if (s.done) return s;
    switch (a.t) {
      case 'tick': {
        if (!s.running) return s;
        const n = { ...s, elapsed: s.elapsed + 1, remaining: s.remaining - 1 };
        return n.remaining <= 0 ? advance(n, true) : n;
      }
      case 'toggle': return { ...s, running: !s.running };
      case 'restart': return { ...s, remaining: s.phase === 'work' ? steps[s.idx].ex.duration : rest };
      case 'next': return advance(s, false);
      case 'finish': return { ...s, done: true, running: false };
    }
  };
}

export function SessionPage() {
  const { locale, t } = useLocale();
  const { workoutId } = useParams<{ workoutId: string }>();
  const rawPlan = planById(workoutId ?? '');
  const rawSingle = exerciseById(workoutId ?? '');
  const plan = rawPlan ? localizePlan(rawPlan, locale) : undefined;
  const single = rawSingle ? localizeExercise(rawSingle, locale) : undefined;
  if (!plan && !single) return <EmptyState testId="error-session-missing" icon={<SearchX size={26} />} title={t('لم نجد هذه الجلسة')} body={t('الرابط غير صالح. اختر خطة أو تمرينًا للبدء.')}><Link href="/plans" data-testid="link-session-plans" className="btn-lime rounded-xl px-6 py-2.5 text-sm">{t('اختر خطة')}</Link></EmptyState>;
  const list: Exercise[] = plan ? planExercises(plan).map((ex) => localizeExercise(ex, locale)) : [single as Exercise];
  return <Runner key={workoutId} planId={workoutId ?? ''} name={plan?.name ?? (single as Exercise).name} list={list} />;
}

function Runner({ planId, name, list }: { planId: string; name: string; list: Exercise[] }) {
  const { locale, t } = useLocale();
  const [settings] = useSettings();
  const [, nav] = useLocation();
  const steps = useMemo(() => buildSteps(list), [list]);
  const rest = settings.restSeconds;
  const reducer = useMemo(() => makeReducer(steps, rest), [steps, rest]);
  const [s, dispatch] = useReducer(reducer, { idx: 0, phase: 'work', remaining: steps[0].ex.duration, running: false, elapsed: 0, completed: [], done: false } as S);
  const [leave, setLeave] = useState(false);
  const runId = useRef(newSessionId());
  const saved = useRef(false);

  useEffect(() => {
    if (!s.running || s.done) return;
    const id = window.setInterval(() => dispatch({ t: 'tick' }), 1000);
    return () => window.clearInterval(id);
  }, [s.running, s.done]);

  useEffect(() => {
    if (!s.done || saved.current) return;
    saved.current = true;
    if (s.elapsed > 0 || s.completed.length > 0) {
      saveSession({ id: runId.current, planId, planName: name, completedAt: new Date().toISOString(), durationSeconds: Math.max(1, s.elapsed), completedExerciseIds: s.completed, completedCount: s.completed.length });
    }
  }, [s.done, s.elapsed, s.completed, planId, name]);

  const step = steps[Math.min(s.idx, steps.length - 1)];
  const nextStep = steps[s.idx + 1];

  if (s.done) {
    const wrote = s.elapsed > 0 || s.completed.length > 0;
    return (
      <div className="page-enter mx-auto max-w-md py-10 text-center" data-testid="session-complete">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground"><Check size={38} /></span>
        <h1 className="mt-6 text-3xl font-extrabold">{wrote ? t('أحسنت، جلسة مكتملة') : t('انتهت الجلسة')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{wrote ? t('حُفظت جلستك على جهازك.') : t('لم تُسجَّل جلسة لأنها لم تبدأ.')}</p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="card-dark p-4"><b data-testid="text-final-time" className="num block text-2xl text-primary">{formatTime(s.elapsed)}</b><span className="text-xs text-muted-foreground">{t('مدة التمرين')}</span></div>
          <div className="card-dark p-4"><b data-testid="text-final-count" className="num block text-2xl text-primary">{s.completed.length}/{list.length}</b><span className="text-xs text-muted-foreground">{t('تمارين مكتملة')}</span></div>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/progress" data-testid="link-session-progress" className="btn-lime focus-ring rounded-xl py-3.5">{t('عرض تقدمك')}</Link>
          <Link href="/" data-testid="link-session-home" className="focus-ring rounded-xl border border-border py-3.5 font-bold">{t('الرئيسية')}</Link>
        </div>
      </div>
    );
  }

  const total = s.phase === 'work' ? step.ex.duration : rest;
  const arc = (Math.max(0, s.remaining) / Math.max(1, total)) * 283;
  const exit = () => { if (s.elapsed > 0) { if (s.running) dispatch({ t: 'toggle' }); setLeave(true); } else nav('/plans'); };
  return (
    <div className="page-enter mx-auto max-w-md pb-6" data-testid="session-active">
      <div className="flex items-center justify-between">
        <button onClick={exit} data-testid="button-exit-session" aria-label={t('خروج')} className="focus-ring press grid h-10 w-10 place-items-center rounded-full border border-border bg-card"><X size={18} /></button>
        <h1 className="text-base font-bold" data-testid="text-session-title">{name}</h1>
        <span className="num text-xs text-muted-foreground" data-testid="text-session-elapsed">{formatTime(s.elapsed)}</span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted"><div data-testid="progress-session" className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${(s.idx / steps.length) * 100}%` }} /></div>
      <div className="mt-5 flex items-center justify-center gap-3"><SmartImg src={step.ex.image} alt={step.ex.name} className="h-12 w-12 rounded-xl border border-border" /><span className="text-sm font-bold">{step.ex.name}</span></div>
      <div className="relative mx-auto mt-6 grid h-64 w-64 place-items-center">
        <svg className="timer-ring absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="45" fill="none" stroke="hsl(120 3% 15%)" strokeWidth="6" /><circle className="timer-arc" cx="50" cy="50" r="45" fill="none" stroke={s.phase === 'rest' ? '#d8d8d8' : '#A4F477'} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${arc} 283`} /></svg>
        <div className="text-center">
          <span data-testid="text-remaining-time" className="num block text-5xl font-bold" dir="ltr" role="timer">{formatTime(s.remaining)}</span>
          <span data-testid="text-current-exercise" className="mt-1 block text-lg font-bold">{s.phase === 'rest' ? t('استراحة') : step.ex.name}</span>
          <span className="text-[11px] text-muted-foreground">{s.phase === 'rest' && nextStep ? `${t('التالي:')} ${nextStep.ex.name}` : step.ex.reps ? `${step.ex.reps} ${locale === 'ar' ? 'تكرارات تقريبًا' : 'reps approx.'}` : t('تمرين بالوقت')}</span>
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground" data-testid="text-round">{t('الجولة')} {s.phase === 'rest' ? Math.min(steps.length, s.idx + 1) : s.idx + 1} {t('من')} {steps.length} · {step.ex.name} ({step.set}/{step.sets})</p>
      <p className="mx-auto mt-2 max-w-xs text-center text-xs leading-6 text-muted-foreground">{s.phase === 'work' ? step.ex.instructions[0] : t('خذ نفسًا عميقًا واستعد.')}</p>
      <div className="mt-6 flex items-start justify-center gap-6">
        <button onClick={() => dispatch({ t: 'toggle' })} data-testid={s.running ? 'button-pause-session' : 'button-start-session'} className="focus-ring press flex flex-col items-center gap-1.5 text-xs font-bold"><span className={`grid h-16 w-16 place-items-center rounded-full ${s.running ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>{s.running ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}</span>{s.running ? t('إيقاف مؤقت') : s.elapsed > 0 ? t('استئناف') : t('ابدأ')}</button>
        <button onClick={() => dispatch({ t: 'restart' })} data-testid="button-restart-round" className="focus-ring press flex flex-col items-center gap-1.5 text-xs font-bold"><span className="grid h-16 w-16 place-items-center rounded-full bg-muted"><RotateCcw size={22} /></span>{t('إعادة الجولة')}</button>
        <button onClick={() => dispatch({ t: 'finish' })} data-testid="button-finish-session" className="focus-ring press flex flex-col items-center gap-1.5 text-xs font-bold"><span className="grid h-16 w-16 place-items-center rounded-full bg-muted"><Square size={20} fill="currentColor" /></span>{t('إنهاء')}</button>
      </div>
      <button onClick={() => dispatch({ t: 'next' })} data-testid="button-next-session" className="btn-lime focus-ring press mt-8 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg">{t('التالي')} <ArrowLeft className={locale === 'en' ? 'rotate-180' : ''} size={18} /></button>
      <Modal open={leave} title={t('الخروج من الجلسة؟')} body={t('الجلسة متوقفة مؤقتًا. إذا خرجت الآن لن تُحفظ، أو يمكنك إنهاءها وحفظ ما أنجزته.')} confirmLabel={t('خروج بدون حفظ')} onCancel={() => setLeave(false)} onConfirm={() => { setLeave(false); nav('/plans'); }} />
    </div>
  );
}
