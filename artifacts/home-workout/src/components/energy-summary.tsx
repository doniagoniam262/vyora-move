import { Calculator, Info } from 'lucide-react';
import { estimateEnergy } from '@/lib/energy';
import type { VYORAProfile } from '@/lib/profile';

export function EnergySummary({ profile, locale }: { profile: Partial<VYORAProfile>; locale: 'ar' | 'en' }) {
  const result = estimateEnergy(profile);
  const ar = locale === 'ar';
  return (
    <section className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4" data-testid="calorie-estimator" aria-label={ar ? 'حاسبة السعرات التقديرية' : 'Estimated energy calculator'}>
      <h3 className="flex items-center gap-2 text-sm font-bold"><Calculator size={17} className="text-primary" />{ar ? 'تقدير احتياج الطاقة اليومي' : 'Estimated daily energy needs'}</h3>
      {result ? (
        <div aria-live="polite" className="mt-4">
          <p className="text-xs text-muted-foreground">{ar ? 'للمحافظة على الوزن تقريبًا' : 'Approximate weight-maintenance needs'}</p>
          <p className="mt-1 text-3xl font-bold text-primary"><span className="latin" dir="ltr" data-testid="text-maintenance-calories">{result.maintenance}</span> <span className="text-xs font-normal text-muted-foreground">{ar ? 'سعرة / يوم' : 'kcal / day'}</span></p>
          <p className="mt-2 text-xs leading-6 text-muted-foreground" data-testid="text-calorie-range">{ar ? `نطاق إرشادي تقريبي: ${result.low}–${result.high} سعرة يوميًا؛ ليس حدًا أدنى أو أقصى لتناول الطعام.` : `Illustrative range: ${result.low}–${result.high} kcal/day; not a minimum or maximum intake limit.`}</p>
          <p className="mt-2 text-xs text-muted-foreground">{ar ? 'طاقة الراحة المقدّرة (BMR): ' : 'Estimated resting energy (BMR): '}<b className="latin text-foreground" data-testid="text-resting-calories">{result.resting}</b> {ar ? 'سعرة / يوم' : 'kcal / day'}</p>
        </div>
      ) : (
        <p className="mt-3 text-xs leading-6 text-muted-foreground" data-testid="text-calorie-missing">{ar ? 'أكمل النوع والطول والوزن والعمر ومستوى النشاط لإظهار التقدير. العمر والنشاط اختياريان لحفظ الملف.' : 'Complete gender, height, weight, age and activity to see an estimate. Age and activity are optional when saving your profile.'}</p>
      )}
      <p className="mt-3 flex gap-2 border-t border-primary/15 pt-3 text-[11px] leading-6 text-muted-foreground"><Info size={14} className="mt-1 shrink-0" />{ar ? 'معادلة Mifflin–St Jeor للبالغين مع معامل نشاط عام. التقدير ليس نظامًا غذائيًا أو توصية للتخسيس؛ لا يعتمد على شكل الجسم. للحمل والرضاعة أو الحالات الصحية والاحتياجات الفردية، استشر مختصًا.' : 'Adult Mifflin–St Jeor equation with a general activity factor. This is not a meal prescription or weight-loss recommendation and does not use body shape. Seek qualified advice for pregnancy, breastfeeding, health conditions or individual needs.'}</p>
    </section>
  );
}
