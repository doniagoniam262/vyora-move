import { useEffect, useMemo, useState } from 'react';
import { Clock3, ExternalLink, Film, Heart, History, Play, ShieldCheck, Video } from 'lucide-react';
import { Chip, EmptyState, Tag } from '@/components/vyora';
import { formatVideoDuration, trainingVideos, type TrainerFilter } from '@/lib/videos';
import { asset } from '@/lib/data';
import { useLocale } from '@/lib/locale';
import { localizeVideo } from '@/lib/videos';
import { recordVideoWatch, toggleVideoFavorite, useVideoFavorites, useVideoHistory } from '@/lib/store';

const filters: { id: TrainerFilter; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'women', label: 'مع مدربة' },
  { id: 'men', label: 'مع مدرب' },
];

function VideoCard({
  video: sourceVideo,
  favorite,
  onToggleFavorite,
}: {
  video: (typeof trainingVideos)[number];
  favorite: boolean;
  onToggleFavorite: () => void;
}) {
  const { locale, t } = useLocale();
  const video = localizeVideo(sourceVideo, locale);
  const [playing, setPlaying] = useState(false);
  return (
    <article id={`video-${video.id}`} className="card-dark scroll-mt-24 overflow-hidden" data-testid={`card-video-${video.id}`}>
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            data-testid={`iframe-video-${video.id}`}
          />
        ) : (
          <button
            type="button"
            onClick={() => { recordVideoWatch(video.id); setPlaying(true); }}
            className="group absolute inset-0 grid w-full place-items-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={`${locale === 'ar' ? 'تشغيل فيديو' : 'Play video'} ${video.title}`}
            data-testid={`button-play-video-${video.id}`}
          >
            <img
              src={video.thumbnailSource === 'local' ? asset(video.image) : `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              onError={(event) => {
                const image = event.currentTarget;
                if (image.dataset.fallback) return;
                image.dataset.fallback = 'true';
                image.src = asset(video.image);
              }}
              className="absolute inset-0 h-full w-full object-cover opacity-65 transition-opacity group-hover:opacity-80"
            />
            <span className="absolute inset-0 bg-black/25" />
            <span className="relative grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105">
              <Play size={22} fill="currentColor" />
            </span>
            <span className={`absolute bottom-3 ${locale === 'ar' ? 'right-3' : 'left-3'} flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold`}>
              <Video size={14} /> {t('تشغيل الفيديو')}
            </span>
          </button>
        )}
      </div>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          <Tag tone="dim">
            <span className="inline-flex items-center gap-1.5" aria-label={`${t('مدة الفيديو')} ${formatVideoDuration(video.durationSeconds)}`} data-testid={`video-duration-${video.id}`}>
              <Clock3 size={12} aria-hidden="true" />
              <span>{t('مدة الفيديو')}</span>
              <span dir="ltr">{formatVideoDuration(video.durationSeconds)}</span>
            </span>
          </Tag>
          <Tag>{video.level}</Tag>
          <Tag tone="dim">{video.language}</Tag>
          {video.trainerGroup === 'mixed' && <Tag tone="dim">للجميع</Tag>}
        </div>
        <div>
          <h2 className="font-extrabold leading-6">{video.title}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{video.trainer}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{video.description}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onToggleFavorite}
            aria-pressed={favorite}
            aria-label={`${favorite ? t('إزالة من المفضلة') : t('أضف للمفضلة')}: ${video.title}`}
            className={`focus-ring inline-flex items-center gap-2 rounded-lg py-1 text-xs font-bold ${favorite ? 'text-primary' : 'text-muted-foreground'}`}
            data-testid={`button-favorite-${video.id}`}
          >
            <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
            {favorite ? t('في المفضلة') : t('أضف للمفضلة')}
          </button>
          <a
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => recordVideoWatch(video.id)}
            className="focus-ring inline-flex items-center gap-2 rounded-lg py-1 text-xs font-bold text-primary"
            data-testid={`link-youtube-${video.id}`}
          >
            {t('فتح على YouTube')} <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function VideosPage() {
  const { locale, t } = useLocale();
  const [filter, setFilter] = useState<TrainerFilter>('all');
  const videoHistory = useVideoHistory();
  const recentVideos = useMemo(
    () => videoHistory.slice(0, 5).flatMap((entry) => {
      const video = trainingVideos.find((item) => item.id === entry.videoId);
      return video ? [{ entry, video: localizeVideo(video, locale) }] : [];
    }),
    [videoHistory, locale],
  );
  const [collection, setCollection] = useState<'all' | 'favorites' | 'watched'>('all');
  const favorites = useVideoFavorites();
  const watchedIds = useMemo(() => new Set(videoHistory.map((entry) => entry.videoId)), [videoHistory]);
  useEffect(() => {
    try {
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      if (targetId) document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch { /* Ignore malformed fragment identifiers. */ }
  }, []);
  const visible = useMemo(
    () => trainingVideos.filter((video) =>
      (filter === 'all' || video.trainerGroup === filter)
      && (collection === 'all' || (collection === 'favorites' ? favorites.includes(video.id) : watchedIds.has(video.id))),
    ),
    [collection, favorites, filter, watchedIds],
  );

  return (
    <div className="page-enter space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary"><Film size={22} /></span>
          <div>
            <p className="text-xs font-bold text-primary">VYORA VIDEO</p>
            <h1 className="text-3xl font-extrabold">{t('تدريب بالفيديو')}</h1>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          {locale === 'ar' ? 'فيديوهات بشرح عربي مع مدربات ومدربين، بدون الحاجة إلى ترجمة تلقائية. الخطط والتمارين في ڤايورا متاحة للنساء والرجال؛ اختر المستوى والحركة المناسبة لك. الفلتر يحدد المدرب فقط، وليس من يمكنه أداء التمرين.' : 'These existing clips feature spoken Arabic instruction; the clips themselves have not been translated. VYORA plans and exercises are for women and men. Choose the level and movement that suit you. The filter selects a trainer, not who can do the exercise.'}
        </p>
      </header>

      <section className="card-dark p-4 sm:p-5" data-testid="section-watch-history">
        <div className="flex items-center gap-2">
          <History size={19} className="text-primary" />
          <h2 className="text-lg font-extrabold">{t('سجل المشاهدة')}</h2>
          {recentVideos.length > 0 && <Tag>{recentVideos.length}</Tag>}
        </div>
        {recentVideos.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground" data-testid="empty-watch-history">
            {t('شغّل فيديو عشان يبدأ سجل المشاهدة هنا.')}
          </p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {recentVideos.map(({ entry, video }) => (
              <li key={entry.videoId}>
                <button
                  type="button"
                  onClick={() => {
                    setFilter('all');
                    setCollection('all');
                    window.setTimeout(() => document.getElementById(`video-${video.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
                  }}
                  className="focus-ring flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-background/40 p-3 text-start transition-colors hover:border-primary/50"
                  data-testid={`button-history-${video.id}`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">{video.title}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock3 size={13} />
                      {new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(entry.watchedAt))}
                    </span>
                  </span>
                  <Play size={16} className="shrink-0 text-primary" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex flex-wrap gap-2" role="group" aria-label={t('اختيار المدرب')}>
        {filters.map((item) => (
          <Chip key={item.id} testId={`filter-videos-${item.id}`} active={filter === item.id} onClick={() => setFilter(item.id)}>
            {locale === 'ar' ? item.label : ({all:'All',women:'Women trainers',men:'Men trainers'} as Record<string,string>)[item.id]}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label={locale === 'ar' ? 'قائمة الفيديوهات' : 'Video collections'}>
        <Chip testId="filter-videos-collection-all" active={collection === 'all'} onClick={() => setCollection('all')}>{locale === 'ar' ? 'كل الفيديوهات' : 'All videos'}</Chip>
        <Chip testId="filter-videos-collection-favorites" active={collection === 'favorites'} onClick={() => setCollection('favorites')}>{locale === 'ar' ? 'المفضلة' : 'Favorites'} ({favorites.length})</Chip>
        <Chip testId="filter-videos-collection-watched" active={collection === 'watched'} onClick={() => setCollection('watched')}>{locale === 'ar' ? 'شوهدت' : 'Watched'} ({videoHistory.length})</Chip>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            favorite={favorites.includes(video.id)}
            onToggleFavorite={() => toggleVideoFavorite(video.id)}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <EmptyState
          testId="empty-videos"
          icon={<Video size={26} />}
          title={collection === 'favorites' ? (locale === 'ar' ? 'لا توجد فيديوهات مفضلة بعد' : 'No favorite videos yet') : collection === 'watched' ? (locale === 'ar' ? 'لم تشاهدي فيديوهات بعد' : 'No watched videos yet') : t('لا توجد فيديوهات هنا')}
          body={collection === 'all' ? t('اختر عرض كل الفيديوهات لمشاهدة المزيد.') : (locale === 'ar' ? 'يمكنك العودة إلى كل الفيديوهات لحفظ فيديو أو بدء مشاهدته.' : 'Return to all videos to save or start watching one.')}
        />
      )}

      <aside className="card-dark flex gap-3 p-4 text-xs leading-6 text-muted-foreground">
        <ShieldCheck size={18} className="mt-1 shrink-0 text-primary" />
        <p>{locale === 'ar'
          ? 'المفضلة وسجل المشاهدة محفوظان في مساحة التخزين المحلية لهذا المتصفح ولا يُرسلان إلى خادم ڤايورا. تستضيف YouTube صور المعاينة والفيديو وقد تتلقى بيانات اتصال عند تحميلها. يُسجَّل الفيديو عند بدء تشغيله هنا أو فتحه على YouTube، وليس عند اكتماله. الفيديوهات تحتاج اتصالًا بالإنترنت؛ أوقفي التمرين عند الشعور بألم.'
          : 'Favorites and watch history are stored only in this browser and are not sent to VYORA’s server. YouTube hosts previews and videos and may receive connection data when they load. A video is recorded when you start it here or open it on YouTube, not when it finishes. Videos require an internet connection; stop exercising if you feel pain.'}</p>
      </aside>
    </div>
  );
}
