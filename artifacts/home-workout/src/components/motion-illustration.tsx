import type { CSSProperties } from 'react';

type MotionIllustrationProps = {
  exercise?: string;
  variant?: 'squat' | 'reach' | 'lunge' | 'plank' | 'stretch' | 'step' | 'bridge' | 'press';
  className?: string;
  label?: string;
};

const poses: Record<NonNullable<MotionIllustrationProps['variant']>, {
  head: string;
  torso: string;
  arms: string;
  legs: string;
}> = {
  squat: { head: '102 48', torso: 'M99 64 Q110 76 119 91', arms: 'M104 70 Q83 71 77 83 M111 74 Q130 65 138 69', legs: 'M119 91 Q121 111 103 122 M119 91 Q142 101 139 119' },
  reach: { head: '101 45', torso: 'M100 62 Q109 77 114 94', arms: 'M102 68 Q84 52 80 32 M107 68 Q124 51 129 31', legs: 'M114 94 Q103 111 101 127 M114 94 Q131 108 135 127' },
  lunge: { head: '104 44', torso: 'M103 61 Q111 78 112 96', arms: 'M106 69 Q90 75 82 88 M110 68 Q126 72 134 83', legs: 'M112 96 Q95 103 83 117 M112 96 Q132 100 144 116' },
  plank: { head: '151 77', torso: 'M75 92 Q110 82 145 78', arms: 'M88 90 Q80 104 72 111 M91 89 Q99 102 105 108', legs: 'M145 78 Q163 80 176 92 M144 79 Q160 68 176 68' },
  stretch: { head: '105 74', torso: 'M106 90 Q122 96 132 108', arms: 'M109 90 Q90 99 78 111 M112 92 Q129 94 145 87', legs: 'M132 108 Q111 115 88 119 M132 108 Q147 118 163 119' },
  step: { head: '103 46', torso: 'M102 63 Q111 76 116 92', arms: 'M105 69 Q87 65 79 52 M110 70 Q127 81 136 91', legs: 'M116 92 Q97 105 88 124 M116 92 Q134 96 144 110' },
  bridge: { head: '54 104', torso: 'M69 104 Q99 91 126 92', arms: 'M71 106 Q76 120 84 123 M76 103 Q68 117 62 121', legs: 'M126 92 Q143 101 153 119 M126 92 Q108 105 101 120' },
  press: { head: '104 45', torso: 'M103 62 Q112 77 116 94', arms: 'M106 69 Q88 57 81 45 M110 69 Q131 60 143 50', legs: 'M116 94 Q99 110 96 127 M116 94 Q134 107 138 127' },
};

export function MotionIllustration({
  exercise,
  variant = 'squat',
  className = '',
  label,
}: MotionIllustrationProps) {
  const themeStyle: CSSProperties = {
    '--motion-accent': 'hsl(var(--primary))',
    '--motion-soft': 'hsl(var(--primary) / .15)',
  } as CSSProperties;
  const pose = poses[variant];
  const ariaLabel = label ?? exercise ?? 'Movement illustration';
  return (
    <svg
      viewBox="0 0 220 160"
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={themeStyle}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="111" cy="137" rx="72" ry="9" fill="var(--motion-soft)" />
      <path d="M35 133h150" stroke="currentColor" strokeOpacity=".12" strokeWidth="2" strokeLinecap="round" />
      <circle cx={pose.head.split(' ')[0]} cy={pose.head.split(' ')[1]} r="13" fill="var(--motion-accent)" />
      <path d={pose.torso} fill="none" stroke="var(--motion-accent)" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
      <path d={pose.arms} fill="none" stroke="var(--motion-accent)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d={pose.legs} fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M61 34c9-11 22-17 37-17" fill="none" stroke="var(--motion-accent)" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
      <circle cx="57" cy="42" r="3" fill="var(--motion-accent)" opacity=".55" />
      <circle cx="171" cy="39" r="4" fill="var(--motion-accent)" opacity=".28" />
    </svg>
  );
}
