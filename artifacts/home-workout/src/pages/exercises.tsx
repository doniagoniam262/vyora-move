import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import {
  ArrowRight,
  Search,
  ChevronLeft,
  SearchX,
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
import { ExerciseTechniqueExperience } from '@/components/squat-technique-experience';
import { recordVideoWatch } from '@/lib/store';
import { useVYORAProfile } from '@/lib/profile-context';
import type { UserGender } from '@/lib/profile';

const maleVideoExerciseIds = ['pull-up', 'deadlift', 'bench-press', 'bicep-curl', 'shoulder-press'];

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
      <section className="card-dark space-y-3 p-4" data-testid="male-exercise-videos">
        <h2 className="text-sm font-extrabold">
          {locale === 'ar' ? 'فيديوهات التمارين الرجالية' : 'Male exercise videos'}
        </h2>
        <p className="text-xs text-muted-foreground">
          {locale === 'ar' ? '5 فيديوهات فعلية — افتح التمرين واضغط تشغيل.' : '5 movement videos — open an exercise and press Play.'}
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {maleVideoExerciseIds.map((id) => {
            const exercise = exerciseById(id);
            if (!exercise) return null;
            return (
              <Link
                key={id}
                href={`/exercises/${id}?gender=male`}
                data-testid={`link-male-video-${id}`}
                className="focus-ring flex items-center justify-between gap-2 rounded-xl border border-blue-400/20 bg-blue-400/5 p-3"
              >
                <span className="text-sm font-bold">{localizeExercise(exercise, locale).name}</span>
                <span className="shrink-0 text-xs text-blue-300">▶ {locale === 'ar' ? 'فيديو · 4 ثوانٍ' : 'Video · 4 sec'}</span>
              </Link>
            );
          })}
        </div>
      </section>
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
  const profile = useVYORAProfile();
  const [previewGender, setPreviewGender] = useState<UserGender>(profile?.gender ?? 'female');
  const rawEx = exerciseById(exerciseId ?? '');
  const ex = rawEx ? localizeExercise(rawEx, locale) : undefined;
  const insight = ex ? getMovementInsight(ex.id, locale) : undefined;
  useEffect(() => {
    const requestedGender = new URLSearchParams(window.location.search).get('gender');
    setPreviewGender(requestedGender === 'male' || requestedGender === 'female'
      ? requestedGender
      : profile?.gender ?? 'female');
  }, [exerciseId, profile?.gender]);
  useEffect(() => {
    if (exerciseId && rawEx) recordVideoWatch(exerciseId);
  }, [exerciseId, rawEx]);
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
    <div className="page-enter mx-auto max-w-7xl space-y-4">
      <div className="flex items-start gap-3">
        <button
          onClick={() => (window.history.length > 1 ? window.history.back() : nav('/exercises'))}
          data-testid="button-back"
          aria-label={t('رجوع')}
          className="focus-ring press grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card"
        >
          <ArrowRight className={locale === 'en' ? 'rotate-180' : ''} size={18} />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-extrabold" data-testid="text-exercise-name">
            {ex.name}
          </h1>
          {locale === 'ar' && (
            <p className="latin text-sm text-muted-foreground" dir="ltr">
              ({ex.latin})
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Tag>{locale === 'ar' ? categoryLabel(ex.category) : t(categoryLabel(ex.category))}</Tag>
            <Tag tone="dim">{t(levelLabel(ex.level))}</Tag>
          </div>
        </div>
      </div>
      <ExerciseTechniqueExperience
        exercise={ex}
        locale={locale}
        gender={previewGender}
        onGenderChange={setPreviewGender}
        primary={insight?.primary ?? []}
        secondary={insight?.secondary ?? []}
      />
    </div>
  );
}
