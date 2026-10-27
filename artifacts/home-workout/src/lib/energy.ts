import type { ActivityLevel, VYORAProfile } from './profile';

export const activityLevels: Record<ActivityLevel, { ar: string; en: string; factor: number }> = {
  sedentary: { ar: 'قليل الحركة — جلوس معظم اليوم', en: 'Mostly sedentary — mainly sitting', factor: 1.2 },
  light: { ar: 'نشاط خفيف — حركة يومية وتمارين خفيفة', en: 'Light — some daily movement and light exercise', factor: 1.375 },
  moderate: { ar: 'نشاط متوسط — حركة وتمارين منتظمة', en: 'Moderate — regular movement and exercise', factor: 1.55 },
  active: { ar: 'نشاط مرتفع — عمل بدني أو تدريب متكرر', en: 'Active — physical work or frequent training', factor: 1.725 },
};

export type EnergyEstimate = { resting: number; maintenance: number; low: number; high: number };

/** Adult Mifflin–St Jeor estimate. Not a prescription or a goal-specific intake. */
export function estimateEnergy(profile: Partial<VYORAProfile>): EnergyEstimate | null {
  const { weightKg, heightCm, ageYears, gender, activityLevel } = profile;
  if (
    typeof weightKg !== 'number' || !Number.isFinite(weightKg) || weightKg < 25 || weightKg > 300 ||
    typeof heightCm !== 'number' || !Number.isFinite(heightCm) || heightCm < 100 || heightCm > 250 ||
    typeof ageYears !== 'number' || !Number.isInteger(ageYears) || ageYears < 18 || ageYears > 100 ||
    (gender !== 'female' && gender !== 'male') ||
    !activityLevel || !Object.hasOwn(activityLevels, activityLevel)
  ) return null;
  const resting = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + (gender === 'male' ? 5 : -161);
  if (resting <= 0) return null;
  const maintenance = resting * activityLevels[activityLevel].factor;
  const round = (value: number) => Math.round(value / 10) * 10;
  return { resting: round(resting), maintenance: round(maintenance), low: round(maintenance * .9), high: round(maintenance * 1.1) };
}
