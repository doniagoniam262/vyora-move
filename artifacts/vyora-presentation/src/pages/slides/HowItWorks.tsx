export default function HowItWorks({ active = false }: { active?: boolean }) {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck" data-active={active}>

 <div className="blob how-it-works-blob" />
<header className="how-it-works-header" dir="rtl"><h1 className="heading how-it-works-title">رحلتك في أربع خطوات</h1><p className="how-it-works-subtitle english">How It Works</p></header>
 <div className="how-it-works-cards">
 <div className="how-it-works-card bg-[#2a1731]"><div className="how-it-works-number text-[#ed3b9c]">01</div><h3 className="how-it-works-card-title">سجّل الدخول</h3><p className="how-it-works-card-copy">أنشئ حسابًا أو ادخل بحسابك.</p></div>
 <div className="how-it-works-card bg-[#29203f]"><div className="how-it-works-number text-[#c083e8]">02</div><h3 className="how-it-works-card-title">حدّد ملفك</h3><p className="how-it-works-card-copy">اختر النوع والهدف ومستوى التدريب.</p></div>
 <div className="how-it-works-card bg-[#1b2f50]"><div className="how-it-works-number text-[#53bdf4]">03</div><h3 className="how-it-works-card-title">اختر خطتك</h3><p className="how-it-works-card-copy">راجع الشرح واضبط أيام الأسبوع.</p></div>
 <div className="how-it-works-card bg-[#12384b]"><div className="how-it-works-number text-[#55c9f3]">04</div><h3 className="how-it-works-card-title">تمرّن وتابع</h3><p className="how-it-works-card-copy">أكمل المؤقّت، قيّم الصعوبة وراجع تقدمك.</p></div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>08 / 12</span></footer>
  </section>
  );
}
