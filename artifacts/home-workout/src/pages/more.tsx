import { useState } from 'react';
import { Info, Settings, ShieldCheck, Trash2, Mountain, Film, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { clearAllData, useSettings, useWeeklySchedule } from '@/lib/store';
import { Chip, Logo, Modal, Tag } from '@/components/vyora';
import { useToast } from '@/hooks/use-toast';
import { LEVELS, scheduledPlanOptions } from '@/lib/data';
import { useLocale } from '@/lib/locale';
import { localizePlan } from '@/lib/localized-data';

export default function MorePage() {
  const { locale, t, setLocale } = useLocale();
  const [settings, update] = useSettings();
  const [schedule, setSchedule] = useWeeklySchedule();
  const [confirm, setConfirm] = useState(false);
  const { toast } = useToast();
  const toggleReminder = async () => {
    if (schedule.reminderEnabled) {
      setSchedule({ ...schedule, reminderEnabled: false });
      toast({ title: locale === 'ar' ? 'تم إيقاف تذكير التدريب' : 'Workout reminder turned off' });
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
      title: locale === 'ar' ? 'تم تفعيل تذكير التدريب' : 'Workout reminder enabled',
      description: granted ? (locale === 'ar' ? `سيظهر تذكير في أيام جدولك عند ${schedule.reminderTime}.` : `A reminder will appear on scheduled days at ${schedule.reminderTime}.`) : (locale === 'ar' ? 'سيظهر التذكير داخل ڤايورا عند فتح التطبيق في موعده.' : 'The reminder will appear in VYORA when you open the app around its scheduled time.'),
    });
  };
  const Sec = ({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <section id={id} data-testid={`section-${id}`} className="card-dark scroll-mt-20 p-4"><h2 className="flex items-center gap-2 text-sm font-extrabold"><span className="text-primary">{icon}</span>{title}</h2><div className="mt-3">{children}</div></section>
  );
  return (
    <div className="page-enter mx-auto max-w-2xl space-y-2.5">
      <h1 className="text-xl font-extrabold">{t('المزيد')}</h1>
      <Link href="/videos" data-testid="link-more-videos" className="card-dark focus-ring lift flex items-center gap-3 p-3.5">
        <Film className="text-primary" size={20} />
        <span className="flex-1"><b className="block text-sm">{t('تمارين بالفيديو')}</b><span className="text-xs text-muted-foreground">{t('فيديوهات عربية مع مدربات ومدربين')}</span></span>
        <ArrowLeft size={16} className={locale === 'en' ? 'rotate-180 text-muted-foreground' : 'text-muted-foreground'} />
      </Link>
      <Sec id="settings" icon={<Settings size={18} />} title={t('الإعدادات')}>
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 p-3.5">
          <div><p className="text-sm font-bold">{locale === 'ar' ? 'لغة التطبيق' : 'App language'}</p><p className="mt-1 text-xs text-muted-foreground">{locale === 'ar' ? 'اختر العربية أو الإنجليزية.' : 'Choose Arabic or English.'}</p></div>
          <button type="button" data-testid="button-language-toggle-settings" aria-label={locale === 'ar' ? 'Switch language to English' : 'Switch language to Arabic'} onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')} className="focus-ring press rounded-full border border-border px-3 py-2 text-xs font-bold">{locale === 'ar' ? 'English' : 'العربية'}</button>
        </div>
        <div className="mb-5 rounded-xl border border-border bg-background/60 p-3.5" data-testid="weekly-schedule-settings">
          <div className="flex items-start justify-between gap-3">
             <div><p className="text-sm font-bold">{t('جدولك الأسبوعي')}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{t('اختاري الأيام ومستوى التمرين والوقت الأقصى للجلسة.')}</p></div>
             <Tag>{schedule.days.length ? `${schedule.days.length} ${t('أيام تدريب')}` : t('غير محدد')}</Tag>
          </div>
           <p className="mt-4 text-xs font-bold text-muted-foreground">{t('أيام التمرين')}</p>
           <div className="mt-2 grid grid-cols-7 gap-1.5" role="group" aria-label={t('أيام التمرين')}>
            {[{ day: 6, label: 'س' }, { day: 0, label: 'ح' }, { day: 1, label: 'ن' }, { day: 2, label: 'ث' }, { day: 3, label: 'ر' }, { day: 4, label: 'خ' }, { day: 5, label: 'ج' }].map(({ day, label }) => {
              const active = schedule.days.includes(day);
               const dayName = (locale === 'ar' ? ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'] : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])[day];
               const labels = locale === 'ar' ? ['ح','ن','ث','ر','خ','ج','س'] : ['S','M','T','W','T','F','S'];
               return <button key={day} type="button" aria-pressed={active} aria-label={`${locale === 'ar' ? 'يوم' : 'Day'} ${dayName}`} data-testid={`schedule-day-${day}`} onClick={() => setSchedule({ ...schedule, days: active ? schedule.days.filter((d) => d !== day) : [...schedule.days, day].sort() })} className={`focus-ring press rounded-lg py-2 text-xs font-bold ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{labels[day]}</button>;
            })}
          </div>
           <p className="mt-4 text-xs font-bold text-muted-foreground">{t('مستواك الحالي')}</p>
           <div className="mt-2 flex flex-wrap gap-2">{LEVELS.map((level) => <Chip key={level.id} testId={`schedule-level-${level.id}`} active={schedule.level === level.id} onClick={() => setSchedule({ ...schedule, level: level.id })}>{t(level.label)}</Chip>)}</div>
           <p className="mt-4 text-xs font-bold text-muted-foreground">{t('الوقت الأقصى للجلسة')}</p>
           <div className="mt-2 flex gap-2">{([10, 20] as const).map((minutes) => <Chip key={minutes} testId={`schedule-duration-${minutes}`} active={schedule.minutes === minutes} onClick={() => setSchedule({ ...schedule, minutes })}>{minutes} {locale === 'ar' ? 'دقائق' : 'min'}</Chip>)}</div>
          {schedule.days.length > 0 && (() => {
            const options = scheduledPlanOptions(schedule);
            return <div className="mt-3 space-y-1 text-xs leading-5 text-muted-foreground" data-testid="schedule-plan-summary">
               <p>{schedule.days.length > 1 ? t('يتناوب جدولك بين:') : t('خطة يومك:')} {options.map((plan) => <b key={plan.id} className="text-foreground"> {localizePlan(plan, locale).name} ({t('نحو')} {plan.minutes} {locale === 'ar' ? 'د' : 'min'})</b>)}</p>
            </div>;
          })()}
          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-muted/60 p-3">
             <div><p className="text-xs font-bold">{t('تذكير في يوم التدريب')}</p><p className="mt-1 text-[11px] text-muted-foreground">{t('يعمل وقت فتح التطبيق فقط.')}</p></div>
             <button type="button" role="switch" aria-checked={schedule.reminderEnabled} aria-label={t('تذكير التدريب')} data-testid="toggle-training-reminder" disabled={schedule.days.length === 0 && !schedule.reminderEnabled} onClick={toggleReminder} className={`focus-ring relative h-7 w-12 shrink-0 rounded-full transition-colors ${schedule.reminderEnabled ? 'bg-primary' : 'bg-border'}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${schedule.reminderEnabled ? (locale === 'ar' ? 'right-1' : 'left-1') : (locale === 'ar' ? 'right-6' : 'left-6')}`} /></button>
          </div>
          <label className="mt-3 flex items-center justify-between gap-3 text-xs font-bold">
             {t('وقت التذكير')}
             <input type="time" aria-label={t('وقت التذكير')} data-testid="input-reminder-time" value={schedule.reminderTime} onChange={(event) => setSchedule({ ...schedule, reminderTime: event.target.value })} className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal" />
          </label>
           <p className="mt-3 text-[11px] leading-5 text-muted-foreground">{locale === 'ar' ? 'يعمل التنبيه طالما ڤايورا مفتوح في المتصفح؛ إذا أُغلق، لا يضمن الموقع إرسال إشعار. الجدول لا يغيّر بيانات تقدمك، ويمكنك تعديل اختياراتك في أي وقت.' : 'Reminders work while VYORA is open in your browser; if it is closed, the site cannot guarantee a notification. Your schedule does not change your progress data, and you can edit your choices at any time.'}</p>
        </div>
         <p className="text-sm font-bold">{t('الراحة بين الجولات')}</p>
         <div className="mt-2 flex flex-wrap gap-2">{[10, 15, 20, 30].map((v) => <Chip key={v} testId={`setting-rest-${v}`} active={settings.restSeconds === v} onClick={() => update({ restSeconds: v })}>{v} {t('ثانية')}</Chip>)}</div>
         <p className="mt-5 text-sm font-bold">{t('هدف الجلسات الأسبوعي')}</p>
        <div className="mt-2 flex flex-wrap gap-2">{[2, 3, 4, 5, 6, 7].map((v) => <Chip key={v} testId={`setting-goal-${v}`} active={settings.weeklyGoal === v} onClick={() => update({ weeklyGoal: v })}>{v}</Chip>)}</div>
         <p className="mt-4 text-xs text-muted-foreground">{t('تُحفظ الإعدادات تلقائيًا على جهازك.')}</p>
      </Sec>
       <Sec id="about" icon={<Info size={18} />} title={t('عن ڤايورا')}>
        <Logo full />
         <p className="mt-4 text-sm leading-7 text-muted-foreground">{t('ڤايورا مدرّب منزلي لمن يريد تقدمًا واقعيًا بدون معدات: تمارين بوزن الجسم، خطط قصيرة، ومؤقت يرافقك. لا حسابات ولا إعلانات.')}</p>
      </Sec>
       <Sec id="privacy" icon={<ShieldCheck size={18} />} title={t('الخصوصية')}>
          <p className="text-sm leading-7 text-muted-foreground">{locale === 'ar'
            ? 'الجلسات والإعدادات والمفضلة وسجل مشاهدة الفيديوهات تُحفظ في مساحة التخزين المحلية بمتصفحك ولا تُرسل إلى خادم ڤايورا. تستضيف YouTube صور معاينة الفيديو، وقد تتلقى بيانات اتصال عند تحميل الصور أو تشغيل الفيديو وفق سياسة الخصوصية لديها. ڤايورا محتوى عام للياقة ولا يقدّم نصيحة طبية؛ استشر مختصًا عند الحاجة.'
            : 'Workout sessions, settings, favorites, and video watch history are stored locally in this browser and are not sent to VYORA’s server. YouTube hosts video previews and may receive connection data when images or videos load, according to its privacy policy. VYORA provides general fitness content, not medical advice; consult a professional when needed.'}</p>
       </Sec>
        <Sec id="data" icon={<Trash2 size={18} />} title={t('البيانات')}>
           <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'احذف الجلسات والإعدادات والجدول الأسبوعي والمفضلة وسجل المشاهدة المحفوظة على هذا الجهاز.' : 'Delete sessions, settings, your weekly schedule, favorites, and watch history saved on this device.'}</p>
          <button onClick={() => setConfirm(true)} data-testid="button-clear-data" className="focus-ring press mt-4 rounded-xl border border-destructive/50 px-5 py-2.5 text-sm font-bold text-destructive hover:bg-destructive/10">{t('مسح كل البيانات')}</button>
       </Sec>
        <div className="flex flex-col items-center gap-1 py-3 text-center"><Mountain className="text-primary" /><p className="text-sm font-bold">{t('الاستمرارية هي سر النجاح')}</p><p className="text-xs text-muted-foreground">{t('كل يوم أقرب لهدفك.')}</p></div>
         <Modal open={confirm} title={t('مسح كل البيانات؟')} body={locale === 'ar' ? 'سيتم حذف سجل الجلسات والمفضلة وسجل المشاهدة والإعدادات والجدول الأسبوعي نهائيًا من هذا الجهاز ولا يمكن التراجع.' : 'This permanently deletes workout sessions, favorites, watch history, settings, and your weekly schedule from this device. This cannot be undone.'} confirmLabel={t('نعم، امسح')} onCancel={() => setConfirm(false)} onConfirm={() => { clearAllData(); setConfirm(false); toast({ title: locale === 'ar' ? 'تم مسح البيانات' : 'Data deleted' }); }} />
    </div>
  );
}
