'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '@/components/navigation/NavigationContext';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'none' | 'grid' | 'gradient' | 'dots';
  overlay?: boolean;
  isHero?: boolean;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  withAnimation?: boolean;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'none',
  overlay = true,
  isHero = false,
  spacing = 'lg',
  maxWidth = 'xl',
  withAnimation = false,
  id
}) => {
  const { totalNavHeight } = useNavigation();

  // Background patterns
  const backgrounds = {
    none: '',
    grid: 'bg-[linear-gradient(rgba(var(--accent-primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--accent-primary-rgb),0.03)_1px,transparent_1px)] bg-[size:20px_20px]',
    gradient: 'bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)]',
    dots: 'bg-[radial-gradient(rgba(var(--accent-primary-rgb),0.1)_1px,transparent_1px)] bg-[size:16px_16px]'
  };

  // Spacing classes
  const spacingClasses = {
    none: '',
    sm: 'section-spacing-sm',
    md: 'py-[var(--space-2xl)]',
    lg: 'section-spacing'
  };

  // Max width classes
  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none'
  };

  // Hero-specific styling
  const heroClasses = isHero 
    ? `min-h-screen flex items-center justify-center`
    : '';

  // Navigation offset for non-hero sections
  const navOffset = !isHero && totalNavHeight > 0 
    ? { paddingTop: `${totalNavHeight}px` }
    : {};

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const SectionComponent = withAnimation ? motion.section : 'section';

  return (
    <SectionComponent
      id={id}
      className={`
        relative w-full
        ${backgrounds[background]}
        ${spacingClasses[spacing]}
        ${heroClasses}
        ${className}
      `}
      style={navOffset}
      {...(withAnimation && {
        variants: sectionVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" }
      })}
    >
      {/* Background overlay for better text readability */}
      {overlay && background !== 'none' && (
        <div className="absolute inset-0 bg-[var(--bg-primary)] opacity-50" />
      )}
      
      {/* Content container */}
      <div className={`
        relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8
        ${maxWidthClasses[maxWidth]}
      `}>
        {children}
      </div>
    </SectionComponent>
  );
};

export default Section; 