const base = import.meta.env.BASE_URL;
import { SlideTitle } from '@/components/SlideTitle';

export default function ThankYou() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck slide-thank-you">

 <div className="cover-gradient-panel closing-gradient-panel" aria-hidden="true" />
 <img src={base + 'media/vyora-cover-gym-models.jpg'} crossOrigin="anonymous" alt="عارضة وعارض لياقة في نادٍ رياضي" className="cover-athletes-image closing-athletes-image" />
  <div className="cover-partners closing-partners"><div className="logo-plate"><img src={base + 'media/replit.png'} crossOrigin="anonymous" alt="Official Replit logo" /><img className="nordpoints-logo" src={base + 'media/nordpoints-logo-white.svg'} crossOrigin="anonymous" alt="Official Nordpoints reversed logo" /></div></div>
<div className="absolute right-[5cqw] top-[12cqh] w-[59cqw] text-center" dir="ltr">
  <SlideTitle className="thank-you-brand m-0">VYORA MOVE</SlideTitle>
<p className="thank-you-arabic refined-arabic text-primary mt-[2cqh]" dir="rtl">مش مجرد تمرين، دي بداية لحياة أقوى</p>
 <p className="english signature-font text-[2.1cqw] tracking-[.05em] mt-[2cqh]">HOME FITNESS • LIVE YOUR MOVE</p>
<div className="h-px bg-white/20 my-[4cqh] mx-[6cqw]" />
 <p className="detail text-muted signature-font">Special Thanks to the Project Supervisor:</p>
 <p className="signature-name signature-supervisor mt-[1.5cqh]">Dr. Taha Mahmoud Metwally Nour El-Dein</p>
 <p className="signature-copy text-muted mt-[1cqh]">for his support and guidance</p>
  <p className="signature-copy mt-[4cqh]">Student: <span className="signature-name">Donia Nabil Mesaad Ghoneim</span></p>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>12 / 12</span></footer>
  </section>
 );
}
