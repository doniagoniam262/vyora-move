const base = import.meta.env.BASE_URL;

export default function ThankYou() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck ">

<div className="blob left-[6cqw] top-[24cqh] w-[32cqw] h-[62cqh] bg-gradient-to-br from-[#9B6BFF] via-[#6435A5] to-[#FFE6F0] opacity-60" />
<img src={base + 'media/athletes.png'} crossOrigin="anonymous" alt="رياضيان في ختام العرض" className="absolute left-[2cqw] top-[22cqh] w-[38cqw] h-[65cqh] object-contain" />
<div className="absolute left-[6cqw] top-[6cqh]"><div className="logo-plate"><img src={base + 'media/replit.png'} crossOrigin="anonymous" alt="Official Replit logo" className="w-[9cqw]" /><img src={base + 'media/nordpoints.svg'} crossOrigin="anonymous" alt="Official Nordpoints logo" className="w-[13cqw]" /></div></div>
<div className="absolute right-[5cqw] top-[12cqh] w-[59cqw] text-center" dir="ltr">
  <h1 className="thank-you-brand m-0">VYORA MOVE</h1>
<p className="thank-you-arabic refined-arabic text-primary mt-[2cqh]" dir="rtl">مش مجرد تمرين، دي بداية لحياة أقوى</p>
 <p className="english signature-font text-[2.1cqw] tracking-[.05em] mt-[2cqh]">HOME FITNESS • LIVE YOUR MOVE</p>
<div className="h-px bg-white/20 my-[4cqh] mx-[6cqw]" />
 <p className="detail text-muted signature-font">Special Thanks to the Project Supervisor:</p>
 <p className="signature-name signature-supervisor mt-[1.5cqh]">Dr. Taha Mahmoud Metwally Nour El-Dein</p>
 <p className="signature-copy text-muted mt-[1cqh]">for his support and guidance</p>
 <p className="signature-copy mt-[4cqh]">Student: <span className="signature-name">Donia Nabil Mesaad Ghoneim</span><span className="detail text-accent block mt-[1cqh]">- Fourth Year 2026</span></p>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>12 / 12</span></footer>
  </section>
 );
}
