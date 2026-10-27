import { ChevronDown, Layers, Target } from 'lucide-react';
import { muscleNames, type MuscleId } from '@/lib/movement-details';
import { muscleEducation } from '@/lib/muscle-education';

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
        <h3 className="text-sm font-bold">{isArabic ? 'العضلات المستهدفة وفوائدها' : 'Target muscles and benefits'}</h3>
        <Target size={19} className="text-primary" aria-hidden="true" />
      </header>
      <div className="space-y-5">
        {[{ ids: [...new Set(primary)], main: true }, { ids: [...new Set(secondary)].filter(id => !primary.includes(id)), main: false }].map(({ ids, main }) => ids.length > 0 && (
          <div key={String(main)}>
            <p className="mb-2.5 text-[11px] font-semibold text-muted-foreground">
              {main ? (isArabic ? 'التركيز الأساسي' : 'PRIMARY FOCUS') : (isArabic ? 'عضلات مساعدة' : 'SUPPORTING MUSCLES')}
            </p>
            <p className="mb-3 text-[11px] leading-5 text-muted-foreground">{isArabic ? 'افتح بطاقة العضلة لشرح دورها وإرشادات استخدامها.' : 'Open a muscle card for its function and technique checkpoints.'}</p>
            <ul className="space-y-2">
              {ids.map(id => (
                <li key={id}>
                  <details open={main && id === ids[0]} className={`group rounded-xl border ${main ? 'border-primary/20 bg-gradient-to-br from-primary/15 to-primary/[.025]' : 'border-white/[.06] bg-white/[.025]'}`} data-testid={`muscle-detail-${id}`}>
                    <summary className="focus-ring flex cursor-pointer list-none items-center gap-2.5 rounded-xl p-3 [&::-webkit-details-marker]:hidden">
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${main ? 'bg-primary/15 text-primary' : 'bg-white/5 text-muted-foreground'}`}>
                        {main ? <Target size={16} aria-hidden="true" /> : <Layers size={16} aria-hidden="true" />}
                      </span>
                      <span className="flex-1 text-xs font-semibold leading-5">{muscleNames[id][locale]}</span>
                      <ChevronDown size={15} className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <div className="space-y-3 border-t border-border px-3 pb-4 pt-3">
                      <div><h4 className="text-[11px] font-bold text-primary">{isArabic ? 'دور العضلة' : 'Muscle function'}</h4><p className="mt-1 text-xs leading-6 text-muted-foreground">{muscleEducation[id].role[locale]}</p></div>
                      <div><h4 className="text-[11px] font-bold text-primary">{isArabic ? 'فائدتها في حياتك' : 'Everyday benefit'}</h4><p className="mt-1 text-xs leading-6 text-muted-foreground">{muscleEducation[id].benefit[locale]}</p></div>
                      <div><h4 className="text-[11px] font-bold text-primary">{isArabic ? 'نقاط أداء خطوة بخطوة' : 'Step-by-step checkpoints'}</h4>
                        <ol className="mt-2 space-y-2">
                          {muscleEducation[id].steps.map((step, index) => <li key={index} className="flex gap-2 text-xs leading-6 text-muted-foreground"><span className="latin shrink-0 font-bold text-primary">{index + 1}.</span><span>{step[locale]}</span></li>)}
                        </ol>
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
