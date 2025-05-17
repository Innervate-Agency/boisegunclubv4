import { motion } from 'framer-motion';

export default function Button({
    children,
    variant = 'primary',
    className = '',
    ...props
}: {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
    [key: string]: any;
}) {
    const baseStyles = "py-2 px-4 rounded font-medium transition-colors";

    const variantStyles = {
        primary: "bg-lahoma-orange text-kent-slate-gray hover:bg-leonard-yellow",
        secondary: "bg-transparent border border-leonard-yellow text-leonard-yellow hover:bg-leonard-yellow/10"
    };

    return (
        <motion.button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            {...props}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
}