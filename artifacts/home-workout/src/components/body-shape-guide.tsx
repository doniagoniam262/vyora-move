import { Check, Ruler } from 'lucide-react';
import type { BodyType } from '@/lib/profile';

type Guide = {
  value: Extract<BodyType, 'hourglass' | 'pear' | 'inverted-triangle' | 'rectangle' | 'apple'>;
  label: { ar: string; en: string };
  description: { ar: string; en: string };
  measurements: { ar: string; en: string };
};

export const femaleBodyShapes: Guide[] = [
  {
    value: 'hourglass',
    label: { ar: 'ساعة رملية · Hourglass', en: 'Hourglass' },
    description: {
      ar: 'يكون محيط أعلى الجسم والوركين متقاربًا تقريبًا (قد يكون الفرق نحو 5% أو أقل)، ويكون الوسط أصغر منهما بوضوح (نحو 20–25% كإشارة تقريبية).',
      en: 'The upper-body and hip measurements are roughly close (the difference may be around 5% or less), while the waist is noticeably smaller (around 20–25% as a rough guide).',
    },
    measurements: {
      ar: 'قارني محيط أعلى الجسم بمحيط الوركين؛ إذا كان الفرق بسيطًا وكان الوسط أصغر بوضوح من كليهما، فقد يكون هذا أقرب وصف.',
      en: 'Compare your upper-body and hip measurements. If they are close and your waist is clearly smaller than both, this may be your closest description.',
    },
  },
  {
    value: 'pear',
    label: { ar: 'كمثرى / مثلث · Pear / Triangle', en: 'Pear / Triangle' },
    description: {
      ar: 'يكون محيط الوركين أعرض نسبيًا من أعلى الجسم (نحو 5% أو أكثر كإشارة تقريبية)، وقد يبدو الوسط أكثر تحديدًا.',
      en: 'The hips are relatively wider than the upper body (around 5% or more as a rough guide); the waist may appear more defined.',
    },
    measurements: {
      ar: 'إذا كان محيط الوركين أكبر بوضوح من محيط أعلى الجسم، فالكمثرى وصف شائع لهذا التوازن.',
      en: 'If your hip measurement is clearly larger than your upper-body measurement, pear is a common description for that balance.',
    },
  },
  {
    value: 'inverted-triangle',
    label: { ar: 'مثلث مقلوب · Inverted Triangle', en: 'Inverted Triangle' },
    description: {
      ar: 'يكون خط الكتفين وأعلى الجسم أعرض نسبيًا من الوركين (نحو 5% أو أكثر كإشارة تقريبية)، بينما يختلف وضوح الخصر.',
      en: 'The shoulder line and upper body are relatively wider than the hips (around 5% or more as a rough guide); waist definition varies.',
    },
    measurements: {
      ar: 'إذا كان محيط أعلى الجسم أكبر بوضوح من محيط الوركين، فقد يكون المثلث المقلوب أقرب وصف.',
      en: 'If your upper-body measurement is clearly larger than your hip measurement, inverted triangle may be the closest description.',
    },
  },
  {
    value: 'rectangle',
    label: { ar: 'مستطيلة · Rectangle', en: 'Rectangle' },
    description: {
      ar: 'يكون محيط أعلى الجسم والوركين متقاربًا (الفرق نحو 5% أو أقل كإشارة)، ويكون الوسط أصغر قليلًا فقط وليس أصغر منهما بوضوح.',
      en: 'The upper-body and hip measurements are fairly close (around 5% apart as a rough guide), and the waist is only slightly smaller rather than clearly narrower.',
    },
    measurements: {
      ar: 'إذا كانت قياسات الكتفين والوركين متقاربة والوسط أصغر منهما بدرجة بسيطة فقط، فقد يناسبك هذا الوصف.',
      en: 'If shoulder and hip measurements are close and your waist is only slightly smaller, this may be a useful description.',
    },
  },
  {
    value: 'apple',
    label: { ar: 'تفاحة · Apple', en: 'Apple' },
    description: {
      ar: 'قد يكون الوسط أو منتصف الجذع أوضح امتلاءً، وقد لا يظهر فرق كبير بين قياس الوسط والوركين. تختلف الأجسام ولا يلزم أن تتطابق كل العلامات.',
      en: 'The waist or midsection may be fuller, and there may be little difference between the waist and hip measurements. Bodies vary, so not every sign needs to match.',
    },
    measurements: {
      ar: 'إذا كان محيط الوسط قريبًا من محيط الوركين أو أكبر منه، وكان الخصر أقل تحديدًا، فقد يكون هذا أقرب وصف.',
      en: 'If your waist measurement is close to or larger than your hips and your waist is less defined, this may be the closest description.',
    },
  },
];

export function BodyShapeGuide({
  selected,
  onSelect,
  locale,
  accent,
}: {
  selected: BodyType | '';
  onSelect: (value: BodyType) => void;
  locale: 'ar' | 'en';
  accent: string;
}) {
  const isArabic = locale === 'ar';
  const text = (ar: string, en: string) => isArabic ? ar : en;

  return (
    <div className="mt-5 space-y-4" data-testid="body-shape-guide">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {femaleBodyShapes.map((shape) => (
          <button
            key={shape.value}
            type="button"
            data-testid={`button-body-${shape.value}`}
            aria-pressed={selected === shape.value}
            onClick={() => onSelect(shape.value)}
            className={`focus-ring press h-full rounded-xl border p-3.5 text-start transition-colors ${selected === shape.value ? '' : 'border-white/[0.09] bg-[#101313] hover:border-white/20'}`}
            style={selected === shape.value
              ? { borderColor: `${accent}70`, backgroundColor: `${accent}1c` }
              : undefined}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold" style={selected === shape.value ? { color: accent } : undefined}>
                {shape.label[isArabic ? 'ar' : 'en']}
              </span>
              {selected === shape.value && <Check size={16} style={{ color: accent }} aria-hidden="true" />}
            </span>
            <span className="mt-2 block text-xs leading-5 text-[#e0e3df]">
              {shape.description[isArabic ? 'ar' : 'en']}
            </span>
            <span className="mt-2 block text-[11px] leading-5 text-[#9ba39e]">
              {shape.measurements[isArabic ? 'ar' : 'en']}
            </span>
          </button>
        ))}
      </div>

      <details className="group rounded-xl border border-white/[0.09] bg-[#101313] p-4" data-testid="body-measurement-help">
        <summary className="focus-ring flex cursor-pointer list-none items-center gap-2 text-sm font-bold marker:hidden">
          <Ruler size={17} style={{ color: accent }} aria-hidden="true" />
          {text('طريقة أخذ القياسات', 'How to take the measurements')}
        </summary>
        <ol className="mt-3 list-decimal space-y-2 ps-5 text-xs leading-5 text-[#c1c7c2]">
          <li>
            {text(
              'الأكتاف وأعلى الجسم: خذي محيط الجزء العلوي عند أعرض نقطة تمر حول الكتفين وأعلى الصدر. اطلبي مساعدة لإبقاء الشريط أفقيًا.',
              'Shoulders and upper body: measure around the broadest upper-torso line across the shoulders and upper chest. Ask someone to help keep the tape level.',
            )}
          </li>
          <li>
            {text(
              'الوسط: قيسي حول أضيق نقطة طبيعية في الجذع، من دون شفط البطن. إذا لم تظهر نقطة أضيق، استخدمي مستوى السرة.',
              'Waist: measure around your natural narrowest point without drawing in your stomach. If there is no clear narrow point, use the navel level.',
            )}
          </li>
          <li>
            {text(
              'الوركان: قيسي حول أعرض نقطة من الوركين والأرداف مع ضم القدمين.',
              'Hips: measure around the widest part of your hips and seat with your feet together.',
            )}
          </li>
          <li>
            {text(
              'استخدمي شريطًا مرنًا موازيًا للأرض، قريبًا من الجسم من دون ضغط، وخذي القياسات مرتين. هذه مقارنة تقريبية وليست تشخيصًا.',
              'Keep a flexible tape level with the floor and close to the body without squeezing. Measure twice. These comparisons are approximate, not a diagnosis.',
            )}
          </li>
        </ol>
        <p className="mt-3 text-[11px] leading-5 text-[#8f9892]">
          {text(
            'لا يوجد شكل أفضل من غيره، وقد تنطبق عليكِ صفات من أكثر من نوع. اختاري الوصف الأقرب أو «غير متأكدة». القياسات لا تحدد السعرات ولا تتنبأ بالنتائج الصحية.',
            'No shape is better than another, and traits from more than one category may fit. Choose the closest description or “Not sure.” These measurements do not set calorie needs or predict health outcomes.',
          )}
        </p>
        <p className="mt-2 text-[11px] leading-5 text-[#8f9892]">
          {text(
            'الفروق المذكورة تقديرية لتسهيل المقارنة فقط؛ لا يوجد حد موحّد، وقد يختلف التصنيف بحسب طريقة القياس وتوزيع الجسم.',
            'The percentage differences are only rough comparison aids. There is no universal cutoff, and results vary with measuring technique and body proportions.',
          )}
        </p>
      </details>
    </div>
  );
}
