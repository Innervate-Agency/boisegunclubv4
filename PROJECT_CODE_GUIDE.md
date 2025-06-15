# 🔧 BOISE GUN CLUB - PROJECT CODE GUIDE
*Official Technical Implementation Standard - DO NOT DEVIATE*

## **MISSION STATEMENT**
This document defines the EXACT technical implementation for all visual effects, components, and styling. Any deviation from these standards must be approved by project lead. This ensures consistent, professional, ClickUp-level visual quality across the entire site.

---

## **PHASE 1: SURGICAL REMOVAL OF COMPETING EFFECTS**

### **🗑️ DELETE FROM `src/app/globals.css`**

**EXACT LINES TO REMOVE:**

```css
/* LINE 62 - DELETE COMPLETELY */
html {
  filter: brightness(1.05) contrast(1.02) saturate(1.05) sepia(0.03);
}

/* LINES 83-90 - DELETE COMPLETELY */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at center, transparent 40%, rgba(var(--bg-primary-dark-raw), 0.4) 100%);
  z-index: 9998;
}

/* LINES 92-99 - DELETE COMPLETELY */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E");
}

/* LINES 290-320 - DELETE ALL VINTAGE EFFECTS */
.vintage-photo::before { /* DELETE ENTIRE BLOCK */ }
.vintage-photo img { /* DELETE ENTIRE BLOCK */ }
.retro-glow { /* DELETE ENTIRE BLOCK */ }
.mist-layer { /* DELETE ENTIRE BLOCK */ }
@keyframes mist-drift { /* DELETE ENTIRE BLOCK */ }

/* LINES 170-200 - SIMPLIFY GLASS PREMIUM */
.glass-premium { /* REPLACE WITH SIMPLIFIED VERSION BELOW */ }
.glass-premium:hover { /* DELETE ENTIRE BLOCK */ }
```

---

## **PHASE 2: DUAL-THEME GRADIENT SYSTEM INSTALLATION**

### **🎨 ADD TO `src/styles/themes.css` (After existing color definitions)**

```css
/* ========================================
   CLICKUP-INSPIRED GRADIENT SYSTEM
   Theme-Aware Orange/Yellow/Red Palette
======================================== */

/* LIGHT THEME GRADIENTS */
:root {
  /* Primary Gradient Colors */
  --gradient-primary-start: #FF6B35;      /* Vibrant Orange */
  --gradient-primary-mid: #F7931E;        /* Golden Orange */
  --gradient-primary-end: #FFD23F;        /* Sunny Yellow */
  
  --gradient-secondary-start: #FF4E50;    /* Coral Red */
  --gradient-secondary-mid: #FF6B35;      /* Vibrant Orange */
  --gradient-secondary-end: #F7931E;      /* Golden Orange */
  
  --gradient-accent-start: #FFD23F;       /* Sunny Yellow */
  --gradient-accent-mid: #FFAB00;         /* Amber */
  --gradient-accent-end: #FF6F00;         /* Deep Orange */
  
  /* Glass Effect Colors */
  --glass-bg-light: rgba(255, 255, 255, 0.25);
  --glass-bg-secondary: rgba(255, 255, 255, 0.1);
  --glass-border-light: rgba(255, 255, 255, 0.2);
  --glass-shadow-light: rgba(255, 107, 53, 0.1);
  
  /* Card Gradients */
  --card-gradient-light: color-mix(in srgb, var(--gradient-primary-start) 3%, transparent);
  --card-gradient-end-light: color-mix(in srgb, var(--gradient-primary-end) 2%, transparent);
}

/* DARK THEME GRADIENTS */
:root.dark, 
:root[data-theme="dark"] {
  /* Adjusted for Dark Theme Contrast */
  --gradient-primary-start: #FF8C42;      /* Lighter Orange for contrast */
  --gradient-primary-mid: #FFB347;        /* Peach Orange */
  --gradient-primary-end: #FFDC5E;        /* Softer Yellow */
  
  --gradient-secondary-start: #FF6B5B;    /* Lighter Coral */
  --gradient-secondary-mid: #FF8C42;      /* Lighter Orange */
  --gradient-secondary-end: #FFB347;      /* Peach Orange */
  
  --gradient-accent-start: #FFDC5E;       /* Softer Yellow */
  --gradient-accent-mid: #FFC107;         /* Brighter Amber */
  --gradient-accent-end: #FF8F00;         /* Bright Orange */
  
  /* Dark Glass Effect Colors */
  --glass-bg-light: rgba(47, 49, 53, 0.8);
  --glass-bg-secondary: rgba(75, 75, 75, 0.6);
  --glass-border-light: rgba(255, 140, 66, 0.2);
  --glass-shadow-light: rgba(255, 140, 66, 0.15);
  
  /* Dark Card Gradients */
  --card-gradient-light: color-mix(in srgb, var(--gradient-primary-start) 8%, transparent);
  --card-gradient-end-light: color-mix(in srgb, var(--gradient-primary-end) 5%, transparent);
}
```

### **🎯 BACKGROUND GRADIENT SYSTEM**

```css
/* THEME-AWARE BACKGROUND GRADIENTS */
.bg-gradient-primary {
  background: linear-gradient(135deg, 
    var(--gradient-primary-start) 0%, 
    var(--gradient-primary-mid) 50%, 
    var(--gradient-primary-end) 100%);
}

.bg-gradient-secondary {
  background: linear-gradient(135deg, 
    var(--gradient-secondary-start) 0%, 
    var(--gradient-secondary-mid) 50%, 
    var(--gradient-secondary-end) 100%);
}

.bg-gradient-subtle {
  background: linear-gradient(135deg, 
    var(--bg-primary) 0%, 
    color-mix(in srgb, var(--gradient-primary-start) 2%, var(--bg-primary)) 100%);
}

.bg-gradient-hero {
  background: 
    radial-gradient(circle at 20% 80%, 
      color-mix(in srgb, var(--gradient-primary-end) 8%, transparent) 0%,
      transparent 50%),
    radial-gradient(circle at 80% 20%, 
      color-mix(in srgb, var(--gradient-secondary-start) 6%, transparent) 0%,
      transparent 50%),
    var(--bg-primary);
}

/* OVERLAY GRADIENTS */
.gradient-overlay-warm {
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--gradient-primary-start) 20%, transparent) 0%,
    color-mix(in srgb, var(--gradient-primary-end) 10%, transparent) 100%);
}

.gradient-overlay-hero {
  background: linear-gradient(to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    color-mix(in srgb, var(--gradient-primary-start) 10%, rgba(0, 0, 0, 0.2)) 100%);
}
```

### **✨ CLICKUP GLASS MORPHISM SYSTEM**

```css
/* THEME-AWARE GLASS EFFECTS */
.clickup-glass {
  background: linear-gradient(135deg,
    var(--glass-bg-light) 0%,
    var(--glass-bg-secondary) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border-light);
  box-shadow: 
    0 8px 32px var(--glass-shadow-light),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.clickup-glass-strong {
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--glass-bg-light) 80%, var(--gradient-primary-start)) 0%,
    var(--glass-bg-secondary) 100%);
  backdrop-filter: blur(25px) saturate(200%);
  border: 1px solid color-mix(in srgb, var(--gradient-primary-start) 30%, var(--glass-border-light));
  box-shadow: 
    0 12px 40px var(--glass-shadow-light),
    0 4px 12px color-mix(in srgb, var(--gradient-primary-start) 20%, transparent),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  border-radius: 20px;
}

.clickup-glass-card {
  background: var(--bg-primary);
  border: 1px solid var(--glass-border-light);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.clickup-glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    var(--card-gradient-light) 0%,
    var(--card-gradient-end-light) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.clickup-glass-card:hover::before {
  opacity: 1;
}

.clickup-glass-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 10px 15px -3px var(--glass-shadow-light),
    0 4px 6px -4px var(--glass-shadow-light);
  border-color: color-mix(in srgb, var(--gradient-primary-start) 40%, var(--glass-border-light));
}
```

### **🎪 BUTTON GRADIENT SYSTEM**

```css
/* THEME-AWARE BUTTON GRADIENTS */
.btn-gradient-primary {
  background: linear-gradient(135deg, 
    var(--gradient-primary-start) 0%, 
    var(--gradient-primary-end) 100%);
  border: none;
  color: var(--text-primary-dark-theme, white);
  position: relative;
  overflow: hidden;
  font-family: var(--font-heading);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px color-mix(in srgb, var(--gradient-primary-start) 30%, transparent);
}

.btn-gradient-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    var(--gradient-secondary-start) 0%, 
    var(--gradient-secondary-end) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-gradient-primary:hover::before {
  opacity: 1;
}

.btn-gradient-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 12px color-mix(in srgb, var(--gradient-primary-start) 40%, transparent);
}

.btn-gradient-primary > * {
  position: relative;
  z-index: 1;
}

.btn-gradient-secondary {
  background: transparent;
  border: 2px solid;
  border-image: linear-gradient(135deg, 
    var(--gradient-primary-start) 0%, 
    var(--gradient-primary-end) 100%) 1;
  color: var(--gradient-primary-start);
  position: relative;
  overflow: hidden;
  font-family: var(--font-heading);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-gradient-secondary:hover {
  background: linear-gradient(135deg, 
    var(--gradient-primary-start) 0%, 
    var(--gradient-primary-end) 100%);
  color: var(--text-primary-dark-theme, white);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px color-mix(in srgb, var(--gradient-primary-start) 30%, transparent);
}
```

### **🌊 ACCENT GRADIENT UTILITIES**

```css
/* THEME-AWARE ACCENT GRADIENTS */
.accent-gradient-text {
  background: linear-gradient(90deg, 
    var(--gradient-accent-start) 0%, 
    var(--gradient-accent-mid) 50%, 
    var(--gradient-accent-end) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 700;
  display: inline-block;
}

.accent-gradient-border {
  border: 2px solid;
  border-image: linear-gradient(90deg, 
    var(--gradient-accent-start) 0%, 
    var(--gradient-accent-mid) 50%, 
    var(--gradient-accent-end) 100%) 1;
}

.accent-gradient-underline {
  position: relative;
}

.accent-gradient-underline::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    var(--gradient-accent-start) 0%, 
    var(--gradient-accent-end) 100%);
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.accent-gradient-underline:hover::after {
  transform: scaleX(1);
}
```

---

## **PHASE 3: COMPONENT IMPLEMENTATION**

### **🎯 HERO SECTION (MANDATORY IMPLEMENTATION)**

**FILE: `src/components/home/HeroSection.tsx`**

```tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';

function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Optimized parallax transforms
    const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-hero">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/hero-bg.webp"
                    fill={true}
                    className="object-cover"
                    priority={true}
                    quality={85}
                    alt="Boise Gun Club - Premier Shooting Sports Facility"
                />
                {/* ClickUp-style gradient overlay */}
                <div className="absolute inset-0 gradient-overlay-hero" />
            </div>

            {/* Content with ClickUp glass effect */}
            <div className="relative z-10 flex min-h-screen items-center justify-center">
                <motion.div 
                    style={{ opacity: contentOpacity, y: titleY }}
                    className="clickup-glass-strong p-8 lg:p-12 max-w-5xl mx-6"
                >
                    {/* Logo */}
                    <div className="mb-8 flex justify-center">
                        <Image
                            src="/images/bgcv3-shattered-clay.svg"
                            width={180}
                            height={180}
                            alt="Boise Gun Club Logo"
                            className="drop-shadow-xl"
                            priority
                        />
                    </div>
                    
                    <h1 className="accent-gradient-text text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-center">
                        BOISE GUN CLUB
                    </h1>

                    <p className="text-xl lg:text-2xl text-center mb-8 max-w-3xl mx-auto opacity-90">
                        Idaho's premier shooting sports facility since 1898. 
                        Experience world-class trap, skeet, and sporting clays ranges 
                        in the heart of the Treasure Valley.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/membership">
                            <button className="btn-gradient-primary px-8 py-4 rounded-lg text-lg font-bold">
                                BECOME A MEMBER
                            </button>
                        </Link>
                        
                        <Link href="/ranges">
                            <button className="btn-gradient-secondary px-8 py-4 rounded-lg text-lg font-bold">
                                EXPLORE RANGES
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default HeroSection;
```

### **📱 STANDARD CARD COMPONENT**

**FILE: `src/components/ui/GradientCard.tsx`**

```tsx
import { ReactNode } from 'react';

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'strong';
}

export default function GradientCard({ 
  children, 
  className = '',
  padding = 'md',
  variant = 'default'
}: GradientCardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const baseClass = variant === 'strong' ? 'clickup-glass-strong' : 'clickup-glass-card';
  
  return (
    <div className={`${baseClass} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
}
```

### **🎪 STANDARD BUTTON COMPONENT**

**FILE: `src/components/ui/GradientButton.tsx`**

```tsx
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function GradientButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}: GradientButtonProps) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const baseClass = variant === 'primary' ? 'btn-gradient-primary' : 'btn-gradient-secondary';
  
  return (
    <button 
      className={`${baseClass} ${sizes[size]} rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

## **PHASE 4: PERFORMANCE OPTIMIZATIONS**

### **🚀 CSS OPTIMIZATIONS (ADD TO END OF themes.css)**

```css
/* ========================================
   PERFORMANCE OPTIMIZATIONS
======================================== */

/* GPU ACCELERATION */
.clickup-glass,
.clickup-glass-strong,
.clickup-glass-card,
.btn-gradient-primary,
.btn-gradient-secondary {
  will-change: transform, opacity;
  transform: translateZ(0);
}

/* REDUCED MOTION SUPPORT */
@media (prefers-reduced-motion: reduce) {
  .clickup-glass-card,
  .btn-gradient-primary,
  .btn-gradient-secondary {
    transition-duration: 0.01ms !important;
  }
  
  .clickup-glass-card:hover {
    transform: none !important;
  }
  
  .btn-gradient-primary:hover,
  .btn-gradient-secondary:hover {
    transform: none !important;
  }
}

/* GRADIENT PRELOADING */
.gradient-preload {
  background: 
    var(--gradient-primary-start), 
    var(--gradient-primary-mid), 
    var(--gradient-primary-end),
    var(--gradient-secondary-start),
    var(--gradient-secondary-end);
  background-size: 0 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* HIGH CONTRAST MODE SUPPORT */
@media (prefers-contrast: high) {
  .clickup-glass,
  .clickup-glass-strong,
  .clickup-glass-card {
    background: var(--bg-primary) !important;
    backdrop-filter: none !important;
    border: 2px solid var(--text-primary) !important;
  }
  
  .btn-gradient-primary,
  .btn-gradient-secondary {
    background: var(--text-primary) !important;
    color: var(--bg-primary) !important;
    border: 2px solid var(--text-primary) !important;
  }
}
```

---

## **PHASE 5: MANDATORY IMPLEMENTATION CHECKLIST**

### **✅ REMOVAL PHASE (MUST COMPLETE FIRST):**
- [ ] Delete html filter from globals.css line 62
- [ ] Delete body::before vignette (lines 83-90)
- [ ] Delete body::after film grain (lines 92-99)
- [ ] Remove all vintage effects (.vintage-photo, .retro-glow, .mist-layer)
- [ ] Simplify .glass-premium to basic backdrop-blur

### **✅ INSTALLATION PHASE:**
- [ ] Add dual-theme gradient variables to themes.css
- [ ] Add background gradient classes
- [ ] Add ClickUp glass morphism styles
- [ ] Add button gradient system
- [ ] Add card gradient system
- [ ] Add accent gradient utilities
- [ ] Add performance optimizations

### **✅ COMPONENT IMPLEMENTATION:**
- [ ] Create GradientCard.tsx component
- [ ] Create GradientButton.tsx component
- [ ] Update HeroSection.tsx with new gradient system
- [ ] Replace all existing buttons with GradientButton
- [ ] Replace all existing cards with GradientCard

### **✅ TESTING & VALIDATION:**
- [ ] Test light theme appearance
- [ ] Test dark theme appearance
- [ ] Validate smooth 60fps animations
- [ ] Check accessibility contrast ratios
- [ ] Test reduced motion support
- [ ] Verify mobile responsiveness
- [ ] Run Lighthouse performance audit

---

## **ENFORCEMENT RULES**

### **🚫 FORBIDDEN PRACTICES:**
1. **NO custom gradients** outside this system
2. **NO additional glass effects** beyond clickup-glass variants
3. **NO global filters** or overlays
4. **NO competing visual effects**
5. **NO inline styles** for gradients or effects

### **✅ MANDATORY PRACTICES:**
1. **ALWAYS use** GradientButton for buttons
2. **ALWAYS use** GradientCard for cards
3. **ALWAYS test** on both light and dark themes
4. **ALWAYS validate** accessibility contrast
5. **ALWAYS follow** the performance guidelines

### **⚠️ APPROVAL REQUIRED FOR:**
- New gradient variations
- Additional glass effects
- Performance-heavy animations
- Theme modifications

**This system is LOCKED. Any deviations require project lead approval.**