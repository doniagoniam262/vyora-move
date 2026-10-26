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
};

const planText: Record<string, { name: string; description: string; frequency: string }> = {
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
