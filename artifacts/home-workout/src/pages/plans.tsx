import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { CalendarX, Check, Play } from 'lucide-react';
import { estimateSeconds, formatTime, levelLabel, planById, planExercises, plans } from '@/lib/data';
import { useSettings } from '@/lib/store';
import { Chip, EmptyState, SmartImg, Tag } from '@/components/vyora';
import { PlanCard } from '@/components/cards';

export function PlansPage() {
  const [f, setF] = useState<'all' | 'short' | 'long'>('all');
  const list = plans.filter((p) => f === 'all' || (f === 'short' ? p.minutes <= 15 : p.minutes > 15));
  return (
    <div className="page-enter space-y-5">
      <h1 className="text-3xl font-extrabold">خطط التدريب</h1>
      <div className="flex gap-2">
        <Chip testId="filter-plans-all" active={f === 'all'} onClick={() => setF('all')}>الكل</Chip>
        <Chip testId="filter-plans-short" active={f === 'short'} onClick={() => setF('short')}>حتى 15 دقيقة</Chip>
        <Chip testId="filter-plans-long" active={f === 'long'} onClick={() => setF('long')}>أطول</Chip>
      </div>
      {list.length === 0 ? <EmptyState testId="empty-plans" icon={<CalendarX size={26} />} title="لا خطط بهذا الفلتر" body="اعرض كل الخطط للاختيار."><button onClick={() => setF('all')} data-testid="button-plans-reset" className="btn-lime rounded-xl px-6 py-2.5 text-sm">عرض الكل</button></EmptyState>
        : <div className="grid gap-4 md:grid-cols-2">{list.map((p) => <PlanCard key={p.id} plan={p} />)}</div>}
      <p className="text-xs leading-6 text-muted-foreground">الخطط عامة للتمرين المنزلي ولا تغني عن استشارة مختص إذا كانت لديك حالة صحية.</p>
    </div>
  );
}

export function PlanDetailPage() {
  const { planId } = useParams<{ planId: string }>();
  const [settings] = useSettings();
  const plan = planById(planId ?? '');
  if (!plan) return <EmptyState testId="error-plan-missing" icon={<CalendarX size={26} />} title="الخطة غير موجودة" body="اختر خطة من القائمة."><Link href="/plans" data-testid="link-back-plans" className="btn-lime rounded-xl px-6 py-2.5 text-sm">كل الخطط</Link></EmptyState>;
  const list = planExercises(plan);
  return (
    <div className="page-enter mx-auto max-w-3xl space-y-6">
      <div className="relative overflow-hidden rounded-3xl">
        <SmartImg src={plan.image} alt={plan.name} className="aspect-[16/10] w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5"><h1 data-testid="text-plan-name" className="text-3xl font-extrabold">{plan.name}</h1><div className="mt-2 flex gap-2"><Tag>{levelLabel(plan.level)}</Tag><Tag tone="dim">{plan.frequency}</Tag></div></div>
      </div>
      <p className="text-sm leading-7 text-muted-foreground">{plan.description}</p>
      <div className="grid grid-cols-3 gap-3 text-center">
        {[['الدقائق', plan.minutes], ['التمارين', list.length], ['الوقت الدقيق', formatTime(estimateSeconds(list, settings.restSeconds))]].map(([l, v]) => <div key={l} className="card-dark p-3"><b className="num block text-xl text-primary">{v}</b><span className="text-[11px] text-muted-foreground">{l}</span></div>)}
      </div>
      <section><h2 className="mb-3 font-extrabold">تمارين الخطة</h2>
        <ol className="space-y-2">{list.map((e, i) => <li key={e.id}><Link href={`/exercises/${e.id}`} data-testid={`link-plan-exercise-${e.id}`} className="card-dark focus-ring lift flex items-center gap-3 p-2.5"><SmartImg src={e.image} alt={e.name} className="h-14 w-14 shrink-0 rounded-xl" /><span className="num w-5 text-xs text-muted-foreground">{i + 1}</span><span className="flex-1"><b className="block text-sm">{e.name}</b><span className="text-[11px] text-muted-foreground">{e.sets} جولات · {e.duration} ثانية</span></span></Link></li>)}</ol>
      </section>
      <section className="card-dark p-5"><h2 className="font-extrabold">قبل أن تبدأ</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{['مساحة صغيرة وأرضية ثابتة', `راحة ${settings.restSeconds} ثانية بين الجولات (يمكن تغييرها من الإعدادات)`, 'ماء قريب وحذاء مريح', 'توقف فورًا عند أي ألم حاد'].map((t) => <li key={t} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-primary" />{t}</li>)}</ul>
      </section>
      <Link href={`/session/${plan.id}`} data-testid="button-start-plan" className="btn-lime focus-ring press flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg"><Play size={18} fill="currentColor" />ابدأ الخطة</Link>
    </div>
  );
}
