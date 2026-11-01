const base = import.meta.env.BASE_URL;
import { SlideTitle } from '@/components/SlideTitle';

export default function Introduction() {
 return (
   <section className="w-screen h-screen overflow-hidden relative deck pink-deck slide-introduction">

  <img src={base + 'media/vyora-slide02-gym-empty.jpg'} crossOrigin="anonymous" alt="صالة جيم احترافية مجهزة بالأوزان ومعدات التدريب" className="absolute left-0 top-0 w-[47cqw] h-[100cqh] photo" />
<div className="absolute left-0 bottom-0 w-[47cqw] h-[24cqh] bg-gradient-to-t from-[#2D1B4E] to-transparent" />
<div className="absolute right-[6cqw] top-[9cqh] w-[42cqw] text-right" dir="rtl">
 <SlideTitle className="heading">فكرة المشروع</SlideTitle><p className="kicker english mt-[1cqh]">Project Idea</p>
<p className="text-[5cqw] leading-[1.25] font-extrabold mt-[9cqh]">التمرين المنزلي،<span className="block text-primary">في مكان واحد.</span></p>
 <p className="copy mt-[4cqh]">منصة ويب عربية للتمرين المنزلي تجمع الخطط المناسبة، شرح الحركات، ومتابعة التقدم للبنات والولاد.</p>
<p className="copy mt-[3cqh] text-muted">بدأت الفكرة من الحاجة إلى روتين واضح وسهل الاستخدام على الهاتف.</p>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>02 / 12</span></footer>
  </section>
 );
}
