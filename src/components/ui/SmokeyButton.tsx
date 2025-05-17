'use client';

import { motion } from 'framer-motion';

export default function SmokyButton({
    children,
    className = '',
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}) {
    return (
        <motion.button
            className={`
        relative overflow-hidden
        bg-leonard-yellow text-kent-slate-gray
        border border-chester-white/10
        hover:bg-leonard-yellow/80
        hover:border-chester-white/20
        transition-all duration-300
        shadow-lg
        py-2 px-4 rounded font-medium ${className}
      `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <motion.div
                className="absolute inset-0 bg-leonard-yellow"
                initial={{ opacity: 0 }}
                whileHover={{
                    opacity: 1,
                    transition: { duration: 0.3 }
                }}
            />
        </motion.button>
    );
}
