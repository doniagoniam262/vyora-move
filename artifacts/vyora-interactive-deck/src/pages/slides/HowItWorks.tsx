import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { SlideTitle } from '@/components/SlideTitle';

const steps = [
  { number: '01', title: 'سجّل الدخول', description: 'أنشئ حسابًا أو ادخل بحسابك.', target: 9 },
  { number: '02', title: 'حدّد ملفك', description: 'اختر النوع والهدف ومستوى التدريب.', target: 6 },
  { number: '03', title: 'اختر خطتك', description: 'راجع الشرح واضبط أيام الأسبوع.', target: 3 },
  { number: '04', title: 'تمرّن وتابع', description: 'أكمل المؤقت، قيّم الصعوبة وراجع تقدمك.', target: 9 },
];

type ZoomSelection = {
  number: string;
  title: string;
  description: string;
  target: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

export default function HowItWorks({
  onNavigateToSlide,
}: {
  onNavigateToSlide?: (target: number) => void;
}) {
  const slideRef = useRef<HTMLElement>(null);
  const [zoom, setZoom] = useState<ZoomSelection | null>(null);

  const openChapter = (event: MouseEvent<HTMLButtonElement>, step: (typeof steps)[number]) => {
    const stage = slideRef.current?.getBoundingClientRect();
    const card = event.currentTarget.getBoundingClientRect();
    if (!stage) return;
    setZoom({
      ...step,
      left: card.left - stage.left,
      top: card.top - stage.top,
      width: card.width,
      height: card.height,
    });
  };

  return (
    <section
      ref={slideRef}
      className="how-it-works-live slide-how-it-works w-screen h-screen overflow-hidden relative deck"
    >
      <div className="how-it-works-orbit" aria-hidden="true" />
      <header className="how-it-works-heading" dir="rtl">
        <SlideTitle>رحلتك في أربع خطوات</SlideTitle>
        <motion.span
          className="english"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.4, 0, 0.2, 1] }}
        >
          How It Works
        </motion.span>
      </header>

      <div className="how-it-works-grid" dir="rtl">
        {steps.map((step, index) => (
          <motion.button
            key={step.number}
            type="button"
            className={`how-step-card how-step-card-${index + 1}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 150 : -150, y: 18, scale: 0.96 }}
            animate={{ opacity: zoom ? 0 : 1, x: 0, y: 0, scale: 1 }}
            transition={{
              duration: 0.72,
              delay: index * 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
            whileHover={zoom ? undefined : { y: -7, scale: 1.025 }}
            whileTap={zoom ? undefined : { scale: 0.985 }}
            onClick={(event) => openChapter(event, step)}
            disabled={Boolean(zoom)}
          >
            <motion.strong
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: zoom ? 0 : 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 + index * 0.1 }}
            >
              {step.number}
            </motion.strong>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: zoom ? 0 : 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 + index * 0.1 }}
            >
              {step.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: zoom ? 0 : 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.52 + index * 0.1 }}
            >
              {step.description}
            </motion.p>
          </motion.button>
        ))}
      </div>

      <motion.footer
        className="foot english how-it-works-footer"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: zoom ? 0 : 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.68, ease: [0.4, 0, 0.2, 1] }}
      >
        <span>VYORA MOVE</span>
        <span>08 / 12</span>
      </motion.footer>

      {zoom && (
        <motion.div
          className={`how-step-zoom how-step-card how-step-card-${Number(zoom.number)}`}
          initial={{
            left: zoom.left,
            top: zoom.top,
            width: zoom.width,
            height: zoom.height,
            borderRadius: 18,
          }}
          animate={{
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            borderRadius: 0,
          }}
          transition={{ duration: 0.62, ease: [0.4, 0, 0.2, 1] }}
          onAnimationComplete={() => onNavigateToSlide?.(zoom.target)}
        >
          <strong>{zoom.number}</strong>
          <h2>{zoom.title}</h2>
          <p>{zoom.description}</p>
        </motion.div>
      )}
    </section>
  );
}
