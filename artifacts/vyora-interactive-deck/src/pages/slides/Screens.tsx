const base = import.meta.env.BASE_URL;

export default function Screens() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck slide-screens">

<header className="top"><h1 className="heading">صور حقيقية من المشروع</h1><p className="kicker english">Application Screens</p></header>
<img src={base + 'media/app-login.jpg'} crossOrigin="anonymous" alt="لقطة حقيقية حديثة لواجهة الدخول في VYORA MOVE" className="screen absolute left-[6cqw] top-[26cqh] w-[21cqw] h-[59cqh]" />
<img src={base + 'media/app-exercise.jpg'} crossOrigin="anonymous" alt="لقطة حقيقية لصفحة معاينة القرفصاء داخل التطبيق" className="screen absolute left-[30cqw] top-[26cqh] w-[21cqw] h-[59cqh]" />
<div className="absolute right-[6cqw] top-[30cqh] w-[38cqw] text-right" dir="rtl">
<img src={base + 'media/squat-comparison.jpg'} crossOrigin="anonymous" alt="بطاقة القرفصاء النسائية الأصلية التي أرفقتها صاحبة المشروع" className="w-full h-[40cqh] object-contain rounded-[1cqw]" />
<p className="copy mt-[3cqh]">بطاقة الأداء المرفقة</p><p className="detail text-muted mt-[1cqh]">الأداء الصحيح والأخطاء الشائعة، دون إعادة تصميم الواجهة أو الصورة.</p>
</div>
<p className="detail absolute left-[6cqw] top-[86cqh] w-[21cqw] text-center">الدخول وإنشاء الحساب</p>
<p className="detail absolute left-[30cqw] top-[86cqh] w-[21cqw] text-center">الفيديو قبل التشغيل وصور الحركة</p>
<footer className="foot english"><span>VYORA MOVE</span><span>10 / 12</span></footer>
  </section>
 );
}
