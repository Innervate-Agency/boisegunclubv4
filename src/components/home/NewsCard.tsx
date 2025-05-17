'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
    title: string;
    date: string;
    excerpt: string;
    imageUrl: string;
    category: string;
}

const NewsCard: FC<NewsCardProps> = ({
    title,
    date,
    excerpt,
    imageUrl,
    category
}) => {
    return (
        <motion.article
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="h-full flex flex-col rounded-lg overflow-hidden
                          bg-white/5 backdrop-blur-sm border border-white/10
                          transition-all duration-300 hover:bg-white/10
                          hover:border-white/20">
                {/* Header with wood texture */}
                <div className="relative h-48">
                    <div className="absolute inset-0 bg-[url('/textures/wood-grain.png')]
                                  opacity-20 mix-blend-overlay" />
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur
                                       text-sm font-vt323 text-white">
                            {category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-4">
                    <div className="font-vt323 text-amber-200/70">{date}</div>
                    <h3 className="font-space-grotesk text-xl font-bold text-white
                                 tracking-wide leading-tight">
                        {title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-3">{excerpt}</p>
                </div>

                {/* Glass button */}
                <div className="p-6 pt-0">
                    <Link href={`/news/${encodeURIComponent(title)}`}
                        className="inline-flex items-center space-x-2 px-4 py-2
                                   bg-white/5 backdrop-blur rounded border border-white/10
                                   font-vt323 text-white/80 text-sm
                                   transition-all duration-300
                                   hover:bg-white/10 hover:text-white
                                   hover:border-white/20">
                        <span>READ MORE</span>
                        <span className="font-mono">{'>>'}</span>
                    </Link>
                </div>
            </div>
        </motion.article>
    );
};

export default NewsCard; 