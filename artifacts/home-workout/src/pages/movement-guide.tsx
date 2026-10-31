import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Clock3,
  Dumbbell,
  Heart,
  Search,
  Wind,
  X,
} from 'lucide-react';
import { SmartImg } from '@/components/vyora';
import { MuscleMap } from '@/components/muscle-map';
import { ExerciseMotionPlayer } from '@/components/exercise-motion-player';
import { CATEGORIES, exercises, type Category, type Exercise } from '@/lib/data';
import { localizeExercise } from '@/lib/localized-data';
import { useLocale } from '@/lib/locale';
import { getMovementInsight, muscleNames, type MuscleId } from '@/lib/movement-details';
import { useVYORAProfile } from '@/lib/profile-context';
import { exercisesAvailableForGender } from '@/lib/exercise-visibility';
import {
  recordVideoWatch,
  toggleVideoFavorite,
  useVideoFavorites,
  useVideoHistory,
} from '@/lib/store';

const copy = {
  ar: {
    eyebrow: 'VYORA · دليل الحركة',
    title: 'تحرّك بثقة.',
    intro: 'تفاصيل دقيقة لكل حركة: أين تعمل، كيف تؤديها، وما الذي يستحق الانتباه.',
    library: 'مكتبة الحركة',
    search: 'ابحث عن تمرين أو عضلة',
    all: 'كل الحركات',
    targetFilter: 'استهداف العضلة',
    allMuscles: 'كل العضلات',
    favorites: 'المحفوظة',
    recent: 'شوهدت مؤخرًا',
    clear: 'إلغاء الفلاتر',
    difficulty: 'المستوى',
    anyDifficulty: 'كل المستويات',
    result: 'حركة',
    results: 'حركات',
    choose: 'اختر حركة لعرض دليل الأداء',
    form: 'دليل الأداء',
    muscles: 'العضلات المستهدفة',
    primary: 'أساسية',
    secondary: 'مساعدة',
    cues: 'نقاط التركيز',
    errors: 'أخطاء شائعة',
    breathe: 'التنفس',
    breatheLabel: 'إيقاع النفس يصنع فرقًا',
    safety: 'للحركة الآمنة',
    easier: 'تدرّج أسهل',
    sets: 'مجموعات',
    reps: 'تكرار',
    seconds: 'ث',
    levelBeginner: 'مبتدئ',
    levelIntermediate: 'متوسط',
    noResults: 'لا توجد حركة مطابقة',
    noResultsBody: 'يمكن تجربة كلمة أخرى أو إزالة أحد عوامل التصفية.',
    noRecent: 'لا توجد حركات في السجل بعد',
    noRecentBody: 'الحركات المختارة ستظهر هنا للعودة إليها بسهولة.',
    noFavorites: 'لم تحفظ أي حركة بعد',
    noFavoritesBody: 'يمكن استخدام علامة الحفظ للاحتفاظ بالحركات المطلوب مراجعتها.',
    link: 'تفاصيل التمرين والمؤقّت',
    selected: 'الحركة المحددة',
    goal: {
      'lose-weight': 'للهدف الحالي: حافظ على إيقاع يمكنك الاستمرار معه.',
      'build-muscle': 'للهدف الحالي: أعطِ الأولوية للتحكم وجودة كل تكرار.',
      fitness: 'للهدف الحالي: ابنِ قاعدة ثابتة قبل زيادة الشدة.',
      'gain-weight': 'للهدف الحالي: تحكّم في الحركة وامنح جسمك وقتًا كافيًا للتعافي.',
    },
  },
  en: {
    eyebrow: 'VYORA · MOVEMENT GUIDE',
    title: 'Move with clarity.',
    intro: 'A precise guide to every movement: what it works, how to do it, and what to watch for.',
    library: 'Movement library',
    search: 'Search movement or muscle',
    all: 'All movements',
    targetFilter: 'Target muscle',
    allMuscles: 'All muscles',
    favorites: 'Saved',
    recent: 'Recently viewed',
    clear: 'Clear filters',
    difficulty: 'Difficulty',
    anyDifficulty: 'All levels',
    result: 'movement',
    results: 'movements',
    choose: 'Choose a movement to open its coaching guide',
    form: 'Form coaching',
    muscles: 'Target muscles',
    primary: 'Primary',
    secondary: 'Secondary',
    cues: 'Form cues',
    errors: 'Common errors',
    breathe: 'Breathing',
    breatheLabel: 'Breath sets the rhythm',
    safety: 'Move safely',
    easier: 'Easier variation',
    sets: 'sets',
    reps: 'reps',
    seconds: 'sec',
    levelBeginner: 'Beginner',
    levelIntermediate: 'Intermediate',
    noResults: 'No matching movements',
    noResultsBody: 'Try another search or clear one of the filters.',
    noRecent: 'Your history is clear',
    noRecentBody: 'Movements you select will appear here for a quick return.',
    noFavorites: 'No saved movements yet',
    noFavoritesBody: 'Use the bookmark control to keep movements you want to revisit.',
    link: 'Exercise details & timer',
    selected: 'Selected movement',
    goal: {
      'lose-weight': 'For your current goal: choose a pace you can sustain.',
      'build-muscle': 'For your current goal: prioritize control and quality in every rep.',
      fitness: 'For your current goal: build a steady foundation before adding intensity.',
      'gain-weight': 'For your current goal: control each movement and allow enough recovery.',
    },
  },
} as const;

type View = 'all' | 'favorites' | 'recent';
type Difficulty = 'all' | Exercise['level'];
const muscleIds = Object.keys(muscleNames) as MuscleId[];

function categoryName(category: Category, locale: 'ar' | 'en') {
  const names: Record<Category, { ar: string; en: string }> = {
    full: { ar: 'الجسم بالكامل', en: 'Full body' },
    upper: { ar: 'الجزء العلوي', en: 'Upper body' },
    lower: { ar: 'الجزء السفلي', en: 'Lower body' },
    abs: { ar: 'الجذع', en: 'Core' },
    warmup: { ar: 'إحماء', en: 'Warm-up' },
    stretch: { ar: 'تمدد', en: 'Stretch' },
  };
  return names[category][locale];
}

function MovementCard({
  exercise,
  active,
  favorite,
  onFavorite,
  locale,
}: {
  exercise: Exercise;
  active: boolean;
  favorite: boolean;
  onFavorite: () => void;
  locale: 'ar' | 'en';
}) {
  const isArabic = locale === 'ar';
  return (
    <article className={`group relative overflow-hidden rounded-2xl border transition-colors ${active ? 'border-primary/65 bg-primary/[.07]' : 'border-border bg-card hover:border-primary/35'}`}>
      <Link
        href={`/exercise/${exercise.id}`}
        className="focus-ring flex w-full items-center gap-3 p-3 text-start"
        aria-current={active ? 'page' : undefined}
        data-testid={`link-movement-card-${exercise.id}`}
      >
        <SmartImg
          src={exercise.image}
          alt={exercise.name}
          label={exercise.name}
          className="h-[68px] w-[74px] shrink-0 rounded-xl"
          testId={`image-movement-${exercise.id}`}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold">{exercise.name}</span>
          <span className="latin mt-0.5 block truncate text-[10px] text-muted-foreground" dir="ltr">{exercise.latin}</span>
          <span className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
            <span>{categoryName(exercise.category, locale)}</span>
            <span aria-hidden="true">·</span>
            <span>{exercise.level === 'beginner' ? (isArabic ? 'مبتدئ' : 'Beginner') : (isArabic ? 'متوسط' : 'Intermediate')}</span>
          </span>
        </span>
      </Link>
      <button
        type="button"
        onClick={onFavorite}
        aria-label={favorite ? (isArabic ? 'إزالة من المحفوظات' : 'Remove from saved') : (isArabic ? 'حفظ الحركة' : 'Save movement')}
        aria-pressed={favorite}
        data-testid={`button-favorite-movement-${exercise.id}`}
        className="focus-ring press absolute top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-border/80 bg-background/90 text-muted-foreground hover:text-primary"
        style={isArabic ? { left: 12 } : { right: 12 }}
      >
        {favorite ? <Bookmark size={15} fill="currentColor" /> : <Bookmark size={15} />}
      </button>
      {active && <span className={`absolute bottom-0 top-0 w-[3px] bg-primary ${isArabic ? 'right-0' : 'left-0'}`} />}
    </article>
  );
}

export default function MovementGuidePage() {
  const { locale, isArabic } = useLocale();
  const text = copy[locale];
  const profile = useVYORAProfile();
  const favorites = useVideoFavorites();
  const history = useVideoHistory();
  const availableExercises = useMemo(
    () => exercisesAvailableForGender(exercises, profile?.gender),
    [profile?.gender],
  );
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleId | 'all'>('all');
  const [view, setView] = useState<View>('all');
  const [selectedId, setSelectedId] = useState(availableExercises[0]?.id ?? '');

  const localizedExercises = useMemo(
    () => availableExercises.map((exercise) => localizeExercise(exercise, locale)),
    [availableExercises, locale],
  );
  const byId = useMemo(
    () => new Map(localizedExercises.map((exercise) => [exercise.id, exercise])),
    [localizedExercises],
  );
  const catalogIds = useMemo(() => new Set(availableExercises.map((exercise) => exercise.id)), [availableExercises]);
  const catalogFavorites = useMemo(
    () => favorites.filter((id) => catalogIds.has(id)),
    [favorites, catalogIds],
  );
  const catalogHistory = useMemo(
    () => history.filter((entry) => catalogIds.has(entry.videoId)),
    [history, catalogIds],
  );
  const selected = byId.get(selectedId) ?? localizedExercises[0];
  const insight = selected ? getMovementInsight(selected.id, locale) : undefined;

  useEffect(() => {
    if (!catalogIds.has(selectedId)) setSelectedId(availableExercises[0]?.id ?? '');
  }, [availableExercises, catalogIds, selectedId]);

  useEffect(() => {
    const match = /^#movement-([\w-]{1,128})$/.exec(window.location.hash);
    const exerciseId = match?.[1];
    if (!exerciseId || !catalogIds.has(exerciseId)) return;
    setSelectedId(exerciseId);
    recordVideoWatch(exerciseId);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`movement-${exerciseId}`)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [catalogIds]);

  const list = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale === 'ar' ? 'ar' : 'en');
    let result = localizedExercises.filter((exercise) => {
      const movement = getMovementInsight(exercise.id, locale);
      const matchesQuery =
        !normalized ||
        [
          exercise.name,
          exercise.latin,
          categoryName(exercise.category, locale),
          ...(movement?.primaryNames ?? []),
          ...(movement?.secondaryNames ?? []),
        ]
          .some((value) => value.toLocaleLowerCase(locale === 'ar' ? 'ar' : 'en').includes(normalized));
      const matchesMuscle =
        selectedMuscle === 'all' ||
        Boolean(movement && [...movement.primary, ...movement.secondary].includes(selectedMuscle));
      return (
        matchesQuery &&
        matchesMuscle &&
        (category === 'all' || exercise.category === category) &&
        (difficulty === 'all' || exercise.level === difficulty)
      );
    });
    if (view === 'favorites') result = result.filter((exercise) => catalogFavorites.includes(exercise.id));
    if (view === 'recent') {
      const recentIds = catalogHistory.map((entry) => entry.videoId);
      result = result.filter((exercise) => recentIds.includes(exercise.id))
        .sort((a, b) => recentIds.indexOf(a.id) - recentIds.indexOf(b.id));
    }
    return result;
  }, [localizedExercises, query, category, difficulty, selectedMuscle, view, catalogFavorites, catalogHistory, locale]);

  const toggleFavorite = (id: string) => toggleVideoFavorite(id);
  const countLabel = locale === 'ar'
    ? `${list.length} ${text.results}`
    : `${list.length} ${list.length === 1 ? text.result : text.results}`;
  const isFavorite = (id: string) => catalogFavorites.includes(id);

  return (
    <div className="page-enter space-y-7 pb-4" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="relative overflow-hidden rounded-[1.8rem] border border-border bg-[#131217] px-5 py-6 sm:px-8 sm:py-8">
        <div aria-hidden="true" className={`absolute top-0 h-full w-[40%] opacity-70 ${isArabic ? 'left-0' : 'right-0'}`} style={{ background: 'radial-gradient(ellipse at center, hsl(var(--primary) / .15), transparent 68%)' }} />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="latin text-[10px] font-semibold tracking-[.25em] text-primary" dir="ltr">{text.eyebrow}</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[2.65rem]">{text.title}</h1>
            <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">{text.intro}</p>
            {profile && (
              <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-foreground/80">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {text.goal[profile.goal]}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-border bg-background/60 px-4 py-3 sm:self-auto">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Dumbbell size={19} /></span>
            <span>
              <span className="latin block text-lg font-bold" dir="ltr">{String(availableExercises.length).padStart(2, '0')}</span>
              <span className="block text-[10px] text-muted-foreground">{locale === 'ar' ? 'حركة موضّحة' : 'coached movements'}</span>
            </span>
          </div>
        </div>
        <div className="relative mt-6 flex items-center gap-3 border-t border-border/80 pt-4">
          <span className="latin text-[9px] tracking-[.2em] text-muted-foreground" dir="ltr">MOVE WITH INTENT</span>
          <span className="h-px flex-1 bg-border" />
          <span className="latin text-[9px] text-muted-foreground" dir="ltr">01 — {String(availableExercises.length).padStart(2, '0')}</span>
        </div>
      </header>

      <section className="grid items-start gap-6 lg:grid-cols-[minmax(290px,.83fr)_minmax(0,1.55fr)]">
        <aside className="min-w-0">
          <div className="mb-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.17em] text-primary">{text.library}</p>
              <h2 className="mt-1 text-xl font-bold">{countLabel}</h2>
            </div>
            <span className="latin text-[10px] text-muted-foreground" dir="ltr">{String(list.length).padStart(2, '0')} / {String(availableExercises.length).padStart(2, '0')}</span>
          </div>
          <label className="relative block">
            <Search size={17} className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground ${isArabic ? 'right-4' : 'left-4'}`} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder={text.search}
              aria-label={text.search}
              data-testid="input-search-movements"
              className={`focus-ring h-12 w-full rounded-2xl border border-border bg-card text-sm outline-none placeholder:text-muted-foreground/70 focus:border-primary/60 ${isArabic ? 'pr-11 pl-10' : 'pl-11 pr-10'}`}
            />
            {query && <button type="button" onClick={() => setQuery('')} aria-label={isArabic ? 'مسح البحث' : 'Clear search'} data-testid="button-clear-movement-search" className={`absolute top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center text-muted-foreground ${isArabic ? 'left-2' : 'right-2'}`}><X size={15} /></button>}
          </label>
          <div className="hide-scroll mt-3 flex gap-2 overflow-x-auto pb-1">
            {([
              ['all', text.all],
              ['favorites', text.favorites],
              ['recent', text.recent],
            ] as [View, string][]).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                aria-pressed={view === id}
                data-testid={`button-movement-view-${id}`}
                className={`focus-ring press flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold ${view === id ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}
              >
                {id === 'favorites' ? <Bookmark size={13} /> : id === 'recent' ? <Clock3 size={13} /> : null}
                {label}
                {id === 'favorites' && catalogFavorites.length > 0 && <span className="latin text-[10px]" dir="ltr">{catalogFavorites.length}</span>}
                {id === 'recent' && catalogHistory.length > 0 && <span className="latin text-[10px]" dir="ltr">{catalogHistory.length}</span>}
              </button>
            ))}
          </div>
          <div className="hide-scroll mt-3 flex gap-2 overflow-x-auto pb-1">
            <button type="button" onClick={() => setCategory('all')} aria-pressed={category === 'all'} data-testid="button-filter-category-all" className={`focus-ring press shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${category === 'all' ? 'border-primary/45 bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}>{locale === 'ar' ? 'التصنيف: الكل' : 'Category: all'}</button>
            {CATEGORIES.map((item) => (
              <button key={item.id} type="button" onClick={() => setCategory(item.id)} aria-pressed={category === item.id} data-testid={`button-filter-category-${item.id}`} className={`focus-ring press shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${category === item.id ? 'border-primary/45 bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}>{categoryName(item.id, locale)}</button>
            ))}
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-bold text-muted-foreground">{text.targetFilter}</span>
            <div className="hide-scroll mt-2 flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setSelectedMuscle('all')}
                aria-pressed={selectedMuscle === 'all'}
                data-testid="button-filter-muscle-all"
                className={`focus-ring press shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${selectedMuscle === 'all' ? 'border-primary/45 bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}
              >
                {text.allMuscles}
              </button>
              {muscleIds.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedMuscle(id)}
                  aria-pressed={selectedMuscle === id}
                  data-testid={`button-filter-muscle-${id}`}
                  className={`focus-ring press shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${selectedMuscle === id ? 'border-primary/45 bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}
                >
                  {muscleNames[id][locale]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="shrink-0 text-[10px] font-bold text-muted-foreground">{text.difficulty}</span>
            {([
              ['all', text.anyDifficulty],
              ['beginner', text.levelBeginner],
              ['intermediate', text.levelIntermediate],
            ] as [Difficulty, string][]).map(([id, label]) => (
              <button key={id} type="button" onClick={() => setDifficulty(id)} aria-pressed={difficulty === id} data-testid={`button-filter-difficulty-${id}`} className={`focus-ring press rounded-full border px-2.5 py-1.5 text-[10px] font-semibold ${difficulty === id ? 'border-primary/45 bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}>{label}</button>
            ))}
          </div>
          {(query || category !== 'all' || difficulty !== 'all' || selectedMuscle !== 'all' || view !== 'all') && (
            <button type="button" onClick={() => { setQuery(''); setCategory('all'); setDifficulty('all'); setSelectedMuscle('all'); setView('all'); }} data-testid="button-reset-movement-filters" className="focus-ring mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
              <X size={13} />{text.clear}
            </button>
          )}
          <div className="mt-4 space-y-2.5">
            {list.map((exercise) => (
              <MovementCard
                key={exercise.id}
                exercise={exercise}
                active={selected?.id === exercise.id}
                favorite={isFavorite(exercise.id)}
                onFavorite={() => toggleFavorite(exercise.id)}
                locale={locale}
              />
            ))}
            {list.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-card/60 px-5 py-10 text-center" data-testid="empty-movement-list">
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Search size={18} /></span>
                <h3 className="mt-3 text-sm font-bold">{view === 'recent' ? text.noRecent : view === 'favorites' ? text.noFavorites : text.noResults}</h3>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">{view === 'recent' ? text.noRecentBody : view === 'favorites' ? text.noFavoritesBody : text.noResultsBody}</p>
              </div>
            )}
          </div>
        </aside>

        {selected ? (
          <article id={`movement-${selected.id}`} className="min-w-0 scroll-mt-24 space-y-4" aria-labelledby="movement-title" data-testid={`movement-detail-${selected.id}`}>
            <div className="overflow-hidden rounded-[1.6rem] border border-border bg-card">
              <div className="relative h-[190px] sm:h-[230px]">
                <SmartImg src={selected.image} alt={selected.name} label={selected.name} className="absolute inset-0 h-full w-full" testId={`image-selected-movement-${selected.id}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100f14] via-[#100f14]/45 to-transparent" />
                <span className={`absolute top-4 flex items-center gap-1.5 rounded-full border border-border bg-background/85 px-3 py-1.5 text-[10px] font-bold ${isArabic ? 'right-4' : 'left-4'}`}><Check size={12} className="text-primary" />{text.selected}</span>
                <button
                  type="button"
                  onClick={() => toggleFavorite(selected.id)}
                  aria-pressed={isFavorite(selected.id)}
                  data-testid={`button-detail-favorite-${selected.id}`}
                  className={`focus-ring press absolute top-4 grid h-9 w-9 place-items-center rounded-full border border-border bg-background/85 ${isArabic ? 'left-4' : 'right-4'} ${isFavorite(selected.id) ? 'text-primary' : 'text-foreground'}`}
                  aria-label={isFavorite(selected.id) ? (isArabic ? 'إزالة من المحفوظات' : 'Remove from saved') : (isArabic ? 'حفظ الحركة' : 'Save movement')}
                >
                  <Heart size={16} fill={isFavorite(selected.id) ? 'currentColor' : 'none'} />
                </button>
                <div className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6 ${isArabic ? 'flex-row' : 'flex-row'}`}>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[.16em] text-primary">{categoryName(selected.category, locale)}</p>
                    <h2 id="movement-title" className="mt-1 text-2xl font-extrabold sm:text-3xl">{selected.name}</h2>
                    <p className="latin mt-1 text-xs text-white/65" dir="ltr">{selected.latin}</p>
                  </div>
                  <span className="latin hidden shrink-0 border-l border-white/20 pl-3 text-[10px] tracking-[.14em] text-white/60 sm:block" dir="ltr">{selected.id.toUpperCase()}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
                <div className="p-3 text-center">
                  <span className="latin block text-lg font-bold" dir="ltr">{selected.sets}</span>
                  <span className="text-[10px] text-muted-foreground">{text.sets}</span>
                </div>
                <div className="p-3 text-center">
                  <span className="latin block text-lg font-bold" dir="ltr">{selected.reps ?? selected.duration}</span>
                  <span className="text-[10px] text-muted-foreground">{selected.reps ? text.reps : text.seconds}</span>
                </div>
                <div className="p-3 text-center">
                  <span className="block text-sm font-bold">{selected.level === 'beginner' ? text.levelBeginner : text.levelIntermediate}</span>
                  <span className="text-[10px] text-muted-foreground">{locale === 'ar' ? 'المستوى' : 'Level'}</span>
                </div>
              </div>
            </div>

            <ExerciseMotionPlayer exercise={selected} locale={locale} />

            {insight ? (
              <>
                <div className="grid gap-4 md:grid-cols-[1fr_.92fr]">
                  <section className="rounded-[1.4rem] border border-border bg-card p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-primary">{text.form}</p>
                        <h3 className="mt-1 text-lg font-bold">{text.cues}</h3>
                      </div>
                      <span className="latin text-[9px] text-muted-foreground" dir="ltr">01 / 03</span>
                    </div>
                    <ol className="mt-4 space-y-3">
                      {selected.instructions.map((instruction, index) => (
                        <li key={`${selected.id}-instruction-${index}`} className="flex gap-3 text-sm leading-6">
                          <span className="latin grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-[10px] font-bold text-primary" dir="ltr">{String(index + 1).padStart(2, '0')}</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[.13em] text-muted-foreground">{locale === 'ar' ? 'مفتاح الحركة' : 'KEY CUES'}</p>
                      {insight.cues.map((cue, index) => <p key={`${selected.id}-cue-${index}`} className="mb-1.5 flex gap-2 text-xs leading-5 text-foreground/85"><Check size={14} className="mt-0.5 shrink-0 text-primary" />{cue}</p>)}
                    </div>
                  </section>
                  <div className="space-y-4">
                    <MuscleMap primary={insight.primary} secondary={insight.secondary} locale={locale} />
                    <section className="rounded-[1.4rem] border border-border bg-card p-4">
                      <div className="flex items-center gap-2">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary"><Wind size={16} /></span>
                        <div>
                          <h3 className="text-sm font-bold">{text.breathe}</h3>
                          <p className="text-[10px] text-muted-foreground">{text.breatheLabel}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6">{insight.breathing}</p>
                    </section>
                  </div>
                </div>
                <section className="rounded-[1.4rem] border border-amber-200/15 bg-[#211c19] p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <span className="latin text-xs font-bold text-amber-200" dir="ltr">02</span>
                    <h3 className="text-sm font-bold">{text.errors}</h3>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {insight.mistakes.map((mistake, index) => <p key={`${selected.id}-mistake-${index}`} className="flex gap-2 rounded-xl border border-amber-200/10 bg-black/10 p-3 text-xs leading-5 text-foreground/85"><X size={14} className="mt-0.5 shrink-0 text-amber-200/80" />{mistake}</p>)}
                  </div>
                </section>
                <div className="grid gap-3 sm:grid-cols-2">
                  <section className="rounded-[1.25rem] border border-border bg-card px-4 py-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-[.14em] text-primary">{text.safety}</p>
                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{selected.safety}</p>
                  </section>
                  <section className="rounded-[1.25rem] border border-border bg-card px-4 py-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-[.14em] text-primary">{text.easier}</p>
                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{selected.easier}</p>
                  </section>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-[11px] text-muted-foreground">
                  <span className="font-bold text-foreground">{text.muscles}</span>
                  <span>{text.primary}: {insight.primaryNames.join(isArabic ? '، ' : ', ')}</span>
                  <span>{text.secondary}: {insight.secondaryNames.join(isArabic ? '، ' : ', ')}</span>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">{text.choose}</div>
            )}
            <Link
              href={`/exercise/${selected.id}`}
              data-testid={`link-exercise-details-${selected.id}`}
              className="focus-ring press flex w-full items-center justify-between rounded-2xl bg-primary px-5 py-4 text-sm font-bold text-primary-foreground hover:brightness-105"
            >
              <span>{text.link}</span>
              <ArrowUpRight size={18} className={isArabic ? 'rotate-[-90deg]' : ''} />
            </Link>
          </article>
        ) : (
          <div className="grid min-h-80 place-items-center rounded-[1.5rem] border border-dashed border-border bg-card/50 px-8 text-center">
            <div><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary"><Dumbbell size={23} /></span><p className="mt-4 text-sm text-muted-foreground">{text.choose}</p></div>
          </div>
        )}
      </section>
    </div>
  );
}
