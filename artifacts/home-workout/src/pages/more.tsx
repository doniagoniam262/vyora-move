import { useState } from 'react';
import { Info, Settings, ShieldCheck, Trash2, Mountain, Film, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { clearAllData, useSettings } from '@/lib/store';
import { Chip, Logo, Modal } from '@/components/vyora';
import { useToast } from '@/hooks/use-toast';

export default function MorePage() {
  const [settings, update] = useSettings();
  const [confirm, setConfirm] = useState(false);
  const { toast } = useToast();
  const Sec = ({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <section id={id} data-testid={`section-${id}`} className="card-dark scroll-mt-20 p-4"><h2 className="flex items-center gap-2 text-sm font-extrabold"><span className="text-primary">{icon}</span>{title}</h2><div className="mt-3">{children}</div></section>
  );
  return (
    <div className="page-enter mx-auto max-w-2xl space-y-2.5">
      <h1 className="text-xl font-extrabold">المزيد</h1>
      <Link href="/videos" data-testid="link-more-videos" className="card-dark focus-ring lift flex items-center gap-3 p-3.5">
        <Film className="text-primary" size={20} />
        <span className="flex-1"><b className="block text-sm">تمارين بالفيديو</b><span className="text-xs text-muted-foreground">فيديوهات عربية وإنجليزية مع مدربات ومدربين</span></span>
        <ArrowLeft size={16} className="text-muted-foreground" />
      </Link>
      <Sec id="settings" icon={<Settings size={18} />} title="الإعدادات">
        <p className="text-sm font-bold">الراحة بين الجولات</p>
        <div className="mt-2 flex flex-wrap gap-2">{[10, 15, 20, 30].map((v) => <Chip key={v} testId={`setting-rest-${v}`} active={settings.restSeconds === v} onClick={() => update({ restSeconds: v })}>{v} ثانية</Chip>)}</div>
        <p className="mt-5 text-sm font-bold">هدف الجلسات الأسبوعي</p>
        <div className="mt-2 flex flex-wrap gap-2">{[2, 3, 4, 5, 6, 7].map((v) => <Chip key={v} testId={`setting-goal-${v}`} active={settings.weeklyGoal === v} onClick={() => update({ weeklyGoal: v })}>{v}</Chip>)}</div>
        <p className="mt-4 text-xs text-muted-foreground">تُحفظ الإعدادات تلقائيًا على جهازك.</p>
      </Sec>
      <Sec id="about" icon={<Info size={18} />} title="عن ڤايورا">
        <Logo full />
        <p className="mt-4 text-sm leading-7 text-muted-foreground">ڤايورا مدرّب منزلي لمن يريد تقدمًا واقعيًا بدون معدات: تمارين بوزن الجسم، خطط قصيرة، ومؤقت يرافقك. لا حسابات ولا إعلانات.</p>
      </Sec>
      <Sec id="privacy" icon={<ShieldCheck size={18} />} title="الخصوصية">
        <p className="text-sm leading-7 text-muted-foreground">الجلسات والإعدادات تُحفظ في متصفحك فقط ولا تُرسل إلى خادم ڤايورا. صور معاينة الفيديو مستضافة على YouTube؛ وعند تشغيل فيديو يتصل التطبيق بالموقع لعرضه، وقد يستقبل الموقع بيانات الاتصال وفق سياسة الخصوصية لديه. ڤايورا محتوى عام للياقة ولا يقدّم نصيحة طبية؛ استشر مختصًا عند الحاجة.</p>
      </Sec>
      <Sec id="data" icon={<Trash2 size={18} />} title="البيانات">
        <p className="text-sm text-muted-foreground">احذف كل الجلسات والإعدادات المحفوظة على هذا الجهاز.</p>
        <button onClick={() => setConfirm(true)} data-testid="button-clear-data" className="focus-ring press mt-4 rounded-xl border border-destructive/50 px-5 py-2.5 text-sm font-bold text-destructive hover:bg-destructive/10">مسح كل البيانات</button>
      </Sec>
      <div className="flex flex-col items-center gap-1 py-3 text-center"><Mountain className="text-primary" /><p className="text-sm font-bold">الاستمرارية هي سر النجاح</p><p className="text-xs text-muted-foreground">كل يوم أقرب لهدفك.</p></div>
      <Modal open={confirm} title="مسح كل البيانات؟" body="سيتم حذف سجل الجلسات والإعدادات نهائيًا من هذا الجهاز ولا يمكن التراجع." confirmLabel="نعم، امسح" onCancel={() => setConfirm(false)} onConfirm={() => { clearAllData(); setConfirm(false); toast({ title: 'تم مسح البيانات' }); }} />
    </div>
  );
}
