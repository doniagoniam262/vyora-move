import { useState } from 'react';
import { Link } from 'wouter';
import { Bell, ChevronLeft, ChevronRight, Clock3, Film, Move, Play, Sparkles, VolumeX } from 'lucide-react';
import { asset, exercises, planById, plans, planExercises, categoryLabel, recommendHomePlan, scheduledPlanForDay } from '@/lib/data';
import { useSessions, useSettings, useWeeklySchedule, weekDays, weekStart } from '@/lib/store';
import { SmartImg, Logo } from '@/components/vyora';
import { PlanCard } from '@/components/cards';
import { useLocale } from '@/lib/locale';
import { localizeExercise, localizePlan } from '@/lib/localized-data';

const brandGalleryImages = [
  { src: 'images/vyora-launch-poster.jpg', altAr: 'بوستر ڤايورا الكامل مع صورة رياضيين وشعار MOVE BEYOND LIMITS.', altEn: 'Full VYORA poster with athletes and the MOVE BEYOND LIMITS slogan.' },
  { src: 'images/brand-boxing-pink.jpg', altAr: 'رياضية تتدرب على كيس الملاكمة مع شعار ڤايورا.', altEn: 'A woman training on a punching bag with the VYORA logo.' },
  { src: 'images/brand-boxing-ember.jpg', altAr: 'ملاكمة ترتدي قفازات حمراء تحت شعار ڤايورا.', altEn: 'A boxer wearing red gloves beneath the VYORA logo.' },
  { src: 'images/brand-dumbbell-detail.jpg', altAr: 'لقطة قريبة ليد تمسك دمبل في صالة رياضية.', altEn: 'Close-up of a hand holding a dumbbell in a gym.' },
  { src: 'images/brand-squat-team.jpg', altAr: 'رجل وامرأة يؤديان تمرين السكوات في صالة رياضية.', altEn: 'A man and woman doing squats in a gym.' },
  { src: 'images/brand-training-pair.jpg', altAr: 'رجل وامرأة يتدربان بالأوزان معًا.', altEn: 'A man and woman training with dumbbells together.' },
  { src: 'images/brand-squat-coaching.jpg', altAr: 'مدرب يوجّه متدربة أثناء تمرين السكوات بالبار.', altEn: 'A trainer guiding a woman through a barbell squat.' },
] as const;

export default function HomePage() {
  const { locale, t } = useLocale();
  const [brandGalleryIndex, setBrandGalleryIndex] = useState(0);
  const sessions = useSessions();
  const [settings, updateSettings] = useSettings();
  const [schedule] = useWeeklySchedule();
  const day = new Date().getDay();
  const rawToday = planById(['ten-minute', 'beginner-plan', 'twenty-minute'][day % 3]) ?? plans[0];
  const today = localizePlan(rawToday, locale);
  const daily = [0, 1, 2].map((i) => localizeExercise(exercises[(day * 3 + i * 4 + 2) % exercises.length], locale));
  const start = weekStart();
  const weekCount = sessions.filter((s) => new Date(s.completedAt) >= start).length;
  const days = weekDays(sessions);
  const pct = Math.min(100, (weekCount / settings.weeklyGoal) * 100);
  const names = locale === 'ar' ? ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'] : ['S', 'S', 'M', 'T', 'W', 'T', 'F'];
  const scheduledToday = schedule.days.includes(day);
  const scheduledPlan = scheduledPlanForDay(schedule, day);
  const homePlan = recommendHomePlan({
    level: settings.homeFitLevel,
    minutes: settings.homeFitMinutes,
    quiet: settings.homeFitQuiet,
    compact: settings.homeFitCompact,
    recentPlanIds: sessions.slice(0, 2).map((session) => session.planId),
  });
  const localizedHomePlan = homePlan ? localizePlan(homePlan, locale) : undefined;
  const activeBrandImage = brandGalleryImages[brandGalleryIndex];
  const moveBrandGallery = (step: number) => setBrandGalleryIndex((index) => (index + step + brandGalleryImages.length) % brandGalleryImages.length);
  const choiceClass = (active: boolean) => `focus-ring press rounded-xl border px-3 py-2 text-xs font-bold transition-colors ${active ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-background/60 text-muted-foreground hover:border-primary/40'}`;
  return (
    <div className="page-enter space-y-3.5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{t('مرحبًا،')}</p>
          <h1 className="text-xl font-extrabold">{t('مرحبًا بك')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('خطوة جديدة نحو جسم أكثر نشاطًا.')}</p>
        </div>
        <Link href="/progress" data-testid="link-home-notifications" aria-label={locale === 'ar' ? 'تقدمك' : 'Your progress'} className="focus-ring press grid h-11 w-11 place-items-center rounded-full border border-border bg-card"><Bell size={18} /></Link>
      </div>

      <section className="card-dark overflow-hidden" data-testid="brand-gallery" aria-label={locale === 'ar' ? 'معرض صور ڤايورا' : 'VYORA image gallery'}>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <h2 className="text-sm font-extrabold">{locale === 'ar' ? 'صور ڤايورا' : 'VYORA gallery'}</h2>
          <span className="text-xs font-bold text-muted-foreground" dir="ltr" aria-live="polite" data-testid="brand-gallery-counter">{brandGalleryIndex + 1} / {brandGalleryImages.length}</span>
        </div>
        <div className="flex h-[68vh] min-h-[320px] max-h-[620px] items-center justify-center bg-black px-2 py-1">
          <img
            src={asset(activeBrandImage.src)}
            alt={locale === 'ar' ? activeBrandImage.altAr : activeBrandImage.altEn}
            className="h-full w-full object-contain"
            loading="eager"
            decoding="async"
            data-testid="brand-gallery-image"
          />
        </div>
        <div className="flex items-center justify-between gap-3 px-3 py-2.5">
          <button
            type="button"
            onClick={() => moveBrandGallery(-1)}
            aria-label={locale === 'ar' ? 'الصورة السابقة' : 'Previous image'}
            className="focus-ring press grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-primary"
            data-testid="brand-gallery-previous"
          >
            <ChevronLeft className={locale === 'ar' ? 'rotate-180' : ''} size={19} />
          </button>
          <div className="flex items-center gap-1" role="group" aria-label={locale === 'ar' ? 'اختيار صورة' : 'Choose an image'}>
            {brandGalleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setBrandGalleryIndex(index)}
                aria-label={`${locale === 'ar' ? 'عرض الصورة' : 'Show image'} ${index + 1}`}
                aria-pressed={brandGalleryIndex === index}
                className="focus-ring grid h-7 w-6 place-items-center rounded-full"
                data-testid={`brand-gallery-dot-${index + 1}`}
              >
                <span className={`h-2 w-2 rounded-full ${brandGalleryIndex === index ? 'bg-primary' : 'bg-muted-foreground/50'}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => moveBrandGallery(1)}
            aria-label={locale === 'ar' ? 'الصورة التالية' : 'Next image'}
            className="focus-ring press grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-primary"
            data-testid="brand-gallery-next"
          >
            <ChevronRight className={locale === 'ar' ? 'rotate-180' : ''} size={19} />
          </button>
        </div>
      </section>

      <section data-testid="card-today-challenge" className="card-dark relative overflow-hidden">
        <SmartImg src={today.image} alt={today.name} className="absolute inset-0 h-full w-full" />
        <div className={`absolute inset-0 ${locale === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-black/95 via-black/70 to-black/30`} />
        <div className="relative flex min-h-[10.5rem] flex-col justify-between p-4 md:min-h-[16rem] md:p-8">
          <div>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">{t('تحدي اليوم')}</span>
            <h2 className="mt-3 text-xl font-extrabold md:text-4xl" data-testid="text-today-name">{today.name}</h2>
            <p className="mt-0.5 max-w-xs text-xs leading-6 text-white/75">{today.minutes} {locale === 'ar' ? 'دقيقة' : 'min'} · {planExercises(today).length} {locale === 'ar' ? 'تمارين' : 'exercises'} · {t('بدون معدات')}</p>
          </div>
          <Link href={`/session/${today.id}`} data-testid="button-start-today" className="btn-lime focus-ring press mt-4 inline-flex w-fit items-center gap-2 rounded-lg px-8 py-2 text-sm"><Play size={16} fill="currentColor" />{t('ابدأ الآن')}</Link>
        </div>
      </section>

      <section data-testid="card-home-fit" className="card-dark space-y-3.5 p-4">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary"><Sparkles size={19} /></span>
          <div className="min-w-0">
            <h2 className="text-sm font-extrabold">{t('تمرين يناسب بيتك اليوم')}</h2>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{t('اختيار وقتك ومساحتك ومستوى التمرين')}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground"><Clock3 size={13} />{t('الوقت المتاح')}</p>
            <div className="grid grid-cols-2 gap-1.5" role="group" aria-label={t('الوقت المتاح')}>
              {([10, 20] as const).map((minutes) => (
                <button key={minutes} type="button" data-testid={`home-fit-duration-${minutes}`} aria-pressed={settings.homeFitMinutes === minutes} onClick={() => updateSettings({ homeFitMinutes: minutes })} className={choiceClass(settings.homeFitMinutes === minutes)}>
                  {t('حتى')} {minutes} {locale === 'ar' ? 'دقائق' : 'min'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground"><Move size={13} />{t('مستوى التمرين')}</p>
            <div className="grid grid-cols-2 gap-1.5" role="group" aria-label={t('مستوى التمرين')}>
              {(['beginner', 'intermediate'] as const).map((level) => (
                <button key={level} type="button" data-testid={`home-fit-level-${level}`} aria-pressed={settings.homeFitLevel === level} onClick={() => updateSettings({ homeFitLevel: level })} className={choiceClass(settings.homeFitLevel === level)}>
                  {t(level === 'beginner' ? 'مبتدئ' : 'متوسط')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <button type="button" data-testid="home-fit-toggle-quiet" aria-pressed={settings.homeFitQuiet} onClick={() => updateSettings({ homeFitQuiet: !settings.homeFitQuiet })} className={`${choiceClass(settings.homeFitQuiet)} flex items-center justify-center gap-2`}>
            <VolumeX size={15} />{t('تمرين هادي')} · {t('بدون قفز')}
          </button>
          <button type="button" data-testid="home-fit-toggle-compact" aria-pressed={settings.homeFitCompact} onClick={() => updateSettings({ homeFitCompact: !settings.homeFitCompact })} className={`${choiceClass(settings.homeFitCompact)} flex items-center justify-center gap-2`}>
            <Move size={15} />{t('مساحة صغيرة')}
          </button>
        </div>

        {localizedHomePlan ? (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-2.5" data-testid="home-fit-recommendation">
            <SmartImg src={localizedHomePlan.image} alt={localizedHomePlan.name} className="h-20 w-24 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-primary">{t('اختيار ڤايورا لك اليوم')}</p>
              <h3 className="mt-0.5 text-sm font-extrabold">{localizedHomePlan.name}</h3>
              <p className="mt-1 text-[11px] text-muted-foreground">{localizedHomePlan.minutes} {locale === 'ar' ? 'دقيقة' : 'min'} · {planExercises(localizedHomePlan).length} {locale === 'ar' ? 'تمارين' : 'exercises'}</p>
              <Link href={`/session/${localizedHomePlan.id}`} data-testid="button-start-home-fit" className="btn-lime focus-ring press mt-2 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs"><Play size={13} fill="currentColor" />{t('ابدأ الجلسة')}</Link>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-background/50 p-3" data-testid="home-fit-no-match">
            <p className="text-sm font-bold">{t('لا توجد خطة مناسبة لهذه الاختيارات')}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{t('يمكنك اختيار 10 دقائق أو إلغاء وضع المساحة الصغيرة.')}</p>
            <button type="button" data-testid="button-reset-home-fit" onClick={() => updateSettings({ homeFitMinutes: 10, homeFitCompact: false })} className="focus-ring mt-2 rounded-lg py-1 text-xs font-bold text-primary">{t('إعادة ضبط الاختيارات')}</button>
          </div>
        )}
      </section>

      <section className="card-dark p-3.5" data-testid="card-personal-schedule">
        <div className="flex items-center justify-between gap-3">
          <div><h2 className="text-sm font-extrabold">{t('جدولك الأسبوعي')}</h2><p className="mt-0.5 text-[11px] text-muted-foreground">{schedule.days.length ? `${schedule.days.length} ${t('أيام تدريب')} · ${t(schedule.level === 'beginner' ? 'مبتدئ' : 'متوسط')} · ${locale === 'ar' ? 'حتى' : 'up to'} ${schedule.minutes} ${locale === 'ar' ? 'دقيقة' : 'min'}` : t('حدّد أيامك ومستواك لاقتراح خطة مناسبة.')}</p></div>
          <Link href="/more" data-testid="link-edit-schedule" className="focus-ring rounded-lg px-2 py-1.5 text-xs font-bold text-primary">{schedule.days.length ? t('تعديل') : t('إعداد الجدول')}</Link>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1.5" aria-label={t('أيام جدول التدريب')}>
          {[{ day: 0, label: 'ح' }, { day: 1, label: 'ن' }, { day: 2, label: 'ث' }, { day: 3, label: 'ر' }, { day: 4, label: 'خ' }, { day: 5, label: 'ج' }, { day: 6, label: 'س' }].map(({ day: weekday, label }) => {
            const selected = schedule.days.includes(weekday);
            const enDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            return <span key={weekday} data-testid={`home-schedule-day-${weekday}`} title={selected ? t('يوم تدريب') : t('راحة')} className={`rounded-lg py-1.5 text-center text-[11px] font-bold ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{locale === 'ar' ? label : enDays[weekday]}</span>;
          })}
        </div>
        {scheduledToday && scheduledPlan
          ? <Link href={`/session/${scheduledPlan.id}`} data-testid="button-start-scheduled" className="btn-lime focus-ring press mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm"><Play size={15} fill="currentColor" />{t('تمرين اليوم')} · {localizePlan(scheduledPlan, locale).name} · {t('حوالي')} {scheduledPlan.minutes} {locale === 'ar' ? 'دقائق' : 'min'}</Link>
          : schedule.days.length > 0
             ? <p className="mt-3 text-xs text-muted-foreground" data-testid="text-schedule-rest">{locale === 'ar' ? (schedule.days.includes((day + 1) % 7) ? 'موعدك القادم غدًا.' : 'اليوم راحة حسب جدولك. خذ وقتك واستأنف في يوم التدريب القادم.') : (schedule.days.includes((day + 1) % 7) ? 'Your next workout is tomorrow.' : 'Today is a rest day. Pick it up on your next training day.')}</p>
            : null}
      </section>

      <section data-testid="card-weekly-progress" className="card-dark p-3.5">
        <div className="flex items-center justify-between"><h2 className="text-sm font-extrabold">{t('جلسات مكتملة هذا الأسبوع')}</h2><span className="num text-lg font-bold text-primary" data-testid="text-weekly-count">{weekCount}/{settings.weeklyGoal}</span></div>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={settings.weeklyGoal} aria-valuenow={Math.min(weekCount, settings.weeklyGoal)}><div data-testid="bar-weekly" className="h-full rounded-full bg-primary transition-[width] duration-700" style={{ width: `${pct}%` }} /></div>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {days.map((d, i) => <div key={i} data-testid={`dot-day-${i}`} className={`rounded-lg py-1.5 text-center text-[11px] font-bold ${d.count ? 'bg-primary text-primary-foreground' : d.today ? 'border border-primary/60 text-primary' : 'bg-muted text-muted-foreground'}`}>{names[i]}</div>)}
        </div>
        {weekCount === 0 && <p className="mt-3 text-xs text-muted-foreground">{t('لا جلسات هذا الأسبوع بعد. أول جلسة قصيرة تبدأ المشوار.')}</p>}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-base font-extrabold">{t('تمارينك اليومية')}</h2><Link href="/exercises" data-testid="link-home-all-exercises" className="focus-ring text-xs font-bold text-primary">{t('عرض الكل')}</Link></div>
        <div className="grid grid-cols-3 gap-2">
          {daily.map((ex) => (
            <Link key={ex.id} href={`/exercises/${ex.id}`} data-testid={`card-daily-${ex.id}`} className="card-dark focus-ring lift press overflow-hidden">
              <SmartImg src={ex.image} alt={ex.name} className="aspect-[4/3] w-full" />
              <div className="p-2"><b className="block truncate text-xs">{ex.name}</b><span className="text-[11px] text-muted-foreground">{locale === 'ar' ? categoryLabel(ex.category) : t(categoryLabel(ex.category))} · {ex.duration} {t('ث')}</span></div>
            </Link>
          ))}
        </div>
      </section>

      <Link href="/videos" data-testid="card-home-videos" className="card-dark focus-ring lift flex items-center gap-3 p-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary"><Film size={23} /></span>
        <span className="min-w-0 flex-1">
          <b className="block">{t('تمارين بالفيديو')}</b>
          <span className="mt-1 block text-xs text-muted-foreground">{t('مدربات ومدربون وخيارات تناسب كل مستوى')}</span>
        </span>
        <Play size={18} className="shrink-0 text-primary" />
      </Link>

      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-base font-extrabold">{t('خطط مقترحة')}</h2><Link href="/plans" data-testid="link-home-all-plans" className="focus-ring text-xs font-bold text-primary">{t('كل الخطط')}</Link></div>
        <div className="grid gap-2.5 md:grid-cols-3">{plans.map((p) => <PlanCard key={p.id} plan={p} />)}</div>
      </section>

      <section className="card-dark flex items-center gap-4 p-4"><Logo full /></section>
    </div>
  );
}
