import { motion, useReducedMotion } from 'framer-motion';
import { SlideTitle } from '@/components/SlideTitle';

const objectives = [
  {
    title: 'تبسيط البداية',
    description: 'شرح التمرين بلغة واضحة وخطوات قصيرة.',
  },
  {
    title: 'بناء عادة منتظمة',
    description: 'ربط الهدف بخطة وجدول قابلين للمتابعة.',
  },
  {
    title: 'تخصيص التجربة',
    description: 'مراعاة المستوى والوقت والمساحة المتاحة.',
  },
];

export default function Objectives() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="w-screen h-screen overflow-hidden relative deck slide-objectives">
      <header className="top">
        <SlideTitle className="heading">أهداف المشروع</SlideTitle>
        <p className="kicker english">Project Objectives</p>
      </header>
      <div className="objectives-track-window" aria-label="أهداف المشروع">
        <motion.div
          className="objectives-track"
          animate={prefersReducedMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={prefersReducedMotion ? undefined : { duration: 26, ease: 'linear', repeat: Infinity }}
        >
          {[0, 1].map((copy) => (
            <div className="objectives-track-group" key={copy} aria-hidden={copy === 1}>
              {objectives.map((objective) => (
                <article className="objective-card" key={`${copy}-${objective.title}`} dir="rtl">
                  <h2>{objective.title}</h2>
                  <p>{objective.description}</p>
                </article>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      <footer className="foot english"><span>VYORA MOVE</span><span>04 / 12</span></footer>
    </section>
  );
}
