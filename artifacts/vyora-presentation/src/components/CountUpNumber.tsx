import { useEffect, useState } from 'react';

const skipCounting = () =>
  window.location.pathname.endsWith('/allslides') ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function CountUpNumber({
  value,
  active = false,
  className = '',
}: {
  value: number;
  active?: boolean;
  className?: string;
}) {
  const [count, setCount] = useState(() =>
    !active || skipCounting() ? value : 0,
  );

  useEffect(() => {
    if (!active || skipCounting()) {
      setCount(value);
      return;
    }

    setCount(0);
    const startedAt = performance.now();
    let frame = 0;
    const update = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / 1000);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <span className={className} aria-label={String(value).padStart(2, '0')}>
      {String(count).padStart(2, '0')}
    </span>
  );
}
