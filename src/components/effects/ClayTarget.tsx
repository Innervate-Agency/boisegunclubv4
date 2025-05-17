import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Props {
    onClick?: () => void;
}

// SVG paths for clay target fragments
const CLAY_FRAGMENTS = [
    'M0,0 L20,0 L25,10 L-5,10 Z',  // Top piece
    'M0,0 L20,0 L15,-10 L-5,-10 Z', // Bottom piece
    'M0,0 L10,17.3 L0,34.6 L-10,17.3 Z', // Right piece
    'M0,0 L-10,17.3 L0,34.6 L10,17.3 Z', // Left piece
    'M0,0 L17.3,10 L34.6,0 L17.3,-10 Z', // Center piece
];

interface Fragment {
    path: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    velocity: { x: number; y: number };
    angularVelocity: number;
}

export const ClayTarget = ({ onClick }: Props) => {
    const [fragments, setFragments] = useState<Fragment[]>([]);
    const [isExploding, setIsExploding] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    
    // Import deterministic random
    const [seed] = useState(98765);
    
    // Use client-side only detection
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    // Deterministic random function
    const seededRandom = (base: number) => {
        const x = Math.sin(base) * 10000;
        return x - Math.floor(x);
    };

    const generateFragments = () => {
        if (!containerRef.current) return [];

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        return CLAY_FRAGMENTS.map((path, i) => ({
            path,
            x: centerX,
            y: centerY,
            rotation: (360 / CLAY_FRAGMENTS.length) * i,
            scale: 1,
            velocity: {
                x: (seededRandom(seed + i * 0.1) - 0.5) * 20,
                y: (seededRandom(seed + i * 0.2) - 0.5) * 20 - 5
            },
            angularVelocity: (seededRandom(seed + i * 0.3) - 0.5) * 720
        }));
    };

    const triggerExplosion = async () => {
        if (isExploding) return;

        setIsExploding(true);
        setFragments(generateFragments());

        // Play explosion animation
        await controls.start({
            scale: [1, 1.2, 0],
            opacity: [1, 1, 0],
            transition: { duration: 0.3 }
        });

        // Reset after explosion
        setTimeout(() => {
            setIsExploding(false);
            setFragments([]);
            controls.set({ scale: 1, opacity: 1 });
        }, 2000);
    };

    // Periodic explosion effect
    useEffect(() => {
        const interval = setInterval(triggerExplosion, 8000);
        return () => clearInterval(interval);
    }, []);

    // Fragment animation frame
    useEffect(() => {
        if (!isExploding || fragments.length === 0) return;

        let animationFrame: number;
        const updateFragments = () => {
            setFragments(prevFragments =>
                prevFragments.map(fragment => ({
                    ...fragment,
                    x: fragment.x + fragment.velocity.x,
                    y: fragment.y + fragment.velocity.y,
                    rotation: fragment.rotation + fragment.angularVelocity,
                    scale: fragment.scale * 0.98,
                    velocity: {
                        x: fragment.velocity.x * 0.98,
                        y: fragment.velocity.y + 0.5 // gravity
                    },
                    angularVelocity: fragment.angularVelocity * 0.98
                }))
            );
            animationFrame = requestAnimationFrame(updateFragments);
        };

        animationFrame = requestAnimationFrame(updateFragments);
        return () => cancelAnimationFrame(animationFrame);
    }, [isExploding, fragments.length]);

    return (
        <div
            ref={containerRef}
            className="relative w-32 h-32"
            onClick={onClick}
        >
            {/* Intact clay target */}
            {!isExploding && (
                <motion.div
                    animate={controls}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"
                >
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                    >
                        <defs>
                            <radialGradient id="clayGradient">
                                <stop offset="0%" stopColor="#F25D27" />
                                <stop offset="100%" stopColor="#F27127" />
                            </radialGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="url(#clayGradient)"
                            filter="url(#glow)"
                        />
                    </svg>
                </motion.div>
            )}

            {/* Fragments */}
            {isExploding && fragments.map((fragment, index) => (
                <motion.div
                    key={index}
                    className="absolute top-0 left-0"
                    style={{
                        x: fragment.x,
                        y: fragment.y,
                        rotate: fragment.rotation,
                        scale: fragment.scale,
                    }}
                >
                    <svg
                        width="40"
                        height="40"
                        viewBox="-20 -20 40 40"
                        className="filter drop-shadow-glow"
                    >
                        <path
                            d={fragment.path}
                            fill="url(#clayGradient)"
                            className="origin-center"
                        />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}; 