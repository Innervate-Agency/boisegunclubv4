'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MemberSpotlightProps {
    name: string;
    quote: string;
    imageUrl: string;
    yearJoined: number;
    achievements?: string[];
}

const MemberSpotlight: FC<MemberSpotlightProps> = ({
    name,
    quote,
    imageUrl,
    yearJoined,
    achievements = []
}) => {
    return (
        <motion.div
            className="relative overflow-hidden rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Background with glass effect */}
            <div className="relative p-8 bg-white/5 backdrop-blur-md
                          border border-white/10 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64
                              bg-[#FF6B35] rounded-full blur-[100px] opacity-10" />
                <div className="absolute bottom-0 right-0 w-48 h-48
                              bg-[#4ECDC4] rounded-full blur-[80px] opacity-10" />

                <div className="relative flex flex-col md:flex-row gap-8 items-center">
                    {/* Member photo */}
                    <div className="relative w-48 h-48 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full border-2 border-amber-200/30" />
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-cover rounded-full"
                            sizes="(max-width: 768px) 192px, 192px"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        {/* Quote */}
                        <div className="relative mb-6">
                            <span className="absolute -top-6 -left-4 text-6xl text-amber-200/20
                                         font-serif">"</span>
                            <p className="text-white/80 text-lg italic relative z-10">
                                {quote}
                            </p>
                            <span className="absolute -bottom-8 -right-4 text-6xl text-amber-200/20
                                         font-serif">"</span>
                        </div>

                        {/* Member info */}
                        <div className="mt-8">
                            <h3 className="font-space-grotesk text-2xl font-bold text-amber-100
                                       tracking-wider">
                                {name}
                            </h3>
                            <p className="font-vt323 text-white/60 mt-1">
                                Member since {yearJoined}
                            </p>
                        </div>

                        {/* Achievements */}
                        {achievements.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {achievements.map((achievement, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm
                                               bg-white/5 border border-white/10
                                               font-vt323 text-white/70"
                                    >
                                        {achievement}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MemberSpotlight; 