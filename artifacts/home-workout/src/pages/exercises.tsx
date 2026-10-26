import { useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { ArrowRight, Layers, Search, ChevronLeft, ShieldAlert, Timer, SearchX, Play, Lightbulb, Film } from 'lucide-react';
import { CATEGORIES, LEVELS, categoryLabel, exerciseById, exercises, levelLabel, type Category, type Level } from '@/lib/data';
import { Chip, EmptyState, SmartImg, Tag } from '@/components/vyora';
import { ExerciseRow } from '@/components/cards';

export function ExercisesPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'all' | Category>('all');
  const [lvl, setLvl] = useState<'all' | Level>('all');
  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return exercises.filter((e) => (cat === 'all' || e.category === cat) && (lvl === 'all' || e.level === lvl) && (!n || e.name.includes(n) || e.latin.toLowerCase().includes(n)));
  }, [q, cat, lvl]);
  const browse = cat === 'all' && lvl === 'all' && !q.trim();
  const reset = () => { setQ(''); setCat('all'); setLvl('all'); };
  return (
    <div className="page-enter space-y-3">
      <h1 className="text-xl font-extrabold">المكتبة</h1>
      <label className="card-dark flex items-center gap-3 px-3.5 py-2.5 focus-within:border-primary">
        <Search size={18} className="text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} data-testid="input-search-exercises" aria-label="ابحث عن تمرين" placeholder="ابحث عن تمرين..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </label>
      <div className="hide-scroll flex max-w-full gap-2 overflow-x-auto" role="group" aria-label="التصنيف">
        <Chip testId="filter-category-all" active={cat === 'all'} onClick={() => setCat('all')}>الكل</Chip>
        {CATEGORIES.map((c) => <Chip key={c.id} testId={`filter-category-${c.id}`} active={cat === c.id} onClick={() => setCat(c.id)}>{c.label}</Chip>)}
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="المستوى">
        <Chip testId="filter-level-all" active={lvl === 'all'} onClick={() => setLvl('all')}>كل المستويات</Chip>
        {LEVELS.map((l) => <Chip key={l.id} testId={`filter-level-${l.id}`} active={lvl === l.id} onClick={() => setLvl(l.id)}>{l.label}</Chip>)}
      </div>
      <p className="text-xs text-muted-foreground" data-testid="text-exercise-count" aria-live="polite">{list.length} تمرين</p>
      {browse && (
        <section aria-label="أقسام التمارين" className="space-y-2">
          {CATEGORIES.map((c) => { const first = exercises.find((x) => x.category === c.id); return (
            <button key={c.id} onClick={() => setCat(c.id)} data-testid={`card-category-${c.id}`} className="card-dark focus-ring lift press flex w-full items-center gap-3 overflow-hidden p-0 text-right">
              {first && <SmartImg src={first.image} alt="" className="h-16 w-24 shrink-0" />}
              <span className="min-w-0 flex-1"><b className="block text-sm">{c.label}</b><span className="text-[11px] text-muted-foreground">{c.blurb}</span></span>
              <ChevronLeft size={16} className="ml-3 shrink-0 text-muted-foreground" />
            </button>); })}
          <h2 className="pt-2 text-sm font-extrabold">كل التمارين</h2>
        </section>
      )}
      {list.length === 0 ? (
        <EmptyState testId="empty-exercises" icon={<SearchX size={26} />} title="لا نتائج مطابقة" body="جرّب كلمة أخرى أو خفّف الفلاتر لتظهر لك تمارين أكثر.">
          <button onClick={reset} data-testid="button-reset-filters" className="btn-lime focus-ring press rounded-xl px-6 py-2.5 text-sm">إعادة ضبط الفلاتر</button>
        </EmptyState>
      ) : <div className="grid gap-2 md:grid-cols-2">{list.map((e) => <ExerciseRow key={e.id} ex={e} />)}</div>}
    </div>
  );
}

export function ExerciseDetailPage() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [, nav] = useLocation();
  const ex = exerciseById(exerciseId ?? '');
  if (!ex) return <EmptyState testId="error-exercise-missing" icon={<SearchX size={26} />} title="لم نجد هذا التمرين" body="الرابط قد يكون قديمًا. تصفّح المكتبة واختر تمرينًا آخر."><Link href="/exercises" data-testid="link-back-exercises" className="btn-lime focus-ring rounded-xl px-6 py-2.5 text-sm">إلى المكتبة</Link></EmptyState>;
  return (
    <div className="page-enter mx-auto max-w-3xl space-y-4">
      <div className="relative">
        <SmartImg src={ex.image} alt={ex.name} testId="img-exercise-detail" className="aspect-[16/10] w-full rounded-2xl md:aspect-[16/8]" />
        <button onClick={() => (window.history.length > 1 ? window.history.back() : nav('/exercises'))} data-testid="button-back" aria-label="رجوع" className="focus-ring press absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/60 backdrop-blur"><ArrowRight size={18} /></button>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div><h1 className="text-2xl font-extrabold" data-testid="text-exercise-name">{ex.name}</h1><p className="latin text-sm text-muted-foreground" dir="ltr">({ex.latin})</p></div>
        <div className="flex flex-col items-end gap-1.5"><Tag>{categoryLabel(ex.category)}</Tag><Tag tone="dim">{levelLabel(ex.level)}</Tag></div>
      </div>
      <section className="card-dark p-4"><h2 className="text-sm font-extrabold">خطوات الأداء الصحيح</h2>
        <ol className="mt-3 space-y-3">{ex.instructions.map((s, i) => <li key={i} data-testid={`text-step-${i + 1}`} className="flex gap-3 text-sm leading-7"><span className="num mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>{s}</li>)}</ol>
      </section>
      <div className="grid grid-cols-3 gap-2">
        <div className="card-dark flex flex-col items-center gap-1 p-3 text-center"><Layers className="text-primary" size={18} /><span className="text-[11px] text-muted-foreground">المجموعات</span><b data-testid="text-sets" className="num block text-sm">{ex.sets} مجموعات</b></div>
        <div className="card-dark flex flex-col items-center gap-1 p-3 text-center"><Timer className="text-primary" size={18} /><div><span className="text-[11px] text-muted-foreground">المدة</span><b data-testid="text-duration" className="block text-sm">{ex.duration} ثانية</b></div></div>
        <div className="card-dark flex flex-col items-center gap-1 p-3 text-center"><Layers className="text-primary" size={18} /><div><span className="text-[11px] text-muted-foreground">التكرارات</span><b data-testid="text-reps" className="num block text-sm">{ex.reps ? `${ex.sets} x ${ex.reps}` : `${ex.sets} x ${ex.duration}s`}</b></div></div>
      </div>
      <div className="card-dark flex gap-3 border-primary/30 bg-primary/5 p-3 text-xs leading-6"><ShieldAlert className="mt-1 shrink-0 text-primary" size={18} /><div><b>ملاحظة أمان</b><p data-testid="text-safety" className="text-muted-foreground">{ex.safety}</p></div></div>
      <div className="card-dark flex gap-3 p-3 text-xs leading-6"><Lightbulb className="mt-1 shrink-0 text-primary" size={18} /><div><b>نسخة أسهل</b><p data-testid="text-easier" className="text-muted-foreground">{ex.easier}</p></div></div>
      <Link href="/videos" data-testid="link-exercise-videos" className="card-dark focus-ring lift flex items-center gap-3 p-4">
        <Film className="shrink-0 text-primary" size={20} />
        <span className="flex-1"><b className="block text-sm">شاهدِي تطبيق التمارين بالفيديو</b><span className="text-xs text-muted-foreground">فيديوهات مع مدربات ومدربين تناسب الجميع</span></span>
        <ArrowRight size={16} className="text-muted-foreground" />
      </Link>
      <Link href={`/session/${ex.id}`} data-testid="button-start-exercise" className="btn-lime focus-ring press flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base"><Play size={18} fill="currentColor" />ابدأ التمرين</Link>
    </div>
  );
}
