import { motion, type HTMLMotionProps } from 'framer-motion';

type SlideTitleProps = HTMLMotionProps<'h1'>;

export function SlideTitle({ children, ...props }: SlideTitleProps) {
  return (
    <motion.h1
      layoutId="vyora-shared-slide-title"
      transition={{ layout: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }}
      {...props}
    >
      {children}
    </motion.h1>
  );
}
