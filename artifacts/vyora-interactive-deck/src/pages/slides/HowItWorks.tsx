const slideImage = (import.meta.env.BASE_URL + 'media/how-it-works-reference.jpg');

export default function HowItWorks({ active = false }: { active?: boolean }) {
 return (
   <section className="how-it-works-slide slide-how-it-works w-screen h-screen overflow-hidden relative deck" data-active={active}>
   <img
    src={slideImage}
    alt="شريحة رحلة المستخدم في أربع خطوات"
    crossOrigin="anonymous"
     className="how-it-works-image absolute inset-0 h-full w-full object-cover"
   />
    <div className="how-it-works-mobile-steps" dir="rtl">
     <header><h1>رحلتك في أربع خطوات</h1><span className="english">HOW IT WORKS</span></header>
     <ol>
      <li><strong>01</strong><div><h2>سجّل الدخول</h2><p>أنشئ حسابًا أو ادخل بحسابك.</p></div></li>
      <li><strong>02</strong><div><h2>حدّد ملفك</h2><p>اختر النوع والهدف ومستوى التدريب.</p></div></li>
      <li><strong>03</strong><div><h2>اختر خطتك</h2><p>راجع الشرح واضبط أيام الأسبوع.</p></div></li>
      <li><strong>04</strong><div><h2>تمرّن وتابع</h2><p>أكمل المؤقت، قيّم الصعوبة وراجع تقدمك.</p></div></li>
     </ol>
    </div>
    <div className="how-it-works-bottom-mask" aria-hidden="true" />
  </section>
  );
}
