export type UserGender = 'female' | 'male';
export type FitnessGoal = 'lose-weight' | 'build-muscle' | 'fitness';
export type BodyType = 'slim' | 'medium' | 'strong' | 'unsure';

export type VYORAProfile = {
  weightKg: number;
  heightCm: number;
  goal: FitnessGoal;
  bodyType: BodyType;
  sessionsPerWeek: number;
  gender: UserGender;
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
      profile.goal === 'fitness') &&
    (profile.bodyType === 'slim' ||
      profile.bodyType === 'medium' ||
      profile.bodyType === 'strong' ||
      profile.bodyType === 'unsure') &&
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

export function genderSafeImage(src: string, gender: UserGender): string {
  const path = src.toLowerCase();

  if (gender === 'female') {
    if (path.includes('squat')) return 'images/reference/squat.webp';
    if (path.includes('upper') || path.includes('push'))
      return 'images/reference/upper-woman.webp';
    if (path.includes('abs') || path.includes('crunch'))
      return 'images/abs.jpg';
    if (path.includes('plank')) return 'images/plank.jpg';
    if (path.includes('stretch') || path.includes('lunge'))
      return 'images/reference/stretch-woman.webp';
    return 'images/brand-boxing-pink.jpg';
  }

  if (path.includes('squat') || path.includes('lunge'))
    return 'images/brand-dumbbell-detail.jpg';
  if (path.includes('upper') || path.includes('push'))
    return 'images/reference/push-man.webp';
  if (path.includes('abs') || path.includes('crunch') || path.includes('plank'))
    return 'images/reference/plank-pair.webp';
  if (path.includes('stretch') || path.includes('athlete') || path.includes('pair'))
    return 'images/reference/plank-woman.webp';
  return 'images/reference/push-man.webp';
}

export function genderGallery(gender: UserGender): string[] {
  return gender === 'female'
    ? [
        'images/brand-boxing-pink.jpg',
        'images/brand-boxing-ember.jpg',
        'images/reference/squat.webp',
        'images/reference/upper-woman.webp',
        'images/reference/stretch-woman.webp',
      ]
    : [
        'images/reference/push-man.webp',
        'images/reference/plank-pair.webp',
        'images/reference/plank-woman.webp',
        'images/brand-dumbbell-detail.jpg',
      ];
}
