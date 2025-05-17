'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useDeterministicRandom from '../../hooks/useDeterministicRandom';

interface ClayFragmentsProps {
  count?: number;
}

const ClayFragments: FC<ClayFragmentsProps> = ({ count = 5 }) => {
  // Client-side only indicator
  const [isMounted, setIsMounted] = useState(false);
  
  // Use deterministic random values to prevent hydration mismatch
  const { getRandomValue } = useDeterministicRandom(count * 10, 12345); // Different seed
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Don't render anything during SSR
  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const topPosition = getRandomValue(i * 3, 10, 90);
        const leftPosition = getRandomValue(i * 3 + 1, 10, 90);
        const yDistance = -(50 + getRandomValue(i * 3 + 2, 0, 100));
        const xOffset = (getRandomValue(i * 7, 0, 60) - 30);
        const duration = 4 + getRandomValue(i * 11, 0, 4);
        const delay = getRandomValue(i * 13, 0, 5);
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#F28705] rounded-full"
            style={{
              top: `${topPosition}%`,
              left: `${leftPosition}%`,
              opacity: 0.6,
              boxShadow: '0 0 10px 2px rgba(242, 135, 5, 0.3)'
            }}
            animate={{
              y: [0, yDistance],
              x: [0, xOffset],
              opacity: [0.6, 0],
              scale: [1, 0.5]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeOut"
            }}
          />
        );
      })}
    </>
  );
};

export default ClayFragments;
