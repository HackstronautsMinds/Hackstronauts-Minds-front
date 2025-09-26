import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ReactNode, useRef } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  parallaxOffset?: number;
  fadeDirection?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export function ScrollSection({ 
  children, 
  className = '', 
  parallaxOffset = 50,
  fadeDirection = 'up',
  delay = 0
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  const fadeVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 }
  };

  const animateVariants = {
    up: { y: 0, opacity: 1 },
    down: { y: 0, opacity: 1 },
    left: { x: 0, opacity: 1 },
    right: { x: 0, opacity: 1 }
  };

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      initial={fadeVariants[fadeDirection]}
      animate={isInView ? animateVariants[fadeDirection] : fadeVariants[fadeDirection]}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxElement({ children, speed = 0.5, className = '' }: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}