const base = import.meta.env.BASE_URL;

export default function Objectives() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck blue-deck">

<header className="top"><h1 className="heading">أهداف المشروع</h1><p className="kicker english">Project Objectives</p></header>
<img src={base + 'media/fitness-tools.jpg'} crossOrigin="anonymous" alt="معدات بسيطة وتقنية تدعم التدريب المنزلي" className="absolute left-[6cqw] top-[29cqh] w-[43cqw] h-[56cqh] photo rounded-[2cqw]" />
<div className="absolute right-[6cqw] top-[30cqh] w-[39cqw] text-right space-y-[5cqh]" dir="rtl">
<div><h2 className="sub text-accent">تبسيط البداية</h2><p className="copy mt-[1.5cqh]">شرح التمرين بلغة واضحة وخطوات قصيرة.</p></div>
<div className="rule" />
<div><h2 className="sub text-accent">بناء عادة منتظمة</h2><p className="copy mt-[1.5cqh]">ربط الهدف بخطة وجدول قابلين للمتابعة.</p></div>
<div className="rule" />
<div><h2 className="sub text-accent">تخصيص التجربة</h2><p className="copy mt-[1.5cqh]">مراعاة المستوى والوقت والمساحة المتاحة.</p></div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>04 / 12</span></footer>
  </section>
 );
}
