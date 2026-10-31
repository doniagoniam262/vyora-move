import { CountUpNumber } from '@/components/CountUpNumber';

const base = import.meta.env.BASE_URL;
export default function HowItWorks({ active = false }: { active?: boolean }) {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck">

 <div className="blob left-[4vw] top-[9vh] w-[17.5vw] h-[18.2vh] bg-[#9B6BFF] opacity-15" />
<header className="top"><h1 className="heading refined-arabic refined-arabic-title">رحلة المستخدم في التطبيق</h1><p className="kicker english"><CountUpNumber value={7} active={active} /> • User Journey</p></header>
 <div className="journey-cards absolute top-[28vh] left-[6vw] right-[6vw]" dir="rtl">
 <div className="journey-card bg-[#20182f] rounded-[1.2vw]"><p className="english journey-step-number leading-none text-primary m-0">01</p><h2 className="sub journey-step-title refined-arabic mt-[.35vh] line-clamp-2">إنشاء حساب</h2><p className="copy journey-step-copy refined-arabic mt-[.35vh] line-clamp-2">إنشاء حساب أو تسجيل الدخول.</p></div>
 <div className="journey-card bg-[#241a35] rounded-[1.2vw]"><p className="english journey-step-number leading-none text-primary m-0">02</p><h2 className="sub journey-step-title refined-arabic mt-[.35vh] line-clamp-2">اختيار الملف</h2><p className="copy journey-step-copy refined-arabic mt-[.35vh] line-clamp-2">اختيار البنات أو الولاد.</p></div>
 <div className="journey-card bg-[#1c1b31] rounded-[1.2vw]"><p className="english journey-step-number leading-none text-accent m-0">03</p><h2 className="sub journey-step-title refined-arabic mt-[.35vh] line-clamp-2">تحديد الهدف</h2><p className="copy journey-step-copy refined-arabic mt-[.35vh] line-clamp-2">الهدف ومستوى التدريب.</p></div>
 <div className="journey-card bg-[#21182c] rounded-[1.2vw]"><p className="english journey-step-number leading-none text-accent m-0">04</p><h2 className="sub journey-step-title refined-arabic mt-[.35vh] line-clamp-2">بناء الجدول</h2><p className="copy journey-step-copy refined-arabic mt-[.35vh] line-clamp-2">اختيار خطة وأيام التدريب.</p></div>
 <div className="journey-card bg-[#20182f] rounded-[1.2vw]"><p className="english journey-step-number leading-none text-primary m-0">05</p><h2 className="sub journey-step-title refined-arabic mt-[.35vh] line-clamp-2">مشاهدة الإرشاد</h2><p className="copy journey-step-copy refined-arabic mt-[.35vh] line-clamp-2">فيديو وصور توضيحية متاحة.</p></div>
 <div className="journey-card bg-[#241a35] rounded-[1.2vw]"><p className="english journey-step-number leading-none text-accent m-0">06</p><h2 className="sub journey-step-title refined-arabic mt-[.35vh] line-clamp-2">بدء الجلسة</h2><p className="copy journey-step-copy refined-arabic mt-[.35vh] line-clamp-2">مؤقت فعلي وتقييم للصعوبة.</p></div>
 <div className="journey-card bg-[#1c1b31] rounded-[1.2vw]"><p className="english journey-step-number leading-none text-primary m-0">07</p><h2 className="sub journey-step-title refined-arabic mt-[.35vh] line-clamp-2">متابعة التقدم</h2><p className="copy journey-step-copy refined-arabic mt-[.35vh] line-clamp-2">سجل الجلسات والمفضلة.</p></div>
</div>
<section className="absolute left-[6vw] right-[6vw] bottom-[9vh]" dir="rtl" aria-label="التحسينات المقترحة">
 <h2 className="detail refined-arabic refined-arabic-detail text-accent">التحسينات المقترحة</h2>
<div className="mt-[1vh] grid grid-cols-4 gap-[1.5vw]">
<p className="copy refined-arabic text-[1.5vw]">حجز مواعيد آلي</p><p className="copy refined-arabic text-[1.5vw]">لوحة تحكم للإدارة</p><p className="copy refined-arabic text-[1.5vw]">تقييمات العملاء</p><p className="copy refined-arabic text-[1.5vw]">ربط بواتساب بزنس</p>
</div>
 <p className="detail refined-arabic refined-arabic-detail text-muted mt-[2.2vh] text-center">أفكار مستقبلية لم تُنفّذ بعد</p>
</section>
<footer className="foot english"><span>VYORA MOVE</span><span>08 / 12</span></footer>
  </section>
  );
}
