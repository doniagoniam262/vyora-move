const base = import.meta.env.BASE_URL;
import { SlideTitle } from '@/components/SlideTitle';

export default function Experience() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck slide-experience">

<header className="top"><SlideTitle className="heading">هوية واحدة، وتجربتان</SlideTitle><p className="kicker english">User Experience</p></header>
<div className="experience-panel absolute right-[6cqw] top-[24cqh] w-[42cqw] h-[42cqh] bg-gradient-to-br from-[#FF4ECD] via-[#8A2BE2] to-[#2D1B4E] rounded-[2cqw] overflow-hidden">
<div className="experience-photo-frame">
 <img src={base + 'media/experience-woman-standing.jpg'} crossOrigin="anonymous" alt="" aria-hidden="true" className="experience-photo-backdrop" />
 <img src={base + 'media/experience-woman-standing.jpg'} crossOrigin="anonymous" alt="بنت واقفة بكامل الجسم في مساحة لياقة منزلية" className="experience-photo-main experience-photo-girls" />
 <span className="experience-label experience-label-girls">البنات</span>
</div>
<div className="experience-panel-copy text-right" dir="rtl">
  <p className="copy">صور وواجهة مناسبة للبنات.</p>
  <p className="detail text-white/85">دليل أشكال الجسم متاح للبنات.</p>
</div>
</div>
<div className="experience-panel absolute left-[6cqw] top-[24cqh] w-[42cqw] h-[42cqh] bg-gradient-to-br from-[#8A2BE2] via-[#2D1B4E] to-[#FF4ECD] rounded-[2cqw] overflow-hidden">
<div className="experience-photo-frame">
 <img src={base + 'media/experience-man-standing.jpg'} crossOrigin="anonymous" alt="" aria-hidden="true" className="experience-photo-backdrop" />
 <img src={base + 'media/experience-man-standing.jpg'} crossOrigin="anonymous" alt="ولد واقف بكامل الجسم في مساحة لياقة منزلية" className="experience-photo-main experience-photo-boys" />
 <span className="experience-label experience-label-boys">الولاد</span>
</div>
<div className="experience-panel-copy text-right" dir="rtl">
  <p className="copy">صور وواجهة مناسبة للولاد.</p>
  <p className="detail text-white/85">نفس الخطط والجلسات للجميع.</p>
</div>
</div>
<div className="experience-highlights" dir="rtl" aria-label="تمارين ومزايا داخل التطبيق">
  <h3 className="experience-highlights-title">تمارين من التطبيق</h3>
  <div className="experience-exercise-grid">
    <figure className="experience-exercise-card">
      <img className="experience-exercise-backdrop" src={base + 'media/experience-woman-home-squat.jpg'} crossOrigin="anonymous" alt="" aria-hidden="true" />
      <img className="experience-exercise-main" src={base + 'media/experience-woman-home-squat.jpg'} crossOrigin="anonymous" alt="بنت تؤدي تمرين القرفصاء في المنزل" />
      <figcaption>القرفصاء</figcaption>
    </figure>
    <figure className="experience-exercise-card">
      <img className="experience-exercise-backdrop" src={base + 'media/experience-exercise-pushup.jpg'} crossOrigin="anonymous" alt="" aria-hidden="true" />
      <img className="experience-exercise-main" src={base + 'media/experience-exercise-pushup.jpg'} crossOrigin="anonymous" alt="ولد يؤدي تمرين الضغط في المنزل" />
      <figcaption>الضغط</figcaption>
    </figure>
    <figure className="experience-exercise-card">
      <img className="experience-exercise-backdrop" src={base + 'media/experience-exercise-glute-bridge.jpg'} crossOrigin="anonymous" alt="" aria-hidden="true" />
      <img className="experience-exercise-main" src={base + 'media/experience-exercise-glute-bridge.jpg'} crossOrigin="anonymous" alt="بنت تؤدي تمرين رفع الحوض في المنزل" />
      <figcaption>رفع الحوض</figcaption>
    </figure>
  </div>
  <div className="experience-benefit-row" aria-label="مزايا التطبيق">
    <span className="experience-info-label">مزايا</span>
    <span className="experience-info-chip">خطة حسب الهدف</span>
    <span className="experience-info-chip">فيديو وإرشادات</span>
    <span className="experience-info-chip">مؤقّت وتقدّم</span>
  </div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>07 / 12</span></footer>
  </section>
 );
}
