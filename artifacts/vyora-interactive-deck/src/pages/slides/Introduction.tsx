const base = import.meta.env.BASE_URL;
import { SlideTitle } from '@/components/SlideTitle';

export default function Introduction() {
 return (
   <section className="w-screen h-screen overflow-hidden relative deck pink-deck slide-introduction">

<img src={base + 'media/woman-home.jpg'} crossOrigin="anonymous" alt="تصوير رياضي مولد لتدريب منزلي للبنات" className="absolute left-0 top-0 w-[47cqw] h-[100cqh] photo" />
<div className="absolute left-0 bottom-0 w-[47cqw] h-[24cqh] bg-gradient-to-t from-[#140b21] to-transparent" />
<div className="absolute right-[6cqw] top-[9cqh] w-[42cqw] text-right" dir="rtl">
<SlideTitle className="heading">مقدمة المشروع</SlideTitle><p className="kicker english mt-[1cqh]">Introduction</p>
<p className="text-[5cqw] leading-[1.25] font-extrabold mt-[9cqh]">التمرين المنزلي،<span className="block text-primary">في مكان واحد.</span></p>
<p className="copy mt-[4cqh]">VYORA MOVE تطبيق ويب عربي يجمع شرح الحركة، تنظيم الجلسات ومتابعة التقدم.</p>
<p className="copy mt-[3cqh] text-muted">بدأت الفكرة من الحاجة إلى روتين واضح وسهل الاستخدام على الهاتف.</p>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>02 / 12</span></footer>
  </section>
 );
}
