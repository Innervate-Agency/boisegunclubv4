'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useDeterministicRandom from '../../hooks/useDeterministicRandom';

interface ParticleProps {
  count?: number;
  colors?: string[];
  speed?: number;
  size?: number;
  maxDistance?: number;
  className?: string;
  seed?: number;
}

/**
 * A reusable particle animation component that creates floating particles
 * with configurable appearance and behavior
 */
const ParticleAnimation: FC<ParticleProps> = ({
  count = 20,
  colors = ['#F28705', '#D9641D', '#8C4303', '#401F01'],
  speed = 3,
  size = 4,
  maxDistance = 100,
  className = '',
  seed = 42,
}) => {
  // Client-side only indicator
  const [isMounted, setIsMounted] = useState(false);
  
  // Use deterministic random values to prevent hydration mismatch
  const { getRandomValue, getRandomFromArray } = useDeterministicRandom(count * 10, seed);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Check for reduced motion preference on client-side only
    const prefersReducedMotion = 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
    if (prefersReducedMotion) {
      // Handle reduced motion preference
    }
  }, []);

  // Render empty container until client-side hydration is complete
  if (!isMounted) {
    return <div className={`absolute inset-0 pointer-events-none ${className}`} />;
  }
  
  // Create particles with deterministic "random" properties
  const particles = Array.from({ length: count }).map((_, index) => {
    const randomX = getRandomValue(index * 3, 0, 100); // stable position
    const randomY = getRandomValue(index * 3 + 1, 0, 100);
    const color = getRandomFromArray(index, colors);
    const scale = getRandomValue(index * 3 + 2, 0.5, 1.0); // consistent size variation
    const duration = (speed * 2) + (getRandomValue(index * 5, 0, speed * 2)); // consistent speed
    
    return (
      <motion.div
        key={`particle-${index}`}
        className="absolute rounded-full"
        style={{
          backgroundColor: color,
          width: size * scale,
          height: size * scale,
          left: `${randomX}%`,
          top: `${randomY}%`,
          filter: 'blur(1px)',
          opacity: getRandomValue(index * 7, 0.2, 0.5),
        }}
        animate={{
          x: [
            0,
            (getRandomValue(index * 11, -0.5, 0.5)) * maxDistance,
            0,
            (getRandomValue(index * 13, -0.5, 0.5)) * maxDistance,
            0
          ],
          y: [
            0,
            (getRandomValue(index * 17, -0.5, 0.5)) * maxDistance,
            0,
            (getRandomValue(index * 19, -0.5, 0.5)) * maxDistance,
            0
          ],
          opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: getRandomValue(index * 23, 0, 2),
        }}
      />
    );
  });
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles}
    </div>
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles}
    </div>
  );
};

export default ParticleAnimation;
