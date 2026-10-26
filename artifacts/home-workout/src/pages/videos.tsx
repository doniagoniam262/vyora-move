import { useMemo, useState } from 'react';
import { ExternalLink, Film, Play, ShieldCheck, Video } from 'lucide-react';
import { Chip, EmptyState, Tag } from '@/components/vyora';
import { trainingVideos, type TrainerFilter } from '@/lib/videos';
import { asset } from '@/lib/data';
import { useLocale } from '@/lib/locale';
import { localizeVideo } from '@/lib/videos';

const filters: { id: TrainerFilter; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'women', label: 'مع مدربة' },
  { id: 'men', label: 'مع مدرب' },
];

function VideoCard({ video }: { video: (typeof trainingVideos)[number] }) {
  const { locale, t } = useLocale();
  video = localizeVideo(video, locale);
  const [playing, setPlaying] = useState(false);
  return (
    <article className="card-dark overflow-hidden" data-testid={`card-video-${video.id}`}>
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
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 grid w-full place-items-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={`${locale === 'ar' ? 'تشغيل فيديو' : 'Play video'} ${video.title}`}
            data-testid={`button-play-video-${video.id}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
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
          <Tag>{video.level}</Tag>
          <Tag tone="dim">{video.language}</Tag>
          {video.trainerGroup === 'mixed' && <Tag tone="dim">للجميع</Tag>}
        </div>
        <div>
          <h2 className="font-extrabold leading-6">{video.title}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{video.trainer}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{video.description}</p>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-lg py-1 text-xs font-bold text-primary"
          data-testid={`link-youtube-${video.id}`}
        >
          {t('فتح على YouTube')} <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

export default function VideosPage() {
  const { locale, t } = useLocale();
  const [filter, setFilter] = useState<TrainerFilter>('all');
  const visible = useMemo(
    () => trainingVideos.filter((video) => filter === 'all' || video.trainerGroup === filter),
    [filter],
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

      <div className="flex flex-wrap gap-2" role="group" aria-label={t('اختيار المدرب')}>
        {filters.map((item) => (
          <Chip key={item.id} testId={`filter-videos-${item.id}`} active={filter === item.id} onClick={() => setFilter(item.id)}>
            {locale === 'ar' ? item.label : ({all:'All',women:'Women trainers',men:'Men trainers'} as Record<string,string>)[item.id]}
          </Chip>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((video) => <VideoCard key={video.id} video={video} />)}
      </div>

      {visible.length === 0 && (
        <EmptyState testId="empty-videos" icon={<Video size={26} />} title={t('لا توجد فيديوهات هنا')} body={t('اختر عرض كل الفيديوهات لمشاهدة المزيد.')} />
      )}

      <aside className="card-dark flex gap-3 p-4 text-xs leading-6 text-muted-foreground">
        <ShieldCheck size={18} className="mt-1 shrink-0 text-primary" />
        <p>{locale === 'ar' ? 'الفيديوهات مستضافة على YouTube وتحتاج اتصالًا بالإنترنت. اختر «تشغيل الفيديو» لإظهاره هنا، أو افتحه على YouTube. توقف عن التمرين عند الشعور بألم.' : 'Videos are hosted on YouTube and require an internet connection. Choose “Play video” to watch here, or open it on YouTube. Stop exercising if you feel pain.'}</p>
      </aside>
    </div>
  );
}
