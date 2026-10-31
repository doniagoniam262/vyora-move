const base = import.meta.env.BASE_URL;

export default function Introduction() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck pink-deck">

<img src={base + 'media/woman-home.jpg'} crossOrigin="anonymous" alt="تصوير رياضي مولد لتدريب منزلي للبنات" className="absolute left-0 top-0 w-[47vw] h-[100vh] photo" />
<div className="absolute left-0 bottom-0 w-[47vw] h-[24vh] bg-gradient-to-t from-[#140b21] to-transparent" />
<div className="absolute right-[6vw] top-[9vh] w-[42vw] text-right" dir="rtl">
<h1 className="heading">مقدمة المشروع</h1><p className="kicker english mt-[1vh]">Introduction</p>
<p className="text-[5vw] leading-[1.25] font-extrabold mt-[9vh]">التمرين المنزلي،<span className="block text-primary">في مكان واحد.</span></p>
<p className="copy mt-[4vh]">VYORA MOVE تطبيق ويب عربي يجمع شرح الحركة، تنظيم الجلسات ومتابعة التقدم.</p>
<p className="copy mt-[3vh] text-muted">بدأت الفكرة من الحاجة إلى روتين واضح وسهل الاستخدام على الهاتف.</p>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>02 / 12</span></footer>
  </section>
 );
}
