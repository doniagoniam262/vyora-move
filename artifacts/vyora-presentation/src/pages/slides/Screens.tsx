const base = import.meta.env.BASE_URL;

export default function Screens() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck ">

<header className="top"><h1 className="heading">صور حقيقية من المشروع</h1><p className="kicker english">Application Screens</p></header>
<img src={base + 'media/app-login.jpg'} crossOrigin="anonymous" alt="لقطة حقيقية حديثة لواجهة الدخول في VYORA MOVE" className="screen absolute left-[6vw] top-[26vh] w-[21vw] h-[59vh]" />
<img src={base + 'media/app-exercise.jpg'} crossOrigin="anonymous" alt="لقطة حقيقية لصفحة معاينة القرفصاء داخل التطبيق" className="screen absolute left-[30vw] top-[26vh] w-[21vw] h-[59vh]" />
<div className="absolute right-[6vw] top-[30vh] w-[38vw] text-right" dir="rtl">
<img src={base + 'media/squat-comparison.jpg'} crossOrigin="anonymous" alt="بطاقة القرفصاء النسائية الأصلية التي أرفقتها صاحبة المشروع" className="w-full h-[40vh] object-contain rounded-[1vw]" />
<p className="copy mt-[3vh]">بطاقة الأداء المرفقة</p><p className="detail text-muted mt-[1vh]">الأداء الصحيح والأخطاء الشائعة، دون إعادة تصميم الواجهة أو الصورة.</p>
</div>
<p className="detail absolute left-[6vw] top-[86vh] w-[21vw] text-center">الدخول وإنشاء الحساب</p>
<p className="detail absolute left-[30vw] top-[86vh] w-[21vw] text-center">الفيديو قبل التشغيل وصور الحركة</p>
<footer className="foot english"><span>VYORA MOVE</span><span>10 / 12</span></footer>
  </section>
 );
}
