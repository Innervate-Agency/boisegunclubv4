'use client';
import { animate, motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';


export default function GlassCard({
    children,
    className = '',
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            ref={ref}
            variants={cardVariants}
            initial={inView ? 'visible' : 'hidden'}
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6 }}
            className={`
        bg-kent-slate-gray/80 backdrop-blur-md
        border border-chester-white/10 rounded-lg p-6
        shadow-lg ${className}
      `}
            {...props}
        >
            {children}
        </motion.div>
    );
}