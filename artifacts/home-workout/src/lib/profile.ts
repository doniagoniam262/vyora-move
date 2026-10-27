export type UserGender = 'female' | 'male';
export type FitnessGoal = 'lose-weight' | 'build-muscle' | 'fitness' | 'gain-weight';
export type BodyType = 'slim' | 'medium' | 'strong' | 'unsure' | 'apple' | 'pear' | 'hourglass';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active';

export type VYORAProfile = {
  weightKg: number;
  heightCm: number;
  goal: FitnessGoal;
  bodyType: BodyType;
  sessionsPerWeek: number;
  gender: UserGender;
  ageYears?: number;
  activityLevel?: ActivityLevel;
};

const PROFILE_KEY_PREFIX = 'vyora-profile-v1';

const isGender = (value: unknown): value is UserGender =>
  value === 'female' || value === 'male';

export function isVYORAProfile(value: unknown): value is VYORAProfile {
  if (!value || typeof value !== 'object') return false;

  const profile = value as Partial<VYORAProfile>;
  return (
    typeof profile.weightKg === 'number' &&
    Number.isFinite(profile.weightKg) &&
    profile.weightKg >= 25 &&
    profile.weightKg <= 300 &&
    typeof profile.heightCm === 'number' &&
    Number.isFinite(profile.heightCm) &&
    profile.heightCm >= 100 &&
    profile.heightCm <= 250 &&
    (profile.goal === 'lose-weight' ||
      profile.goal === 'build-muscle' ||
      profile.goal === 'fitness' ||
      profile.goal === 'gain-weight') &&
    (profile.bodyType === 'slim' ||
      profile.bodyType === 'medium' ||
      profile.bodyType === 'strong' ||
      profile.bodyType === 'unsure' ||
      profile.bodyType === 'apple' ||
      profile.bodyType === 'pear' ||
      profile.bodyType === 'hourglass') &&
    (profile.ageYears === undefined ||
      (Number.isInteger(profile.ageYears) && profile.ageYears >= 18 && profile.ageYears <= 100)) &&
    (profile.activityLevel === undefined ||
      profile.activityLevel === 'sedentary' ||
      profile.activityLevel === 'light' ||
      profile.activityLevel === 'moderate' ||
      profile.activityLevel === 'active') &&
    typeof profile.sessionsPerWeek === 'number' &&
    Number.isInteger(profile.sessionsPerWeek) &&
    profile.sessionsPerWeek >= 1 &&
    profile.sessionsPerWeek <= 7 &&
    isGender(profile.gender)
  );
}

function profileStorageKey(userId: string): string {
  return `${PROFILE_KEY_PREFIX}:${userId}`;
}

export function readVYORAProfile(userId: string): VYORAProfile | null {
  try {
    const raw = window.localStorage.getItem(profileStorageKey(userId));
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (isVYORAProfile(parsed)) return parsed;

    window.localStorage.removeItem(profileStorageKey(userId));
    return null;
  } catch {
    try {
      window.localStorage.removeItem(profileStorageKey(userId));
    } catch {
      /* Storage may be blocked by the browser. */
    }
    return null;
  }
}

export function saveVYORAProfile(
  userId: string,
  profile: VYORAProfile,
): boolean {
  if (!isVYORAProfile(profile)) return false;

  try {
    window.localStorage.setItem(profileStorageKey(userId), JSON.stringify(profile));
    return true;
  } catch {
    return false;
  }
}

export function clearVYORAProfile(userId: string): boolean {
  try {
    window.localStorage.removeItem(profileStorageKey(userId));
    return true;
  } catch {
    return false;
  }
}

