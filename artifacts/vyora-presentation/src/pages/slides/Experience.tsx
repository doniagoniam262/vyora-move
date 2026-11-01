const base = import.meta.env.BASE_URL;

export default function Experience() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck ">

<header className="top"><h1 className="heading">هوية واحدة، وتجربتان</h1><p className="kicker english">User Experience</p></header>
<div className="experience-panel absolute right-[6vw] top-[24vh] w-[42vw] h-[64vh] bg-gradient-to-br from-[#e956a9] via-[#985cff] to-[#31173f] rounded-[2vw] overflow-hidden">
<div className="experience-photo-frame">
 <img src={base + 'media/experience-woman-squat.jpg'} crossOrigin="anonymous" alt="" aria-hidden="true" className="experience-photo-backdrop" />
 <img src={base + 'media/experience-woman-squat.jpg'} crossOrigin="anonymous" alt="سيدة تؤدي تمرين القرفصاء في المنزل" className="experience-photo-main" />
</div>
<div className="absolute top-[41vh] right-[2.4vw] left-[2.4vw] text-right" dir="rtl"><h2 className="sub">البنات</h2><p className="copy mt-[1.5vh]">وسائط نسائية مطابقة للملف المختار.</p><p className="detail mt-[2vh] text-white/80">دليل أشكال الجسم متاح للملف الأنثوي.</p></div>
</div>
<div className="experience-panel absolute left-[6vw] top-[24vh] w-[42vw] h-[64vh] bg-gradient-to-br from-[#3eb6f2] via-[#3566cf] to-[#111c39] rounded-[2vw] overflow-hidden">
<div className="experience-photo-frame">
 <img src={base + 'media/experience-man-chair.jpg'} crossOrigin="anonymous" alt="" aria-hidden="true" className="experience-photo-backdrop" />
 <img src={base + 'media/experience-man-chair.jpg'} crossOrigin="anonymous" alt="رجل يؤدي تمرين غطس باستخدام كرسي في المنزل" className="experience-photo-main" />
</div>
<div className="absolute top-[41vh] right-[2.4vw] left-[2.4vw] text-right" dir="rtl"><h2 className="sub">الولاد</h2><p className="copy mt-[1.5vh]">وسائط رجالية مطابقة للملف المختار.</p><p className="detail mt-[2vh] text-white/80">نفس منطق الخطط والجلسات، ومحتوى مرئي مطابق.</p></div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>07 / 12</span></footer>
  </section>
 );
}
