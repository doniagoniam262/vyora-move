import { Activity, Dumbbell, Flame, Layers, Target, Zap } from 'lucide-react';

const styles = [
  { Icon: Dumbbell, color: 'hsl(var(--primary))', glow: 'hsl(var(--primary) / .2)' },
  { Icon: Activity, color: '#53d5c5', glow: 'rgb(83 213 197 / .18)' },
  { Icon: Target, color: '#b3a0f6', glow: 'rgb(179 160 246 / .18)' },
  { Icon: Flame, color: '#efba7c', glow: 'rgb(239 186 124 / .17)' },
  { Icon: Layers, color: '#89b9ed', glow: 'rgb(137 185 237 / .18)' },
  { Icon: Zap, color: '#b8d88a', glow: 'rgb(184 216 138 / .17)' },
];

/** Static, non-figurative artwork shared by exercise and plan cards. */
export function FitnessVisual({
  identity = '',
  label,
  className = '',
}: {
  identity?: string;
  label: string;
  className?: string;
}) {
  const index = Array.from(identity).reduce((sum, char) => sum + char.charCodeAt(0), 0) % styles.length;
  const { Icon, color, glow } = styles[index];
  return (
    <div
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={`relative isolate flex min-h-0 items-center justify-center overflow-hidden ${className}`}
      style={{
        color,
        background: `radial-gradient(ellipse at 75% 15%, ${glow}, transparent 65%), linear-gradient(135deg, #222630, #10141b 75%)`,
      }}
    >
      <div aria-hidden="true" className="absolute -end-8 -top-12 h-44 w-44 rotate-[-25deg] rounded-[2rem] border border-white/[.06] bg-white/[.02]" />
      <div aria-hidden="true" className="absolute -bottom-16 -start-8 h-48 w-48 rounded-full border border-white/[.05]" />
      <div className="relative grid aspect-square w-[30%] min-w-6 max-w-20 place-items-center rounded-[25%] border border-white/10 bg-white/[.045] shadow-[0_12px_35px_rgba(0,0,0,.2)]">
        <Icon className="h-[48%] w-[48%]" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <span aria-hidden="true" className="absolute bottom-[12%] end-[9%] flex gap-1 opacity-50">
        <i className="h-1 w-5 rounded-full" style={{ background: color }} />
        <i className="h-1 w-1 rounded-full bg-white/40" />
        <i className="h-1 w-1 rounded-full bg-white/20" />
      </span>
    </div>
  );
}
