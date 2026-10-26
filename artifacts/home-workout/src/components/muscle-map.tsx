import type { MuscleId } from '@/lib/movement-details';

const muscleLabels: Record<MuscleId, string> = {
  chest: 'chest',
  shoulders: 'shoulders',
  arms: 'arms',
  'upper-back': 'upper-back',
  core: 'core',
  obliques: 'obliques',
  glutes: 'glutes',
  quads: 'quads',
  hamstrings: 'hamstrings',
  calves: 'calves',
  'hip-flexors': 'hip-flexors',
};

function MuscleShape({
  id,
  active,
  d,
  secondary,
}: {
  id: MuscleId;
  active: boolean;
  d: string;
  secondary: boolean;
}) {
  return (
    <path
      d={d}
      className={`${active ? (secondary ? 'fill-primary/50' : 'fill-primary') : 'fill-[#34323a]'} stroke-[#77737d]/55 transition-colors`}
      strokeWidth="1.4"
      strokeLinejoin="round"
      aria-label={muscleLabels[id]}
    />
  );
}

export function MuscleMap({
  primary,
  secondary,
  locale,
}: {
  primary: MuscleId[];
  secondary: MuscleId[];
  locale: 'ar' | 'en';
}) {
  const active = new Set([...primary, ...secondary]);
  const isPrimary = (id: MuscleId) => primary.includes(id);
  const title = locale === 'ar' ? 'خريطة العضلات' : 'Muscle map';

  return (
    <div className="rounded-[1.4rem] border border-border bg-[#111116] p-4" data-testid="movement-muscle-map">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-bold">{title}</h3>
        <span className="latin text-[9px] tracking-[.18em] text-muted-foreground" dir="ltr">VYORA / ANATOMY</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-[#19181e] px-2 py-3">
          <svg viewBox="0 0 160 280" role="img" aria-label={locale === 'ar' ? 'الجزء الأمامي من الجسم' : 'Front of body'} className="mx-auto h-[180px] w-full max-w-[150px]">
            <circle cx="80" cy="22" r="13" fill="#34323a" stroke="#77737d" strokeWidth="1.4" />
            <path d="M69 39 Q80 34 91 39 L98 48 L95 99 Q80 107 65 99 L62 48Z" fill="#34323a" stroke="#77737d" strokeWidth="1.4" />
            <MuscleShape id="shoulders" active={active.has('shoulders')} secondary={!isPrimary('shoulders')} d="M65 45 Q55 39 49 48 L56 62 L66 60Z" />
            <MuscleShape id="shoulders" active={active.has('shoulders')} secondary={!isPrimary('shoulders')} d="M95 45 Q105 39 111 48 L104 62 L94 60Z" />
            <MuscleShape id="chest" active={active.has('chest')} secondary={!isPrimary('chest')} d="M66 56 Q80 49 94 56 L92 73 Q80 78 68 73Z" />
            <MuscleShape id="core" active={active.has('core')} secondary={!isPrimary('core')} d="M69 76 Q80 80 91 76 L90 101 Q80 105 70 101Z" />
            <MuscleShape id="obliques" active={active.has('obliques')} secondary={!isPrimary('obliques')} d="M65 76 L69 78 L70 99 L65 95Z" />
            <MuscleShape id="obliques" active={active.has('obliques')} secondary={!isPrimary('obliques')} d="M95 76 L91 78 L90 99 L95 95Z" />
            <MuscleShape id="arms" active={active.has('arms')} secondary={!isPrimary('arms')} d="M49 51 Q43 59 40 78 L46 81 Q53 68 56 61Z" />
            <MuscleShape id="arms" active={active.has('arms')} secondary={!isPrimary('arms')} d="M111 51 Q117 59 120 78 L114 81 Q107 68 104 61Z" />
            <path d="M40 79 L38 111 L44 112 L48 82 M120 79 L122 111 L116 112 L112 82" fill="#34323a" stroke="#77737d" strokeWidth="1.4" />
            <MuscleShape id="hip-flexors" active={active.has('hip-flexors')} secondary={!isPrimary('hip-flexors')} d="M69 103 L80 106 L77 122 L65 119Z" />
            <MuscleShape id="hip-flexors" active={active.has('hip-flexors')} secondary={!isPrimary('hip-flexors')} d="M91 103 L80 106 L83 122 L95 119Z" />
            <MuscleShape id="quads" active={active.has('quads')} secondary={!isPrimary('quads')} d="M65 121 L78 124 L75 179 L63 180 L60 147Z" />
            <MuscleShape id="quads" active={active.has('quads')} secondary={!isPrimary('quads')} d="M95 121 L82 124 L85 179 L97 180 L100 147Z" />
            <path d="M63 181 L75 181 L72 226 L62 226 L59 199 M97 181 L85 181 L88 226 L98 226 L101 199" fill="#34323a" stroke="#77737d" strokeWidth="1.4" />
            <MuscleShape id="calves" active={active.has('calves')} secondary={!isPrimary('calves')} d="M62 188 L72 189 L70 219 L62 222 L59 200Z" />
            <MuscleShape id="calves" active={active.has('calves')} secondary={!isPrimary('calves')} d="M98 188 L88 189 L90 219 L98 222 L101 200Z" />
            <path d="M61 227 Q67 224 72 227 L73 239 L55 242 Q54 234 61 227 M99 227 Q93 224 88 227 L87 239 L105 242 Q106 234 99 227" fill="#34323a" stroke="#77737d" strokeWidth="1.4" />
          </svg>
          <p className="mt-1 text-center text-[10px] font-semibold text-muted-foreground">{locale === 'ar' ? 'أمام' : 'FRONT'}</p>
        </div>
        <div className="rounded-2xl bg-[#19181e] px-2 py-3">
          <svg viewBox="0 0 160 280" role="img" aria-label={locale === 'ar' ? 'الجزء الخلفي من الجسم' : 'Back of body'} className="mx-auto h-[180px] w-full max-w-[150px]">
            <circle cx="80" cy="22" r="13" fill="#34323a" stroke="#77737d" strokeWidth="1.4" />
            <path d="M69 39 Q80 34 91 39 L98 48 L95 99 Q80 107 65 99 L62 48Z" fill="#34323a" stroke="#77737d" strokeWidth="1.4" />
            <MuscleShape id="upper-back" active={active.has('upper-back')} secondary={!isPrimary('upper-back')} d="M65 48 Q80 42 95 48 L91 70 L80 76 L69 70Z" />
            <MuscleShape id="shoulders" active={active.has('shoulders')} secondary={!isPrimary('shoulders')} d="M65 45 Q55 39 49 48 L56 62 L66 60Z" />
            <MuscleShape id="shoulders" active={active.has('shoulders')} secondary={!isPrimary('shoulders')} d="M95 45 Q105 39 111 48 L104 62 L94 60Z" />
            <MuscleShape id="arms" active={active.has('arms')} secondary={!isPrimary('arms')} d="M49 51 Q43 59 40 78 L46 81 Q53 68 56 61Z" />
            <MuscleShape id="arms" active={active.has('arms')} secondary={!isPrimary('arms')} d="M111 51 Q117 59 120 78 L114 81 Q107 68 104 61Z" />
            <path d="M40 79 L38 111 L44 112 L48 82 M120 79 L122 111 L116 112 L112 82" fill="#34323a" stroke="#77737d" strokeWidth="1.4" />
            <MuscleShape id="glutes" active={active.has('glutes')} secondary={!isPrimary('glutes')} d="M66 82 Q80 77 94 82 L96 101 Q90 114 80 110 Q70 114 64 101Z" />
            <MuscleShape id="hamstrings" active={active.has('hamstrings')} secondary={!isPrimary('hamstrings')} d="M65 116 L78 118 L75 177 L63 180 L60 147Z" />
            <MuscleShape id="hamstrings" active={active.has('hamstrings')} secondary={!isPrimary('hamstrings')} d="M95 116 L82 118 L85 177 L97 180 L100 147Z" />
            <path d="M63 181 L75 181 L72 226 L62 226 L59 199 M97 181 L85 181 L88 226 L98 226 L101 199" fill="#34323a" stroke="#77737d" strokeWidth="1.4" />
            <MuscleShape id="calves" active={active.has('calves')} secondary={!isPrimary('calves')} d="M62 188 L72 189 L70 219 L62 222 L59 200Z" />
            <MuscleShape id="calves" active={active.has('calves')} secondary={!isPrimary('calves')} d="M98 188 L88 189 L90 219 L98 222 L101 200Z" />
            <path d="M61 227 Q67 224 72 227 L73 239 L55 242 Q54 234 61 227 M99 227 Q93 224 88 227 L87 239 L105 242 Q106 234 99 227" fill="#34323a" stroke="#77737d" strokeWidth="1.4" />
          </svg>
          <p className="mt-1 text-center text-[10px] font-semibold text-muted-foreground">{locale === 'ar' ? 'خلف' : 'BACK'}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-primary" />{locale === 'ar' ? 'العضلة الأساسية' : 'Primary'}</span>
        <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-primary/50" />{locale === 'ar' ? 'عضلات مساعدة' : 'Secondary'}</span>
      </div>
    </div>
  );
}
