export default function HowItWorks({ active = false }: { active?: boolean }) {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck" data-active={active}>

 <div className="blob how-it-works-blob" />
<header className="how-it-works-header" dir="rtl"><h1 className="heading how-it-works-title">رحلتك في أربع خطوات</h1><p className="how-it-works-subtitle english">How It Works</p></header>
 <div className="how-it-works-cards">
 <div className="how-it-works-card bg-[#2a1731]"><p className="how-it-works-number text-[#ed3b9c] m-0">01</p><h2 className="how-it-works-card-title">سجّل الدخول</h2><p className="how-it-works-card-copy">أنشئ حسابًا أو ادخل بحسابك.</p></div>
 <div className="how-it-works-card bg-[#29203f]"><p className="how-it-works-number text-[#c083e8] m-0">02</p><h2 className="how-it-works-card-title">حدّد ملفك</h2><p className="how-it-works-card-copy">اختر النوع والهدف ومستوى التدريب.</p></div>
 <div className="how-it-works-card bg-[#1b2f50]"><p className="how-it-works-number text-[#53bdf4] m-0">03</p><h2 className="how-it-works-card-title">اختر خطتك</h2><p className="how-it-works-card-copy">راجع الشرح واضبط أيام الأسبوع.</p></div>
 <div className="how-it-works-card bg-[#12384b]"><p className="how-it-works-number text-[#55c9f3] m-0">04</p><h2 className="how-it-works-card-title">تمرّن وتابع</h2><p className="how-it-works-card-copy">أكمل المؤقّت، قيّم الصعوبة وراجع تقدمك.</p></div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>08 / 12</span></footer>
  </section>
  );
}
