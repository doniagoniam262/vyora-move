import { useEffect, useState } from 'react';
import { chooseWelcomeVoice } from '@/lib/welcome-voice';

const CONFETTI_COLORS = ['#FF2D8E', '#FF77B5', '#A4F477', '#FFFFFF', '#8CC8FF'];
const CONFETTI_PARTICLES = Array.from({ length: 38 }, (_, index) => index);

export function FirstLoginCelebration() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let hideTimer = 0;
    let voiceFallbackTimer = 0;
    let synthesis: SpeechSynthesis | null = null;
    let previousVoicesChanged: SpeechSynthesis['onvoiceschanged'] = null;
    let voicesChangedHandler: SpeechSynthesis['onvoiceschanged'] = null;
    let speechStarted = false;

    const restoreVoicesChangedHandler = () => {
      if (
        synthesis &&
        voicesChangedHandler &&
        synthesis.onvoiceschanged === voicesChangedHandler
      ) {
        synthesis.onvoiceschanged = previousVoicesChanged;
      }
      voicesChangedHandler = null;
    };

    const speakWelcome = (voices: SpeechSynthesisVoice[]) => {
      if (!synthesis || speechStarted) return;
      speechStarted = true;

      try {
        const message = new SpeechSynthesisUtterance('Welcome to Vyora');
        message.lang = 'en-US';
        message.voice = chooseWelcomeVoice(voices) ?? null;
        message.rate = 0.85;
        message.pitch = 0.8;
        message.onend = () => setVisible(false);
        message.onerror = () => setVisible(false);
        synthesis.speak(message);
        hideTimer = window.setTimeout(() => setVisible(false), 7000);
      } catch {
        setVisible(false);
      }
    };

    const speechTimer = window.setTimeout(() => {
      if (
        !('speechSynthesis' in window) ||
        typeof SpeechSynthesisUtterance === 'undefined'
      ) {
        setVisible(false);
        return;
      }

      synthesis = window.speechSynthesis;
      const voices = synthesis.getVoices();

      if (voices.length > 0) {
        speakWelcome(voices);
        return;
      }

      previousVoicesChanged = synthesis.onvoiceschanged;
      const handler: NonNullable<SpeechSynthesis['onvoiceschanged']> = (event) => {
        try {
          previousVoicesChanged?.call(synthesis, event);
        } catch {
          // Keep voice loading independent from any existing page listener.
        }

        const loadedVoices = synthesis?.getVoices() ?? [];
        if (loadedVoices.length === 0) return;

        restoreVoicesChangedHandler();
        window.clearTimeout(voiceFallbackTimer);
        speakWelcome(loadedVoices);
      };
      voicesChangedHandler = handler;
      synthesis.onvoiceschanged = handler;

      // Some browsers never fire voiceschanged; use the system default after waiting briefly.
      voiceFallbackTimer = window.setTimeout(() => {
        restoreVoicesChangedHandler();
        speakWelcome(synthesis?.getVoices() ?? []);
      }, 1800);
    }, reduceMotion ? 0 : 2200);

    return () => {
      window.clearTimeout(speechTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(voiceFallbackTimer);
      restoreVoicesChangedHandler();
      synthesis?.cancel();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      data-testid="first-login-celebration"
      aria-hidden="true"
    >
      {CONFETTI_PARTICLES.map((index) => (
        <span
          key={index}
          className="vyora-confetti-piece"
          style={{
            left: `${(index * 37) % 100}%`,
            backgroundColor: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
            animationDelay: `${(index % 10) * 35}ms`,
            width: index % 3 === 0 ? 9 : 6,
            height: index % 4 === 0 ? 13 : 8,
            borderRadius: index % 2 === 0 ? '2px' : '9999px',
          }}
        />
      ))}
    </div>
  );
}
