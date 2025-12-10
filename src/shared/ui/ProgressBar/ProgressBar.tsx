import React from 'react';
import clsx from 'clsx';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  percentage: number; // 0 to 100+
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className }) => {
  // Clamp percentage for width, but allow logic to determine color
  const width = Math.min(Math.max(percentage, 0), 100);

  let colorClass = styles.success;
  if (percentage > 100) {
    colorClass = styles.danger;
  } else if (percentage > 80) {
    colorClass = styles.warning;
  }

  return (
    <div className={clsx(styles.container, className)}>
      <div 
        className={clsx(styles.fill, colorClass)} 
        style={{ width: `${width}%` }} 
      />
    </div>
  );
};
