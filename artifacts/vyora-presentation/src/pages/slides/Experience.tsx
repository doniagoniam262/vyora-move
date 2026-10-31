const base = import.meta.env.BASE_URL;

export default function Experience() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck ">

<header className="top"><h1 className="heading">هوية واحدة، وتجربتان</h1><p className="kicker english">User Experience</p></header>
<div className="absolute right-[6vw] top-[28vh] w-[42vw] h-[56vh] bg-gradient-to-br from-[#ad226b] to-[#4d275f] rounded-[2vw] overflow-hidden">
<img src={base + 'media/woman-home.jpg'} crossOrigin="anonymous" alt="تصوير توضيحي للبنات وليس واجهة مصطنعة" className="absolute left-0 top-0 w-full h-[27vh] photo" />
<div className="absolute top-[30vh] right-[2.4vw] left-[2.4vw] text-right" dir="rtl"><h2 className="sub">البنات</h2><p className="copy mt-[1.5vh]">وردي وفوشيا وموف، مع صور وفيديوهات نسائية.</p><p className="detail mt-[2vh] text-white/80">دليل أشكال الجسم متاح للملف الأنثوي.</p></div>
</div>
<div className="absolute left-[6vw] top-[28vh] w-[42vw] h-[56vh] bg-gradient-to-br from-[#176eb3] to-[#142f63] rounded-[2vw] overflow-hidden">
<img src={base + 'media/man-home.jpg'} crossOrigin="anonymous" alt="تصوير توضيحي للولاد وليس واجهة مصطنعة" className="absolute left-0 top-0 w-full h-[27vh] photo" />
<div className="absolute top-[30vh] right-[2.4vw] left-[2.4vw] text-right" dir="rtl"><h2 className="sub">الولاد</h2><p className="copy mt-[1.5vh]">أزرق وسماوي وكحلي، مع الوسائط الرجالية المتاحة.</p><p className="detail mt-[2vh] text-white/80">نفس منطق الخطط والجلسات، ومحتوى مرئي مطابق.</p></div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>07 / 12</span></footer>
  </section>
 );
}
