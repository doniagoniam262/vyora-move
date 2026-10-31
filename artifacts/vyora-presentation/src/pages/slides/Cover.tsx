const base = import.meta.env.BASE_URL;

export default function Cover() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck ">

<div className="blob left-[4vw] top-[15vh] w-[42vw] h-[70vh] bg-gradient-to-br from-[#eb258e] via-[#703cc1] to-[#2875d6] opacity-75" />
<div className="absolute left-[5vw] top-[10vh] w-[39vw] h-[77vh] border border-white/15 rounded-[4vw]" />
<img src={base + 'media/athletes.png'} crossOrigin="anonymous" alt="صورة رياضية أصلية مولدة بالذكاء الاصطناعي لامرأة ورجل" className="absolute left-[3vw] top-[17vh] w-[43vw] h-[76vh] object-contain" />
<div className="absolute left-[6vw] top-[5vh]"><div className="logo-plate"><img src={base + 'media/replit.png'} crossOrigin="anonymous" alt="Official Replit logo" className="w-[9vw]" /><img src={base + 'media/nordpoints.svg'} crossOrigin="anonymous" alt="Official Nordpoints logo" className="w-[13vw]" /></div></div>
<div className="absolute right-[6vw] top-[12vh] w-[48vw] text-right" dir="rtl">
<p className="detail text-primary font-bold">مشروع التخرج • 2026</p>
<h1 className="hero-title english mt-[3vh] text-right">VYORA<span className="block text-accent">MOVE</span></h1>
<p className="copy mt-[3vh]">تدريبك في بيتك… بخطوات واضحة وتجربة تناسبك.</p>
<div className="mt-[4vh] space-y-[1.6vh] text-left" dir="ltr">
<p className="detail text-muted">Student Name: <span className="text-text font-bold">Donia Nabil Mesaad Ghoneim</span></p>
<p className="detail text-muted">Academic Year: <span className="text-text font-bold">Fourth Year</span></p>
<p className="detail text-muted">Project Supervisor:</p>
<p className="copy font-bold">Taha Mahmoud Metwally Nour El-Dein</p>
</div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>01 / 12</span></footer>
  </section>
 );
}
