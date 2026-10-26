import { Check, Clock3, Heart, LockKeyhole, Sparkles } from 'lucide-react';
import { useLocale } from '@/lib/locale';
import { useVYORAProfile } from '@/lib/profile-context';

export default function SubscriptionPage() {
  const { isArabic } = useLocale();
  const profile = useVYORAProfile();
  const features = isArabic
    ? ['خطط تدريب منزلية تناسب وقتك ومستواك', 'مكتبة تمارين بوزن الجسم مع إرشادات الحركة', 'متابعة تقدمك محليًا على جهازك', 'تذكيرات مرنة وفق جدولك الأسبوعي']
    : ['Home training plans shaped around your time and level', 'A bodyweight exercise library with movement guidance', 'Progress tracking stored on your device', 'Flexible reminders built around your week'];
  return (
    <section className="page-enter mx-auto w-full max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-8" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="mb-8">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-primary"><Sparkles size={15} /> VYORA / MEMBERSHIP</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{isArabic ? 'كل ما تحتاجه لبناء روتينك' : 'A little more support for your routine'}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          {isArabic ? 'نوضح لك ما يتضمنه استخدام ڤايورا الآن، بكل شفافية.' : 'A clear look at what VYORA offers today, with no surprises.'}
        </p>
      </header>

      <section className="grid overflow-hidden rounded-[2rem] border border-border bg-card lg:grid-cols-[1.1fr_.9fr]">
        <div className="p-6 sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-xs font-bold text-primary"><Heart size={14} /> {isArabic ? 'عضوية ڤايورا' : 'THE VYORA PLAN'}</span>
          <h2 className="mt-6 text-3xl font-extrabold">{isArabic ? 'حركة أكثر، بضغط أقل.' : 'More movement. Less pressure.'}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{isArabic ? 'صُمم ڤايورا ليكون رفيقًا عمليًا للتدريب المنزلي، مع اختيارات تتشكل حول روتينك بدلًا من قالب واحد للجميع.' : 'VYORA is a practical companion for home training, with choices that adapt to your routine instead of a one-size-fits-all template.'}</p>
          <ul className="mt-7 space-y-4">
            {features.map((feature, index) => (
              <li key={feature} data-testid={`text-plan-feature-${index}`} className="flex items-start gap-3 text-sm leading-6">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"><Check size={13} strokeWidth={3} /></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between border-t border-border bg-muted/40 p-6 sm:p-10 lg:border-s lg:border-t-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-muted-foreground">{isArabic ? 'شهريًا' : 'MONTHLY'}</p>
            <p className="mt-3 text-3xl font-extrabold">{isArabic ? 'قريبًا' : 'Coming later'}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{isArabic ? 'لم يتوفر الدفع بعد. لا يوجد سعر أو اشتراك مدفوع نشط في الوقت الحالي.' : 'Payment is not available yet. There is no price or active paid subscription at this time.'}</p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Clock3 size={18} /></span>
              <div>
                <p className="text-sm font-bold">{isArabic ? 'قيد التجهيز' : 'Not available yet'}</p>
                <p className="mt-1 text-xs text-muted-foreground">{isArabic ? 'سنشارك التفاصيل هنا عند جاهزيتها.' : 'Details will appear here when they are ready.'}</p>
              </div>
            </div>
          </div>
          <button type="button" disabled data-testid="button-subscription-checkout" className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-sm font-bold text-primary-foreground">
            <LockKeyhole size={16} />
            {isArabic ? 'الدفع غير متاح حاليًا' : 'Checkout not available yet'}
          </button>
        </div>
      </section>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-primary/5 px-5 py-4">
        <p className="text-sm text-muted-foreground">{profile ? (isArabic ? 'خطتك الحالية مخصصة لهدفك وجدولك.' : 'Your current routine is already tailored to your goal and schedule.') : (isArabic ? 'تشكّل خطتك وفق اختياراتك.' : 'Your routine takes shape around your choices.')}</p>
        <span className="text-xs font-bold text-primary">{isArabic ? 'وضوح قبل كل شيء' : 'Clarity first'}</span>
      </footer>
    </section>
  );
}
