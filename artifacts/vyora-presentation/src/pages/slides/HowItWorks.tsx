const base = import.meta.env.BASE_URL;

export default function HowItWorks() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck ">

<div className="blob left-[4vw] top-[9vh] w-[25vw] h-[26vh] bg-[#3da7df] opacity-15" />
<header className="top"><h1 className="heading">رحلتك في أربع خطوات</h1><p className="kicker english">How It Works</p></header>
<div className="absolute top-[35vh] left-[6vw] right-[6vw] grid grid-cols-4 gap-[2vw]" dir="rtl">
<div className="bg-[#2e193d] p-[1.8vw] rounded-[1.6vw] h-[42vh]"><p className="english text-[7vw] leading-none text-primary m-0">01</p><h2 className="sub mt-[3vh]">سجّل الدخول</h2><p className="copy mt-[2vh]">أنشئ حسابًا أو ادخل بحسابك.</p></div>
<div className="bg-[#282044] p-[1.8vw] rounded-[1.6vw] h-[42vh]"><p className="english text-[7vw] leading-none text-[#b78aeb] m-0">02</p><h2 className="sub mt-[3vh]">حدّد ملفك</h2><p className="copy mt-[2vh]">اختر النوع والهدف ومستوى التدريب.</p></div>
<div className="bg-[#1b2b4b] p-[1.8vw] rounded-[1.6vw] h-[42vh]"><p className="english text-[7vw] leading-none text-accent m-0">03</p><h2 className="sub mt-[3vh]">اختر خطتك</h2><p className="copy mt-[2vh]">راجع الشرح واضبط أيام الأسبوع.</p></div>
<div className="bg-[#133b52] p-[1.8vw] rounded-[1.6vw] h-[42vh]"><p className="english text-[7vw] leading-none text-accent m-0">04</p><h2 className="sub mt-[3vh]">تمرّن وتابع</h2><p className="copy mt-[2vh]">أكمل المؤقت، قيّم الصعوبة وراجع تقدمك.</p></div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>08 / 12</span></footer>
  </section>
 );
}
