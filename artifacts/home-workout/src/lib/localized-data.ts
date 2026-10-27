import type { Exercise, WorkoutPlan } from './data';
import type { Locale } from './locale';

const exerciseText: Record<
  string,
  { name: string; instructions: string[]; safety: string; easier: string }
> = {
  march: {
    name: 'March in Place',
    instructions: [
      'Stand with your feet hip-width apart and shoulders relaxed.',
      'Raise one knee, then the other, at a steady pace while moving your arms.',
      'Breathe regularly and gradually increase your pace.',
    ],
    safety: 'Start slowly and hold a chair if you feel unsteady.',
    easier: 'Raise your knees less and walk at a gentler pace.',
  },
  'shoulder-circles': {
    name: 'Shoulder Circles',
    instructions: [
      'Stand tall and raise your shoulders toward your ears.',
      'Make large, controlled circles backward.',
      'Switch direction halfway through.',
    ],
    safety: 'Keep the movement comfortable; do not force the joint to its end range.',
    easier: 'Make smaller circles.',
  },
  squat: {
    name: 'Squat',
    instructions: [
      'Stand with feet shoulder-width apart and toes turned slightly outward.',
      'Push your hips back and lower as if sitting in a chair, keeping your back straight.',
      'Press through your heels and stand, squeezing your glutes.',
    ],
    safety: 'Keep your knees aligned with your toes and stop if you feel sharp knee pain.',
    easier: 'Lower halfway or lightly touch a stable chair.',
  },
  'glute-bridge': {
    name: 'Glute Bridge',
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Lift your hips until your shoulders, hips, and knees form a line.',
      'Hold for a second, then lower slowly.',
    ],
    safety: 'Avoid over-arching your lower back; use your glutes to lift.',
    easier: 'Lift less high and hold for less time.',
  },
  lunge: {
    name: 'Forward Lunge',
    instructions: [
      'Stand tall and take a long step forward.',
      'Bend both knees toward right angles without letting the back knee touch the floor.',
      'Push through the front foot to return, then switch sides.',
    ],
    safety: 'Keep your torso upright and your front knee over your ankle, not beyond it.',
    easier: 'Take a shorter step or hold a wall for balance.',
  },
  'jacks-low': {
    name: 'Step Jacks',
    instructions: [
      'Start standing with your feet together.',
      'Step to the side while raising your arms overhead.',
      'Return to center and switch sides at a steady pace.',
    ],
    safety: 'No jumping, making this a lower-impact option for your joints.',
    easier: 'Raise your arms only to shoulder height.',
  },
  'mountain-climber': {
    name: 'Mountain Climber',
    instructions: [
      'Start in a plank with your hands under your shoulders.',
      'Drive one knee toward your chest, then switch with controlled speed.',
      'Keep your hips low and your core steady.',
    ],
    safety: 'If your wrists feel strained, use fists or exercise on an elevated surface.',
    easier: 'Move slowly or use an elevated surface such as a sofa.',
  },
  'incline-push': {
    name: 'Incline Push-up',
    instructions: [
      'Place your hands slightly wider than shoulder-width on a stable elevated surface.',
      'Keep your body in a straight line from head to heels.',
      'Lower your chest toward the surface, then push back up.',
    ],
    safety: 'Make sure the surface is stable and non-slip, and keep your neck neutral.',
    easier: 'Use a wall instead of a low surface.',
  },
  'chair-dip': {
    name: 'Chair Dip',
    instructions: [
      'Sit on the edge of a stable chair and place your palms beside your hips.',
      'Slide your hips forward and bend your elbows behind you to lower.',
      'Press through your arms to return without locking your elbows.',
    ],
    safety:
      'Keep your hips close to the chair and avoid lowering deeply if your shoulders feel strained.',
    easier: 'Bend your knees and bring your feet closer to the chair.',
  },
  plank: {
    name: 'Plank',
    instructions: [
      'Rest on your forearms with elbows beneath your shoulders.',
      'Brace your core and glutes, keeping your body in a straight line.',
      'Breathe calmly and look at the floor.',
    ],
    safety: 'Stop if your lower back sags or begins to hurt.',
    easier: 'Rest your knees on the floor.',
  },
  crunch: {
    name: 'Crunch',
    instructions: [
      'Lie on your back with your knees bent.',
      'Place your hands behind your head without pulling on your neck.',
      'Lift your shoulders by bracing your core, then lower slowly.',
    ],
    safety: 'Keep the movement small and controlled; do not pull your head with your hands.',
    easier: 'Place your hands on your chest and lift only slightly.',
  },
  bicycle: {
    name: 'Bicycle Crunch',
    instructions: [
      'Lie down with your hands behind your head and lift your legs slightly.',
      'Bring one elbow toward the opposite knee as the other leg extends.',
      'Alternate slowly and with control.',
    ],
    safety: 'Keep your lower back against the floor and slow down if your neck feels tired.',
    easier: 'Keep your feet on the floor and alternate elbow to knee.',
  },
  hamstring: {
    name: 'Hamstring Stretch',
    instructions: [
      'Sit with one leg extended and the other bent.',
      'Hinge forward from your hips with a straight back.',
      'Hold while breathing calmly, then switch legs.',
    ],
    safety: 'You should feel a gentle stretch, not pain.',
    easier: 'Bend the extended knee slightly.',
  },
  'childs-pose': {
    name: "Child's Pose",
    instructions: [
      'Kneel and sit back on your heels.',
      'Reach your arms forward and lower your chest toward the floor.',
      'Breathe deeply and relax your back.',
    ],
    safety: 'If your knees hurt, place a cushion beneath them.',
    easier: 'Place a cushion between your hips and heels.',
  },
  'wall-push-up': {
    name: 'Wall Push-up',
    instructions: [
      'Stand facing a stable wall and place your palms at chest height.',
      'Step back slightly and keep a straight line from head to heels.',
      'Bend your elbows to move toward the wall, then press back.',
    ],
    safety: 'Keep your feet and the wall steady; stop if your shoulder or wrist hurts.',
    easier: 'Stand closer to the wall and use a shorter range.',
  },
  'prone-w-raise': {
    name: 'Prone W Raise',
    instructions: [
      'Lie on your stomach with your arms shaped like a W.',
      'Draw your shoulder blades back and lift your hands slightly.',
      'Pause, then lower slowly while keeping your neck relaxed.',
    ],
    safety: 'Use a small lift and stop if you feel neck or lower-back strain.',
    easier: 'Squeeze your shoulder blades without lifting your hands.',
  },
  'wall-sit': {
    name: 'Wall Sit',
    instructions: [
      'Lean against a stable wall with your feet slightly in front.',
      'Lower only as far as comfortable, keeping knees in line with toes.',
      'Hold while breathing calmly, then press through your heels to stand.',
    ],
    safety: 'Do not hold a painful depth; stop if your knee hurts.',
    easier: 'Hold higher or for less time.',
  },
  'calf-raise': {
    name: 'Calf Raise',
    instructions: [
      'Stand beside a wall or sturdy chair for balance.',
      'Slowly lift your heels until you are on the balls of your feet.',
      'Pause, then lower your heels with control.',
    ],
    safety: 'Use steady support if balance is difficult and avoid bouncing.',
    easier: 'Raise your heels only a little while holding the wall.',
  },
  'dead-bug': {
    name: 'Dead Bug',
    instructions: [
      'Lie on your back with arms raised and knees above your hips.',
      'Slowly extend one arm and the opposite leg while keeping your lower back close to the floor.',
      'Return to center and switch sides while keeping your torso steady.',
    ],
    safety: 'Shorten the range if your lower back lifts or pain appears.',
    easier: 'Move one leg at a time while keeping your arms still.',
  },
  'side-plank': {
    name: 'Side Plank',
    instructions: [
      'Lie on your side and place your elbow beneath your shoulder.',
      'Lift your hips until your body forms a straight line.',
      'Hold while breathing, then switch sides.',
    ],
    safety: 'Stop if you feel shoulder or lower-back pain.',
    easier: 'Bend your knees and support yourself on them.',
  },
  'fire-hydrant': {
    name: 'Fire Hydrant',
    instructions: [
      'Start on your hands and knees with a neutral back.',
      'Lift one knee out to the side without rotating your torso.',
      'Lower slowly, repeat, then switch sides.',
    ],
    safety: 'Keep the hip range comfortable and stop if it hurts.',
    easier: 'Lift the knee a short distance and keep your torso still.',
  },
  'hip-hinge': {
    name: 'Hip Hinge',
    instructions: [
      'Stand with a slight bend in your knees and a long spine.',
      'Push your hips back and lean forward from the hip joints.',
      'Press through the floor and bring your hips forward to stand.',
    ],
    safety: 'Stop if you feel sharp pain in your back or hamstrings.',
    easier: 'Place your hands on your thighs and use a shorter range.',
  },
  'pike-push-up': {
    name: 'Pike Push-up',
    instructions: [
      'Start in an inverted V shape with your hands steady on the floor.',
      'Bend your elbows and lower your head toward the space between your hands.',
      'Press the floor away to return, keeping your neck relaxed.',
    ],
    safety: 'Use a small range and stop if your shoulder or wrist hurts.',
    easier: 'Use a wall or elevated surface for an incline push-up.',
  },
  'push-up': {
    name: 'Push-up',
    instructions: [
      'Start with your hands below your shoulders and your body in a straight line.',
      'Bend your elbows back and lower your chest with control.',
      'Press the floor away to return while keeping your torso steady.',
    ],
    safety: 'Use a comfortable range and stop if you feel sharp wrist or shoulder pain.',
    easier: 'Place your knees on the floor or use a stable elevated surface.',
  },
  'knee-push-up': {
    name: 'Knee Push-up',
    instructions: [
      'Start on your hands and knees with a straight line from your head to your knees.',
      'Bend your elbows and lower your chest slowly.',
      'Press the floor away without arching your lower back.',
    ],
    safety: 'Use a padded surface under your knees and keep the movement pain-free.',
    easier: 'Reduce the lowering range or use a wall.',
  },
  'wide-push-up': {
    name: 'Wide Push-up',
    instructions: [
      'Place your hands slightly wider than your shoulders in a stable push-up position.',
      'Lower your chest slowly with your elbows at a comfortable angle.',
      'Press up while keeping your body aligned.',
    ],
    safety: 'Do not place your hands excessively wide or force your elbows outward.',
    easier: 'Use a knee variation or a stable elevated surface.',
  },
  'close-grip-push-up': {
    name: 'Close-Grip Push-up',
    instructions: [
      'Place your hands beneath or just inside shoulder width and brace your torso.',
      'Bend your elbows close to your sides and lower slowly.',
      'Press back up while keeping your wrists comfortable.',
    ],
    safety: 'Stop if your wrists or shoulders hurt; do not force your elbows together.',
    easier: 'Perform the movement on your knees or against a wall.',
  },
  'bicep-self-curl': {
    name: 'Self-Resisted Biceps Curl',
    instructions: [
      'Stand tall and keep one elbow beside your body.',
      'Place your other hand over the wrist to provide gentle resistance.',
      'Curl slowly against that resistance, then return with control and switch sides.',
    ],
    safety: 'Use light resistance and avoid straining your wrist or holding your breath.',
    easier: 'Use less pressure from your assisting hand or fewer repetitions.',
  },
  'superman-pull': {
    name: 'Superman Pull',
    instructions: [
      'Lie on your stomach with your arms extended and your neck relaxed.',
      'Lift your arms and chest slightly, then draw your elbows toward your sides.',
      'Reach forward again and lower slowly.',
    ],
    safety: 'Keep the lift small and stop if you feel pressure in your lower back.',
    easier: 'Move your arms only while keeping your chest on the floor.',
  },
  'reverse-snow-angel': {
    name: 'Reverse Snow Angel',
    instructions: [
      'Lie on your stomach with your arms beside your hips.',
      'Sweep your arms in a wide arc overhead while gently drawing your shoulder blades together.',
      'Return your arms slowly with your forehead and neck relaxed.',
    ],
    safety: 'Stay within a comfortable range and keep your shoulders away from your ears.',
    easier: 'Move one arm at a time.',
  },
  'prone-t-raise': {
    name: 'Prone T Raise',
    instructions: [
      'Lie on your stomach with your arms out to the sides in a T shape.',
      'Draw your shoulder blades together and lift your hands slightly.',
      'Pause briefly, then lower with control.',
    ],
    safety: 'Keep your neck neutral and avoid arching your lower back.',
    easier: 'Lift one hand at a time or use a smaller range.',
  },
  'scapular-push-up': {
    name: 'Scapular Push-up',
    instructions: [
      'Start in a high plank with straight elbows.',
      'Let your chest lower slightly between your shoulders without bending your elbows.',
      'Press the floor away and widen your upper back to return.',
    ],
    safety: 'Keep your torso steady and stop if your wrists or shoulders hurt.',
    easier: 'Perform it standing against a wall or on an elevated surface.',
  },
};

const planText: Record<string, { name: string; description: string; frequency: string }> = {
  'lose-weight-plan': {
    name: 'Gradual Activity Plan',
    description:
      'A balanced home session combining movement and light strength work at a pace you can build on.',
    frequency: '3 days per week',
  },
  'lose-weight-intermediate': {
    name: 'Moderate Activity Plan',
    description: 'Compound movements at a moderate pace with enough recovery between sessions.',
    frequency: '3–4 days per week',
  },
  'build-muscle-plan': {
    name: 'Strength and Muscle Plan',
    description:
      'Foundational home resistance movements with gradual increases in repetitions or difficulty.',
    frequency: '3 days per week',
  },
  'build-muscle-intermediate': {
    name: 'Intermediate Resistance Plan',
    description: 'Full-body strength sessions with varied movements and suitable rest periods.',
    frequency: '3–4 days per week',
  },
  'fitness-plan': {
    name: 'Balanced Fitness Plan',
    description:
      'A gentle mix of warm-up, strength, stability, and stretching to build a regular movement habit.',
    frequency: '3 days per week',
  },
  'fitness-intermediate': {
    name: 'Intermediate Fitness Plan',
    description:
      'A balanced session combining movement, strength, and stability, with rest days where possible.',
    frequency: '3–4 days per week',
  },
  'beginner-plan': {
    name: 'Beginner Plan',
    description:
      'A gradual start: warm-up, foundational movements, and stretching. A good fit for your first week.',
    frequency: '3 days per week',
  },
  'ten-minute': {
    name: '10-Minute Plan',
    description: 'A quick session for busy days: compound movements at a steady pace.',
    frequency: 'Daily, if you like',
  },
  'beginner-10-b': {
    name: 'Beginner Variety Session',
    description: 'A short alternative for beginners, with different movements and no equipment.',
    frequency: 'Up to 10 minutes',
  },
  'beginner-20-b': {
    name: 'Beginner Variety Plan',
    description: 'A slightly longer session with varied movements for beginner level.',
    frequency: 'Up to 20 minutes',
  },
  'intermediate-10': {
    name: 'Short Intermediate Session',
    description:
      'A compact, moderate-paced session with steady movements; actual workout time is under 10 minutes.',
    frequency: 'Up to 10 minutes',
  },
  'intermediate-10-b': {
    name: 'Intermediate Variety Session',
    description: 'A short alternative for intermediate level, focusing on different movements.',
    frequency: 'Up to 10 minutes',
  },
  'twenty-minute': {
    name: '20-Minute Plan',
    description:
      'A longer full-body session for those accustomed to movement, with warm-up and stretching.',
    frequency: '4 days per week',
  },
  'intermediate-20-b': {
    name: 'Intermediate Variety Plan',
    description: 'An alternative full-body session with a duration suited to intermediate level.',
    frequency: 'Up to 20 minutes',
  },
  'gain-weight-plan': {
    name: 'Strength Plan for Weight Gain',
    description:
      'Bodyweight resistance with gradual increases in reps or movement difficulty and enough recovery.',
    frequency: '2–4 strength sessions per week',
  },
  'gain-weight-intermediate': {
    name: 'Intermediate Strength Plan for Weight Gain',
    description: 'Progressive resistance at an intermediate level, with recovery days between sessions.',
    frequency: '3–4 strength sessions per week',
  },
};

export function localizeExercise(ex: Exercise, locale: Locale): Exercise {
  if (locale === 'ar') return ex;
  const x = exerciseText[ex.id];
  return x
    ? { ...ex, name: x.name, instructions: x.instructions, safety: x.safety, easier: x.easier }
    : ex;
}
export function localizePlan(plan: WorkoutPlan, locale: Locale): WorkoutPlan {
  if (locale === 'ar') return plan;
  const x = planText[plan.id];
  return x ? { ...plan, ...x } : plan;
}
