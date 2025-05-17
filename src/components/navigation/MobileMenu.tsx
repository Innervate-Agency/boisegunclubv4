'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MobileMenuProps = {
    links: Array<{ label: string; href: string }>;
    onClose: () => void;
};

export default function MobileMenu({ links, onClose }: MobileMenuProps) {
    const pathname = usePathname();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.07,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24,
            },
        },
        exit: { y: 20, opacity: 0 },
    };

    return (
        <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-[var(--bg-primary)]/90 backdrop-blur-md"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Glassmorphism decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full bg-[var(--accent-primary)]/20 blur-xl"></div>
                <div className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full bg-[var(--accent-secondary)]/20 blur-xl"></div>
            </div>

            {/* Background grid */}
            <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none"></div>

            {/* Menu content */}
            <div className="relative h-full flex flex-col items-center justify-center p-8">
                <motion.ul className="space-y-6 w-full max-w-xs">
                    {links.map((link) => (
                        <motion.li key={link.href} variants={itemVariants}>
                            <Link
                                href={link.href}
                                className={`block text-center text-2xl py-3 font-heading text-[var(--text-primary)] border-b border-[var(--glass-border)] transition-colors ${pathname === link.href ? 'text-[var(--accent-primary)] font-bold' : 'hover:text-[var(--accent-secondary)]'}`}
                                onClick={onClose}
                            >
                                {link.label}
                            </Link>
                        </motion.li>
                    ))}
                    <motion.li variants={itemVariants}>
                        <Link
                            href="/membership"
                            className="block text-center mt-8 py-3 rounded-lg btn-gradient font-heading font-bold text-white text-2xl"
                            onClick={onClose}
                        >
                            MEMBER LOGIN
                        </Link>
                    </motion.li>
                </motion.ul>
            </div>
        </motion.div>
    );
} 