import type { MuscleId } from '@/lib/movement-details';
import type { UserGender } from '@/lib/profile';

const frontRegions: { muscle: MuscleId; path: string }[] = [
  { muscle: 'shoulders', path: 'M58 55 Q70 43 83 51 L78 68 Q67 64 58 71 Z M117 51 Q130 43 142 55 L142 71 Q132 64 122 68 Z' },
  { muscle: 'chest', path: 'M72 68 Q83 62 99 68 L98 88 Q83 92 70 82 Z M101 68 Q117 62 129 68 L131 82 Q118 92 102 88 Z' },
  { muscle: 'arms', path: 'M56 70 Q49 79 46 100 L41 124 Q40 132 46 133 Q52 133 54 125 L63 99 L69 78 Z M144 70 Q151 79 154 100 L159 124 Q160 132 154 133 Q148 133 146 125 L137 99 L131 78 Z' },
  { muscle: 'core', path: 'M78 89 Q99 94 122 89 L118 125 Q99 130 82 125 Z' },
  { muscle: 'obliques', path: 'M72 91 L80 93 L83 123 L76 120 Z M120 93 L128 91 L124 120 L117 123 Z' },
  { muscle: 'hip-flexors', path: 'M81 125 Q99 130 118 125 L112 145 Q100 151 88 145 Z' },
  { muscle: 'quads', path: 'M83 147 Q99 151 114 147 L110 188 Q101 194 91 188 Z M116 148 L130 147 L137 188 Q128 194 117 188 Z' },
  { muscle: 'calves', path: 'M91 194 Q101 198 109 194 L106 232 L95 232 Z M119 194 L135 194 L132 232 L121 232 Z' },
];

const backRegions: { muscle: MuscleId; path: string }[] = [
  { muscle: 'shoulders', path: 'M58 55 Q70 43 83 51 L78 69 Q67 65 58 71 Z M117 51 Q130 43 142 55 L142 71 Q132 65 122 69 Z' },
  { muscle: 'upper-back', path: 'M78 66 Q99 57 121 66 L121 104 Q99 115 78 104 Z' },
  { muscle: 'arms', path: 'M56 70 Q49 79 46 100 L41 124 Q40 132 46 133 Q52 133 54 125 L63 99 L69 78 Z M144 70 Q151 79 154 100 L159 124 Q160 132 154 133 Q148 133 146 125 L137 99 L131 78 Z' },
  { muscle: 'glutes', path: 'M82 113 Q99 107 118 113 L120 141 Q100 151 80 141 Z' },
  { muscle: 'hamstrings', path: 'M82 146 Q99 151 114 146 L110 190 Q100 195 91 190 Z M116 146 L130 146 L137 190 Q128 195 117 190 Z' },
  { muscle: 'calves', path: 'M91 194 Q101 198 109 194 L106 232 L95 232 Z M119 194 L135 194 L132 232 L121 232 Z' },
];

function MuscleFigure({
  side,
  primary,
  secondary,
  accent,
}: {
  side: 'front' | 'back';
  primary: MuscleId[];
  secondary: MuscleId[];
  accent: string;
}) {
  const regions = side === 'front' ? frontRegions : backRegions;
  const isActive = (muscle: MuscleId) => primary.includes(muscle);
  const isSecondary = (muscle: MuscleId) => secondary.includes(muscle);

  return (
    <svg viewBox="0 0 200 260" className="h-[230px] w-full max-w-[180px]" role="img" aria-label={side === 'front' ? 'Front muscle anatomy map' : 'Back muscle anatomy map'}>
      <defs>
        <linearGradient id={`skin-${side}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#51565e" />
          <stop offset="1" stopColor="#202329" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="29" r="18" fill={`url(#skin-${side})`} stroke="#7b8089" strokeWidth="1.5" />
      <path d="M88 47 L87 54 Q69 47 57 55 L48 74 L60 83 L67 72 L69 108 L78 117 L79 143 L72 153 L82 194 L89 194 L91 156 L100 151 L109 156 L111 194 L118 194 L128 153 L121 143 L122 117 L131 108 L133 72 L140 83 L152 74 L143 55 Q131 47 113 54 L112 47 Z M81 194 L90 194 L89 237 L79 237 Z M110 194 L119 194 L121 237 L111 237 Z M78 237 L90 237 L92 244 L75 244 Z M111 237 L122 237 L125 244 L108 244 Z" fill={`url(#skin-${side})`} stroke="#7b8089" strokeWidth="1.5" strokeLinejoin="round" />
      <g fill="#30343b" stroke="#747983" strokeWidth="1">
        {regions.map((region, index) => (
          <path
            key={`${region.muscle}-${index}`}
            d={region.path}
            fill={isActive(region.muscle) ? accent : isSecondary(region.muscle) ? `${accent}80` : '#343941'}
            fillOpacity={isActive(region.muscle) ? 0.94 : isSecondary(region.muscle) ? 0.68 : 0.72}
          />
        ))}
      </g>
      <path d="M100 68 L100 147 M83 93 L117 93 M84 104 L116 104" fill="none" stroke="#999ea7" strokeOpacity=".28" strokeWidth="1" />
    </svg>
  );
}

export function AnatomyPair({
  primary,
  secondary,
  gender,
  locale,
}: {
  primary: MuscleId[];
  secondary: MuscleId[];
  gender: UserGender;
  locale: 'ar' | 'en';
}) {
  const accent = gender === 'female' ? '#FF2D8E' : '#6C9CFF';
  const isArabic = locale === 'ar';
  return (
    <section className="card-dark p-4 sm:p-5" data-testid="exercise-anatomy-pair">
      <h2 className="text-sm font-extrabold">{isArabic ? 'خريطة العضلات المستهدفة' : 'Target muscle anatomy'}</h2>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{isArabic ? 'الألوان تبرز العضلات الأساسية، ويظهر التركيز المساعد بدرجة أخف.' : 'Primary muscles are highlighted; supporting muscles appear in a lighter shade.'}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {([
          { side: 'front' as const, label: isArabic ? 'من الأمام' : 'Front' },
          { side: 'back' as const, label: isArabic ? 'من الخلف' : 'Back' },
        ]).map(({ side, label }) => (
          <div key={side} className="flex flex-col items-center rounded-2xl border border-white/[.07] bg-[#101114] px-2 pt-3">
            <span className="text-xs font-bold" style={{ color: accent }}>{label}</span>
            <MuscleFigure side={side} primary={primary} secondary={secondary} accent={accent} />
          </div>
        ))}
      </div>
    </section>
  );
}
