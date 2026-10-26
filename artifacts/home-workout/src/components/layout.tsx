import { useEffect, useRef, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Activity, Calendar, Dumbbell, House, LayoutGrid, TrendingUp } from 'lucide-react';
import { Logo } from '@/components/vyora';
import { scheduledPlanForDay } from '@/lib/data';
import { KEYS, useWeeklySchedule } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { useLocale } from '@/lib/locale';
import { Languages } from 'lucide-react';
import { localizePlan } from '@/lib/localized-data';

function TrainingReminder() {
  const { t, locale } = useLocale();
  const [schedule] = useWeeklySchedule();
  const { toast } = useToast();
  const firedToday = useRef('');

  useEffect(() => {
    if (!schedule.reminderEnabled || schedule.days.length === 0) return;
    const checkReminder = () => {
      const now = new Date();
      if (!schedule.days.includes(now.getDay())) return;
      const [hour, minute] = schedule.reminderTime.split(':').map(Number);
      const currentMinute = now.getHours() * 60 + now.getMinutes();
      const targetMinute = hour * 60 + minute;
      if (currentMinute < targetMinute || currentMinute > targetMinute + 59) return;

      const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const reminderKey = `${dateKey}-${schedule.reminderTime}`;
      if (firedToday.current === reminderKey) return;
      try {
        if (localStorage.getItem(KEYS.reminderLast) === reminderKey) return;
      } catch {
        /* session ref still prevents repeats */
      }
      firedToday.current = reminderKey;
      try {
        localStorage.setItem(KEYS.reminderLast, reminderKey);
      } catch {
        /* in-memory guard remains active */
      }

      const plan = scheduledPlanForDay(schedule, now.getDay());
      const message = plan
        ? `${locale === 'ar' ? 'تدريبك اليوم' : 'Today’s workout'}: ${localizePlan(plan, locale).name}. ${locale === 'ar' ? 'افتح ڤايورا وابدأ في الوقت المناسب لك.' : 'Open VYORA and start when it suits you.'}`
        : locale === 'ar'
          ? 'حان موعد تمرينك حسب جدول ڤايورا.'
          : 'It’s time for your scheduled VYORA workout.';
      if ('Notification' in window && Notification.permission === 'granted') {
        try {
          const notice = new Notification(
            locale === 'ar' ? 'موعد تدريبك في ڤايورا' : 'Your VYORA workout reminder',
            { body: message, tag: `vyora-${reminderKey}` },
          );
          if (plan)
            notice.onclick = () => {
              window.focus();
              window.location.assign(`${import.meta.env.BASE_URL}session/${plan.id}`);
            };
          return;
        } catch {
          /* fall back to an in-app reminder */
        }
      }
      toast({ title: locale === 'ar' ? 'موعد تمرينك' : 'Workout reminder', description: message });
    };

    checkReminder();
    const timer = window.setInterval(checkReminder, 15_000);
    return () => window.clearInterval(timer);
  }, [schedule, toast, locale, t]);

  return null;
}

const items = [
  { href: '/', label: 'الرئيسية', Icon: House, id: 'home', match: (l: string) => l === '/' },
  {
    href: '/exercises',
    label: 'التمارين',
    Icon: Dumbbell,
    id: 'exercises',
    match: (l: string) => l.startsWith('/exercises') || l.startsWith('/workouts'),
  },
  {
    href: '/plans',
    label: 'الخطط',
    Icon: Calendar,
    id: 'plans',
    match: (l: string) => l.startsWith('/plans'),
  },
  {
    href: '/videos',
    label: 'دليل الحركة',
    Icon: Activity,
    id: 'movement-guide',
    match: (l: string) => l.startsWith('/videos'),
  },
  {
    href: '/progress',
    label: 'التقدم',
    Icon: TrendingUp,
    id: 'progress',
    match: (l: string) => l.startsWith('/progress') || l.startsWith('/history'),
  },
  {
    href: '/more',
    label: 'المزيد',
    Icon: LayoutGrid,
    id: 'more',
    match: (l: string) => l.startsWith('/more'),
  },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const { locale, setLocale, t, isArabic } = useLocale();
  const [loc] = useLocation();
  const inSession = loc.startsWith('/session');
  const localizedItems = items.map((item) => ({ ...item, label: t(item.label) }));
  return (
    <div className="min-h-[100dvh]" dir={isArabic ? 'rtl' : 'ltr'}>
      <TrainingReminder />
      <a
        href="#main"
        className={`sr-only focus:not-sr-only focus:fixed ${isArabic ? 'focus:right-3' : 'focus:left-3'} focus:top-3 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground`}
      >
        {t('تخطَّ إلى المحتوى')}
      </a>
      <aside
        className={`fixed inset-y-0 ${isArabic ? 'right-0 border-l' : 'left-0 border-r'} z-30 hidden w-64 flex-col border-border bg-[#0a0b0a] p-5 md:flex`}
      >
        <Link href="/" data-testid="link-brand-home" className="focus-ring rounded-xl py-2">
          <Logo full />
        </Link>
        <nav
          aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'}
          className="mt-10 flex flex-col gap-1.5"
        >
          {localizedItems.map(({ href, label, Icon, id, match }) => {
            const on = match(loc);
            return (
              <Link
                key={id}
                href={href}
                data-testid={`link-side-${id}`}
                aria-current={on ? 'page' : undefined}
                className={`focus-ring press flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${on ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          data-testid="button-language-toggle-desktop"
          aria-label={isArabic ? 'Switch language to English' : 'غيّر اللغة إلى العربية'}
          onClick={() => setLocale(isArabic ? 'en' : 'ar')}
          className="focus-ring press mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-bold"
        >
          <Languages size={15} />
          {isArabic ? 'English' : 'العربية'}
        </button>
        <p className="latin mt-auto text-[10px] tracking-[.2em] text-muted-foreground" dir="ltr">
          MOVE BEYOND LIMITS.
        </p>
      </aside>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-2.5 backdrop-blur md:hidden">
        <Link href="/" data-testid="link-brand-home-mobile" className="focus-ring rounded-lg">
          <Logo />
        </Link>
        <button
          type="button"
          data-testid="button-language-toggle"
          aria-label={isArabic ? 'Switch language to English' : 'غيّر اللغة إلى العربية'}
          onClick={() => setLocale(isArabic ? 'en' : 'ar')}
          className="focus-ring press inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-bold"
        >
          <Languages size={15} />
          {isArabic ? 'EN' : 'عربي'}
        </button>
      </header>
      <main
        id="main"
        className={`${isArabic ? 'md:pr-64' : 'md:pl-64'} ${inSession ? '' : 'pb-24 md:pb-10'}`}
      >
        <div className="mx-auto max-w-[1000px] px-4 py-4 md:px-10 md:py-10">{children}</div>
      </main>
      {!inSession && (
        <nav
          aria-label={isArabic ? 'التنقل السفلي' : 'Bottom navigation'}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[#0a0b0a]/95 px-2 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden"
        >
          <ul className="mx-auto grid max-w-lg grid-cols-6">
            {localizedItems.map(({ href, label, Icon, id, match }) => {
              const on = match(loc);
              return (
                <li key={id}>
                  <Link
                    href={href}
                    data-testid={`link-nav-${id}`}
                    aria-current={on ? 'page' : undefined}
                    className={`focus-ring flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition-colors ${on ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    <span
                      className={`grid h-8 w-12 place-items-center rounded-full transition-colors ${on ? 'bg-primary/15' : ''}`}
                    >
                      <Icon size={19} />
                    </span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
