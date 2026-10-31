let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || typeof window.AudioContext === 'undefined') return null;
  audioContext ??= new window.AudioContext();
  return audioContext;
}

export function prepareDingAudio() {
  const context = getAudioContext();
  if (context?.state === 'suspended') void context.resume().catch(() => undefined);
}

export function playDing() {
  const context = getAudioContext();
  if (!context) return;
  prepareDingAudio();

  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const volume = context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, now);
  oscillator.frequency.exponentialRampToValueAtTime(1320, now + 0.2);
  volume.gain.setValueAtTime(0.0001, now);
  volume.gain.exponentialRampToValueAtTime(0.16, now + 0.02);
  volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
  oscillator.connect(volume);
  volume.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.43);
}
