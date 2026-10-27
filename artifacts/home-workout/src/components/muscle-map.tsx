import { Layers, Target } from 'lucide-react';
import { muscleNames, type MuscleId } from '@/lib/movement-details';

export function MuscleMap({
  primary,
  secondary,
  locale,
}: {
  primary: MuscleId[];
  secondary: MuscleId[];
  locale: 'ar' | 'en';
}) {
  const isArabic = locale === 'ar';
  return (
    <section className="overflow-hidden rounded-[1.4rem] border border-border bg-gradient-to-br from-primary/[.08] via-card to-card p-5" data-testid="movement-muscle-map">
      <header className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold">{isArabic ? 'العضلات المستهدفة' : 'Target muscles'}</h3>
        <Target size={19} className="text-primary" aria-hidden="true" />
      </header>
      <div className="space-y-5">
        {[{ ids: [...new Set(primary)], main: true }, { ids: [...new Set(secondary)].filter(id => !primary.includes(id)), main: false }].map(({ ids, main }) => ids.length > 0 && (
          <div key={String(main)}>
            <p className="mb-2.5 text-[11px] font-semibold text-muted-foreground">
              {main ? (isArabic ? 'التركيز الأساسي' : 'PRIMARY FOCUS') : (isArabic ? 'عضلات مساعدة' : 'SUPPORTING MUSCLES')}
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {ids.map(id => (
                <li key={id} className={`flex min-w-0 items-center gap-2.5 rounded-xl border p-3 ${main ? 'border-primary/20 bg-gradient-to-br from-primary/15 to-primary/[.025]' : 'border-white/[.06] bg-white/[.025]'}`}>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${main ? 'bg-primary/15 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                    {main ? <Target size={16} aria-hidden="true" /> : <Layers size={16} aria-hidden="true" />}
                  </span>
                  <span className="text-xs font-semibold leading-5">{muscleNames[id][locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
