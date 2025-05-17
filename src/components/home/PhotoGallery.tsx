'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Photo {
    id: number;
    src: string;
    alt: string;
    year: string;
}

interface PhotoGalleryProps {
    photos: Photo[];
}

// Modern glassmorphic photo frame
const GlassPhotoFrame: React.FC<{ photo: Photo, onClick: () => void }> = ({ photo, onClick }) => {
    return (
        <motion.div
            className="relative overflow-hidden rounded cursor-pointer group"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
        >
            {/* Photo container with aspect ratio */}
            <div className="relative aspect-square overflow-hidden">
                {/* Grid overlay for texture */}
                <div className="absolute inset-0 bg-[url('/images/Grid/Grid (2).jpg')] opacity-10 mix-blend-overlay z-10 pointer-events-none"></div>

                {/* Glass effect border */}
                <div className="absolute inset-0 border border-white/10 z-20 pointer-events-none"></div>

                {/* The image */}
                <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-all duration-300 filter"
                />

                {/* Hover overlay with info */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#121212]/70 backdrop-blur-sm p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
                    <p className="text-white font-bold font-['Refrigerator_Deluxe']">{photo.alt}</p>
                    <p className="text-[#F25D27] text-sm font-['Museo']">{photo.year}</p>
                </div>
            </div>
        </motion.div>
    );
};

// Subtle smoke transition effect
const SmokeTransition: React.FC = () => {
    return (
        <motion.div
            className="fixed inset-0 z-[60] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 1 }}
        >
            <div className="absolute inset-0 bg-[url('/images/Smoke/Background_01.jpg')] bg-cover opacity-30 mix-blend-overlay"></div>
        </motion.div>
    );
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [hoveredPhotoId, setHoveredPhotoId] = useState<number | null>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    // Close modal when clicking outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setSelectedPhoto(null);
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!selectedPhoto) return;

        if (e.key === 'Escape') {
            setSelectedPhoto(null);
            return;
        }

        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
            let newIndex;

            if (e.key === 'ArrowRight') {
                newIndex = (currentIndex + 1) % photos.length;
            } else {
                newIndex = (currentIndex - 1 + photos.length) % photos.length;
            }

            setSelectedPhoto(photos[newIndex]);
        }
    };

    return (
        <div
            ref={galleryRef}
            className="relative"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            {/* Main gallery grid with masonry effect */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => {
                    // Apply span-2 to the first image for masonry layout
                    const spanClasses = index === 0
                        ? "row-span-2 col-span-2"
                        : "";

                    return (
                        <motion.div
                            key={photo.id}
                            className={`relative overflow-hidden rounded-xl group/photo ${spanClasses}`}
                            style={{ aspectRatio: index === 0 ? "3/2" : "1" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            onClick={() => setSelectedPhoto(photo)}
                            onMouseEnter={() => setHoveredPhotoId(photo.id)}
                            onMouseLeave={() => setHoveredPhotoId(null)}
                        >
                            {/* Photo with effects */}
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover vintage-filter transition-transform duration-700 group-hover/photo:scale-110"
                                />

                                {/* Gradient overlay with vintage feel */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.2)] via-transparent to-[rgba(0,0,0,0.6)] mix-blend-multiply" />

                                {/* Film grain texture */}
                                <div className="absolute inset-0 bg-[url('/textures/grain.png')] opacity-20 mix-blend-overlay" />

                                {/* Interactive hover overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-[var(--accent-primary)]/0 group-hover/photo:bg-[var(--accent-primary)]/20 transition-colors duration-300"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: hoveredPhotoId === photo.id ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {/* Year badge */}
                            <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-md text-white text-xs font-heading">
                                {photo.year}
                            </div>

                            {/* Caption */}
                            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover/photo:translate-y-0 transition-transform duration-300 p-4 bg-gradient-to-t from-black/80 to-black/0 backdrop-blur-sm">
                                <p className="text-white font-heading text-sm">
                                    {photo.alt}
                                </p>
                            </div>

                            {/* Click indication */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 text-white"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Lightbox modal for selected photo */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleBackdropClick}
                    >
                        <motion.div
                            className="relative max-w-5xl w-full h-full max-h-[85vh] flex flex-col"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            {/* Close button */}
                            <button
                                className="absolute -top-12 right-0 text-white hover:text-[var(--accent-primary)] transition-colors"
                                onClick={() => setSelectedPhoto(null)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-8 h-8"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {/* Image container */}
                            <div className="relative flex-1 overflow-hidden rounded-lg border border-white/10">
                                <Image
                                    src={selectedPhoto.src}
                                    alt={selectedPhoto.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                    className="object-contain vintage-filter"
                                />

                                {/* Subtle film grain */}
                                <div className="absolute inset-0 bg-[url('/textures/grain.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                            </div>

                            {/* Caption bar */}
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <h3 className="text-white font-heading text-lg">
                                        {selectedPhoto.alt}
                                    </h3>
                                    <p className="text-white/60 font-body text-sm">
                                        {selectedPhoto.year}
                                    </p>
                                </div>

                                {/* Navigation arrows */}
                                <div className="flex gap-4">
                                    <button
                                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-[var(--accent-primary)]/80 transition-colors flex items-center justify-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
                                            const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
                                            setSelectedPhoto(photos[prevIndex]);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5 text-white"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>

                                    <button
                                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-[var(--accent-primary)]/80 transition-colors flex items-center justify-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
                                            const nextIndex = (currentIndex + 1) % photos.length;
                                            setSelectedPhoto(photos[nextIndex]);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5 text-white"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Keyboard navigation hint */}
                            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-8 text-white/40 text-xs font-body">
                                Use arrow keys to navigate
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PhotoGallery; 
