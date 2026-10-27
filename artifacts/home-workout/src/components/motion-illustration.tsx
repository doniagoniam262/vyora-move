import type { CSSProperties } from 'react';
import { useVYORAProfile } from '@/lib/profile-context';

export type MotionVariant =
  | 'squat' | 'reach' | 'lunge' | 'plank' | 'stretch' | 'step' | 'bridge' | 'press'
  | 'pushup' | 'knee-pushup' | 'wide-pushup' | 'close-pushup' | 'curl'
  | 'superman' | 'snow-angel' | 'prone-t' | 'scapular';

type MotionIllustrationProps = {
  exercise?: string;
  variant?: MotionVariant;
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
  pushup: { head: '153 77', torso: 'M75 93 Q111 84 146 79', arms: 'M87 91 Q78 100 71 111 M98 89 Q103 100 108 110', legs: 'M146 79 Q161 78 177 90 M145 80 Q160 68 176 68' },
  'knee-pushup': { head: '153 76', torso: 'M75 91 Q111 83 146 78', arms: 'M87 90 Q78 100 71 111 M98 88 Q104 99 108 109', legs: 'M146 78 Q158 85 160 97 Q169 103 177 103 M144 79 Q153 89 153 100' },
  'wide-pushup': { head: '153 77', torso: 'M75 92 Q111 83 146 78', arms: 'M87 90 Q68 96 54 108 M99 88 Q120 96 132 109', legs: 'M146 78 Q161 78 177 90 M145 79 Q160 68 176 68' },
  'close-pushup': { head: '153 77', torso: 'M75 92 Q111 83 146 78', arms: 'M88 90 Q90 101 97 110 M99 88 Q97 100 94 110', legs: 'M146 78 Q161 78 177 90 M145 79 Q160 68 176 68' },
  curl: { head: '104 45', torso: 'M103 62 Q112 77 116 94', arms: 'M106 69 Q90 75 95 91 Q97 97 105 94 M110 69 Q128 74 123 90 Q121 96 114 94', legs: 'M116 94 Q99 110 96 127 M116 94 Q134 107 138 127' },
  superman: { head: '54 80', torso: 'M70 86 Q107 96 143 89', arms: 'M75 87 Q60 78 43 74 M78 88 Q66 95 53 101', legs: 'M143 89 Q162 83 180 82 M143 90 Q162 98 179 101' },
  'snow-angel': { head: '54 82', torso: 'M70 87 Q108 96 143 88', arms: 'M78 89 Q65 78 58 63 M82 90 Q66 95 56 108', legs: 'M143 88 Q161 82 180 82 M143 90 Q162 98 179 101' },
  'prone-t': { head: '54 82', torso: 'M70 87 Q108 96 143 88', arms: 'M83 89 Q72 82 60 80 M84 91 Q71 100 60 102', legs: 'M143 88 Q161 82 180 82 M143 90 Q162 98 179 101' },
  scapular: { head: '153 77', torso: 'M75 92 Q111 83 146 78', arms: 'M87 90 Q81 101 73 111 M98 88 Q103 100 108 110', legs: 'M146 78 Q161 78 177 90 M145 79 Q160 68 176 68' },
};

export function MotionIllustration({
  exercise,
  variant = 'squat',
  className = '',
  label,
}: MotionIllustrationProps) {
  const profile = useVYORAProfile();
  const femaleFigure = profile?.gender === 'female';
  const themeStyle: CSSProperties = {
    '--motion-accent': 'hsl(var(--primary))',
    '--motion-soft': 'hsl(var(--primary) / .15)',
  } as CSSProperties;
  const pose = poses[variant];
  const [headX, headY] = pose.head.split(' ').map(Number);
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
      {femaleFigure ? (
        <path
          d={`M${headX - 9} ${headY - 1} Q${headX - 13} ${headY - 13} ${headX - 2} ${headY - 14} Q${headX + 6} ${headY - 13} ${headX + 7} ${headY - 7} M${headX - 8} ${headY + 1} Q${headX - 20} ${headY + 4} ${headX - 17} ${headY + 17}`}
          fill="none"
          stroke="var(--motion-accent)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      ) : (
        <path
          d={`M${headX - 10} ${headY - 3} Q${headX - 8} ${headY - 15} ${headX + 4} ${headY - 12} Q${headX + 10} ${headY - 9} ${headX + 9} ${headY - 3}Z`}
          fill="var(--motion-accent)"
          opacity=".9"
        />
      )}
      <circle cx={headX} cy={headY} r={femaleFigure ? 11 : 13} fill="var(--motion-accent)" />
      <path d={pose.torso} fill="none" stroke="var(--motion-accent)" strokeWidth={femaleFigure ? 12 : 17} strokeLinecap="round" strokeLinejoin="round" />
      <path d={pose.arms} fill="none" stroke="var(--motion-accent)" strokeWidth={femaleFigure ? 7 : 9} strokeLinecap="round" strokeLinejoin="round" />
      <path d={pose.legs} fill="none" stroke="currentColor" strokeWidth={femaleFigure ? 7.5 : 10} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M61 34c9-11 22-17 37-17" fill="none" stroke="var(--motion-accent)" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
      <circle cx="57" cy="42" r="3" fill="var(--motion-accent)" opacity=".55" />
      <circle cx="171" cy="39" r="4" fill="var(--motion-accent)" opacity=".28" />
    </svg>
  );
}
