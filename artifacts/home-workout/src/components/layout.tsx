import type { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Calendar, Dumbbell, Film, House, LayoutGrid, TrendingUp } from 'lucide-react';
import { Logo } from '@/components/vyora';

const items = [
  { href: '/', label: 'الرئيسية', Icon: House, id: 'home', match: (l: string) => l === '/' },
  { href: '/exercises', label: 'التمارين', Icon: Dumbbell, id: 'exercises', match: (l: string) => l.startsWith('/exercises') || l.startsWith('/workouts') },
  { href: '/plans', label: 'الخطط', Icon: Calendar, id: 'plans', match: (l: string) => l.startsWith('/plans') },
  { href: '/videos', label: 'الفيديو', Icon: Film, id: 'videos', match: (l: string) => l.startsWith('/videos') },
  { href: '/progress', label: 'التقدم', Icon: TrendingUp, id: 'progress', match: (l: string) => l.startsWith('/progress') || l.startsWith('/history') },
  { href: '/more', label: 'المزيد', Icon: LayoutGrid, id: 'more', match: (l: string) => l.startsWith('/more') },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [loc] = useLocation();
  const inSession = loc.startsWith('/session');
  return (
    <div className="min-h-[100dvh]" dir="rtl">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:right-3 focus:top-3 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">تخطَّ إلى المحتوى</a>
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-64 flex-col border-l border-border bg-[#0a0b0a] p-5 md:flex">
        <Link href="/" data-testid="link-brand-home" className="focus-ring rounded-xl py-2"><Logo full /></Link>
        <nav aria-label="التنقل الرئيسي" className="mt-10 flex flex-col gap-1.5">
          {items.map(({ href, label, Icon, id, match }) => {
            const on = match(loc);
            return (
              <Link key={id} href={href} data-testid={`link-side-${id}`} aria-current={on ? 'page' : undefined} className={`focus-ring press flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${on ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <Icon size={18} />{label}
              </Link>
            );
          })}
        </nav>
        <p className="latin mt-auto text-[10px] tracking-[.2em] text-muted-foreground" dir="ltr">MOVE BEYOND LIMITS.</p>
      </aside>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-2.5 backdrop-blur md:hidden">
        <Link href="/" data-testid="link-brand-home-mobile" className="focus-ring rounded-lg"><Logo /></Link>
      </header>
      <main id="main" className={`md:pr-64 ${inSession ? '' : 'pb-24 md:pb-10'}`}>
        <div className="mx-auto max-w-[1000px] px-4 py-4 md:px-10 md:py-10">{children}</div>
      </main>
      {!inSession && (
        <nav aria-label="التنقل السفلي" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[#0a0b0a]/95 px-2 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden">
            <ul className="mx-auto grid max-w-lg grid-cols-6">
            {items.map(({ href, label, Icon, id, match }) => {
              const on = match(loc);
              return (
                <li key={id}>
                  <Link href={href} data-testid={`link-nav-${id}`} aria-current={on ? 'page' : undefined} className={`focus-ring flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition-colors ${on ? 'text-primary' : 'text-muted-foreground'}`}>
                    <span className={`grid h-8 w-12 place-items-center rounded-full transition-colors ${on ? 'bg-primary/15' : ''}`}><Icon size={19} /></span>{label}
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
