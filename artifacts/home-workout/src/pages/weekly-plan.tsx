import { useEffect, useMemo } from 'react';
import { Bell, Check, Clock3, Dumbbell, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { MotionIllustration } from '@/components/motion-illustration';
import { useLocale } from '@/lib/locale';
import { useVYORAProfile } from '@/lib/profile-context';
import { scheduledPlanForDay } from '@/lib/data';
import { useWeeklySchedule } from '@/lib/store';
import { suggestedTrainingDays } from '@/lib/personalization';
import { localizePlan } from '@/lib/localized-data';

const enDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const arDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const goalCopy = {
  en: {
    'lose-weight': ['Build a steady rhythm', 'A balanced mix of full-body movement and recovery keeps your week approachable.'],
    'build-muscle': ['Make room for strength', 'Focused resistance sessions with a little breathing space between them.'],
    fitness: ['Move well, feel ready', 'A varied week of strength, mobility, and comfortable-paced movement.'],
    'gain-weight': ['Strength, at your pace', 'Repeatable bodyweight strength sessions with rest built into the week.'],
  },
  ar: {
    'lose-weight': ['إيقاع ثابت يناسبك', 'مزيج متوازن من حركة الجسم بالكامل والتعافي يجعل أسبوعك عمليًا.'],
    'build-muscle': ['مساحة للقوة', 'جلسات مقاومة مركزة مع وقت كافٍ للتعافي بينها.'],
    fitness: ['تحرّك براحة واستعداد', 'أسبوع متنوع يجمع القوة والمرونة والحركة بإيقاع مريح.'],
    'gain-weight': ['قوة على إيقاعك', 'جلسات قوة بوزن الجسم يمكن تكرارها مع راحة موزعة خلال الأسبوع.'],
  },
};
const trainingFocus = {
  en: {
    'lose-weight': ['Full-body flow', 'Low-impact strength', 'Steady movement', 'Core & mobility'],
    'build-muscle': ['Full-body strength', 'Upper-body control', 'Lower-body strength', 'Strength & core'],
    fitness: ['Full-body basics', 'Mobility & balance', 'Strength circuit', 'Core & stretch'],
    'gain-weight': ['Foundational strength', 'Controlled lower body', 'Upper-body strength', 'Full-body strength'],
  },
  ar: {
    'lose-weight': ['حركة للجسم بالكامل', 'قوة منخفضة التأثير', 'حركة بإيقاع ثابت', 'الجذع والمرونة'],
    'build-muscle': ['قوة للجسم بالكامل', 'تحكم الجزء العلوي', 'قوة الجزء السفلي', 'القوة والجذع'],
    fitness: ['أساسيات الجسم بالكامل', 'مرونة وتوازن', 'دائرة قوة', 'الجذع والتمدد'],
    'gain-weight': ['قوة أساسية', 'تحكم الجزء السفلي', 'قوة الجزء العلوي', 'قوة الجسم بالكامل'],
  },
};

export default function WeeklyPlanPage() {
  const { isArabic, locale } = useLocale();
  const profile = useVYORAProfile();
  const [schedule, setSchedule] = useWeeklySchedule();
  const days = isArabic ? arDays : enDays;
  const defaultDays = useMemo(() => {
    const count = profile?.sessionsPerWeek ?? 3;
    return suggestedTrainingDays(count);
  }, [profile?.sessionsPerWeek]);

  useEffect(() => {
    if (schedule.days.length === 0) setSchedule({ ...schedule, days: defaultDays });
  }, [defaultDays, schedule, setSchedule]);

  const selectedDays = schedule.days.length ? schedule.days : defaultDays;
  const goal = profile?.goal ?? 'fitness';
  const heading = goalCopy[isArabic ? 'ar' : 'en'][goal];
  const update = (patch: Partial<typeof schedule>) => setSchedule({ ...schedule, ...patch });

  const toggleDay = (day: number) => {
    const next = selectedDays.includes(day)
      ? selectedDays.filter((item) => item !== day)
      : [...selectedDays, day].sort((a, b) => a - b);
    if (next.length) update({ days: next });
  };

  return (
    <section className="page-enter mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-6 lg:px-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="mb-8 grid gap-6 overflow-hidden rounded-[2rem] border border-border bg-card p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-primary">
            <Sparkles size={14} /> {isArabic ? 'ڤايورا / أسبوعك' : 'VYORA / YOUR WEEK'}
          </p>
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
            {heading[0]}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{heading[1]}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
              {isArabic ? `${selectedDays.length} أيام هذا الأسبوع` : `${selectedDays.length} sessions this week`}
            </span>
            <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-muted-foreground">
              {schedule.level === 'beginner' ? (isArabic ? 'مبتدئ' : 'Beginner') : (isArabic ? 'متوسط' : 'Intermediate')}
            </span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[240px] rounded-3xl bg-primary/5 p-2 sm:w-56">
          <MotionIllustration variant="step" label={isArabic ? 'حركة رياضية' : 'Movement illustration'} className="w-full text-foreground" />
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
        <div className="card-dark p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-primary">{isArabic ? 'الخريطة الأسبوعية' : 'WEEKLY MAP'}</p>
              <h2 className="mt-2 text-xl font-bold">{isArabic ? 'الأيام التي تناسبك' : 'Choose the days that fit'}</h2>
            </div>
            <span className="hidden rounded-full border border-border px-3 py-2 text-xs text-muted-foreground sm:inline-flex">
              {isArabic ? 'يمكنك التعديل في أي وقت' : 'Change these any time'}
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {days.map((day, index) => {
              const active = selectedDays.includes(index);
              const rawPlan = scheduledPlanForDay(
                { days: selectedDays, level: schedule.level, minutes: schedule.minutes },
                index,
                goal,
              );
              const plan = rawPlan ? localizePlan(rawPlan, locale) : undefined;
              const sessionIndex = Math.max(0, selectedDays.indexOf(index));
              const focus = trainingFocus[isArabic ? 'ar' : 'en'][goal][sessionIndex % trainingFocus[isArabic ? 'ar' : 'en'][goal].length];
              return (
                <button
                  key={day}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleDay(index)}
                  data-testid={`button-schedule-day-${index}`}
                  className={`focus-ring press min-h-[142px] rounded-2xl border p-3 text-start transition-colors ${active ? 'border-primary/50 bg-primary/10' : 'border-border bg-muted/40 hover:border-primary/30'}`}
                >
                  <span className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${active ? 'text-primary' : 'text-muted-foreground'}`}>{day}</span>
                    {active && <Check size={15} className="text-primary" />}
                  </span>
                  {active ? (
                    <>
                      <span className="mt-4 block text-sm font-bold leading-snug">{focus}</span>
                      <span className="mt-1 block truncate text-[11px] text-muted-foreground">{plan?.name ?? (isArabic ? 'جلسة حركة' : 'Movement session')}</span>
                      <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock3 size={12} /> {schedule.reminderTime} · {plan?.minutes ?? schedule.minutes} {isArabic ? 'دقيقة' : 'min'}
                      </span>
                    </>
                  ) : (
                    <span className="mt-7 block text-sm text-muted-foreground">{isArabic ? 'يوم راحة' : 'Rest day'}</span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">
            {isArabic ? 'يلزم تحديد يوم تدريب واحد على الأقل. أيام الراحة جزء مهم من روتين متوازن.' : 'Keep at least one training day selected. Rest days are part of a balanced routine.'}
          </p>
        </div>

        <aside className="space-y-5">
          <section className="card-dark p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Dumbbell size={19} /></span>
              <div>
                <h2 className="font-bold">{isArabic ? 'جلسة تناسب يومك' : 'Shape your session'}</h2>
                <p className="text-xs text-muted-foreground">{isArabic ? 'المستوى ومدة الجلسة' : 'Level and session length'}</p>
              </div>
            </div>
            <label className="mt-5 block text-xs font-bold text-muted-foreground" htmlFor="level-select">{isArabic ? 'مستوى التمرين' : 'WORKOUT LEVEL'}</label>
            <select id="level-select" value={schedule.level} onChange={(event) => update({ level: event.target.value as typeof schedule.level })} data-testid="select-schedule-level" className="focus-ring mt-2 w-full rounded-xl border border-border bg-muted px-3 py-3 text-sm">
              <option value="beginner">{isArabic ? 'مبتدئ' : 'Beginner'}</option>
              <option value="intermediate">{isArabic ? 'متوسط' : 'Intermediate'}</option>
            </select>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[10, 20].map((minutes) => (
                <button key={minutes} type="button" aria-pressed={schedule.minutes === minutes} onClick={() => update({ minutes: minutes as 10 | 20 })} data-testid={`button-session-minutes-${minutes}`} className={`focus-ring press rounded-xl border px-3 py-3 text-sm font-bold ${schedule.minutes === minutes ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-muted text-muted-foreground'}`}>
                  {minutes} {isArabic ? 'دقيقة' : 'minutes'}
                </button>
              ))}
            </div>
          </section>

          <section className="card-dark p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Bell size={18} /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-bold">{isArabic ? 'تذكير لطيف' : 'A gentle reminder'}</h2>
                  <input type="checkbox" checked={schedule.reminderEnabled} onChange={(event) => update({ reminderEnabled: event.target.checked })} aria-label={isArabic ? 'تفعيل التذكير' : 'Enable reminder'} data-testid="toggle-workout-reminder" className="h-5 w-5 accent-[hsl(var(--primary))]" />
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{isArabic ? 'يعمل التذكير أثناء فتح ڤايورا.' : 'Reminders work while VYORA is open.'}</p>
                <label htmlFor="reminder-time" className="mt-4 block text-xs font-bold text-muted-foreground">{isArabic ? 'موعد التمرين' : 'WORKOUT TIME'}</label>
                <input id="reminder-time" type="time" value={schedule.reminderTime} onChange={(event) => update({ reminderTime: event.target.value })} data-testid="input-reminder-time" className="focus-ring mt-2 w-full rounded-xl border border-border bg-muted px-3 py-3 text-sm" />
                <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                  {isArabic ? 'يظهر تنبيه في هذا الموعد عند تفعيل التذكير.' : 'A reminder appears at this time when reminders are enabled.'}
                </p>
              </div>
            </div>
          </section>
        </aside>
      </section>
      <footer className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-muted/50 px-5 py-4">
        <p className="text-sm text-muted-foreground">{isArabic ? 'الخطة تراعي وقتك ومستواك مع مساحة كافية للراحة.' : 'Your routine fits your time and level, with room to recover.'}</p>
        <Link href="/plans" data-testid="link-explore-plans" className="focus-ring rounded-full px-3 py-2 text-sm font-bold text-primary hover:bg-primary/10">
          {isArabic ? 'استكشاف الخطط' : 'Explore plans'}
        </Link>
      </footer>
    </section>
  );
}
