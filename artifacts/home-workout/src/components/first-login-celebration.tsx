import { useEffect, useState } from 'react';

const CONFETTI_COLORS = ['#FF2D8E', '#FF77B5', '#A4F477', '#FFFFFF', '#8CC8FF'];
const CONFETTI_PARTICLES = Array.from({ length: 38 }, (_, index) => index);

export function FirstLoginCelebration() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let hideTimer = 0;
    const speechTimer = window.setTimeout(() => {
      if (
        !('speechSynthesis' in window) ||
        typeof SpeechSynthesisUtterance === 'undefined'
      ) {
        setVisible(false);
        return;
      }

      try {
        const message = new SpeechSynthesisUtterance('أهلا بيك في فايورا');
        message.lang = 'ar-EG';
        message.rate = 0.9;
        message.pitch = 1.1;
        message.onend = () => setVisible(false);
        message.onerror = () => setVisible(false);
        window.speechSynthesis.speak(message);
        hideTimer = window.setTimeout(() => setVisible(false), 7000);
      } catch {
        setVisible(false);
      }
    }, reduceMotion ? 0 : 2200);

    return () => {
      window.clearTimeout(speechTimer);
      window.clearTimeout(hideTimer);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
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
