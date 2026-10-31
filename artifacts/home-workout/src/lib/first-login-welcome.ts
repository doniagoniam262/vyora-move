const WELCOME_KEY_PREFIX = 'vyora-first-login-welcome-v2:';

export function claimFirstLoginWelcome(userId: string): boolean {
  if (!userId) return false;
  try {
    const key = `${WELCOME_KEY_PREFIX}${userId}`;
    if (window.localStorage.getItem(key) === 'played') return false;
    window.localStorage.setItem(key, 'played');
    return true;
  } catch {
    // Still greet this login if browser storage is unavailable.
    return true;
  }
}
