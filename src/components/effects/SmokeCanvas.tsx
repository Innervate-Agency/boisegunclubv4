import { useRef, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface SmokeParticle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
}

interface Props {
    mousePosition: { x: number; y: number };
}

const COLORS = ['#F28705', '#F2CB05', '#F25D27'];
const PARTICLE_COUNT = 100;
const MAX_PARTICLE_SIZE = 200;

export const SmokeCanvas = ({ mousePosition }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<SmokeParticle[]>([]);
    const animationFrameRef = useRef<number>(0);

    // Initialize particles
    const initParticles = () => {
        const particles: SmokeParticle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * MAX_PARTICLE_SIZE + 50,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: -Math.random() * 0.8 - 0.2,
                opacity: Math.random() * 0.6 + 0.2,
                color: COLORS[Math.floor(Math.random() * COLORS.length)]
            });
        }
        particlesRef.current = particles;
    };

    // Draw a single smoke particle
    const drawParticle = (ctx: CanvasRenderingContext2D, particle: SmokeParticle) => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
        );
        const alpha = Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        gradient.addColorStop(0, `${particle.color}${alpha}`);
        gradient.addColorStop(0.6, `${particle.color}33`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    };

    // Update particle positions and properties
    const updateParticle = (particle: SmokeParticle, mouseX: number, mouseY: number) => {
        // Mouse influence
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / 400);

        particle.speedX += (dx / distance) * influence * 0.02;
        particle.speedY += (dy / distance) * influence * 0.02;

        // Apply speed limits
        particle.speedX = Math.max(-1.5, Math.min(1.5, particle.speedX));
        particle.speedY = Math.max(-1.5, Math.min(1.5, particle.speedY));

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Reset if out of bounds
        if (particle.y < -particle.size) {
            particle.y = window.innerHeight + particle.size;
            particle.x = Math.random() * window.innerWidth;
            particle.size = Math.random() * MAX_PARTICLE_SIZE + 50;
            particle.opacity = Math.random() * 0.6 + 0.2;
        }
        if (particle.x < -particle.size) particle.x = window.innerWidth + particle.size;
        if (particle.x > window.innerWidth + particle.size) particle.x = -particle.size;

        // Oscillate opacity
        particle.opacity = (0.4 + Math.sin(Date.now() / 1000) * 0.2) *
            (1 - Math.min(1, distance / 800)); // Fade based on distance from mouse
    };

    // Animation loop
    const animate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);


        animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
        if (!canvasRef.current) return;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        initParticles();
    };

    useEffect(() => {
        handleResize();
        animate();
        window.addEventListener('resize', handleResize);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-[1] mix-blend-screen"
            style={{ opacity: 0.8 }}
        />
    );
}; 
