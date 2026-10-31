const base = import.meta.env.BASE_URL;

export default function ThankYou() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck ">

<div className="blob left-[6vw] top-[24vh] w-[32vw] h-[62vh] bg-gradient-to-br from-[#db2a8c] via-[#7739a3] to-[#2c84d9] opacity-60" />
<img src={base + 'media/athletes.png'} crossOrigin="anonymous" alt="رياضيان في ختام العرض" className="absolute left-[2vw] top-[22vh] w-[38vw] h-[65vh] object-contain" />
<div className="absolute left-[6vw] top-[6vh]"><div className="logo-plate"><img src={base + 'media/replit.png'} crossOrigin="anonymous" alt="Official Replit logo" className="w-[9vw]" /><img src={base + 'media/nordpoints.svg'} crossOrigin="anonymous" alt="Official Nordpoints logo" className="w-[13vw]" /></div></div>
<div className="absolute right-[5vw] top-[12vh] w-[59vw] text-center" dir="ltr">
<h1 className="english text-[9vw] leading-none font-bold m-0">THANK YOU</h1>
<p className="english text-[4.6vw] leading-none font-bold text-primary mt-[2vh]">VYORA MOVE</p>
<p className="english text-[2.1vw] tracking-[.05em] mt-[2vh]">HOME FITNESS • LIVE YOUR MOVE</p>
<div className="h-px bg-white/20 my-[4vh] mx-[6vw]" />
<p className="detail text-muted">Special Thanks to the Project Supervisor:</p>
<p className="copy font-bold mt-[1.5vh]">Dr. Taha Mahmoud Metwally Nour El-Dein</p>
<p className="copy text-muted mt-[1vh]">for his support and guidance</p>
<p className="copy mt-[4vh]">Student: Donia Nabil Mesaad Ghoneim</p>
<p className="detail text-accent mt-[1vh]">Fourth Year - 2026</p>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>12 / 12</span></footer>
  </section>
 );
}
