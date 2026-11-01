const base = import.meta.env.BASE_URL;

import { SlideTitle } from '@/components/SlideTitle';

export default function Technology() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck blue-deck slide-technology">

<header className="top"><SlideTitle className="heading">التقنيات المستخدمة فعليًا</SlideTitle><p className="kicker english">Technologies Used</p></header>
<div className="absolute top-[31cqh] left-[6cqw] right-[6cqw] grid grid-cols-3 gap-[3cqw] text-right" dir="rtl">
<div><div className="h-[1cqh] w-[7cqw] bg-primary mb-[4cqh]"/><h2 className="sub">الواجهة</h2><p className="copy mt-[3cqh]" dir="ltr">TypeScript • React</p><p className="copy mt-[2cqh]" dir="ltr">Vite • Tailwind CSS</p><p className="copy mt-[3cqh] text-muted">واجهة عربية RTL وتخطيط متجاوب.</p></div>
<div><div className="h-[1cqh] w-[7cqw] bg-[#8A2BE2] mb-[4cqh]"/><h2 className="sub">الحساب والكتالوج</h2><p className="copy mt-[3cqh]" dir="ltr">Clerk • Node.js • Express</p><p className="copy mt-[2cqh]" dir="ltr">PostgreSQL • Drizzle</p><p className="copy mt-[3cqh] text-muted">تسجيل دخول وكتالوج تمارين في قاعدة بيانات.</p></div>
<div><div className="h-[1cqh] w-[7cqw] bg-accent mb-[4cqh]"/><h2 className="sub">داخل المتصفح</h2><p className="copy mt-[3cqh]" dir="ltr">localStorage • MediaPipe</p><p className="copy mt-[2cqh]" dir="ltr">Web Speech • Web Audio</p><p className="copy mt-[3cqh] text-muted">حفظ محلي، تتبّع حركة، وصوت ترحيبي.</p></div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>09 / 12</span></footer>
  </section>
 );
}
