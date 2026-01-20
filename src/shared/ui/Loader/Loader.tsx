import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.scss';

interface LoaderProps {
  text?: string;
  timeout?: number;
  size?: number;
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  text = 'Loading...', 
  timeout = 10000, // 10 seconds default timeout
  size = 40,
  color = 'var(--color-primary)'
}) => {
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeout(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  if (showTimeout) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.text}>
          Taking longer than expected... Please refresh if it persists.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loaderContainer}>
      <ClipLoader size={size} color={color} />
      {text && <div className={styles.text}>{text}</div>}
    </div>
  );
};
