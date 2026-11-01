import { CountUpNumber } from '@/components/CountUpNumber';
const base = import.meta.env.BASE_URL;

export default function Features({ active = false }: { active?: boolean }) {
 return (
  <section className="w-screen h-screen overflow-hidden relative deck pink-deck">

<div className="absolute right-0 top-0 w-[32cqw] h-[100cqh] bg-gradient-to-b from-[#9B6BFF]/30 to-transparent" />
<header className="top"><h1 className="heading">خصائص موجودة بالفعل</h1><p className="kicker english"><CountUpNumber value={6} active={active} /> • Main Features</p></header>
<div className="absolute top-[30cqh] right-[6cqw] left-[6cqw] grid grid-cols-2 gap-x-[6cqw] gap-y-[5cqh]" dir="rtl">
<div className="flex gap-[1.6cqw]"><svg className="w-[3.2cqw] h-[3.2cqw] text-primary" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="26" height="22" rx="4"/><path d="m13 10 9 6-9 6Z"/></svg><div><h2 className="sub">فيديو وإرشادات الحركة</h2><p className="copy text-muted mt-[1cqh]">عضلات مستهدفة، تنفّس وأخطاء شائعة.</p></div></div>
<div className="flex gap-[1.6cqw]"><svg className="w-[3.2cqw] h-[3.2cqw] text-accent" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="6" width="24" height="23" rx="3"/><path d="M4 13h24M10 3v7M22 3v7M10 18h4m4 0h4m-12 6h4"/></svg><div><h2 className="sub">خطط وجدول أسبوعي</h2><p className="copy text-muted mt-[1cqh]">حسب الهدف والمستوى وتكرار التدريب.</p></div></div>
<div className="flex gap-[1.6cqw]"><svg className="w-[3.2cqw] h-[3.2cqw] text-primary" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="16" cy="18" r="11"/><path d="M12 3h8M16 7V3M16 11v8h6"/></svg><div><h2 className="sub">جلسة بمؤقت فعلي</h2><p className="copy text-muted mt-[1cqh]">إيقاف واستكمال وتقييم للصعوبة.</p></div></div>
<div className="flex gap-[1.6cqw]"><svg className="w-[3.2cqw] h-[3.2cqw] text-accent" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4v24h24M8 22l6-8 6 3 8-12"/></svg><div><h2 className="sub">التقدم والمفضلة</h2><p className="copy text-muted mt-[1cqh]">سجل الجلسات والفيديوهات المشاهَدة.</p></div></div>
<div className="flex gap-[1.6cqw]"><svg className="w-[3.2cqw] h-[3.2cqw] text-primary" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11C3 3 1 18 8 28h16c7-10 5-25-8-17ZM16 11c0-7 4-8 9-8-1 6-4 8-9 8Z"/></svg><div><h2 className="sub">غذاء وتقدير للطاقة</h2><p className="copy text-muted mt-[1cqh]">أفكار وجبات وحاسبة تقديرية للبالغين.</p></div></div>
<div className="flex gap-[1.6cqw]"><svg className="w-[3.2cqw] h-[3.2cqw] text-accent" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="9" width="26" height="19" rx="4"/><path d="m10 9 3-5h6l3 5"/><circle cx="16" cy="18" r="5"/></svg><div><h2 className="sub">تحليل حركة بالكاميرا</h2><p className="copy text-muted mt-[1cqh]">تتبّع إرشادي، وليس تشخيصًا طبيًا.</p></div></div>
</div>
<footer className="foot english"><span>VYORA MOVE</span><span>05 / 12</span></footer>
  </section>
 );
}
