import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, Dumbbell, HeartPulse, Scale, UserRound, Ruler, CalendarDays } from 'lucide-react';
import { Link } from 'wouter';
import { useLocale } from '@/lib/locale';
import type { UserGender, VYORAProfile } from '@/lib/profile';

type Props = {
  initialProfile: VYORAProfile | null;
  onComplete: (profile: VYORAProfile) => void;
  onGenderChange: (gender: UserGender) => void;
};

type ProfileDraft = {
  weightKg: string;
  heightCm: string;
  goal: VYORAProfile['goal'] | '';
  bodyType: VYORAProfile['bodyType'] | '';
  sessionsPerWeek: number;
  gender: UserGender | '';
};

type FieldErrors = Partial<Record<'weightKg' | 'heightCm' | 'goal' | 'bodyType' | 'sessionsPerWeek' | 'gender', string>>;

const blankDraft: ProfileDraft = {
  weightKg: '',
  heightCm: '',
  goal: '',
  bodyType: '',
  sessionsPerWeek: 3,
  gender: '',
};

export default function OnboardingPage({ initialProfile, onComplete, onGenderChange }: Props) {
  const { isArabic } = useLocale();
  const [draft, setDraft] = useState<ProfileDraft>(() =>
    initialProfile
      ? {
          weightKg: String(initialProfile.weightKg),
          heightCm: String(initialProfile.heightCm),
          goal: initialProfile.goal,
          bodyType: initialProfile.bodyType,
          sessionsPerWeek: initialProfile.sessionsPerWeek,
          gender: initialProfile.gender,
        }
      : blankDraft,
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attempted, setAttempted] = useState(false);
  const feminine = draft.gender === 'female';
  const accent = feminine ? '#f184b6' : '#6c9cff';
  const themeStyle = { '--profile-accent': accent, '--profile-accent-soft': feminine ? '241 70% 66%' : '218 90% 70%' } as CSSProperties;

  useEffect(() => {
    if (!initialProfile) return;
    setDraft({
      weightKg: String(initialProfile.weightKg),
      heightCm: String(initialProfile.heightCm),
      goal: initialProfile.goal,
      bodyType: initialProfile.bodyType,
      sessionsPerWeek: initialProfile.sessionsPerWeek,
      gender: initialProfile.gender,
    });
  }, [initialProfile]);

  const text = (ar: string, en: string) => isArabic ? ar : en;
  const update = <K extends keyof ProfileDraft>(key: K, value: ProfileDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    if (attempted) setErrors((current) => ({ ...current, [key]: undefined }));
  };
  const chooseGender = (gender: UserGender) => {
    update('gender', gender);
    onGenderChange(gender);
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    const weight = Number(draft.weightKg);
    const height = Number(draft.heightCm);
    if (!draft.weightKg.trim() || !Number.isFinite(weight)) next.weightKg = text('أدخل الوزن بالكيلوغرام.', 'Enter your weight in kilograms.');
    else if (weight < 25 || weight > 300) next.weightKg = text('استخدم قيمة بين 25 و300 كجم.', 'Use a value between 25 and 300 kg.');
    if (!draft.heightCm.trim() || !Number.isFinite(height)) next.heightCm = text('أدخل الطول بالسنتيمتر.', 'Enter your height in centimeters.');
    else if (height < 100 || height > 250) next.heightCm = text('استخدم قيمة بين 100 و250 سم.', 'Use a value between 100 and 250 cm.');
    if (!draft.goal) next.goal = text('اختر هدفك.', 'Choose a goal.');
    if (!draft.bodyType) next.bodyType = text('اختر الوصف الأقرب لك أو «غير متأكد».', 'Choose the closest description, or “Not sure”.');
    if (!Number.isInteger(draft.sessionsPerWeek) || draft.sessionsPerWeek < 1 || draft.sessionsPerWeek > 7)
      next.sessionsPerWeek = text('اختر من جلسة واحدة إلى 7 جلسات.', 'Choose between 1 and 7 sessions.');
    if (!draft.gender) next.gender = text('اختر النوع لإكمال الإعداد.', 'Choose your gender to finish setup.');
    return next;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`field-${first}`)?.focus();
      return;
    }
    onComplete({
      weightKg: Number(draft.weightKg),
      heightCm: Number(draft.heightCm),
      goal: draft.goal as VYORAProfile['goal'],
      bodyType: draft.bodyType as VYORAProfile['bodyType'],
      sessionsPerWeek: draft.sessionsPerWeek,
      gender: draft.gender as UserGender,
    });
  };

  const panel = 'rounded-2xl border border-white/[0.075] bg-[#171a1a]';
  const inputClass = (error?: string) =>
    `focus-ring h-12 w-full rounded-xl border bg-[#101313] px-4 text-sm text-[#f0f1ed] outline-none transition-colors placeholder:text-[#69716d] ${error ? 'border-[#f17d7d]/60' : 'border-white/[0.09] focus:border-[var(--profile-accent)]'}`;

  return (
    <main dir={isArabic ? 'rtl' : 'ltr'} style={themeStyle} className="relative min-h-[100dvh] overflow-hidden bg-[#101313] text-[#f1f2ef]">
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-[45%] h-[34rem] w-[34rem] rounded-full opacity-[0.08] blur-[110px]" style={{ background: accent }} />
      <div className="relative mx-auto max-w-[1160px] px-4 py-5 sm:px-7 sm:py-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/[0.07] pb-5">
          <Link href="/" className="flex items-center gap-2.5" aria-label="VYORA">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
              <svg width="24" height="24" viewBox="0 0 64 64" aria-hidden="true"><path d="M8 14h14l10 26 10-26h14L38 52H26z" fill={accent} /><path d="M2 30l22-4v6L2 36z" fill={accent} opacity=".55" /></svg>
            </span>
            <span className="latin text-[15px] font-bold tracking-[.27em]" dir="ltr">VY<span style={{ color: accent }}>O</span>RA</span>
          </Link>
          <span className="latin hidden text-[10px] font-semibold tracking-[.15em] text-[#7d8580] sm:block" dir="ltr">
            {text('إعداد ملفك · 01 / 01', 'YOUR PROFILE · 01 / 01')}
          </span>
        </header>

        <div className="grid gap-7 pb-8 pt-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-12 lg:pt-12">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold tracking-[.12em]" style={{ borderColor: `${accent}35`, color: accent, backgroundColor: `${accent}0d` }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
              {text('خطوة البداية', 'YOUR STARTING POINT')}
            </div>
            <h1 className="mt-5 max-w-lg text-4xl font-bold leading-[1.12] tracking-[-.045em] sm:text-5xl">
              {text('خلّينا نضبط خطتك على يومك.', 'Let’s shape a plan around your life.')}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#9aa09b]">
              {text('بعض التفاصيل تساعد ڤايورا على اقتراح جدول منزلي عملي. تقدر تعدّلها لاحقًا.', 'A few details help VYORA suggest a practical home routine. You can change them later.')}
            </p>
            <div className={`${panel} mt-7 hidden p-5 sm:block`}>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ color: accent, backgroundColor: `${accent}15` }}><HeartPulse size={19} /></span>
                <div>
                  <h2 className="text-sm font-bold">{text('تقدّم عملي، بدون ضغط', 'Practical progress, no pressure')}</h2>
                  <p className="mt-1 text-xs text-[#818984]">{text('اختياراتك لبناء خطة تناسب بيتك.', 'Your choices help make a plan that fits home.')}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <span className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: accent }} />
                <span className="h-1.5 flex-1 rounded-full bg-white/10" />
                <span className="h-1.5 flex-1 rounded-full bg-white/10" />
                <span className="latin ms-2 text-[9px] font-bold tracking-[.12em] text-[#7e8780]" dir="ltr">START</span>
              </div>
            </div>
          </aside>

          <form className="space-y-4" onSubmit={submit} noValidate>
            <section className={`${panel} p-4 sm:p-6`} aria-labelledby="gender-title">
              <div className="mb-4 flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[#abb2ac]" style={{ backgroundColor: `${accent}12` }}><UserRound size={18} /></span>
                <div>
                  <h2 id="gender-title" className="text-base font-bold">{text('اختيار النوع', 'Choose your gender')}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#858d87]">{text('يحدد لون الواجهة والصور الظاهرة في التطبيق.', 'This sets the app theme and the athlete photos you see.')}</p>
                </div>
              </div>
              <div id="field-gender" className="grid grid-cols-2 gap-2.5" role="group" aria-label={text('اختيار النوع', 'Choose your gender')}>
                <GenderOption selected={draft.gender === 'female'} color="#f184b6" onClick={() => chooseGender('female')} label={text('أنثى', 'Female')} sub={text('واجهة وردية وصور رياضيات', 'Pink theme and women athletes')} testId="button-theme-female" />
                <GenderOption selected={draft.gender === 'male'} color="#6c9cff" onClick={() => chooseGender('male')} label={text('ذكر', 'Male')} sub={text('واجهة زرقاء وصور رياضيين', 'Blue theme and men athletes')} testId="button-theme-male" />
              </div>
              {errors.gender && <ErrorText id="error-gender">{errors.gender}</ErrorText>}
            </section>

            <section className={`${panel} p-4 sm:p-6`} aria-labelledby="measure-title">
              <SectionTitle icon={<Scale size={18} />} title={text('بياناتك الأساسية', 'Your basics')} subtitle={text('استخدم القياسات الحالية، بدون حاجة لدقة مثالية.', 'Use your current measurements; they do not need to be exact.')} color={accent} />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label={text('الوزن', 'Weight')} unit="kg" error={errors.weightKg} errorId="error-weight" fieldId="field-weightKg">
                  <input id="field-weightKg" data-testid="input-weight-kg" type="number" min="25" max="300" step="0.1" inputMode="decimal" autoComplete="off" value={draft.weightKg} onChange={(event) => update('weightKg', event.target.value)} placeholder="68" aria-invalid={!!errors.weightKg} aria-describedby={errors.weightKg ? 'error-weight' : undefined} className={inputClass(errors.weightKg)} />
                </Field>
                <Field label={text('الطول', 'Height')} unit="cm" error={errors.heightCm} errorId="error-height" fieldId="field-heightCm">
                  <input id="field-heightCm" data-testid="input-height-cm" type="number" min="100" max="250" step="1" inputMode="numeric" autoComplete="off" value={draft.heightCm} onChange={(event) => update('heightCm', event.target.value)} placeholder="170" aria-invalid={!!errors.heightCm} aria-describedby={errors.heightCm ? 'error-height' : undefined} className={inputClass(errors.heightCm)} />
                </Field>
              </div>
              {initialProfile &&
                Number(draft.weightKg) >= 25 &&
                Number(draft.weightKg) <= 300 &&
                Number(draft.heightCm) >= 100 &&
                Number(draft.heightCm) <= 250 && (
                  <div
                    className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3"
                    data-testid="profile-bmi"
                    aria-live="polite"
                  >
                    <div>
                      <p className="text-xs font-bold">{text('مؤشر كتلة الجسم (BMI)', 'Body Mass Index (BMI)')}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {text('حساب تقريبي للتوعية، وليس تشخيصًا طبيًا.', 'A general estimate for information, not a medical diagnosis.')}
                      </p>
                    </div>
                    <strong className="latin text-2xl text-primary" dir="ltr">
                      {(Number(draft.weightKg) / (Number(draft.heightCm) / 100) ** 2).toFixed(1)}
                    </strong>
                  </div>
                )}
            </section>

            <section className={`${panel} p-4 sm:p-6`} aria-labelledby="goal-title">
              <SectionTitle icon={<Dumbbell size={18} />} title={text('ما هدفك؟', 'What is your goal?')} subtitle={text('اختر تركيزًا واحدًا كبداية.', 'Pick one focus to start with.')} color={accent} />
              <div id="field-goal" className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" role="group" aria-label={text('هدف التمرين', 'Workout goal')}>
                <Choice selected={draft.goal === 'lose-weight'} onClick={() => update('goal', 'lose-weight')} title={text('خسارة الوزن', 'Lose weight')} detail={text('حركة أكثر ولياقة', 'More movement')} testId="button-goal-lose-weight" color={accent} />
                <Choice selected={draft.goal === 'build-muscle'} onClick={() => update('goal', 'build-muscle')} title={text('بناء العضلات', 'Build muscle')} detail={text('قوة تدريجية', 'Steady strength')} testId="button-goal-build-muscle" color={accent} />
                <Choice selected={draft.goal === 'fitness'} onClick={() => update('goal', 'fitness')} title={text('لياقة عامة', 'General fitness')} detail={text('نشاط وتوازن', 'Energy and balance')} testId="button-goal-fitness" color={accent} />
                <Choice selected={draft.goal === 'gain-weight'} onClick={() => update('goal', 'gain-weight')} title={text('زيادة الوزن', 'Gain weight')} detail={text('تدرج في القوة والتغذية', 'Gradual strength and nutrition')} testId="button-goal-gain-weight" color={accent} />
              </div>
              {errors.goal && <ErrorText id="error-goal">{errors.goal}</ErrorText>}
            </section>

            <section className={`${panel} p-4 sm:p-6`} aria-labelledby="body-title">
              <SectionTitle icon={<Ruler size={18} />} title={text('كيف تصف بنية جسمك؟', 'How would you describe your build?')} subtitle={text('وصف ذاتي اختياري للتوجيه العام، وليس تقييمًا أو تشخيصًا.', 'A self-described guide for general personalization, not an assessment or diagnosis.')} color={accent} />
              <div id="field-bodyType" className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label={text('وصف بنية الجسم', 'Body build description')}>
                {([
                  ['slim', text(feminine ? 'نحيفة' : 'نحيف', 'Slim')],
                  ['medium', text(feminine ? 'متوسطة' : 'متوسط', 'Medium')],
                  ['strong', text(feminine ? 'قوية' : 'قوي', 'Strong')],
                  ['unsure', text(feminine ? 'غير متأكدة' : 'غير متأكد', 'Not sure')],
                ] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    data-testid={`button-body-${value}`}
                    aria-pressed={draft.bodyType === value}
                    onClick={() => update('bodyType', value)}
                    className={`focus-ring press min-h-11 rounded-xl border px-3 text-xs font-bold transition-colors ${draft.bodyType === value ? 'text-white' : 'border-white/[0.09] bg-[#101313] text-[#969e98] hover:border-white/20 hover:text-white'}`}
                    style={draft.bodyType === value ? { borderColor: `${accent}70`, backgroundColor: `${accent}1c`, color: accent } : undefined}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {errors.bodyType && <ErrorText id="error-body">{errors.bodyType}</ErrorText>}
            </section>

            <section className={`${panel} p-4 sm:p-6`} aria-labelledby="sessions-title">
              <SectionTitle icon={<CalendarDays size={18} />} title={text('كم جلسة أسبوعيًا؟', 'How many sessions each week?')} subtitle={text('ابدأ بما يناسب جدولك فعلًا.', 'Start with what genuinely fits your week.')} color={accent} />
              <div className="mt-5 flex flex-wrap gap-2" id="field-sessionsPerWeek" role="group" aria-label={text('عدد الجلسات أسبوعيًا', 'Sessions per week')}>
                {Array.from({ length: 7 }, (_, index) => index + 1).map((count) => (
                  <button
                    key={count}
                    type="button"
                    data-testid={`button-sessions-${count}`}
                    aria-pressed={draft.sessionsPerWeek === count}
                    onClick={() => update('sessionsPerWeek', count)}
                    className={`focus-ring press grid h-11 w-11 place-items-center rounded-xl border text-sm font-bold transition-colors ${draft.sessionsPerWeek === count ? 'text-white' : 'border-white/[0.09] bg-[#101313] text-[#969e98] hover:border-white/20'}`}
                    style={draft.sessionsPerWeek === count ? { borderColor: `${accent}70`, backgroundColor: `${accent}1c`, color: accent } : undefined}
                  >
                    {count}
                  </button>
                ))}
                <span className="flex items-center px-2 text-xs text-[#858d87]">{text('جلسات', 'sessions')}</span>
              </div>
              {errors.sessionsPerWeek && <ErrorText id="error-sessions">{errors.sessionsPerWeek}</ErrorText>}
            </section>

            {attempted && Object.keys(errors).length > 0 && (
              <p role="alert" aria-live="assertive" data-testid="status-form-errors" className="rounded-xl border border-[#f17d7d]/25 bg-[#f17d7d]/[0.08] px-4 py-3 text-xs leading-5 text-[#ffadad]">
                {text('راجع الحقول المحددة لإكمال إعداد ملفك.', 'Check the highlighted fields to finish your profile.')}
              </p>
            )}
            <button
              type="submit"
              data-testid="button-complete-profile"
              className="focus-ring press flex min-h-[54px] w-full items-center justify-center gap-3 rounded-xl px-6 text-sm font-extrabold text-[#111511] transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: accent }}
            >
              {text('حفظ ومتابعة', 'Save and continue')}
              {isArabic ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}
            </button>
            <p className="pb-4 text-center text-[10px] leading-5 text-[#727a74]">
              {text('يمكنك تحديث اختياراتك لاحقًا من ملفك الشخصي.', 'You can update these choices later from your profile.')}
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

function SectionTitle({ icon, title, subtitle, color }: { icon: ReactNode; title: string; subtitle: string; color: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ color, backgroundColor: `${color}15` }}>{icon}</span>
      <div>
        <h2 className="text-base font-bold">{title}</h2>
        <p className="mt-1 text-xs leading-5 text-[#858d87]">{subtitle}</p>
      </div>
    </div>
  );
}

function Field({ label, unit, error, errorId, fieldId, children }: { label: string; unit: string; error?: string; errorId: string; fieldId: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={fieldId} className="mb-2 flex items-center justify-between text-xs font-bold text-[#c2c7c1]">
        <span>{label}</span>
        <span className="latin text-[10px] font-semibold text-[#778079]" dir="ltr">{unit}</span>
      </label>
      <div className="relative">
        {children}
        <span aria-hidden="true" className="latin pointer-events-none absolute inset-y-0 end-4 flex items-center text-[10px] font-semibold text-[#717a73]" dir="ltr">{unit}</span>
      </div>
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return <p id={id} className="mt-2 text-[11px] leading-5 text-[#ff9999]" role="alert">{children}</p>;
}

function Choice({ selected, onClick, title, detail, testId, color }: { selected: boolean; onClick: () => void; title: string; detail: string; testId: string; color: string }) {
  return (
    <button
      type="button"
      data-testid={testId}
      aria-pressed={selected}
      onClick={onClick}
      className={`focus-ring press min-h-[76px] rounded-xl border p-3 text-start transition-colors ${selected ? '' : 'border-white/[0.09] bg-[#101313] hover:border-white/20'}`}
      style={selected ? { borderColor: `${color}70`, backgroundColor: `${color}1c` } : undefined}
    >
      <span className={`block text-xs font-bold ${selected ? '' : 'text-[#d6d9d5]'}`} style={selected ? { color } : undefined}>{title}</span>
      <span className="mt-1 block text-[10px] text-[#838b85]">{detail}</span>
      {selected && <Check size={13} className="mt-2" style={{ color }} />}
    </button>
  );
}

function GenderOption({ selected, color, onClick, label, sub, testId }: { selected: boolean; color: string; onClick: () => void; label: string; sub: string; testId: string }) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      aria-pressed={selected}
      className={`focus-ring press flex min-h-[68px] items-center gap-3 rounded-xl border px-3.5 text-start transition-colors ${selected ? '' : 'border-white/[0.09] bg-[#101313] hover:border-white/20'}`}
      style={selected ? { borderColor: `${color}75`, backgroundColor: `${color}18` } : undefined}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border" style={{ color, borderColor: `${color}45`, backgroundColor: `${color}12` }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold" style={selected ? { color } : undefined}>{label}</span>
        <span className="mt-0.5 block text-[10px] text-[#838b85]">{sub}</span>
      </span>
      {selected && <Check size={16} style={{ color }} />}
    </button>
  );
}
