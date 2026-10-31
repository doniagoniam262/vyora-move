const base = import.meta.env.BASE_URL;

export default function Cover() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck ">

<div className="blob left-[4vw] top-[15vh] w-[42vw] h-[70vh] bg-gradient-to-br from-[#9B6BFF] via-[#6435A5] to-[#FFE6F0] opacity-75" />
<div className="absolute left-[5vw] top-[10vh] w-[39vw] h-[77vh] border border-white/15 rounded-[4vw]" />
<img src={base + 'media/athletes.png'} crossOrigin="anonymous" alt="صورة رياضية أصلية مولدة بالذكاء الاصطناعي لامرأة ورجل" className="absolute left-[3vw] top-[17vh] w-[43vw] h-[76vh] object-contain" />
<div className="absolute left-[6vw] top-[5vh]"><div className="logo-plate"><img src={base + 'media/replit.png'} crossOrigin="anonymous" alt="Official Replit logo" className="w-[9vw]" /><img src={base + 'media/nordpoints.svg'} crossOrigin="anonymous" alt="Official Nordpoints logo" className="w-[13vw]" /></div></div>
<div className="absolute right-[6vw] top-[12vh] w-[48vw] text-right" dir="rtl">
<p className="detail text-primary refined-arabic refined-arabic-detail">مشروع التخرج • 2026</p>
  <h1 className="hero-title english cover-brand mt-[3vh] text-right"><span className="cover-brand-vyora">VYORA</span><span className="block cover-brand-move">MOVE</span></h1>
<p className="copy refined-arabic refined-arabic-copy mt-[3vh]">تدريبك في بيتك… بخطوات واضحة وتجربة تناسبك.</p>
 <div className="mt-[4vh] space-y-[1.6vh] text-left signature-font" dir="ltr">
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
