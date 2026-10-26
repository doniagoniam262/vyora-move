import { useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { ArrowRight, Layers, Search, ShieldAlert, Timer, SearchX, Play, Lightbulb, Film } from 'lucide-react';
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
  const reset = () => { setQ(''); setCat('all'); setLvl('all'); };
  return (
    <div className="page-enter space-y-5">
      <h1 className="text-3xl font-extrabold">المكتبة</h1>
      <label className="card-dark flex items-center gap-3 px-4 py-3 focus-within:border-primary">
        <Search size={18} className="text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} data-testid="input-search-exercises" aria-label="ابحث عن تمرين" placeholder="ابحث عن تمرين..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </label>
      <div className="hide-scroll -mx-5 flex gap-2 overflow-x-auto px-5" role="group" aria-label="التصنيف">
        <Chip testId="filter-category-all" active={cat === 'all'} onClick={() => setCat('all')}>الكل</Chip>
        {CATEGORIES.map((c) => <Chip key={c.id} testId={`filter-category-${c.id}`} active={cat === c.id} onClick={() => setCat(c.id)}>{c.label}</Chip>)}
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="المستوى">
        <Chip testId="filter-level-all" active={lvl === 'all'} onClick={() => setLvl('all')}>كل المستويات</Chip>
        {LEVELS.map((l) => <Chip key={l.id} testId={`filter-level-${l.id}`} active={lvl === l.id} onClick={() => setLvl(l.id)}>{l.label}</Chip>)}
      </div>
      <p className="text-xs text-muted-foreground" data-testid="text-exercise-count" aria-live="polite">{list.length} تمرين</p>
      {list.length === 0 ? (
        <EmptyState testId="empty-exercises" icon={<SearchX size={26} />} title="لا نتائج مطابقة" body="جرّب كلمة أخرى أو خفّف الفلاتر لتظهر لك تمارين أكثر.">
          <button onClick={reset} data-testid="button-reset-filters" className="btn-lime focus-ring press rounded-xl px-6 py-2.5 text-sm">إعادة ضبط الفلاتر</button>
        </EmptyState>
      ) : <div className="grid gap-3 md:grid-cols-2">{list.map((e) => <ExerciseRow key={e.id} ex={e} />)}</div>}
    </div>
  );
}

export function ExerciseDetailPage() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [, nav] = useLocation();
  const ex = exerciseById(exerciseId ?? '');
  if (!ex) return <EmptyState testId="error-exercise-missing" icon={<SearchX size={26} />} title="لم نجد هذا التمرين" body="الرابط قد يكون قديمًا. تصفّح المكتبة واختر تمرينًا آخر."><Link href="/exercises" data-testid="link-back-exercises" className="btn-lime focus-ring rounded-xl px-6 py-2.5 text-sm">إلى المكتبة</Link></EmptyState>;
  return (
    <div className="page-enter mx-auto max-w-3xl space-y-6">
      <div className="relative">
        <SmartImg src={ex.image} alt={ex.name} testId="img-exercise-detail" className="aspect-[4/3] w-full rounded-3xl md:aspect-[16/9]" />
        <button onClick={() => (window.history.length > 1 ? window.history.back() : nav('/exercises'))} data-testid="button-back" aria-label="رجوع" className="focus-ring press absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/60 backdrop-blur"><ArrowRight size={18} /></button>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div><h1 className="text-3xl font-extrabold" data-testid="text-exercise-name">{ex.name}</h1><p className="latin text-sm text-muted-foreground" dir="ltr">({ex.latin})</p></div>
        <div className="flex flex-col items-end gap-1.5"><Tag>{categoryLabel(ex.category)}</Tag><Tag tone="dim">{levelLabel(ex.level)}</Tag></div>
      </div>
      <section className="card-dark p-5"><h2 className="font-extrabold">طريقة الأداء</h2>
        <ol className="mt-3 space-y-3">{ex.instructions.map((s, i) => <li key={i} data-testid={`text-step-${i + 1}`} className="flex gap-3 text-sm leading-7"><span className="num mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>{s}</li>)}</ol>
      </section>
      <div className="grid grid-cols-2 gap-3">
        <div className="card-dark flex items-center gap-3 p-4"><Timer className="text-primary" /><div><span className="text-xs text-muted-foreground">المدة</span><b data-testid="text-duration" className="block">{ex.duration} ثانية</b></div></div>
        <div className="card-dark flex items-center gap-3 p-4"><Layers className="text-primary" /><div><span className="text-xs text-muted-foreground">التكرارات</span><b data-testid="text-reps" className="num block">{ex.reps ? `${ex.sets} x ${ex.reps}` : `${ex.sets} x ${ex.duration}s`}</b></div></div>
      </div>
      <div className="card-dark flex gap-3 border-primary/20 p-4 text-sm leading-7"><ShieldAlert className="mt-1 shrink-0 text-primary" size={18} /><div><b>ملاحظة أمان</b><p data-testid="text-safety" className="text-muted-foreground">{ex.safety}</p></div></div>
      <div className="card-dark flex gap-3 p-4 text-sm leading-7"><Lightbulb className="mt-1 shrink-0 text-primary" size={18} /><div><b>نسخة أسهل</b><p data-testid="text-easier" className="text-muted-foreground">{ex.easier}</p></div></div>
      <Link href="/videos" data-testid="link-exercise-videos" className="card-dark focus-ring lift flex items-center gap-3 p-4">
        <Film className="shrink-0 text-primary" size={20} />
        <span className="flex-1"><b className="block text-sm">شاهدِي تطبيق التمارين بالفيديو</b><span className="text-xs text-muted-foreground">فيديوهات مع مدربات ومدربين تناسب الجميع</span></span>
        <ArrowRight size={16} className="text-muted-foreground" />
      </Link>
      <Link href={`/session/${ex.id}`} data-testid="button-start-exercise" className="btn-lime focus-ring press flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg"><Play size={18} fill="currentColor" />ابدأ التمرين</Link>
    </div>
  );
}
