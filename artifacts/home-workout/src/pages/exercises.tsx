import { useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import {
  Activity,
  ArrowRight,
  Layers,
  Search,
  ChevronLeft,
  ShieldAlert,
  Timer,
  SearchX,
  Play,
  Lightbulb,
} from 'lucide-react';
import {
  CATEGORIES,
  LEVELS,
  categoryLabel,
  exerciseById,
  exercises,
  levelLabel,
  type Category,
  type Level,
} from '@/lib/data';
import { Chip, EmptyState, SmartImg, Tag } from '@/components/vyora';
import { ExerciseRow } from '@/components/cards';
import { useLocale } from '@/lib/locale';
import { localizeExercise } from '@/lib/localized-data';
import { getMovementInsight } from '@/lib/movement-details';
import { MuscleMap } from '@/components/muscle-map';

export function ExercisesPage() {
  const { locale, t } = useLocale();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'all' | Category>('all');
  const [lvl, setLvl] = useState<'all' | Level>('all');
  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return exercises.filter((e) => {
      const x = localizeExercise(e, locale);
      return (
        (cat === 'all' || e.category === cat) &&
        (lvl === 'all' || e.level === lvl) &&
        (!n || x.name.toLowerCase().includes(n) || e.latin.toLowerCase().includes(n))
      );
    });
  }, [q, cat, lvl, locale]);
  const browse = cat === 'all' && lvl === 'all' && !q.trim();
  const reset = () => {
    setQ('');
    setCat('all');
    setLvl('all');
  };
  return (
    <div className="page-enter space-y-3">
      <h1 className="text-xl font-extrabold">{t('المكتبة')}</h1>
      <label className="card-dark flex items-center gap-3 px-3.5 py-2.5 focus-within:border-primary">
        <Search size={18} className="text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          data-testid="input-search-exercises"
          aria-label={t('ابحث عن تمرين')}
          placeholder={t('ابحث عن تمرين...')}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </label>
      <div
        className="hide-scroll flex max-w-full gap-2 overflow-x-auto"
        role="group"
        aria-label={t('التصنيف')}
      >
        <Chip testId="filter-category-all" active={cat === 'all'} onClick={() => setCat('all')}>
          {t('الكل')}
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            testId={`filter-category-${c.id}`}
            active={cat === c.id}
            onClick={() => setCat(c.id)}
          >
            {locale === 'ar' ? c.label : t(c.label)}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('المستوى')}>
        <Chip testId="filter-level-all" active={lvl === 'all'} onClick={() => setLvl('all')}>
          {t('كل المستويات')}
        </Chip>
        {LEVELS.map((l) => (
          <Chip
            key={l.id}
            testId={`filter-level-${l.id}`}
            active={lvl === l.id}
            onClick={() => setLvl(l.id)}
          >
            {t(l.label)}
          </Chip>
        ))}
      </div>
      <p
        className="text-xs text-muted-foreground"
        data-testid="text-exercise-count"
        aria-live="polite"
      >
        {list.length} {locale === 'ar' ? 'تمرين' : `exercise${list.length === 1 ? '' : 's'}`}
      </p>
      {browse && (
        <section aria-label={t('أقسام التمارين')} className="space-y-2">
          {CATEGORIES.map((c) => {
            const first = exercises.find((x) => x.category === c.id);
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                data-testid={`card-category-${c.id}`}
                className="card-dark focus-ring lift press flex w-full items-center gap-3 overflow-hidden p-0 text-start"
              >
                {first && <SmartImg src={first.image} alt="" className="h-16 w-24 shrink-0" />}
                <span className="min-w-0 flex-1">
                  <b className="block text-sm">{locale === 'ar' ? c.label : t(c.label)}</b>
                  <span className="text-[11px] text-muted-foreground">
                    {locale === 'ar' ? c.blurb : t(c.blurb)}
                  </span>
                </span>
                <ChevronLeft
                  size={16}
                  className={`shrink-0 text-muted-foreground ${locale === 'ar' ? 'ml-3' : 'mr-3 rotate-180'}`}
                />
              </button>
            );
          })}
          <h2 className="pt-2 text-sm font-extrabold">{t('كل التمارين')}</h2>
        </section>
      )}
      {list.length === 0 ? (
        <EmptyState
          testId="empty-exercises"
          icon={<SearchX size={26} />}
          title={t('لا توجد نتائج مطابقة')}
          body={t('غيّر عبارة البحث أو أزل بعض عوامل التصفية لعرض تمارين أخرى.')}
        >
          <button
            onClick={reset}
            data-testid="button-reset-filters"
            className="btn-lime focus-ring press rounded-xl px-6 py-2.5 text-sm"
          >
            {t('إعادة ضبط الفلاتر')}
          </button>
        </EmptyState>
      ) : (
        <div className="grid gap-2 md:grid-cols-2">
          {list.map((e) => (
            <ExerciseRow key={e.id} ex={e} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ExerciseDetailPage() {
  const { locale, t } = useLocale();
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [, nav] = useLocation();
  const rawEx = exerciseById(exerciseId ?? '');
  const ex = rawEx ? localizeExercise(rawEx, locale) : undefined;
  const insight = ex ? getMovementInsight(ex.id, locale) : undefined;
  if (!ex)
    return (
      <EmptyState
        testId="error-exercise-missing"
        icon={<SearchX size={26} />}
        title={t('لم نجد هذا التمرين')}
        body={t('هذا الرابط قديم. تصفّح المكتبة لاختيار تمرين آخر.')}
      >
        <Link
          href="/exercises"
          data-testid="link-back-exercises"
          className="btn-lime focus-ring rounded-xl px-6 py-2.5 text-sm"
        >
          {t('إلى المكتبة')}
        </Link>
      </EmptyState>
    );
  return (
    <div className="page-enter mx-auto max-w-3xl space-y-4">
      <div className="relative">
        <SmartImg
          src={ex.image}
          alt={ex.name}
          testId="img-exercise-detail"
          className="aspect-[16/10] w-full rounded-2xl md:aspect-[16/8]"
        />
        <button
          onClick={() => (window.history.length > 1 ? window.history.back() : nav('/exercises'))}
          data-testid="button-back"
          aria-label={t('رجوع')}
          className={`focus-ring press absolute ${locale === 'ar' ? 'right-3' : 'left-3'} top-3 grid h-10 w-10 place-items-center rounded-full bg-black/60 backdrop-blur`}
        >
          <ArrowRight className={locale === 'en' ? 'rotate-180' : ''} size={18} />
        </button>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold" data-testid="text-exercise-name">
            {ex.name}
          </h1>
          {locale === 'ar' && (
            <p className="latin text-sm text-muted-foreground" dir="ltr">
              ({ex.latin})
            </p>
          )}
        </div>
        <div className={`flex flex-col ${locale === 'ar' ? 'items-end' : 'items-start'} gap-1.5`}>
          <Tag>{locale === 'ar' ? categoryLabel(ex.category) : t(categoryLabel(ex.category))}</Tag>
          <Tag tone="dim">{t(levelLabel(ex.level))}</Tag>
        </div>
      </div>
      {insight && (
        <section
          className="grid gap-3 md:grid-cols-[.9fr_1.1fr]"
          data-testid="exercise-muscle-focus"
        >
          <MuscleMap primary={insight.primary} secondary={insight.secondary} locale={locale} />
          <div className="card-dark space-y-4 p-4">
            <div>
              <h2 className="text-sm font-extrabold">
                {locale === 'ar' ? 'العضلات المستهدفة' : 'Target muscles'}
              </h2>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                <b className="text-foreground">
                  {locale === 'ar' ? 'أساسية: ' : 'Primary: '}
                </b>
                {insight.primaryNames.join(locale === 'ar' ? '، ' : ', ')}
              </p>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">
                <b className="text-foreground">
                  {locale === 'ar' ? 'مساعدة: ' : 'Secondary: '}
                </b>
                {insight.secondaryNames.join(locale === 'ar' ? '، ' : ', ')}
              </p>
            </div>
            <div className="border-t border-border pt-3">
              <h3 className="text-xs font-bold">{locale === 'ar' ? 'مفاتيح الأداء' : 'Form cues'}</h3>
              <ul className="mt-2 space-y-2">
                {insight.cues.map((cue, index) => (
                  <li key={index} className="text-xs leading-5 text-muted-foreground">
                    {cue}
                  </li>
                ))}
              </ul>
            </div>
            <p className="border-t border-border pt-3 text-xs leading-5 text-muted-foreground">
              <b className="text-foreground">{locale === 'ar' ? 'التنفس: ' : 'Breathing: '}</b>
              {insight.breathing}
            </p>
          </div>
        </section>
      )}
      <section className="card-dark p-4">
        <h2 className="text-sm font-extrabold">{t('خطوات الأداء الصحيح')}</h2>
        <ol className="mt-3 space-y-3">
          {ex.instructions.map((s, i) => (
            <li key={i} data-testid={`text-step-${i + 1}`} className="flex gap-3 text-sm leading-7">
              <span className="num mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </section>
      <div className="grid grid-cols-3 gap-2">
        <div className="card-dark flex flex-col items-center gap-1 p-3 text-center">
          <Layers className="text-primary" size={18} />
          <span className="text-[11px] text-muted-foreground">{t('المجموعات')}</span>
          <b data-testid="text-sets" className="num block text-sm">
            {ex.sets} {locale === 'ar' ? 'مجموعات' : 'sets'}
          </b>
        </div>
        <div className="card-dark flex flex-col items-center gap-1 p-3 text-center">
          <Timer className="text-primary" size={18} />
          <div>
            <span className="text-[11px] text-muted-foreground">{t('المدة')}</span>
            <b data-testid="text-duration" className="block text-sm">
              {ex.duration} {t('ثانية')}
            </b>
          </div>
        </div>
        <div className="card-dark flex flex-col items-center gap-1 p-3 text-center">
          <Layers className="text-primary" size={18} />
          <div>
            <span className="text-[11px] text-muted-foreground">{t('التكرارات')}</span>
            <b data-testid="text-reps" className="num block text-sm">
              {ex.reps ? `${ex.sets} x ${ex.reps}` : `${ex.sets} x ${ex.duration}s`}
            </b>
          </div>
        </div>
      </div>
      {insight && (
        <section className="card-dark space-y-3 p-4" data-testid="exercise-common-errors">
          <h2 className="text-sm font-extrabold">
            {locale === 'ar' ? 'أخطاء شائعة انتبهي لها' : 'Common form errors'}
          </h2>
          <ul className="space-y-2">
            {insight.mistakes.map((mistake, index) => (
              <li key={index} className="flex gap-2 text-xs leading-5 text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {mistake}
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="card-dark flex gap-3 border-primary/30 bg-primary/5 p-3 text-xs leading-6">
        <ShieldAlert className="mt-1 shrink-0 text-primary" size={18} />
        <div>
          <b>{t('ملاحظة أمان')}</b>
          <p data-testid="text-safety" className="text-muted-foreground">
            {ex.safety}
          </p>
        </div>
      </div>
      <div className="card-dark flex gap-3 p-3 text-xs leading-6">
        <Lightbulb className="mt-1 shrink-0 text-primary" size={18} />
        <div>
          <b>{t('نسخة أسهل')}</b>
          <p data-testid="text-easier" className="text-muted-foreground">
            {ex.easier}
          </p>
        </div>
      </div>
      <Link
        href={`/videos#movement-${ex.id}`}
        data-testid="link-exercise-movement-guide"
        className="card-dark focus-ring lift flex items-center gap-3 p-4"
      >
        <Activity className="shrink-0 text-primary" size={20} />
        <span className="flex-1">
          <b className="block text-sm">
            {locale === 'ar' ? 'افتح دليل الحركة' : 'Open the movement guide'}
          </b>
          <span className="text-xs text-muted-foreground">
            {locale === 'ar'
              ? 'راجعي العضلات المستهدفة ومفاتيح الأداء'
              : 'Review target muscles and movement cues'}
          </span>
        </span>
        <ArrowRight
          size={16}
          className={locale === 'en' ? 'rotate-180 text-muted-foreground' : 'text-muted-foreground'}
        />
      </Link>
      <Link
        href={`/session/${ex.id}`}
        data-testid="button-start-exercise"
        className="btn-lime focus-ring press flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base"
      >
        <Play size={18} fill="currentColor" />
        {t('ابدأ التمرين')}
      </Link>
    </div>
  );
}
