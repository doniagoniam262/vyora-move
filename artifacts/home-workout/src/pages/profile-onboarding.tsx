import { useEffect, useState, type FormEvent } from 'react';
import { useUser } from '@clerk/react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Dumbbell, Ruler, Scale, UserRound } from 'lucide-react';
import { BodyShapeGuide } from '@/components/body-shape-guide';
import { useLocale } from '@/lib/locale';
import type { ActivityLevel, FitnessGoal, UserGender, VYORAProfile } from '@/lib/profile';

type Draft = {
  name: string;
  gender: UserGender | '';
  ageYears: string;
  heightCm: string;
  weightKg: string;
  goal: FitnessGoal | '';
  bodyType: VYORAProfile['bodyType'] | '';
  sessionsPerWeek: number;
  activityLevel: ActivityLevel | '';
};

type Props = {
  onComplete: (profile: VYORAProfile) => boolean | void;
  onGenderChange: (gender: UserGender | null) => void;
};

const emptyDraft: Draft = {
  name: '',
  gender: '',
  ageYears: '',
  heightCm: '',
  weightKg: '',
  goal: '',
  bodyType: '',
  sessionsPerWeek: 3,
  activityLevel: '',
};

const draftKey = (userId: string) => `vyora-onboarding-draft-v1:${userId}`;

function readDraft(userId?: string): Draft {
  if (!userId) return emptyDraft;
  try {
    const raw = localStorage.getItem(draftKey(userId));
    if (!raw) return emptyDraft;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return emptyDraft;
    const saved = value as Partial<Draft>;
    return {
      ...emptyDraft,
      name: typeof saved.name === 'string' ? saved.name.slice(0, 80) : '',
      gender: saved.gender === 'female' || saved.gender === 'male' ? saved.gender : '',
      ageYears: typeof saved.ageYears === 'string' ? saved.ageYears : '',
      heightCm: typeof saved.heightCm === 'string' ? saved.heightCm : '',
      weightKg: typeof saved.weightKg === 'string' ? saved.weightKg : '',
      goal: ['lose-weight', 'build-muscle', 'fitness', 'gain-weight'].includes(saved.goal ?? '')
        ? saved.goal!
        : '',
      bodyType: ['slim', 'medium', 'strong', 'unsure', 'apple', 'pear', 'hourglass', 'inverted-triangle', 'rectangle'].includes(saved.bodyType ?? '')
        ? saved.bodyType!
        : '',
      sessionsPerWeek: Number.isInteger(saved.sessionsPerWeek) && saved.sessionsPerWeek! >= 1 && saved.sessionsPerWeek! <= 7
        ? saved.sessionsPerWeek!
        : 3,
      activityLevel: ['sedentary', 'light', 'moderate', 'active'].includes(saved.activityLevel ?? '')
        ? saved.activityLevel!
        : '',
    };
  } catch {
    return emptyDraft;
  }
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  min,
  max,
  testId,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  min?: number;
  max?: number;
  testId: string;
}) {
  return (
    <label className="relative block rounded-[1.2rem] border border-white/15 bg-[#111] px-5 py-3.5 focus-within:border-[#FF2D8E]">
      <span className="block text-sm font-bold text-white/90">{label}</span>
      <input
        data-testid={testId}
        className="mt-1 w-full bg-transparent pe-8 text-sm text-white outline-none placeholder:text-white/45"
        type={type}
        inputMode={type === 'number' ? 'decimal' : undefined}
        step={type === 'number' ? 'any' : undefined}
        min={min}
        max={max}
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        required
      />
      <span aria-hidden="true" className="absolute left-5 top-1/2 -translate-y-1/2 font-serif text-[25px] leading-none text-[#FF2D8E]">Y</span>
    </label>
  );
}

export default function ProfileOnboardingWizard({ onComplete, onGenderChange }: Props) {
  const { user } = useUser();
  const { isArabic } = useLocale();
  const text = (ar: string, en: string) => isArabic ? ar : en;
  const [draft, setDraft] = useState<Draft>(() => readDraft(user?.id));
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const female = draft.gender === 'female';
  const accent = female ? '#FF2D8E' : '#6C9CFF';

  useEffect(() => {
    if (!user?.id) return;
    try {
      localStorage.setItem(draftKey(user.id), JSON.stringify(draft));
    } catch {
      setError(text('تعذّر حفظ المسودة على هذا الجهاز.', 'This draft could not be saved on this device.'));
    }
  }, [draft, user?.id]);

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft(current => ({ ...current, [key]: value }));
    setError('');
  };

  const validate = () => {
    if (step === 1) {
      if (draft.gender !== 'female' && draft.gender !== 'male') return text('اختر جنسك للمتابعة.', 'Choose your gender to continue.');
      if (draft.name.trim().length < 2) return text('اكتب اسمًا من حرفين على الأقل.', 'Enter a name with at least two characters.');
      const age = Number(draft.ageYears);
      if (!Number.isInteger(age) || age < 18 || age > 100) return text('أدخل عمرًا صحيحًا من 18 إلى 100 سنة.', 'Enter a whole age from 18 to 100.');
      const height = Number(draft.heightCm);
      if (!Number.isFinite(height) || height < 100 || height > 250) return text('أدخل طولًا بين 100 و250 سم.', 'Enter a height between 100 and 250 cm.');
      const weight = Number(draft.weightKg);
      if (!Number.isFinite(weight) || weight < 25 || weight > 300) return text('أدخل وزنًا بين 25 و300 كجم.', 'Enter a weight between 25 and 300 kg.');
    }
    if (step === 2 && !draft.goal) return text(female ? 'اختاري هدفك للمتابعة.' : 'اختر هدفك للمتابعة.', 'Choose a goal to continue.');
    if (step === 3 && !draft.bodyType) return text(female ? 'اختاري الوصف الأقرب لجسمك.' : 'اختر الوصف الأقرب لبنيتك.', 'Choose the closest body description.');
    if (step === 4 && (!Number.isInteger(draft.sessionsPerWeek) || draft.sessionsPerWeek < 1 || draft.sessionsPerWeek > 7)) return text(female ? 'اختاري عدد الجلسات الأسبوعية.' : 'اختر عدد الجلسات الأسبوعية.', 'Choose the number of weekly sessions.');
    return '';
  };

  const next = (event: FormEvent) => {
    event.preventDefault();
    const issue = validate();
    if (issue) {
      setError(issue);
      return;
    }
    if (step < 5) {
      setStep(value => value + 1);
      return;
    }

    const saved = onComplete({
      name: draft.name.trim(),
      gender: draft.gender as UserGender,
      ageYears: Number(draft.ageYears),
      heightCm: Number(draft.heightCm),
      weightKg: Number(draft.weightKg),
      goal: draft.goal as FitnessGoal,
      bodyType: draft.bodyType as VYORAProfile['bodyType'],
      sessionsPerWeek: draft.sessionsPerWeek,
      ...(draft.activityLevel ? { activityLevel: draft.activityLevel } : {}),
    });
    if (saved !== false && user?.id) {
      try {
        localStorage.removeItem(draftKey(user.id));
      } catch {
        // The completed profile has already been saved; keep the app usable if draft cleanup fails.
      }
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#0A0A0A] px-4 py-7 text-white" dir={isArabic ? 'rtl' : 'ltr'} style={{ '--profile-accent': accent } as React.CSSProperties}>
      <div className="mx-auto w-full max-w-[490px]">
        <header className="text-center">
          <a href={import.meta.env.BASE_URL} className="inline-flex flex-col items-center" aria-label="VYORA MOVE">
            <span className="text-[46px] font-black leading-[.8] tracking-[-.12em]" style={{ color: accent }}>V</span>
            <span className="latin mt-3 text-[18px] font-semibold tracking-[.12em]" dir="ltr">VYORA MOVE</span>
          </a>
          <h1 className="mt-8 text-[26px] font-extrabold">{text('الملف الشخصي', 'Your profile')}</h1>
          <div className="mt-4 flex items-center gap-3" aria-label={`${step}/5`}>
            <span className="latin text-xs text-white/55" dir="ltr">{step}/5</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/20" role="progressbar" aria-valuemin={1} aria-valuemax={5} aria-valuenow={step}>
              <div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${step * 20}%`, backgroundColor: accent }} />
            </div>
          </div>
        </header>

        <form onSubmit={next} className="mt-7">
          {step === 1 && (
            <section className="space-y-5" data-testid="onboarding-step-1">
              <h2 className="text-center text-[24px] font-extrabold">{text('اختر جنسك', 'Choose your gender')}</h2>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { gender: 'female' as const, label: text('أنثى', 'Female'), image: `${import.meta.env.BASE_URL}images/vyora-ui/female-profile.jpg` },
                  { gender: 'male' as const, label: text('ذكر', 'Male'), image: `${import.meta.env.BASE_URL}images/vyora-ui/male-profile.jpg` },
                ]).map(option => {
                  const selected = draft.gender === option.gender;
                  const color = option.gender === 'female' ? '#FF2D8E' : '#6C9CFF';
                  return (
                    <button
                      key={option.gender}
                      type="button"
                      data-testid={`button-theme-${option.gender}`}
                      aria-pressed={selected}
                      onClick={() => { update('gender', option.gender); onGenderChange(option.gender); }}
                      className={`relative overflow-hidden rounded-[1.35rem] border transition-colors ${selected ? 'border-transparent' : 'border-white/10 bg-[#171717]'}`}
                      style={selected ? { backgroundColor: color } : undefined}
                    >
                      <img src={option.image} alt="" className="aspect-[.88] w-full object-cover object-top" />
                      {selected && <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white text-[#FF2D8E]"><Check size={18} /></span>}
                      <span className="block px-2 py-3 text-center text-xl font-extrabold">{option.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="space-y-3">
                <Field label={text('الاسم', 'Name')} placeholder={text('اكتب اسمك', 'Enter your name')} value={draft.name} onChange={value => update('name', value)} testId="input-profile-name" />
                <Field label={text('العمر', 'Age')} placeholder={text('أدخل عمرك', 'Enter your age')} value={draft.ageYears} onChange={value => update('ageYears', value)} type="number" min={18} max={100} testId="input-age-years" />
                <Field label={text('الطول (سم)', 'Height (cm)')} placeholder={text('أدخل الطول', 'Enter your height')} value={draft.heightCm} onChange={value => update('heightCm', value)} type="number" min={100} max={250} testId="input-height-cm" />
                <Field label={text('الوزن (كجم)', 'Weight (kg)')} placeholder={text('أدخل الوزن', 'Enter your weight')} value={draft.weightKg} onChange={value => update('weightKg', value)} type="number" min={25} max={300} testId="input-weight-kg" />
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-4" data-testid="onboarding-step-2">
              <SectionHeading icon={<Dumbbell size={18} />} title={text('ما هدفك؟', 'What is your goal?')} subtitle={text(female ? 'اختاري هدفًا كبداية، ويمكنك تعديله لاحقًا.' : 'اختر هدفًا كبداية، ويمكنك تعديله لاحقًا.', 'Choose a starting goal; you can update it later.')} />
              <div className="grid grid-cols-2 gap-3">
                {([
                  ['lose-weight', text('خسارة الوزن', 'Lose weight'), text('حركة أكثر ولياقة', 'More movement')],
                  ['build-muscle', text('بناء العضلات', 'Build muscle'), text('قوة تدريجية', 'Build strength')],
                  ['fitness', text('لياقة عامة', 'General fitness'), text('نشاط وتوازن', 'Energy and balance')],
                  ['gain-weight', text('زيادة الوزن', 'Gain weight'), text('تدرج في القوة', 'Gradual strength')],
                ] as const).map(([value, label, detail]) => (
                  <button key={value} type="button" data-testid={`button-goal-${value}`} aria-pressed={draft.goal === value} onClick={() => update('goal', value)} className={`min-h-28 rounded-2xl border p-4 text-start ${draft.goal === value ? 'border-[#FF2D8E] bg-[#FF2D8E]/15' : 'border-white/10 bg-[#151515]'}`}>
                    <span className="block text-sm font-extrabold">{label}</span>
                    <span className="mt-2 block text-xs text-white/60">{detail}</span>
                    {draft.goal === value && <Check className="mt-3 text-[#FF2D8E]" size={16} />}
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-4" data-testid="onboarding-step-3">
              <SectionHeading icon={<Ruler size={18} />} title={text(female ? 'أشكال الجسم' : 'كيف تصف بنيتك؟', female ? 'Body shape' : 'Your build')} subtitle={text('اختيار وصفي اختياري، ولا يحدد السعرات أو النتائج.', 'A descriptive choice; it does not determine calories or outcomes.')} />
              {female ? (
                <>
                  <BodyShapeGuide selected={draft.bodyType} onSelect={value => update('bodyType', value)} locale={isArabic ? 'ar' : 'en'} accent={accent} />
                  <button type="button" data-testid="button-body-unsure" aria-pressed={draft.bodyType === 'unsure'} onClick={() => update('bodyType', 'unsure')} className={`w-full rounded-xl border px-4 py-3 text-sm font-bold ${draft.bodyType === 'unsure' ? 'border-[#FF2D8E] bg-[#FF2D8E]/15 text-[#FF2D8E]' : 'border-white/10 bg-[#111]'}`}>{text('غير متأكدة', 'Not sure')}</button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {([
                    ['slim', text('نحيف', 'Slim')],
                    ['medium', text('متوسط', 'Medium')],
                    ['strong', text('قوي', 'Strong')],
                    ['unsure', text('غير متأكد', 'Not sure')],
                  ] as const).map(([value, label]) => (
                    <button key={value} type="button" data-testid={`button-body-${value}`} aria-pressed={draft.bodyType === value} onClick={() => update('bodyType', value)} className={`rounded-xl border px-4 py-4 text-sm font-bold ${draft.bodyType === value ? 'border-[#6C9CFF] bg-[#6C9CFF]/15 text-[#6C9CFF]' : 'border-white/10 bg-[#111]'}`}>{label}</button>
                  ))}
                </div>
              )}
            </section>
          )}

          {step === 4 && (
            <section className="space-y-5" data-testid="onboarding-step-4">
              <SectionHeading icon={<CalendarDays size={18} />} title={text(female ? 'كم مرة تتدربين؟' : 'كم مرة تتدرب؟', 'How often will you train?')} subtitle={text(female ? 'اختاري عدد جلسات يناسب أسبوعك فعلًا.' : 'اختر عدد جلسات يناسب أسبوعك فعلًا.', 'Choose a number that genuinely fits your week.')} />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 7 }, (_, index) => index + 1).map(count => (
                  <button key={count} type="button" data-testid={`button-sessions-${count}`} aria-pressed={draft.sessionsPerWeek === count} onClick={() => update('sessionsPerWeek', count)} className={`h-14 rounded-xl border text-lg font-bold ${draft.sessionsPerWeek === count ? 'border-[#FF2D8E] bg-[#FF2D8E]/15 text-[#FF2D8E]' : 'border-white/10 bg-[#111]'}`}>{count}</button>
                ))}
              </div>
              <label className="block rounded-2xl border border-white/10 bg-[#151515] p-4">
                <span className="mb-2 block text-sm font-bold">{text('مستوى نشاطك اليومي (اختياري)', 'Daily activity (optional)')}</span>
                <select data-testid="select-activity-level" value={draft.activityLevel} onChange={event => update('activityLevel', event.target.value as Draft['activityLevel'])} className="h-12 w-full rounded-xl border border-white/10 bg-[#0A0A0A] px-3 text-sm text-white outline-none focus:border-[#FF2D8E]">
                  <option value="">{text(female ? 'اختاري مستوى النشاط' : 'اختر مستوى النشاط', 'Choose an activity level')}</option>
                  <option value="sedentary">{text('قليل الحركة', 'Mostly sitting')}</option>
                  <option value="light">{text('نشاط خفيف', 'Light activity')}</option>
                  <option value="moderate">{text('نشاط متوسط', 'Moderate activity')}</option>
                  <option value="active">{text('نشاط مرتفع', 'High activity')}</option>
                </select>
              </label>
            </section>
          )}

          {step === 5 && (
            <section className="space-y-4" data-testid="onboarding-step-5">
              <SectionHeading icon={<Check size={18} />} title={text(female ? 'راجعي بياناتك' : 'راجع بياناتك', 'Review your profile')} subtitle={text('سيتم حفظها محليًا على هذا الجهاز قبل فتح الرئيسية.', 'Your profile will be saved locally before opening the home page.')} />
              <div className="space-y-2 rounded-2xl border border-white/10 bg-[#151515] p-4">
                {[
                  [text('الاسم', 'Name'), draft.name],
                  [text('النوع', 'Gender'), draft.gender === 'female' ? text('أنثى', 'Female') : text('ذكر', 'Male')],
                  [text('العمر', 'Age'), `${draft.ageYears} ${text('سنة', 'years')}`],
                  [text('الطول', 'Height'), `${draft.heightCm} cm`],
                  [text('الوزن', 'Weight'), `${draft.weightKg} kg`],
                  [text('الهدف', 'Goal'), ({ 'lose-weight': text('خسارة الوزن', 'Lose weight'), 'build-muscle': text('بناء العضلات', 'Build muscle'), fitness: text('لياقة عامة', 'General fitness'), 'gain-weight': text('زيادة الوزن', 'Gain weight') } as Record<string, string>)[draft.goal] ?? ''],
                  [text('الجلسات الأسبوعية', 'Weekly sessions'), String(draft.sessionsPerWeek)],
                ].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-3 border-b border-white/10 py-2 last:border-0"><span className="text-xs text-white/55">{label}</span><b className="text-sm">{value}</b></div>)}
              </div>
            </section>
          )}

          {error && <p role="alert" className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}
          <div className="mt-6 flex gap-3">
            {step > 1 && <button type="button" onClick={() => { setStep(value => value - 1); setError(''); }} className="min-h-14 rounded-2xl border border-white/20 px-5 font-bold text-white/80">{text('السابق', 'Back')}</button>}
            <button type="submit" data-testid={step === 5 ? 'button-complete-profile' : 'button-next-profile'} className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl px-5 text-lg font-extrabold text-white transition-transform hover:scale-[1.01]" style={{ backgroundColor: accent }}>
              {step === 5 ? text(female ? 'ابدئي الآن' : 'ابدأ الآن', 'Start VYORA') : text('التالي', 'Next')}
              {isArabic ? <ArrowLeft size={19} /> : <ArrowRight size={19} />}
            </button>
          </div>
          <p className="mt-4 text-center text-[11px] text-white/45">{text('يمكنك تعديل بياناتك لاحقًا من الملف الشخصي.', 'You can edit these details later in your profile.')}</p>
        </form>
      </div>
    </main>
  );
}

function SectionHeading({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#151515] p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FF2D8E]/15 text-[#FF2D8E]">{icon}</span><div><h2 className="font-extrabold">{title}</h2><p className="mt-1 text-xs leading-5 text-white/55">{subtitle}</p></div></div>;
}
