const base = import.meta.env.BASE_URL;
import { SlideTitle } from '@/components/SlideTitle';

export default function ProblemSolution() {
 return (
   <section className="w-screen h-screen overflow-hidden relative deck slide-problem">

<div className="blob left-[3cqw] bottom-[8cqh] w-[40cqw] h-[58cqh] bg-[#9B6BFF] opacity-30" />
<div className="blob right-[3cqw] bottom-[8cqh] w-[40cqw] h-[58cqh] bg-[#FFE6F0] opacity-20" />
<header className="top"><SlideTitle className="heading">المشكلة والحل</SlideTitle><p className="kicker english">Problem & Solution</p></header>
<div className="problem-column absolute top-[31cqh] right-[6cqw] w-[39cqw] text-right" dir="rtl">
<p className="problem-label english text-[6cqw] font-bold m-0">PROBLEM</p>
<p className="copy problem-copy mt-[4cqh]">محتوى متفرّق يصعّب اختيار التمرين.</p>
<div className="rule my-[3cqh]" /><p className="copy problem-copy">غياب التنظيم والمتابعة المستمرة.</p>
<div className="rule my-[3cqh]" /><p className="copy problem-copy">التباس طريقة الأداء والأخطاء الشائعة.</p>
</div>
<div className="solution-column absolute top-[31cqh] left-[6cqw] w-[39cqw] text-right" dir="rtl">
<p className="solution-label english text-[6cqw] font-bold m-0">SOLUTION</p>
<p className="copy solution-copy mt-[4cqh]">مكتبة مصنّفة وفيديو لكل تمرين متاح.</p>
<div className="rule my-[3cqh]" /><p className="copy solution-copy">خطة أسبوعية ومؤقت وسجل للجلسات.</p>
<div className="rule my-[3cqh]" /><p className="copy solution-copy">إرشادات عربية وصور للصح والخطأ.</p>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>03 / 12</span></footer>
  </section>
 );
}
