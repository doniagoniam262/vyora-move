import { Link } from 'wouter';
import { Check, Clock3, Heart, History } from 'lucide-react';
import { useSessions, useSettings, fmtDate, useVideoFavorites, useVideoHistory, weekDays, weekStart } from '@/lib/store';
import { EmptyState } from '@/components/vyora';
import { exerciseById, formatTime, planById } from '@/lib/data';
import { useLocale } from '@/lib/locale';
import { localizeExercise, localizePlan } from '@/lib/localized-data';
import { localizeVideo, trainingVideos } from '@/lib/videos';

export default function ProgressPage() {
  const { locale, t } = useLocale();
  const sessions = useSessions();
  const [settings] = useSettings();
  const favoriteIds = useVideoFavorites();
  const videoHistory = useVideoHistory();
  const favoriteVideos = favoriteIds.flatMap((id) => {
    const video = trainingVideos.find((item) => item.id === id);
    return video ? [localizeVideo(video, locale)] : [];
  });
  const watchedVideos = videoHistory.flatMap((entry) => {
    const video = trainingVideos.find((item) => item.id === entry.videoId);
    return video ? [{ ...entry, video: localizeVideo(video, locale) }] : [];
  });
  const start = weekStart();
  const week = sessions.filter((s) => new Date(s.completedAt) >= start).length;
  const totalSec = sessions.reduce((a, s) => a + s.durationSeconds, 0);
  const totalEx = sessions.reduce((a, s) => a + s.completedCount, 0);
  const days = weekDays(sessions);
  const max = Math.max(1, ...days.map((d) => d.count));
  const names = locale === 'ar' ? ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'] : ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const ratio = Math.min(1, week / settings.weeklyGoal);
  const h = Math.floor(totalSec / 3600);
  return (
    <div className="page-enter space-y-3">
      <h1 className="text-xl font-extrabold">{t('التقدم')}</h1>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="card-dark flex items-center gap-4 p-4" data-testid="card-week-ring">
          <div className="relative h-20 w-20 shrink-0"><svg viewBox="0 0 100 100" className="timer-ring h-full w-full"><circle cx="50" cy="50" r="44" fill="none" stroke="hsl(120 3% 15%)" strokeWidth="8" /><circle cx="50" cy="50" r="44" fill="none" stroke="#A4F477" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${ratio * 276} 276`} /></svg><span className="num absolute inset-0 grid place-items-center text-xl font-bold" data-testid="text-week-ratio">{week}/{settings.weeklyGoal}</span></div>
          <div><b>{t('جلسات هذا الأسبوع')}</b><p className="mt-1 text-xs text-muted-foreground">{locale === 'ar' ? `هدفك ${settings.weeklyGoal} جلسات. يمكنك تعديله من المزيد.` : `Your goal is ${settings.weeklyGoal} sessions. Change it under More.`}</p></div>
        </div>
        <div className="grid grid-cols-3 gap-2 md:order-first md:col-span-2">
          <div className="card-dark p-3"><span className="text-[11px] text-muted-foreground">{t('إجمالي الجلسات')}</span><b data-testid="stat-total-sessions" className="num mt-1 block text-2xl text-primary">{sessions.length}</b></div>
          <div className="card-dark p-3"><span className="text-[11px] text-muted-foreground">{t('إجمالي الوقت')}</span><b data-testid="stat-total-time" className="num mt-1 block text-2xl text-primary">{h > 0 ? `${h}:${String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0')}` : formatTime(totalSec)}</b></div>
          <div className="card-dark p-3"><span className="text-[11px] text-muted-foreground">{t('تمارين مكتملة')}</span><b data-testid="stat-total-exercises" className="num mt-1 block text-2xl text-primary">{totalEx}</b></div>
        </div>
      </div>
      <section className="card-dark p-4"><h2 className="text-sm font-extrabold">{t('التقدم الأسبوعي')}</h2>
        <div className="mt-4 flex h-28 items-end gap-2">{days.map((d, i) => <div key={i} className="flex flex-1 flex-col items-center gap-1.5"><div data-testid={`bar-day-${i}`} title={`${d.count}`} className={`w-full rounded-md ${d.count ? 'bg-primary' : 'bg-muted'}`} style={{ height: `${d.count ? 20 + (d.count / max) * 80 : 8}%` }} /><span className="text-[10px] text-muted-foreground">{names[i].slice(0, 3)}</span></div>)}</div>
      </section>
      <h2 className="pt-1 text-sm font-extrabold">{t('آخر التمارين المكتملة')}</h2>
      {sessions.length === 0 ? <EmptyState testId="empty-history" icon={<History size={26} />} title={t('سجلك يبدأ بجلسة')} body={t('لا جلسات محفوظة بعد. أكمل جلسة قصيرة وستظهر هنا بإحصاءات حقيقية.')}><Link href="/plans" data-testid="link-progress-plans" className="btn-lime focus-ring rounded-xl px-6 py-2.5 text-sm">{t('اختر خطة')}</Link></EmptyState>
        : <ul className="space-y-2.5">{sessions.slice(0, 30).map((s) => { const savedPlan = planById(s.planId); const savedExercise = exerciseById(s.planId); const sessionTitle = locale === 'en' ? savedPlan ? localizePlan(savedPlan, locale).name : savedExercise ? localizeExercise(savedExercise, locale).name : s.planName : s.planName; return <li key={s.id} data-testid={`row-session-${s.id}`} className="card-dark flex items-center gap-3 p-3.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-primary"><Check size={16} /></span><span className="flex-1"><b className="block text-sm">{sessionTitle}</b><span className="text-[11px] text-muted-foreground">{fmtDate(s.completedAt, locale)} · {s.completedCount} {locale === 'ar' ? 'تمارين' : 'exercises'}</span></span><span className="num text-sm font-bold">{formatTime(s.durationSeconds)}</span></li>; })}</ul>}
      <section className="card-dark space-y-3 p-4" data-testid="section-video-favorites">
        <h2 className="flex items-center gap-2 text-sm font-extrabold"><Heart size={18} className="text-primary" /> {locale === 'ar' ? 'الفيديوهات المفضلة' : 'Favorite videos'}</h2>
        {favoriteVideos.length ? (
          <ul className="space-y-2">{favoriteVideos.map((video) => (
            <li key={video.id} data-testid={`row-favorite-video-${video.id}`} className="flex items-center gap-3 rounded-xl bg-background/50 p-3">
              <span className="min-w-0 flex-1"><b className="block text-sm">{video.title}</b><span className="text-xs text-muted-foreground">{video.trainer}</span></span>
              <Link href={`/videos#video-${video.id}`} data-testid={`link-favorite-video-${video.id}`} className="focus-ring rounded-lg px-3 py-2 text-xs font-bold text-primary">{locale === 'ar' ? 'عرض الفيديو' : 'View video'}</Link>
            </li>
          ))}</ul>
        ) : <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'لم تحفظي فيديوهات بعد. استخدمي زر القلب في صفحة الفيديوهات.' : 'No videos saved yet. Use the heart button on the videos page.'}</p>}
      </section>
      <section className="card-dark space-y-3 p-4" data-testid="section-video-history">
        <h2 className="flex items-center gap-2 text-sm font-extrabold"><Clock3 size={18} className="text-primary" /> {locale === 'ar' ? 'الفيديوهات التي شاهدتها' : 'Videos you watched'}</h2>
        {watchedVideos.length ? (
          <ul className="space-y-2">{watchedVideos.slice(0, 30).map(({ video, watchedAt }) => (
            <li key={video.id} data-testid={`row-watched-video-${video.id}`} className="flex items-center gap-3 rounded-xl bg-background/50 p-3">
              <span className="min-w-0 flex-1"><b className="block text-sm">{video.title}</b><span className="text-xs text-muted-foreground">{fmtDate(watchedAt, locale)}</span></span>
              <Link href={`/videos#video-${video.id}`} data-testid={`link-watched-video-${video.id}`} className="focus-ring rounded-lg px-3 py-2 text-xs font-bold text-primary">{locale === 'ar' ? 'عرض الفيديو' : 'View video'}</Link>
            </li>
          ))}</ul>
        ) : <p className="text-sm text-muted-foreground">{locale === 'ar' ? 'ستظهر هنا الفيديوهات عند بدء تشغيلها.' : 'Videos will appear here when you start watching them.'}</p>}
      </section>
    </div>
  );
}
