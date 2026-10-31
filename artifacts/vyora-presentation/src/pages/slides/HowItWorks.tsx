import { CountUpNumber } from '@/components/CountUpNumber';

const base = import.meta.env.BASE_URL;
export default function HowItWorks({ active = false }: { active?: boolean }) {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck ">

<div className="blob left-[4vw] top-[9vh] w-[25vw] h-[26vh] bg-[#9B6BFF] opacity-15" />
<header className="top"><h1 className="heading">رحلة المستخدم في التطبيق</h1><p className="kicker english"><CountUpNumber value={7} active={active} /> • User Journey</p></header>
<div className="absolute top-[28vh] left-[6vw] right-[6vw] grid grid-cols-4 gap-[1.4vw]" dir="rtl">
<div className="bg-[#20182f] p-[1.4vw] rounded-[1.2vw] h-[23vh]"><p className="english text-[3.5vw] leading-none text-primary m-0">01</p><h2 className="sub mt-[1.2vh]">إنشاء حساب</h2><p className="copy mt-[1vh] text-[1.6vw]">إنشاء حساب أو تسجيل الدخول.</p></div>
<div className="bg-[#241a35] p-[1.4vw] rounded-[1.2vw] h-[23vh]"><p className="english text-[3.5vw] leading-none text-primary m-0">02</p><h2 className="sub mt-[1.2vh]">اختيار الملف</h2><p className="copy mt-[1vh] text-[1.6vw]">اختيار البنات أو الولاد.</p></div>
<div className="bg-[#1c1b31] p-[1.4vw] rounded-[1.2vw] h-[23vh]"><p className="english text-[3.5vw] leading-none text-accent m-0">03</p><h2 className="sub mt-[1.2vh]">تحديد الهدف</h2><p className="copy mt-[1vh] text-[1.6vw]">الهدف ومستوى التدريب.</p></div>
<div className="bg-[#21182c] p-[1.4vw] rounded-[1.2vw] h-[23vh]"><p className="english text-[3.5vw] leading-none text-accent m-0">04</p><h2 className="sub mt-[1.2vh]">بناء الجدول</h2><p className="copy mt-[1vh] text-[1.6vw]">اختيار خطة وأيام التدريب.</p></div>
<div className="bg-[#20182f] p-[1.4vw] rounded-[1.2vw] h-[23vh]"><p className="english text-[3.5vw] leading-none text-primary m-0">05</p><h2 className="sub mt-[1.2vh]">مشاهدة الإرشاد</h2><p className="copy mt-[1vh] text-[1.6vw]">فيديو وصور توضيحية متاحة.</p></div>
<div className="bg-[#241a35] p-[1.4vw] rounded-[1.2vw] h-[23vh]"><p className="english text-[3.5vw] leading-none text-accent m-0">06</p><h2 className="sub mt-[1.2vh]">بدء الجلسة</h2><p className="copy mt-[1vh] text-[1.6vw]">مؤقت فعلي وتقييم للصعوبة.</p></div>
<div className="bg-[#1c1b31] p-[1.4vw] rounded-[1.2vw] h-[23vh]"><p className="english text-[3.5vw] leading-none text-primary m-0">07</p><h2 className="sub mt-[1.2vh]">متابعة التقدم</h2><p className="copy mt-[1vh] text-[1.6vw]">سجل الجلسات والمفضلة.</p></div>
</div>
<section className="absolute left-[6vw] right-[6vw] bottom-[9vh]" dir="rtl" aria-label="التحسينات المقترحة">
<h2 className="detail font-bold text-accent">التحسينات المقترحة • أفكار مستقبلية لم تُنفّذ بعد</h2>
<div className="mt-[1vh] grid grid-cols-4 gap-[1.5vw]">
<p className="copy text-[1.7vw]">حجز مواعيد آلي</p><p className="copy text-[1.7vw]">لوحة تحكم للإدارة</p><p className="copy text-[1.7vw]">تقييمات العملاء</p><p className="copy text-[1.7vw]">ربط بواتساب بزنس</p>
</div>
</section>
<footer className="foot english"><span>VYORA MOVE</span><span>08 / 12</span></footer>
  </section>
  );
}
