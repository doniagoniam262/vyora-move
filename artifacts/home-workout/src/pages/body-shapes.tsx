import { useState } from 'react';
import { Check, Ruler } from 'lucide-react';
import { Link } from 'wouter';
import { femaleBodyShapes } from '@/components/body-shape-guide';
import { useLocale } from '@/lib/locale';
import type { BodyType } from '@/lib/profile';
import { useVYORAProfile } from '@/lib/profile-context';

const bodyShapeOrder = ['apple', 'rectangle', 'inverted-triangle', 'pear', 'hourglass'] as const;

const englishLabels: Record<(typeof bodyShapeOrder)[number], string> = {
  apple: 'Apple',
  rectangle: 'Rectangle',
  'inverted-triangle': 'Inverted Triangle',
  pear: 'Pear / Triangle',
  hourglass: 'Hourglass',
};

export default function BodyShapesPage() {
  const { locale } = useLocale();
  const isArabic = locale === 'ar';
  const profile = useVYORAProfile();
  const [selected, setSelected] = useState<BodyType | null>(null);
  const shapes = bodyShapeOrder.map(value => femaleBodyShapes.find(shape => shape.value === value)!);
  const selectedShape = shapes.find(shape => shape.value === selected);
  const imageBasePath = import.meta.env?.BASE_URL ?? '/';
  const imagePath = (shape: string) => `${imageBasePath}images/vyora-ui/body-${shape}.jpg`;

  if (profile?.gender !== 'female') {
    return (
      <div className="card-dark mx-auto max-w-xl space-y-3 p-6 text-center" data-testid="body-shapes-female-only">
        <h1 className="text-lg font-extrabold">{isArabic ? 'دليل أشكال الجسم متاح لملف الأنثى' : 'This body-shape guide is for female profiles'}</h1>
        <p className="text-sm leading-6 text-muted-foreground">{isArabic ? 'هذا القسم يعرض صورًا ومعلومات مخصصة للنساء، لذلك لن تظهر في ملف الذكر.' : 'This page contains women-specific images and information, so it is hidden from male profiles.'}</p>
        <Link href="/more" className="inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground">{isArabic ? 'العودة للمزيد' : 'Back to More'}</Link>
      </div>
    );
  }

  return (
    <div className="page-enter mx-auto max-w-5xl space-y-6" dir={isArabic ? 'rtl' : 'ltr'} data-testid="page-body-shapes">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">VYORA · PROFILE GUIDE</p>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{isArabic ? 'أشكال الجسم للبنات' : 'Body shapes for women'}</h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          {isArabic ? 'خمسة أوصاف شائعة للتعرّف على اختلاف توزيع القياسات. اختاري الوصف الأقرب لك، من دون اعتبار أي شكل أفضل من غيره.' : 'Five common descriptions of measurement proportions. Choose the closest fit; no body shape is better than another.'}
        </p>
      </header>

      <section className="overflow-hidden rounded-[1.6rem] border border-[#f7a6ca] bg-[#ffe4ef] p-2.5 shadow-[0_18px_55px_rgba(255,45,142,.12)] sm:p-4" data-testid="body-shape-photo-panel">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
          {shapes.map(shape => {
            const active = selected === shape.value;
            const label = isArabic ? shape.label.ar.split('·')[0].trim() : englishLabels[shape.value];
            return (
              <button
                key={shape.value}
                type="button"
                data-testid={`body-shape-card-${shape.value}`}
                aria-pressed={active}
                onClick={() => setSelected(active ? null : shape.value)}
                className={`relative min-w-0 overflow-hidden rounded-xl border text-center transition ${active ? 'border-[#FF2D8E] bg-white shadow-[0_6px_18px_rgba(255,45,142,.18)]' : 'border-white/70 bg-white/35 hover:bg-white/70'}`}
              >
                {active && <span className="absolute right-1 top-1 z-10 grid h-5 w-5 place-items-center rounded-full bg-[#FF2D8E] text-white"><Check size={12} /></span>}
                <span className="flex h-[185px] items-end justify-center overflow-hidden sm:h-[270px]">
                  <img src={imagePath(shape.value)} alt="" loading="lazy" className="h-full w-full object-contain object-bottom" />
                </span>
                <span className="block min-h-[42px] px-0.5 py-2 text-[9px] font-extrabold leading-tight text-[#24151d] sm:min-h-[52px] sm:px-1 sm:text-xs">
                  <span className="block">{label}</span>
                  <span className="latin mt-1 block text-[8px] font-semibold text-[#674c5a] sm:text-[10px]" dir="ltr">{englishLabels[shape.value]}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {selectedShape && (
        <section className="card-dark border-[#FF2D8E]/30 p-4 sm:p-5" data-testid="selected-body-shape">
          <h2 className="font-extrabold text-primary">{selectedShape.label[isArabic ? 'ar' : 'en']}</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{selectedShape.description[isArabic ? 'ar' : 'en']}</p>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">{selectedShape.measurements[isArabic ? 'ar' : 'en']}</p>
        </section>
      )}

      <section className="card-dark p-5 sm:p-6" data-testid="body-shape-measurement-guide">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#FF77B5]">
          <Ruler size={19} />
          {isArabic ? 'كيف تعرفين نوع جسمك؟' : 'How to identify your body shape'}
        </h2>
        <ol className="mt-4 space-y-3 text-sm leading-7 text-white/90">
          <li><span className="me-2 font-extrabold text-[#FF77B5]">1.</span>{isArabic ? 'قيسي محيط الكتفين وأعلى الجسم، مع إبقاء شريط القياس أفقيًا.' : 'Measure around your shoulders and upper body, keeping the tape level.'}</li>
          <li><span className="me-2 font-extrabold text-[#FF77B5]">2.</span>{isArabic ? 'قيسي محيط الوسط عند أضيق نقطة طبيعية، من دون شدّ البطن.' : 'Measure your natural waist without drawing in your stomach.'}</li>
          <li><span className="me-2 font-extrabold text-[#FF77B5]">3.</span>{isArabic ? 'قيسي محيط الوركين عند أعرض نقطة من الوركين والأرداف.' : 'Measure around the widest part of your hips and seat.'}</li>
        </ol>
        <p className="mt-4 rounded-xl border border-white/10 bg-white/[.03] p-3 text-xs leading-6 text-muted-foreground">
          {isArabic ? 'استخدمي شريطًا مرنًا ملاصقًا للجسم من دون ضغط، وكرري القياس للتأكد. قد تنطبق عليك صفات من أكثر من نوع؛ المقارنة تقريبية وليست تشخيصًا.' : 'Use a flexible tape close to the body without squeezing and repeat each measurement. More than one description may fit; these comparisons are approximate, not a diagnosis.'}
        </p>
      </section>

      <section className="rounded-[1.35rem] border border-[#FF77B5]/70 bg-[#1a1116] p-5 sm:p-6" data-testid="body-shape-measurement-example">
        <h2 className="text-lg font-extrabold text-[#FF77B5]">{isArabic ? 'مثال على القياسات:' : 'Measurement example:'}</h2>
        <p className="mt-3 text-base font-bold leading-8">
          {isArabic ? 'الكتفين: 90 سم · الوسط: 70 سم · الوركين: 100 سم' : 'Shoulders: 90 cm · Waist: 70 cm · Hips: 100 cm'}
        </p>
      </section>
    </div>
  );
}
