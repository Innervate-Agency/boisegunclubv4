'use client';
import { animate, motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function GlassCard({
    children,
    className = '',
    padding = 'md',
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    [key: string]: any;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <motion.div
            ref={ref}
            variants={cardVariants}
            initial={inView ? 'visible' : 'hidden'}
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6 }}
            className={`
                glass-mica
                ${paddings[padding]}
                rounded-lg
                border border-[var(--glass-border)]
                shadow-lg
                transition-all duration-300
                relative
                overflow-hidden
                group
                ${className}
            `}
            {...props}
        >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}