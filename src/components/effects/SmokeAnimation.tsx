'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useDeterministicRandom from '../../hooks/useDeterministicRandom';

// Define the particle properties
interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  image: number;
  scale: number;
  rotate: number;
}

interface SmokeParticleProps {
  count?: number;
  seed?: number;
}

const SmokeAnimation: React.FC<SmokeParticleProps> = ({ 
  count = 2,
  seed = 789
}) => {
  // Client-side only indicator
  const [isMounted, setIsMounted] = useState(false);
  // Store generated particles
  const [particles, setParticles] = useState<SmokeParticle[]>([]);
  const [dimensions, setDimensions] = useState({
    width: 1200,
    height: 800
  });
  
  // Use deterministic random for consistent rendering
  const { getRandomValue } = useDeterministicRandom(count * 10, seed);
  
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Update dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

    // Update dimensions on window resize
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Generate smoke particles on mount and occasionally refresh them
    useEffect(() => {
        // Only run if component is mounted
        if (!isMounted) return;

        const generateParticles = () => {
            const particleCount = Math.max(3, Math.floor(dimensions.width / 400));
            const newParticles: SmokeParticle[] = [];

            for (let i = 0; i < particleCount; i++) {
                newParticles.push(createParticle(i));
            }

            setParticles(newParticles);
        };

        generateParticles();

        // Regenerate particles occasionally
        const interval = setInterval(() => {
            generateParticles();
        }, 30000); // Every 30 seconds

        return () => clearInterval(interval);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dimensions, isMounted, getRandomValue]); // We need to include getRandomValue

    // Create a single smoke particle with deterministic random properties
    const createParticle = (id: number): SmokeParticle => {
        // Distribute particles across the screen with deterministic randomness
        const x = getRandomValue(id * 3, 0, dimensions.width);
        const y = getRandomValue(id * 3 + 1, 0, dimensions.height);

        // Size should be proportional to screen size for responsiveness
        const sizeBase = Math.min(dimensions.width, dimensions.height) * 0.3;
        const size = sizeBase + getRandomValue(id * 3 + 2, 0, sizeBase * 0.5);

        return {
            id,
            x,
            y,
            size,
            opacity: 0.03 + getRandomValue(id * 5, 0, 0.04), // Very subtle opacity
            duration: 15 + getRandomValue(id * 7, 0, 25), // Slower, more gentle movement
            delay: getRandomValue(id * 11, 0, 10), // Staggered start
            image: Math.floor(getRandomValue(id * 13, 0, 8.99)) + 1, // 9 smoke images
            scale: 0.8 + getRandomValue(id * 17, 0, 0.4),
            rotate: getRandomValue(id * 19, 0, 360), // Random initial rotation
        };
    };

    // This section is already handled in the earlier useEffect

    if (prefersReducedMotion || !isMounted) {
        return null; // Don't render animation if user prefers reduced motion or if not mounted
    }

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute opacity-0"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: particle.x,
                        top: particle.y,
                        background: `url('/images/Smoke/Background_0${particle.image}.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '50%',
                        filter: 'blur(15px)',
                        mixBlendMode: 'overlay',
                        opacity: 0,
                    }}
                    initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: particle.scale,
                        rotate: particle.rotate,
                    }}
                    animate={{
                        y: [0, -particle.size * 0.7],
                        x: [0, getRandomValue(particle.id * 21, -50, 50)], // Slight horizontal drift with deterministic value
                        opacity: [0, particle.opacity, 0],
                        scale: [particle.scale, particle.scale * 1.2, particle.scale * 0.9],
                        rotate: [particle.rotate, particle.rotate + getRandomValue(particle.id * 23, -20, 20)],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        repeatDelay: getRandomValue(particle.id * 29, 0, 5),
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Add very subtle color tint variations for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/0 to-[var(--accent-secondary)]/[0.01] mix-blend-overlay"></div>
        </div>
    );
};

export default SmokeAnimation;
