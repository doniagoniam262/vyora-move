const base = import.meta.env.BASE_URL;

export default function ProblemSolution() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck ">

<div className="blob left-[3vw] bottom-[8vh] w-[40vw] h-[58vh] bg-[#9B6BFF] opacity-30" />
<div className="blob right-[3vw] bottom-[8vh] w-[40vw] h-[58vh] bg-[#FFE6F0] opacity-20" />
<header className="top"><h1 className="heading">المشكلة والحل</h1><p className="kicker english">Problem & Solution</p></header>
<div className="absolute top-[31vh] right-[6vw] w-[39vw] text-right" dir="rtl">
<p className="english text-[6vw] font-bold text-primary m-0">PROBLEM</p>
<p className="copy mt-[4vh]">محتوى متفرّق يصعّب اختيار التمرين.</p>
<div className="rule my-[3vh]" /><p className="copy">غياب التنظيم والمتابعة المستمرة.</p>
<div className="rule my-[3vh]" /><p className="copy">التباس طريقة الأداء والأخطاء الشائعة.</p>
</div>
<div className="absolute top-[31vh] left-[6vw] w-[39vw] text-right" dir="rtl">
<p className="english text-[6vw] font-bold text-accent m-0">SOLUTION</p>
<p className="copy mt-[4vh]">مكتبة مصنّفة وفيديو لكل تمرين متاح.</p>
<div className="rule my-[3vh]" /><p className="copy">خطة أسبوعية ومؤقت وسجل للجلسات.</p>
<div className="rule my-[3vh]" /><p className="copy">إرشادات عربية وصور للصح والخطأ.</p>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>03 / 12</span></footer>
  </section>
 );
}
