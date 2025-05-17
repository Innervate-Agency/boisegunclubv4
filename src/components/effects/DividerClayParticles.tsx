'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useDeterministicRandom from '../../hooks/useDeterministicRandom';

interface DividerClayParticlesProps {
  count?: number;
}

const DividerClayParticles: FC<DividerClayParticlesProps> = ({ count = 5 }) => {
  // Client-side only indicator
  const [isMounted, setIsMounted] = useState(false);
  
  const { getRandomValue } = useDeterministicRandom(count * 10, 54321); // Different seed
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Don't render during SSR
  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const leftPosition = getRandomValue(i * 3, 30, 70);
        const opacityValue = 0.6 + getRandomValue(i * 3 + 1, 0, 0.4);
        const yDistance = -120 - getRandomValue(i * 3 + 2, 0, 40);
        const xOffset = getRandomValue(i * 7, -30, 30);
        const duration = 2 + getRandomValue(i * 11, 0, 2);
        const delay = getRandomValue(i * 13, 0, 3);
        
        return (
          <motion.div
            key={`clay-${i}`}
            className="absolute w-1 h-1 bg-[var(--accent-primary)] rounded-full"
            style={{
              left: `${leftPosition}%`,
              top: '100%',
              opacity: opacityValue,
              boxShadow: '0 0 8px 2px rgba(242, 135, 5, 0.3)'
            }}
            animate={{
              y: [0, yDistance],
              x: [0, xOffset],
              opacity: [0.8, 0],
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

export default DividerClayParticles;
