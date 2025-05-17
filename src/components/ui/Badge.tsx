'use client';

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'gold';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  animate?: boolean;
  className?: string;
}

/**
 * Badge component - used to display status indicators, labels, or counters
 */
const Badge: FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  animate = false,
  className = '',
}) => {
  // Base classes
  const baseClasses = "inline-block font-bold rounded-full text-center whitespace-nowrap";
  
  // Size classes
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };
  
  // Variant classes - using CSS variables for consistent theming
  const variantClasses = {
    primary: "bg-[var(--accent-primary)] text-white",
    secondary: "bg-[var(--accent-secondary)] text-white",
    success: "bg-emerald-500 text-white",
    danger: "bg-[var(--accent-darkred)] text-white",
    warning: "bg-amber-500 text-black",
    info: "bg-blue-500 text-white",
    gold: "bg-[var(--accent-gold)] text-black",
  };
  
  // Combine classes
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  // Animation variants
  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };
  
  return animate ? (
    <motion.span
      className={classes}
      variants={pulseAnimation}
      animate="animate"
    >
      {children}
    </motion.span>
  ) : (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;
