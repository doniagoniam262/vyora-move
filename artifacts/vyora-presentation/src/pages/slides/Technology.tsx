const base = import.meta.env.BASE_URL;

export default function Technology() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck blue-deck">

<header className="top"><h1 className="heading">التقنيات المستخدمة فعليًا</h1><p className="kicker english">Technologies Used</p></header>
<div className="absolute top-[31vh] left-[6vw] right-[6vw] grid grid-cols-3 gap-[3vw] text-right" dir="rtl">
<div><div className="h-[1vh] w-[7vw] bg-primary mb-[4vh]"/><h2 className="sub">الواجهة</h2><p className="copy mt-[3vh]" dir="ltr">TypeScript • React</p><p className="copy mt-[2vh]" dir="ltr">Vite • Tailwind CSS</p><p className="copy mt-[3vh] text-muted">واجهة عربية RTL وتخطيط متجاوب.</p></div>
<div><div className="h-[1vh] w-[7vw] bg-[#9B6BFF] mb-[4vh]"/><h2 className="sub">الحساب والكتالوج</h2><p className="copy mt-[3vh]" dir="ltr">Clerk • Node.js • Express</p><p className="copy mt-[2vh]" dir="ltr">PostgreSQL • Drizzle</p><p className="copy mt-[3vh] text-muted">تسجيل دخول وكتالوج تمارين في قاعدة بيانات.</p></div>
<div><div className="h-[1vh] w-[7vw] bg-accent mb-[4vh]"/><h2 className="sub">داخل المتصفح</h2><p className="copy mt-[3vh]" dir="ltr">localStorage • MediaPipe</p><p className="copy mt-[2vh]" dir="ltr">Web Speech • Web Audio</p><p className="copy mt-[3vh] text-muted">حفظ محلي، تتبّع حركة، وصوت ترحيبي.</p></div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>09 / 12</span></footer>
  </section>
 );
}
