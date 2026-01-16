import clsx from 'clsx';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export const Skeleton = ({ className, width, height, circle }: SkeletonProps) => {
  return (
    <div 
      className={clsx(styles.skeleton, circle && styles.circle, className)}
      style={{ width, height }}
    />
  );
};
