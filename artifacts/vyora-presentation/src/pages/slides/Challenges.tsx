const base = import.meta.env.BASE_URL;

export default function Challenges() {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck ">

<div className="blob left-[3vw] bottom-[8vh] w-[42vw] h-[52vh] bg-[#9B6BFF] opacity-20" />
<header className="top"><h1 className="heading">التحديات والتطوير المستقبلي</h1><p className="kicker english">Challenges & Future Development</p></header>
<div className="absolute right-[6vw] top-[31vh] w-[40vw] text-right" dir="rtl">
<h2 className="sub text-primary">تحديات تعاملت معها</h2>
<div className="mt-[4vh]"><p className="copy font-bold">مطابقة الفيديو بالتمرين والنوع</p><p className="copy text-muted mt-[1vh]">فصل مصادر الوسائط ومراجعة الربط.</p></div>
<div className="rule my-[3vh]" />
<div><p className="copy font-bold">توحيد الأسماء وحماية السجل</p><p className="copy text-muted mt-[1vh]">أسماء واضحة واختبارات لحفظ البيانات.</p></div>
</div>
<div className="absolute left-[6vw] top-[31vh] w-[40vw] text-right" dir="rtl">
<h2 className="sub text-accent">خطوات مستقبلية</h2>
<p className="copy mt-[4vh]">توسيع مكتبة فيديوهات الولاد.</p>
<div className="rule my-[3vh]" /><p className="copy">مزامنة التقدم بين الأجهزة.</p>
<div className="rule my-[3vh]" /><p className="copy">تقييم دقة تحليل الحركة وتجربة الاستخدام.</p>
<p className="detail text-muted mt-[3vh]">الدفع غير مفعّل حاليًا، ولا توجد اشتراكات مدفوعة فعّالة.</p>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>11 / 12</span></footer>
  </section>
 );
}
