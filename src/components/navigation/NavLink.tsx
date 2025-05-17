'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

type NavLinkProps = {
    href: string;
    label: string;
    children?: ReactNode;
};

export default function NavLink({ href, label, children }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;
    const [isHovering, setIsHovering] = useState(false);

    return (
        <motion.div
            className="relative flex items-center"
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
        >
            <Link
                href={href}
                className={`
                    relative z-10 text-base font-medium tracking-wide transition-all duration-300
                    ${isActive
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }
                `}
            >
                {label}
                {children}
            </Link>

            {/* Hover effect */}
            <motion.div
                className="absolute -inset-2 rounded-lg -z-10"
                initial={false}
                animate={{
                    background: isHovering
                        ? 'linear-gradient(to right, rgba(230, 126, 34, 0.1), rgba(245, 232, 199, 0.1))'
                        : 'none',
                    opacity: isHovering ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Active indicator */}
            {isActive && (
                <motion.div
                    layoutId="activeNavLink"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E67E22] to-[#F5A623]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            )}
        </motion.div>
    );
} 