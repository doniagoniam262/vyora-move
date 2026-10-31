import { CountUpNumber } from '@/components/CountUpNumber';

const base = import.meta.env.BASE_URL;

export default function Audience({ active = false }: { active?: boolean }) {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck blue-deck">

<img src={base + 'media/man-home.jpg'} crossOrigin="anonymous" alt="صورة أصلية لرجل يتدرّب في مساحة منزلية" className="absolute right-0 top-0 w-[48vw] h-[100vh] photo" />
<div className="absolute right-0 bottom-0 w-[48vw] h-[20vh] bg-gradient-to-t from-[#091323] to-transparent" />
<div className="absolute left-[6vw] top-[9vh] w-[40vw] text-right" dir="rtl">
<h1 className="heading">الفئة المستهدفة</h1><p className="kicker english mt-[1vh]"><CountUpNumber value={2} active={active} /> • Target Audience</p>
<p className="text-[5.4vw] leading-[1.2] font-extrabold mt-[7vh]">البنات<span className="block text-accent">والولاد.</span></p>
<p className="copy mt-[4vh]">الراغبون في روتين منزلي منظّم، من المبتدئين إلى المستوى المتوسط.</p>
<p className="copy mt-[3vh] text-muted">لياقة عامة، بناء عضلات، خسارة وزن أو زيادة وزن تدريجية.</p>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>06 / 12</span></footer>
  </section>
 );
}
