const base = import.meta.env.BASE_URL;
import { SlideTitle } from '@/components/SlideTitle';

export default function Cover() {
 return (
   <section className="w-screen h-screen overflow-hidden relative deck slide-cover">

 <div className="cover-gradient-panel" aria-hidden="true" />
 <img src={base + 'media/vyora-cover-gym-models.jpg'} crossOrigin="anonymous" alt="عارضة وعارض لياقة في نادٍ رياضي" className="cover-athletes-image" />
  <div className="cover-partners"><div className="logo-plate"><img src={base + 'media/replit.png'} crossOrigin="anonymous" alt="Official Replit logo" /><img className="nordpoints-logo" src={base + 'media/nordpoints-logo-white.svg'} crossOrigin="anonymous" alt="Official Nordpoints reversed logo" /></div></div>
<div className="absolute right-[6cqw] top-[12cqh] w-[48cqw] text-right" dir="rtl">
  <SlideTitle className="hero-title english cover-brand mt-[3cqh] text-right"><span className="cover-brand-vyora">VYORA</span><span className="block cover-brand-move">MOVE</span></SlideTitle>
<p className="copy refined-arabic refined-arabic-copy mt-[3cqh]">تدريبك في بيتك… بخطوات واضحة وتجربة تناسبك.</p>
 <div className="mt-[4cqh] space-y-[1.6cqh] text-left signature-font" dir="ltr">
 <p className="detail text-muted">Project Supervisor:</p>
 <p className="signature-name signature-supervisor">Dr. Taha Mahmoud Metwally Nour El-Dein</p>
 <p className="detail text-muted">Student Name: <span className="signature-name text-text">Donia Nabil Mesaad Ghoneim</span></p>
 <p className="detail text-muted">Academic Year: <span className="font-bold text-text">Fourth Year</span></p>
</div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>01 / 12</span></footer>
  </section>
 );
}
