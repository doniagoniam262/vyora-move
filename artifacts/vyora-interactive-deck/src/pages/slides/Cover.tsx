const base = import.meta.env.BASE_URL;
import { SlideTitle } from '@/components/SlideTitle';

export default function Cover() {
 return (
   <section className="w-screen h-screen overflow-hidden relative deck slide-cover">

<div className="blob left-[4cqw] top-[15cqh] w-[42cqw] h-[70cqh] bg-gradient-to-br from-[#9B6BFF] via-[#6435A5] to-[#FFE6F0] opacity-75" />
<div className="absolute left-[5cqw] top-[10cqh] w-[39cqw] h-[77cqh] border border-white/15 rounded-[4cqw]" />
<img src={base + 'media/athletes.png'} crossOrigin="anonymous" alt="صورة رياضية أصلية مولدة بالذكاء الاصطناعي لامرأة ورجل" className="absolute left-[3cqw] top-[17cqh] w-[43cqw] h-[76cqh] object-contain" />
<div className="absolute left-[6cqw] top-[5cqh]"><div className="logo-plate"><img src={base + 'media/replit.png'} crossOrigin="anonymous" alt="Official Replit logo" className="w-[9cqw]" /><img src={base + 'media/nordpoints.svg'} crossOrigin="anonymous" alt="Official Nordpoints logo" className="w-[13cqw]" /></div></div>
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
