import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Eye } from 'lucide-react';
import { ExerciseTechniqueExperience } from '@/components/squat-technique-experience';
import { SiteLayout } from '@/components/layout';
import { exerciseById } from '@/lib/data';
import { getMovementInsight } from '@/lib/movement-details';
import { localizeExercise } from '@/lib/localized-data';
import { useLocale } from '@/lib/locale';
import type { UserGender } from '@/lib/profile';

export function PublicSquatPreview() {
  const { locale } = useLocale();
  const [gender, setGender] = useState<UserGender>(() => {
    const requested = new URLSearchParams(window.location.search).get('gender');
    return requested === 'male' ? 'male' : 'female';
  });
  const rawExercise = exerciseById('squat');

  if (!rawExercise) {
    return <p className="p-8 text-center">VYORA squat preview is unavailable.</p>;
  }

  const exercise = localizeExercise(rawExercise, locale);
  const insight = getMovementInsight('squat', locale);
  if (!insight) {
    return <p className="p-8 text-center">VYORA squat guide is unavailable.</p>;
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/[.06] p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Eye size={19} /></span>
            <div>
              <h1 className="text-sm font-extrabold">{locale === 'ar' ? 'معاينة عامة لصفحة السكوات' : 'Public squat page preview'}</h1>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                {locale === 'ar' ? 'عرض للقراءة فقط. لا يتم تحميل ملف شخصي أو حفظ تقدم.' : 'Read-only review. No profile is loaded and no progress is saved.'}
              </p>
            </div>
          </div>
          <Link href="/" className="focus-ring inline-flex shrink-0 items-center gap-1 rounded-full border border-border px-3 py-2 text-xs font-bold">
            <ArrowLeft size={14} />{locale === 'ar' ? 'الدخول' : 'Sign in'}
          </Link>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold">{exercise.name}</h2>
            <p className="latin text-sm text-muted-foreground" dir="ltr">{exercise.latin}</p>
          </div>
          <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[10px] font-bold text-primary">VYORA MOVE</span>
        </div>
        <ExerciseTechniqueExperience
          exercise={exercise}
          locale={locale}
          gender={gender}
          onGenderChange={setGender}
          primary={insight.primary}
          secondary={insight.secondary}
          showStartButton={false}
        />
      </div>
    </SiteLayout>
  );
}
