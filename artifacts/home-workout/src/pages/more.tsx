import { useState } from 'react';
import { Info, Settings, ShieldCheck, Trash2, Mountain, Film, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { clearAllData, useSettings, useWeeklySchedule } from '@/lib/store';
import { Chip, Logo, Modal, Tag } from '@/components/vyora';
import { useToast } from '@/hooks/use-toast';
import { LEVELS, scheduledPlanOptions } from '@/lib/data';

export default function MorePage() {
  const [settings, update] = useSettings();
  const [schedule, setSchedule] = useWeeklySchedule();
  const [confirm, setConfirm] = useState(false);
  const { toast } = useToast();
  const toggleReminder = async () => {
    if (schedule.reminderEnabled) {
      setSchedule({ ...schedule, reminderEnabled: false });
      toast({ title: 'تم إيقاف تذكير التدريب' });
      return;
    }
    let granted = false;
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = Notification.permission === 'default' ? await Notification.requestPermission() : Notification.permission;
        granted = permission === 'granted';
      } catch { granted = false; }
    }
    setSchedule({ ...schedule, reminderEnabled: true });
    toast({
      title: 'تم تفعيل تذكير التدريب',
      description: granted ? `سيظهر تذكير في أيام جدولك عند ${schedule.reminderTime}.` : 'سيظهر التذكير داخل ڤايورا عند فتح التطبيق في موعده.',
    });
  };
  const Sec = ({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <section id={id} data-testid={`section-${id}`} className="card-dark scroll-mt-20 p-4"><h2 className="flex items-center gap-2 text-sm font-extrabold"><span className="text-primary">{icon}</span>{title}</h2><div className="mt-3">{children}</div></section>
  );
  return (
    <div className="page-enter mx-auto max-w-2xl space-y-2.5">
      <h1 className="text-xl font-extrabold">المزيد</h1>
      <Link href="/videos" data-testid="link-more-videos" className="card-dark focus-ring lift flex items-center gap-3 p-3.5">
        <Film className="text-primary" size={20} />
        <span className="flex-1"><b className="block text-sm">تمارين بالفيديو</b><span className="text-xs text-muted-foreground">فيديوهات عربية مع مدربات ومدربين</span></span>
        <ArrowLeft size={16} className="text-muted-foreground" />
      </Link>
      <Sec id="settings" icon={<Settings size={18} />} title="الإعدادات">
        <div className="mb-5 rounded-xl border border-border bg-background/60 p-3.5" data-testid="weekly-schedule-settings">
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-sm font-bold">جدولك الأسبوعي</p><p className="mt-1 text-xs leading-5 text-muted-foreground">اختاري الأيام ومستوى التمرين والوقت الأقصى للجلسة.</p></div>
            <Tag>{schedule.days.length ? `${schedule.days.length} أيام` : 'غير محدد'}</Tag>
          </div>
          <p className="mt-4 text-xs font-bold text-muted-foreground">أيام التمرين</p>
          <div className="mt-2 grid grid-cols-7 gap-1.5" role="group" aria-label="أيام التدريب">
            {[{ day: 6, label: 'س' }, { day: 0, label: 'ح' }, { day: 1, label: 'ن' }, { day: 2, label: 'ث' }, { day: 3, label: 'ر' }, { day: 4, label: 'خ' }, { day: 5, label: 'ج' }].map(({ day, label }) => {
              const active = schedule.days.includes(day);
              const dayName = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'][day];
              return <button key={day} type="button" aria-pressed={active} aria-label={`يوم ${dayName}`} data-testid={`schedule-day-${day}`} onClick={() => setSchedule({ ...schedule, days: active ? schedule.days.filter((d) => d !== day) : [...schedule.days, day].sort() })} className={`focus-ring press rounded-lg py-2 text-xs font-bold ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{label}</button>;
            })}
          </div>
          <p className="mt-4 text-xs font-bold text-muted-foreground">مستواك الحالي</p>
          <div className="mt-2 flex flex-wrap gap-2">{LEVELS.map((level) => <Chip key={level.id} testId={`schedule-level-${level.id}`} active={schedule.level === level.id} onClick={() => setSchedule({ ...schedule, level: level.id })}>{level.label}</Chip>)}</div>
          <p className="mt-4 text-xs font-bold text-muted-foreground">الوقت الأقصى للجلسة</p>
          <div className="mt-2 flex gap-2">{([10, 20] as const).map((minutes) => <Chip key={minutes} testId={`schedule-duration-${minutes}`} active={schedule.minutes === minutes} onClick={() => setSchedule({ ...schedule, minutes })}>{minutes} دقائق</Chip>)}</div>
          {schedule.days.length > 0 && (() => {
            const options = scheduledPlanOptions(schedule);
            return <div className="mt-3 space-y-1 text-xs leading-5 text-muted-foreground" data-testid="schedule-plan-summary">
              <p>{schedule.days.length > 1 ? 'يتناوب جدولك بين:' : 'خطة يومك:'} {options.map((plan) => <b key={plan.id} className="text-foreground"> {plan.name} (نحو {plan.minutes} د)</b>)}</p>
            </div>;
          })()}
          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-muted/60 p-3">
            <div><p className="text-xs font-bold">تذكير في يوم التدريب</p><p className="mt-1 text-[11px] text-muted-foreground">يعمل وقت فتح التطبيق فقط.</p></div>
            <button type="button" role="switch" aria-checked={schedule.reminderEnabled} aria-label="تذكير التدريب" data-testid="toggle-training-reminder" disabled={schedule.days.length === 0 && !schedule.reminderEnabled} onClick={toggleReminder} className={`focus-ring relative h-7 w-12 shrink-0 rounded-full transition-colors ${schedule.reminderEnabled ? 'bg-primary' : 'bg-border'}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${schedule.reminderEnabled ? 'right-1' : 'right-6'}`} /></button>
          </div>
          <label className="mt-3 flex items-center justify-between gap-3 text-xs font-bold">
            وقت التذكير
            <input type="time" aria-label="وقت التذكير" data-testid="input-reminder-time" value={schedule.reminderTime} onChange={(event) => setSchedule({ ...schedule, reminderTime: event.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal" />
          </label>
          <p className="mt-3 text-[11px] leading-5 text-muted-foreground">يعمل التنبيه طالما ڤايورا مفتوح في المتصفح؛ إذا أُغلق، لا يضمن الموقع إرسال إشعار. الجدول لا يغيّر بيانات تقدمك، ويمكنك تعديل اختياراتك في أي وقت.</p>
        </div>
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
      <Modal open={confirm} title="مسح كل البيانات؟" body="سيتم حذف سجل الجلسات والإعدادات والجدول الأسبوعي نهائيًا من هذا الجهاز ولا يمكن التراجع." confirmLabel="نعم، امسح" onCancel={() => setConfirm(false)} onConfirm={() => { clearAllData(); setConfirm(false); toast({ title: 'تم مسح البيانات' }); }} />
    </div>
  );
}
