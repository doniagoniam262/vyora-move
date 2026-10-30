import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { exerciseById } from '@/lib/data';

/* ------------------------------------------------------------------ */
/* VYORA MOVE — internal articulated athlete (side view, SVG filled). */
/* Angles: limbs absolute from straight-down, + = toward the front.   */
/* Torso: from vertical-up, + = leaning forward.                      */
/* ------------------------------------------------------------------ */

type V2 = [number, number];
type Pose = {
  x: number; y: number; t: number; h?: number;
  aN: V2; aF: V2; lN: V2; lF: V2;
  fN?: number; fF?: number; sx?: number; sy?: number;
  thN?: number; thF?: number; arN?: number; arF?: number;
};
type Prop = 'none' | 'wall-right' | 'wall-left' | 'chair' | 'chair-support' | 'bench';
type Config = {
  frames: Pose[]; dur: number; prop?: Prop; floor?: boolean; hold?: boolean;
  grip?: 'wide' | 'narrow'; circle?: boolean;
  focus: { en: string; ar: string };
};

const ST: Pose = { x: 200, y: 162, t: 0, aN: [6, 14], aF: [-6, 8], lN: [0, 0], lF: [2, 0] };
const SU: Pose = { x: 225, y: 241, t: -90, aN: [92, 92], aF: [92, 92], lN: [90, 90], lF: [90, 90], fN: 180, fF: 180 };
const BENT: Pose = { ...SU, x: 220, lN: [140, 18], lF: [140, 18], fN: 90, fF: 90 };
const PR: Pose = { x: 175, y: 241, t: 90, aN: [-84, -84], aF: [-84, -84], lN: [-90, -90], lF: [-90, -90], fN: -20, fF: -20 };
const PL: Pose = { x: 180, y: 208, t: 72, aN: [0, 0], aF: [2, 0], lN: [-62, -62], lF: [-62, -62], fN: 20, fF: 20 };
const CRUNCH: Pose = { ...BENT, aN: [-150, -120], aF: [-148, -118] };
const DB: Pose = { ...SU, aN: [178, 178], aF: [180, 180], lN: [178, 90], lF: [180, 90], fN: 150, fF: 150 };
const PLANK: Pose = { x: 180, y: 222, t: 78, aN: [0, 90], aF: [2, 90], lN: [-72, -72], lF: [-72, -72], fN: 20, fF: 20 };
const QUAD: Pose = { x: 170, y: 204, t: 76, h: -6, aN: [0, 0], aF: [2, 0], lN: [0, -90], lF: [0, -90], fN: -90, fF: -90 };
const HAM: Pose = { x: 175, y: 240, t: 22, aN: [70, 82], aF: [72, 84], lN: [90, 90], lF: [100, -95], fN: 180, fF: 90 };
const CHILD: Pose = { x: 190, y: 232, t: 96, h: 10, aN: [93, 90], aF: [94, 90], lN: [75, -90], lF: [75, -90], fN: -90, fF: -90 };
const WS: Pose = { x: 168, y: 205, t: 0, aN: [60, 95], aF: [62, 95], lN: [90, 0], lF: [90, 0] };
const SNOW: Pose = { ...PR, t: 86, h: -8, aN: [-86, -86], aF: [-86, -86] };
const SNOW_MID: Pose = { ...SNOW, aN: [0, 0], aF: [0, 0], arN: 0.15, arF: 0.15 };

const CONFIGS: Record<string, Config> = {
  march: { dur: 620, focus: { en: 'Knee drive, opposite arm', ar: 'رفع الركبة مع الذراع المعاكسة' },
    frames: [{ ...ST, aN: [-30, -10], aF: [35, 80], lN: [70, -5], lF: [0, 0] }, { ...ST, aN: [35, 80], aF: [-30, -10], lN: [0, 0], lF: [70, -5] }] },
  'shoulder-circles': { dur: 480, circle: true, focus: { en: 'Big, slow backward circles', ar: 'دوائر واسعة وبطيئة للخلف' },
    frames: [{ ...ST, aN: [2, 4], aF: [-2, 4], sx: 0, sy: -6 }, { ...ST, aN: [-4, 0], aF: [-6, 0], sx: -5, sy: -2 }, { ...ST, aN: [2, 4], aF: [-2, 4], sx: 0, sy: 3 }, { ...ST, aN: [8, 8], aF: [4, 8], sx: 5, sy: -2 }] },
  squat: { dur: 1100, focus: { en: 'Hips back, chest proud', ar: 'الوركان للخلف والصدر مرفوع' },
    frames: [{ ...ST, aN: [20, 30], aF: [16, 26] }, { x: 183, y: 205, t: 38, h: -20, aN: [90, 90], aF: [88, 90], lN: [80, -30], lF: [80, -30] }] },
  'glute-bridge': { dur: 1200, floor: true, focus: { en: 'Squeeze glutes at the top', ar: 'شدّ الأرداف في الأعلى' },
    frames: [{ ...BENT, aN: [95, 95], aF: [95, 95] }, { x: 215, y: 216, t: -115, aN: [95, 95], aF: [95, 95], lN: [105, 6], lF: [105, 6], fN: 90, fF: 90 }] },
  lunge: { dur: 1100, focus: { en: 'Front knee over ankle', ar: 'الركبة الأمامية فوق الكاحل' },
    frames: [{ ...ST, aN: [-25, 60], aF: [-25, 60] }, { x: 200, y: 208, t: 0, aN: [-25, 60], aF: [-25, 60], lN: [85, 0], lF: [-35, -80], fF: 10 }] },
  'jacks-low': { dur: 640, focus: { en: 'Step out, arms overhead', ar: 'خطوة جانبية والذراعان للأعلى' },
    frames: [ST, { ...ST, aN: [165, 175], aF: [160, 172], lN: [-12, -6], lF: [10, 4] }] },
  'mountain-climber': { dur: 420, floor: true, focus: { en: 'Hips low, quick knees', ar: 'الوركان منخفضان والركبتان بسرعة' },
    frames: [{ ...PL, lN: [55, -70], fN: 40 }, { ...PL, lF: [55, -70], fF: 40 }] },
  'incline-push': { dur: 1100, prop: 'bench', focus: { en: 'One line, head to heel', ar: 'خط واحد من الرأس للكعب' },
    frames: [{ x: 175, y: 190, t: 62, aN: [17, 17], aF: [19, 17], lN: [-48, -48], lF: [-48, -48], fN: 30, fF: 30 }, { x: 180, y: 198, t: 66, aN: [-50, 77], aF: [-48, 77], lN: [-54, -54], lF: [-54, -54], fN: 30, fF: 30 }] },
  'chair-dip': { dur: 1200, prop: 'chair', focus: { en: 'Elbows bend straight back', ar: 'المرفقان ينثنيان للخلف' },
    frames: [{ x: 215, y: 198, t: -5, aN: [-6, -6], aF: [-4, -6], lN: [85, 10], lF: [85, 10] }, { x: 218, y: 228, t: -5, aN: [-60, 54], aF: [-58, 54], lN: [110, 15], lF: [110, 15] }] },
  plank: { dur: 1700, hold: true, floor: true, focus: { en: 'Brace and breathe', ar: 'ثبات وتنفّس هادئ' },
    frames: [PLANK, { ...PLANK, y: 220, t: 77.4 }] },
  crunch: { dur: 1000, floor: true, focus: { en: 'Small lift, neck relaxed', ar: 'رفع صغير ورقبة مرتاحة' },
    frames: [CRUNCH, { ...CRUNCH, t: -62, h: 10, aN: [-122, -92], aF: [-120, -90] }] },
  bicycle: { dur: 800, floor: true, focus: { en: 'Slow, controlled switch', ar: 'تبديل بطيء ومتحكَّم' },
    frames: [{ ...SU, x: 220, t: -68, h: 8, aN: [-128, -98], aF: [-126, -96], lN: [112, 100], lF: [-165, 100], fN: 180, fF: 150 }, { ...SU, x: 220, t: -68, h: 8, aN: [-126, -96], aF: [-128, -98], lF: [112, 100], lN: [-165, 100], fN: 150, fF: 180 }] },
  hamstring: { dur: 1700, hold: true, floor: true, focus: { en: 'Hinge from the hips', ar: 'الميل من مفصل الورك' },
    frames: [HAM, { ...HAM, t: 52, h: 10, aN: [100, 98], aF: [102, 100] }] },
  'childs-pose': { dur: 1900, hold: true, floor: true, focus: { en: 'Long exhale, soft back', ar: 'زفير طويل وظهر مرتخٍ' },
    frames: [CHILD, { ...CHILD, y: 228, t: 88 }] },
  'wall-push-up': { dur: 1100, prop: 'wall-right', focus: { en: 'Lower chest to the wall', ar: 'قرّب الصدر من الحائط' },
    frames: [{ x: 215, y: 165, t: 18, aN: [80, 80], aF: [82, 80], lN: [-10, -10], lF: [-10, -10] }, { x: 225, y: 168, t: 30, aN: [60, 150], aF: [62, 150], lN: [-17, -17], lF: [-17, -17] }] },
  'prone-w-raise': { dur: 1300, floor: true, focus: { en: 'Squeeze shoulder blades', ar: 'اضغط لوحي الكتف' },
    frames: [{ ...PR, aN: [-80, 95], aF: [-78, 95] }, { ...PR, t: 84, h: -10, aN: [-110, 70], aF: [-108, 72] }] },
  'wall-sit': { dur: 1800, hold: true, prop: 'wall-left', focus: { en: 'Back flat, knees track toes', ar: 'الظهر ملاصق والركبتان باتجاه القدم' },
    frames: [WS, { ...WS, y: 204, t: -1 }] },
  'calf-raise': { dur: 1000, prop: 'chair-support', focus: { en: 'Rise tall, lower slow', ar: 'ارتفع عاليًا وانزل ببطء' },
    frames: [{ ...ST, aN: [45, 75], aF: [10, 20], fN: 90, fF: 90 }, { ...ST, y: 151, aN: [48, 62], aF: [10, 20], fN: 48, fF: 48 }] },
  'dead-bug': { dur: 900, floor: true, focus: { en: 'Low back stays down', ar: 'أسفل الظهر ملامس للأرض' },
    frames: [DB, { ...DB, aN: [250, 250], lF: [100, 100] }, DB, { ...DB, aF: [250, 250], lN: [100, 100] }] },
  'side-plank': { dur: 1300, floor: true, focus: { en: 'Lift hips into one line', ar: 'ارفع الحوض لخط مستقيم' },
    frames: [{ x: 182, y: 242, t: 70, aN: [0, 90], aF: [60, 150], lN: [-86, -86], lF: [-84, -84], fN: 10, fF: 10 }, { x: 180, y: 226, t: 86, aN: [0, 90], aF: [172, 180], lN: [-75, -75], lF: [-73, -73], fN: 10, fF: 10 }] },
  'fire-hydrant': { dur: 1000, floor: true, focus: { en: 'Knee opens, torso still', ar: 'الركبة تنفتح والجذع ثابت' },
    frames: [QUAD, { ...QUAD, thN: -0.38 }] },
  'hip-hinge': { dur: 1200, focus: { en: 'Push hips back, long spine', ar: 'الوركان للخلف وظهر طويل' },
    frames: [{ ...ST, aN: [0, 0], aF: [2, 0] }, { x: 186, y: 166, t: 70, h: -10, aN: [0, 0], aF: [2, 0], lN: [15, -10], lF: [15, -10] }] },
  'pike-push-up': { dur: 1200, floor: true, focus: { en: 'Head toward the hands', ar: 'الرأس نحو اليدين' },
    frames: [{ x: 190, y: 180, t: 105, h: 15, aN: [-20, 30], aF: [-18, 30], lN: [-36, -36], lF: [-36, -36], fN: 30, fF: 30 }, { x: 192, y: 176, t: 135, h: 15, aN: [60, -45], aF: [62, -45], lN: [-36, -36], lF: [-36, -36], fN: 30, fF: 30 }] },
  'push-up': { dur: 1000, floor: true, focus: { en: 'Whole body moves as one', ar: 'الجسم يتحرك كقطعة واحدة' },
    frames: [PL, { ...PL, y: 228, t: 78, aN: [-45, 58], aF: [-43, 58], lN: [-75, -75], lF: [-75, -75] }] },
  'knee-push-up': { dur: 1000, floor: true, focus: { en: 'Straight line, knee to head', ar: 'خط مستقيم من الركبة للرأس' },
    frames: [{ x: 180, y: 208, t: 70, aN: [0, 0], aF: [2, 0], lN: [-37, -110], lF: [-37, -110], fN: -110, fF: -110 }, { x: 182, y: 224, t: 80, aN: [-45, 52], aF: [-43, 52], lN: [-55, -110], lF: [-55, -110], fN: -110, fF: -110 }] },
  'wide-push-up': { dur: 1150, floor: true, grip: 'wide', focus: { en: 'Hands wider than shoulders', ar: 'اليدان أوسع من الكتفين' },
    frames: [PL, { ...PL, y: 227, t: 78, aN: [-30, 68], aF: [-28, 68], lN: [-75, -75], lF: [-75, -75] }] },
  'close-grip-push-up': { dur: 1100, floor: true, grip: 'narrow', focus: { en: 'Elbows hug the ribs', ar: 'المرفقان قرب الأضلاع' },
    frames: [PL, { ...PL, y: 227, t: 78, aN: [-60, 48], aF: [-58, 48], lN: [-75, -75], lF: [-75, -75] }] },
  'bicep-self-curl': { dur: 1300, focus: { en: 'Curl against your own hand', ar: 'اثنِ ضد مقاومة يدك' },
    frames: [{ ...ST, aN: [2, 4], aF: [20, 70] }, { ...ST, aN: [4, 160], aF: [30, 150] }] },
  'superman-pull': { dur: 1000, floor: true, focus: { en: 'Reach, then pull elbows', ar: 'مدّ ثم اسحب المرفقين' },
    frames: [{ ...PR, aN: [90, 90], aF: [92, 92] }, { ...PR, t: 82, h: -12, aN: [84, 84], aF: [86, 86], lN: [-86, -86], lF: [-86, -86] }, { ...PR, t: 82, h: -12, aN: [-100, 60], aF: [-98, 62], lN: [-86, -86], lF: [-86, -86] }] },
  'reverse-snow-angel': { dur: 900, floor: true, focus: { en: 'Wide arc, shoulders down', ar: 'قوس واسع وكتفان منخفضان' },
    frames: [SNOW, SNOW_MID, { ...SNOW, aN: [86, 86], aF: [86, 86] }, SNOW_MID] },
  'prone-t-raise': { dur: 1200, floor: true, focus: { en: 'Arms out wide, lift lightly', ar: 'ذراعان ممدودتان ورفع خفيف' },
    frames: [{ ...PR, aN: [0, 0], aF: [0, 0], arN: 0.2, arF: 0.2 }, { ...PR, t: 86, h: -8, aN: [0, 0], aF: [0, 0], arN: -0.28, arF: -0.28 }] },
  'scapular-push-up': { dur: 900, floor: true, focus: { en: 'Arms straight, blades glide', ar: 'ذراعان مستقيمتان ولوحا الكتف يتحركان' },
    frames: [PL, { ...PL, y: 211, t: 73.5 }] },
  'arm-circles': { dur: 900, circle: true, focus: { en: 'Small, smooth arm circles', ar: 'دوائر ذراعين صغيرة وناعمة' },
    frames: [{ ...ST, aN: [88, 4], aF: [90, 4] }, { ...ST, aN: [125, 0], aF: [127, 0] }, { ...ST, aN: [90, -20], aF: [92, -20] }, { ...ST, aN: [55, 0], aF: [57, 0] }] },
  'chest-expansion': { dur: 950, focus: { en: 'Open the chest, relax shoulders', ar: 'افتح الصدر وأرخِ الكتفين' },
    frames: [{ ...ST, aN: [15, 80], aF: [18, 80] }, { ...ST, aN: [6, 135], aF: [8, 135] }] },
  'torso-twists': { dur: 900, focus: { en: 'Rotate gently, hips steady', ar: 'لف بلطف مع ثبات الحوض' },
    frames: [{ ...ST, t: -18, aN: [15, 35], aF: [15, 35] }, { ...ST, t: 18, aN: [15, 35], aF: [15, 35] }] },
  'leg-raise': { dur: 1000, floor: true, focus: { en: 'Lower legs with core control', ar: 'اخفض الساقين بتحكم الجذع' },
    frames: [{ ...BENT, aN: [165, 165], aF: [165, 165], lN: [90, 90], lF: [90, 90] }, { ...BENT, aN: [165, 165], aF: [165, 165], lN: [160, 160], lF: [160, 160] }] },
  'high-knees': { dur: 460, focus: { en: 'Lift knees, land softly', ar: 'ارفع الركبتين واهبط بهدوء' },
    frames: [{ ...ST, aN: [-28, -5], aF: [35, 70], lN: [72, -8], lF: [0, 0] }, { ...ST, aN: [35, 70], aF: [-28, -5], lN: [0, 0], lF: [72, -8] }] },
  'standing-side-stretch': { dur: 1600, hold: true, focus: { en: 'Reach up and lean gently', ar: 'مد الذراع ومِل برفق' },
    frames: [{ ...ST, aN: [0, 0], aF: [-155, -155] }, { ...ST, t: -18, h: 12, aN: [0, 0], aF: [-155, -155] }] },
  'cat-cow': { dur: 1500, floor: true, focus: { en: 'Round and extend gently', ar: 'دوّر الظهر وافتحه برفق' },
    frames: [{ ...QUAD, t: 68, h: 14 }, { ...QUAD, t: 82, h: -8 }] },
};

const FALLBACK: Config = { dur: 1600, hold: true, focus: { en: 'Breathe and reset', ar: 'تنفّس واستعد' }, frames: [ST, { ...ST, y: 161 }] };
export const athleteExerciseIds = Object.keys(CONFIGS).filter((id) => exerciseById(id));

/* ---------------------------- geometry ---------------------------- */
const D = Math.PI / 180;
const LEN = { T: 60, UA: 32, FA: 30, TH: 44, SH: 42, F: 15, NECK: 19 };
const seg = (p: V2, deg: number, l: number): V2 => [p[0] + Math.sin(deg * D) * l, p[1] + Math.cos(deg * D) * l];
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const lv = (a: V2, b: V2, k: number): V2 => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];

function blend(a: Pose, b: Pose, k: number): Pose {
  const o = (x: number | undefined, y: number | undefined, d: number) => lerp(x ?? d, y ?? d, k);
  return {
    x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), t: lerp(a.t, b.t, k), h: o(a.h, b.h, 0),
    aN: lv(a.aN, b.aN, k), aF: lv(a.aF, b.aF, k), lN: lv(a.lN, b.lN, k), lF: lv(a.lF, b.lF, k),
    fN: o(a.fN, b.fN, 90), fF: o(a.fF, b.fF, 90), sx: o(a.sx, b.sx, 0), sy: o(a.sy, b.sy, 0),
    thN: o(a.thN, b.thN, 1), thF: o(a.thF, b.thF, 1), arN: o(a.arN, b.arN, 1), arF: o(a.arF, b.arF, 1),
  };
}

export function poseAt(frames: Pose[], phase: number, stepped: boolean): Pose {
  const n = frames.length;
  if (n === 0) throw new Error('Movement animation requires at least one key pose.');
  // JavaScript's remainder can be negative; always select a valid cyclic frame.
  const wrapped = Number.isFinite(phase) ? ((phase % n) + n) % n : 0;
  const i = Math.floor(wrapped);
  if (stepped) return blend(frames[i], frames[i], 0);
  const raw = wrapped - i;
  const k = 0.5 - Math.cos(raw * Math.PI) / 2;
  return blend(frames[i], frames[(i + 1) % n], k);
}

function solve(p: Pose) {
  const hip: V2 = [p.x, p.y];
  const sh: V2 = [p.x + Math.sin(p.t * D) * LEN.T + (p.sx ?? 0), p.y - Math.cos(p.t * D) * LEN.T + (p.sy ?? 0)];
  const ht = p.t + (p.h ?? 0);
  const head: V2 = [sh[0] + Math.sin(ht * D) * LEN.NECK, sh[1] - Math.cos(ht * D) * LEN.NECK];
  const back: V2 = [-Math.cos(p.t * D) * 2.4, -Math.sin(p.t * D) * 2.4];
  const shF: V2 = [sh[0] + back[0], sh[1] + back[1] - 1];
  const hipF: V2 = [hip[0] + back[0], hip[1] + back[1] - 1];
  const arm = (s: V2, a: V2, sc: number) => { const e = seg(s, a[0], LEN.UA * sc); return { s, e, w: seg(e, a[1], LEN.FA * Math.abs(sc)) }; };
  const leg = (h: V2, l: V2, sc: number, f: number) => { const k = seg(h, l[0], LEN.TH * sc); const an = seg(k, l[1], LEN.SH); return { h, k, an, toe: seg(an, f, LEN.F) }; };
  return {
    hip, sh, head, ht,
    armN: arm(sh, p.aN, p.arN ?? 1), armF: arm(shF, p.aF, p.arF ?? 1),
    legN: leg(hip, p.lN, p.thN ?? 1, p.fN ?? 90), legF: leg(hipF, p.lF, p.thF ?? 1, p.fF ?? 90),
  };
}

/* ---------------------------- drawing ----------------------------- */
function Cap({ a, b, r1, r2, fill }: { a: V2; b: V2; r1: number; r2: number; fill: string }) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 0.001;
  const nx = -dy / len, ny = dx / len;
  const d = `M${a[0] + nx * r1} ${a[1] + ny * r1}L${b[0] + nx * r2} ${b[1] + ny * r2}L${b[0] - nx * r2} ${b[1] - ny * r2}L${a[0] - nx * r1} ${a[1] - ny * r1}Z`;
  return (<g fill={fill}><path d={d} /><circle cx={a[0]} cy={a[1]} r={r1} /><circle cx={b[0]} cy={b[1]} r={r2} /></g>);
}

const PALETTE = {
  female: { skin: '#d79b78', skinD: '#b97c5d', top: '#ee6aa0', topD: '#b73f74', pants: '#3a2536', pantsD: '#24161f', hair: '#2b1915', tie: '#f9b3d0', shoe: '#f3e9ee', sole: '#ef5f98', accent: '330 84% 67%' },
  male: { skin: '#c4875f', skinD: '#9f6a48', top: '#5b97f2', topD: '#2e5fb6', pants: '#1f2b45', pantsD: '#131b2d', hair: '#1d1512', tie: '#5b97f2', shoe: '#e7edf6', sole: '#4c86e6', accent: '214 88% 64%' },
};
const BUILD = {
  female: { ua: [4.6, 3.9], fa: [3.8, 3.1], th: [8.4, 5.6], sh: [5.4, 3.6], hipR: 12.5, shR: 11, hand: 3.6 },
  male: { ua: [5.8, 4.6], fa: [4.6, 3.6], th: [8.6, 6], sh: [6, 4], hipR: 11.5, shR: 14, hand: 4.1 },
};

function Athlete({ pose, gender, uid }: { pose: Pose; gender: 'female' | 'male'; uid: string }) {
  const c = PALETTE[gender], b = BUILD[gender];
  const j = solve(pose);
  const g = (n: string) => `url(#${uid}-${n})`;
  const fr: V2 = [Math.cos(j.ht * D), Math.sin(j.ht * D)];
  const up: V2 = [Math.sin(j.ht * D), -Math.cos(j.ht * D)];
  const at = (k1: number, k2: number): V2 => [j.head[0] + fr[0] * k1 + up[0] * k2, j.head[1] + fr[1] * k1 + up[1] * k2];
  const waist = lv(j.hip, j.sh, 0.24);

  const limbArm = (a: typeof j.armN, far: boolean) => {
    const sleeve = far ? c.topD : g('top');
    const skin = far ? c.skinD : g('skin');
    const mid = lv(a.s, a.e, 0.62);
    return (
      <g>
        {gender === 'male' ? (
          <>
            <Cap a={a.s} b={a.e} r1={b.ua[0]} r2={b.ua[1]} fill={skin} />
            <Cap a={a.s} b={mid} r1={b.ua[0] + 1.1} r2={b.ua[1] + 1} fill={sleeve} />
            <Cap a={a.e} b={a.w} r1={b.fa[0]} r2={b.fa[1]} fill={skin} />
          </>
        ) : (
          <>
            <Cap a={a.s} b={a.e} r1={b.ua[0]} r2={b.ua[1]} fill={sleeve} />
            <Cap a={a.e} b={a.w} r1={b.fa[0]} r2={b.fa[1]} fill={sleeve} />
          </>
        )}
        <circle cx={a.w[0]} cy={a.w[1]} r={b.hand} fill={skin} />
      </g>
    );
  };
  const limbLeg = (l: typeof j.legN, far: boolean) => (
    <g>
      <Cap a={l.h} b={l.k} r1={b.th[0]} r2={b.th[1]} fill={far ? c.pantsD : g('pants')} />
      <Cap a={l.k} b={l.an} r1={b.sh[0]} r2={b.sh[1]} fill={far ? c.pantsD : g('pants')} />
      <Cap a={l.an} b={l.toe} r1={3.9} r2={2.8} fill={far ? '#bdb3bb' : c.shoe} />
      <Cap a={lv(l.an, l.toe, 0.1)} b={l.toe} r1={1.6} r2={1.4} fill={c.sole} />
    </g>
  );

  return (
    <g data-testid={`figure-athlete-${gender}`}>
      <defs>
        <linearGradient id={`${uid}-top`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c.top} /><stop offset="1" stopColor={c.topD} /></linearGradient>
        <linearGradient id={`${uid}-pants`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c.pants} /><stop offset="1" stopColor={c.pantsD} /></linearGradient>
        <linearGradient id={`${uid}-skin`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c.skin} /><stop offset="1" stopColor={c.skinD} /></linearGradient>
      </defs>
      {limbArm(j.armF, true)}
      {limbLeg(j.legF, true)}
      {/* torso */}
      <Cap a={j.hip} b={j.sh} r1={b.hipR} r2={b.shR} fill={g('top')} />
      <Cap a={j.hip} b={waist} r1={b.hipR + 0.4} r2={b.hipR - 0.6} fill={g('pants')} />
      <Cap a={lv(j.hip, j.sh, 0.3)} b={lv(j.hip, j.sh, 0.34)} r1={b.hipR - 0.2} r2={b.hipR - 0.4} fill={c.sole} />
      {limbLeg(j.legN, false)}
      {/* neck + head */}
      <Cap a={j.sh} b={lv(j.sh, j.head, 0.7)} r1={4.6} r2={4.2} fill={c.skinD} />
      {gender === 'female' && (
        <>
          <ellipse cx={at(-15, 0)[0]} cy={at(-15, 0)[1]} rx={9} ry={4.6} transform={`rotate(${j.ht - 18} ${at(-15, 0)[0]} ${at(-15, 0)[1]})`} fill={c.hair} />
          <circle cx={at(-10, 2.5)[0]} cy={at(-10, 2.5)[1]} r={2.6} fill={c.tie} />
        </>
      )}
      <circle cx={at(-1.6, 1.4)[0]} cy={at(-1.6, 1.4)[1]} r={gender === 'female' ? 12.4 : 11.8} fill={c.hair} />
      <circle cx={at(1.4, -1.2)[0]} cy={at(1.4, -1.2)[1]} r={10.8} fill={g('skin')} />
      <path d={`M${at(-1.6, 1.4)[0] + up[0] * 12} ${at(-1.6, 1.4)[1] + up[1] * 12} Q ${at(8, 9)[0]} ${at(8, 9)[1]} ${at(11.5, 3)[0]} ${at(11.5, 3)[1]} L ${at(-6, 4)[0]} ${at(-6, 4)[1]} Z`} fill={c.hair} />
      <circle cx={at(-1.2, -1.5)[0]} cy={at(-1.2, -1.5)[1]} r={2.4} fill={c.skinD} />
      <circle cx={at(7.6, 1)[0]} cy={at(7.6, 1)[1]} r={1.1} fill="#2a1a1a" />
      <circle cx={at(12, -1.8)[0]} cy={at(12, -1.8)[1]} r={1.8} fill={c.skin} />
      {limbArm(j.armN, false)}
    </g>
  );
}

function PropArt({ prop }: { prop: Prop }) {
  const wood = 'hsl(var(--muted-foreground) / .35)';
  const edge = 'hsl(var(--foreground) / .18)';
  switch (prop) {
    case 'wall-right': return <g><rect x={298} y={40} width={30} height={212} fill={wood} /><rect x={298} y={40} width={3} height={212} fill={edge} /></g>;
    case 'wall-left': return <g><rect x={110} y={40} width={34} height={212} fill={wood} /><rect x={141} y={40} width={3} height={212} fill={edge} /></g>;
    case 'bench': return <g><rect x={232} y={202} width={66} height={50} rx={6} fill={wood} /><rect x={232} y={202} width={66} height={5} rx={2} fill={edge} /></g>;
    case 'chair': return <g fill={wood}><rect x={150} y={196} width={58} height={7} rx={3} /><rect x={152} y={203} width={5} height={49} /><rect x={201} y={203} width={5} height={49} /><rect x={150} y={128} width={6} height={72} rx={3} /></g>;
    case 'chair-support': return <g fill={wood}><rect x={252} y={150} width={6} height={102} rx={3} /><rect x={252} y={196} width={50} height={7} rx={3} /><rect x={296} y={203} width={5} height={49} /></g>;
    default: return null;
  }
}

/* ---------------------------- component --------------------------- */
export function AthleteMovement({ exerciseId, gender, locale }: { exerciseId: string; gender: 'female' | 'male'; locale: 'ar' | 'en' }) {
  const cfg = CONFIGS[exerciseId] ?? FALLBACK;
  const ex = exerciseById(exerciseId);
  const isAr = locale === 'ar';
  const uid = 'vm' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState(0);
  const [reduced, setReduced] = useState(false);
  const phaseRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => { setPlaying(false); phaseRef.current = 0; setPhase(0); }, [exerciseId, gender]);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last: number | null = null;
    const n = cfg.frames.length;
    const stepMs = cfg.dur * 1.6;
    const tick = (now: number) => {
      // Use the RAF clock from the first frame, not a later performance.now().
      if (last === null) last = now;
      const dt = Math.max(0, Math.min(now - last, 80));
      if (reduced) {
        if (now - last >= stepMs) { last = now; phaseRef.current = (Math.floor(phaseRef.current) + 1) % n; setPhase(phaseRef.current); }
      } else {
        last = now;
        phaseRef.current = (phaseRef.current + dt / cfg.dur) % n;
        setPhase(phaseRef.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced, cfg]);

  const pose = useMemo(() => poseAt(cfg.frames, phase, reduced), [cfg, phase, reduced]);
  const hipX = pose.x;
  const accent = PALETTE[gender].accent;
  const n = cfg.frames.length;
  const active = Math.floor(phase) % n;
  const name = ex ? (isAr ? ex.name : ex.latin) : exerciseId;
  const reset = () => { setPlaying(false); phaseRef.current = 0; setPhase(0); };
  const stateLabel = playing ? (isAr ? 'قيد التشغيل' : 'Playing') : phase === 0 ? (isAr ? 'جاهز' : 'Ready') : (isAr ? 'متوقف مؤقتًا' : 'Paused');
  const coach = gender === 'female' ? (isAr ? 'مدرّبة VYORA' : 'VYORA coach, female') : (isAr ? 'مدرّب VYORA' : 'VYORA coach, male');

  if (!Object.hasOwn(CONFIGS, exerciseId)) {
    return <p role="status" className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">{isAr ? 'عرض الحركة غير متاح لهذا التمرين. يمكنك متابعة دليل الأداء المكتوب.' : 'Movement animation is unavailable for this exercise. Follow the written technique guide.'}</p>;
  }

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      data-testid={`athlete-movement-${exerciseId}`}
      aria-label={isAr ? `عرض حركة ${name}` : `${name} movement demo`}
      className="overflow-hidden rounded-[1.4rem] border border-border bg-card"
      style={{ boxShadow: `0 18px 50px -20px hsl(${accent} / .35)` }}
    >
      <header className="flex items-center justify-between gap-3 px-5 pt-4">
        <div className="min-w-0">
          <p className="latin text-[10px] font-bold tracking-[.22em]" style={{ color: `hsl(${accent})` }} dir="ltr">VYORA MOVE</p>
          <h3 className="truncate text-base font-bold" data-testid="text-movement-name">{name}</h3>
        </div>
        <span className="shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold" style={{ borderColor: `hsl(${accent} / .35)`, color: `hsl(${accent})`, background: `hsl(${accent} / .08)` }} data-testid="text-movement-coach">{coach}</span>
      </header>

      <div className="relative mx-4 mt-3 overflow-hidden rounded-2xl" style={{ background: `radial-gradient(120% 90% at 50% 18%, hsl(${accent} / .16), transparent 60%), linear-gradient(180deg, hsl(var(--muted) / .55), hsl(var(--background) / .9))` }}>
        <svg viewBox="40 30 320 240" className="block aspect-[4/3] w-full" role="img" data-testid={`svg-athlete-${gender}`}
          aria-label={isAr ? `${coach} تؤدي ${name}` .replace('تؤدي', gender === 'male' ? 'يؤدي' : 'تؤدي') : `${coach} performing ${name}`}>
          <defs>
            <radialGradient id={`${uid}-spot`} cx="0.5" cy="0.2" r="0.7"><stop offset="0" stopColor={`hsl(${accent})`} stopOpacity=".22" /><stop offset="1" stopColor={`hsl(${accent})`} stopOpacity="0" /></radialGradient>
            <radialGradient id={`${uid}-shadow`}><stop offset="0" stopColor="#000" stopOpacity=".45" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
          </defs>
          <ellipse cx={200} cy={70} rx={170} ry={120} fill={`url(#${uid}-spot)`} />
          <rect x={40} y={252} width={320} height={20} fill="hsl(var(--foreground) / .05)" />
          <line x1={40} x2={360} y1={252} y2={252} stroke="hsl(var(--foreground) / .14)" strokeWidth={1} />
          {cfg.floor && <rect x={70} y={250} width={260} height={4} rx={2} fill={`hsl(${accent} / .45)`} />}
          <PropArt prop={cfg.prop ?? 'none'} />
          <ellipse cx={hipX + 8} cy={253} rx={cfg.floor ? 95 : 42} ry={5} fill={`url(#${uid}-shadow)`} />
          {cfg.circle && (() => { const s = solve(pose).sh; return <circle cx={s[0] - pose.sx!} cy={s[1] - pose.sy! - 2} r={9} fill="none" stroke={`hsl(${accent} / .5)`} strokeDasharray="2 3" />; })()}
          <Athlete pose={pose} gender={gender} uid={uid} />
          {cfg.grip && (
            <g transform="translate(300 62)" data-testid={`grip-${cfg.grip}`}>
              <rect x={-30} y={-14} width={60} height={30} rx={8} fill="hsl(var(--card) / .85)" stroke="hsl(var(--border))" />
              <line x1={cfg.grip === 'wide' ? -22 : -8} x2={cfg.grip === 'wide' ? 22 : 8} y1={6} y2={6} stroke={`hsl(${accent})`} strokeWidth={2} strokeLinecap="round" />
              <circle cx={cfg.grip === 'wide' ? -22 : -8} cy={6} r={3.2} fill={`hsl(${accent})`} />
              <circle cx={cfg.grip === 'wide' ? 22 : 8} cy={6} r={3.2} fill={`hsl(${accent})`} />
              <line x1={-12} x2={12} y1={-5} y2={-5} stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} strokeLinecap="round" />
            </g>
          )}
        </svg>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
          <span className="rounded-full bg-background/75 px-3 py-1 text-[11px] font-semibold backdrop-blur" data-testid="text-movement-focus">{isAr ? cfg.focus.ar : cfg.focus.en}</span>
          {cfg.hold && <span className="latin rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[.14em]" style={{ background: `hsl(${accent} / .18)`, color: `hsl(${accent})` }}>{isAr ? 'ثبات' : 'HOLD'}</span>}
        </div>
      </div>

      <div className="flex items-center gap-3 px-5 py-4">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={playing}
          aria-label={playing ? (isAr ? 'إيقاف مؤقت للحركة' : 'Pause movement') : (isAr ? 'تشغيل الحركة' : 'Play movement')}
          data-testid="button-movement-play"
          className="press focus-ring grid h-11 w-11 place-items-center rounded-full"
          style={{ background: `hsl(${accent})`, color: 'hsl(var(--primary-foreground))' }}
        >
          {playing ? <Pause size={18} /> : <Play size={18} className={isAr ? '-scale-x-100' : ''} />}
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label={isAr ? 'إعادة الحركة للبداية' : 'Reset movement'}
          data-testid="button-movement-reset"
          className="press focus-ring grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
        >
          <RotateCcw size={17} />
        </button>
        <div className="flex flex-1 items-center gap-1.5" dir="ltr" aria-hidden="true">
          {cfg.frames.map((_, i) => (
            <span key={i} className="h-1.5 flex-1 rounded-full transition-opacity" style={{ background: `hsl(${accent})`, opacity: i === active ? 0.95 : 0.2 }} />
          ))}
        </div>
        <span role="status" aria-live="polite" className="min-w-[4.5rem] text-end text-[11px] font-semibold text-muted-foreground" data-testid="status-movement-state">{stateLabel}</span>
      </div>
      {reduced && (
        <p className="-mt-2 px-5 pb-4 text-[11px] text-muted-foreground" data-testid="text-movement-reduced">
          {isAr ? 'وضع الحركة المخففة: تُعرض الأوضاع الرئيسية خطوة بخطوة.' : 'Reduced motion: key positions are shown step by step.'}
        </p>
      )}
    </section>
  );
}

export default AthleteMovement;
