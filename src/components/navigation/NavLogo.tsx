'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function NavLogo() {
    return (
        <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <Link href="/" className="flex items-center">
                <Image src="/images/bgcv3-shattered-clay.svg" alt="Boise Gun Club Logo" width={110} height={110} />

                {/* Logo text with proper font heading class */}
                <div>
                    <p className="text-[10px] md:text-[10px] text-white/70 uppercase tracking-wider font-body">
                        Est. 1898
                    </p>
                    <h1 className="text-xl md:text-5xl text-white font-heading tracking-wide">
                        <span className="font-[900]">BOISE</span>
                        <span className="font-[100]">GUNCLUB</span>
                    </h1>
                    <p className="text-[8px] md:text-[12px] text-white/70 uppercase tracking-wider font-body">
                        Idaho&apos;s Premier Shotgun Sports Facility
                    </p>
                </div>
            </Link>
        </motion.div>
    );
}
