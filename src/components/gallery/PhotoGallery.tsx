'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GalleryProvider, useGallery } from './GalleryContext';
import PhotoModal from './PhotoModal';
import FilterControls from './FilterControls';
import useDeterministicRandom from '../../hooks/useDeterministicRandom';
import './Gallery.css';

// Masonry layout component
function MasonryGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {children}
        </div>
    );
}

// Smoke effect component
function SmokeEffect() {
    // Client-side only indicator
    const [isMounted, setIsMounted] = useState(false);
    // Use deterministic random for consistent rendering
    const { getRandomValue } = useDeterministicRandom(20, 12345);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if (!isMounted) {
        return null;
    }
    
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-64 h-64 bg-gradient-to-t from-white/5 to-transparent rounded-full blur-3xl"
                    animate={{
                        x: [
                            getRandomValue(i * 3, -50, 50),
                            getRandomValue(i * 3 + 1, -50, 50),
                            getRandomValue(i * 3 + 2, -50, 50)
                        ],
                        y: [
                            getRandomValue(i * 5, 0, 100),
                            getRandomValue(i * 5 + 1, -100, 0),
                            getRandomValue(i * 5 + 2, 0, 100)
                        ],
                        opacity: [0, 0.2, 0]
                    }}
                    transition={{
                        duration: 10 + getRandomValue(i * 7, 0, 5),
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        left: `${getRandomValue(i * 11, 0, 100)}%`,
                        top: `${getRandomValue(i * 13, 0, 100)}%`
                    }}
                />
            ))}
        </div>
    );
}

// Retro text effect component
function RetroText({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-0 blur-sm text-[#FF6B35]">{children}</div>
            <div className="absolute inset-0 text-[#4ECDC4] opacity-80">{children}</div>
            <div className="relative text-white">{children}</div>
        </div>
    );
}

function GalleryContent() {
    const { photos, selectedPhoto, setSelectedPhoto, filter } = useGallery();
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter photos based on selected category
    const filteredPhotos = photos.filter(photo =>
        filter === 'all' ? true : photo.category === filter
    );

    // Intersection Observer for lazy loading
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        const images = containerRef.current?.querySelectorAll('.gallery-image');
        images?.forEach(img => observer.observe(img));

        return () => observer.disconnect();
    }, [filteredPhotos]);

    return (
        <div className="min-h-screen bg-[#363636] text-white relative overflow-hidden">
            {/* Background effects */}
            <SmokeEffect />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B35]/5 to-[#4ECDC4]/5" />

            <div className="container mx-auto px-4 py-16 relative z-10">
                {/* Gallery header */}
                <div className="text-center mb-12">
                    <RetroText className="text-5xl md:text-6xl font-bold mb-4 tracking-wider">
                        PHOTO ARCHIVES
                    </RetroText>
                    <p className="text-xl text-[#4ECDC4]/80 font-space-grotesk">
                        A journey through time at Boise Gun Club
                    </p>
                </div>

                {/* Filter controls */}
                <FilterControls />

                {/* Photo grid */}
                <div ref={containerRef} className="mt-8">
                    <MasonryGrid>
                        {filteredPhotos.map((photo) => (
                            <motion.div
                                key={photo.id}
                                layoutId={`photo-${photo.id}`}
                                className="gallery-image relative group mb-4 opacity-0 transition-opacity duration-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div
                                    className="relative aspect-auto overflow-hidden rounded-lg cursor-pointer
                                             before:absolute before:inset-0 before:bg-gradient-to-t 
                                             before:from-black/50 before:to-transparent before:opacity-0
                                             before:transition-opacity group-hover:before:opacity-100"
                                    onClick={() => setSelectedPhoto(photo)}
                                >
                                    {/* Vintage film effect overlay */}
                                    <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay bg-gradient-to-br from-[#FF6B35]/20 to-[#4ECDC4]/20" />
                                    <div className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply opacity-40 bg-[url('/grain.png')]" />

                                    <Image
                                        src={photo.src}
                                        alt={photo.alt}
                                        width={photo.width}
                                        height={photo.height}
                                        className="w-full h-auto transition-transform duration-300
                                                 filter brightness-90 contrast-110 saturate-[0.9]"
                                        placeholder="blur"
                                        blurDataURL={photo.blurDataUrl}
                                    />

                                    {/* Photo info overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 text-white opacity-0 transform 
                                                  translate-y-4 transition-all group-hover:opacity-100 
                                                  group-hover:translate-y-0 z-20">
                                        <h3 className="text-lg font-bold font-space-grotesk mb-1">
                                            {photo.alt}
                                        </h3>
                                        <p className="text-sm opacity-80">
                                            {photo.photographer} • {photo.year}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </MasonryGrid>
                </div>
            </div>

            {/* Photo modal */}
            <AnimatePresence>
                {selectedPhoto && <PhotoModal />}
            </AnimatePresence>
        </div>
    );
}

export default function PhotoGallery() {
    return (
        <GalleryProvider>
            <GalleryContent />
        </GalleryProvider>
    );
}