import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import styles from './Card.module.scss';

interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
}

export const Card = ({ children, className, glass = false, hover = false, ...props }: CardProps) => {
  return (
    <motion.div 
      className={clsx(
        styles.card, 
        glass && styles.glass,
        hover && styles.hover,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
