'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useGallery } from './GalleryContext';
import { FC } from 'react';

const PhotoModal: FC = () => {
    const { selectedPhoto, setSelectedPhoto } = useGallery();

    if (!selectedPhoto) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedPhoto(null)}
        >
            {/* Modal content */}
            <motion.div
                layoutId={`photo-${selectedPhoto.id}`}
                className="relative max-w-7xl w-full bg-[#1A1A1A] rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute top-4 right-4 z-20 text-white/80 hover:text-white
                             font-vt323 text-xl px-4 py-2 border border-white/20 rounded
                             hover:border-white/40 transition-colors"
                >
                    [X] CLOSE
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    {/* Photo container */}
                    <div className="relative">
                        {/* Vintage effects */}
                        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay 
                                      bg-gradient-to-br from-[#FF6B35]/20 to-[#4ECDC4]/20" />
                        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply 
                                      opacity-40 bg-[url('/grain.png')]" />

                        {/* Scanlines effect */}
                        <div className="absolute inset-0 z-20 pointer-events-none bg-scanlines opacity-10" />

                        <Image
                            src={selectedPhoto.src}
                            alt={selectedPhoto.alt}
                            width={selectedPhoto.width}
                            height={selectedPhoto.height}
                            className="w-full h-auto rounded-lg filter brightness-90 contrast-110 saturate-[0.9]"
                            placeholder="blur"
                            blurDataURL={selectedPhoto.blurDataUrl}
                        />
                    </div>

                    {/* Photo metadata */}
                    <div className="font-space-grotesk text-white">
                        <h2 className="text-3xl font-bold mb-4 text-[#4ECDC4]">
                            {selectedPhoto.alt}
                        </h2>

                        <div className="space-y-4 text-white/80">
                            <div>
                                <h3 className="text-sm uppercase text-[#FF6B35]">Photographer</h3>
                                <p className="text-lg">{selectedPhoto.photographer || 'Unknown'}</p>
                            </div>

                            <div>
                                <h3 className="text-sm uppercase text-[#FF6B35]">Year</h3>
                                <p className="text-lg">{selectedPhoto.year || 'Unknown'}</p>
                            </div>

                            <div>
                                <h3 className="text-sm uppercase text-[#FF6B35]">Category</h3>
                                <p className="text-lg capitalize">{selectedPhoto.category}</p>
                            </div>

                            {selectedPhoto.description && (
                                <div>
                                    <h3 className="text-sm uppercase text-[#FF6B35]">Description</h3>
                                    <p className="text-lg">{selectedPhoto.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Terminal-style metadata display */}
                        <div className="mt-8 font-vt323 text-[#4ECDC4]/80 bg-black/40 p-4 rounded">
                            <p>{`>`} IMAGE_ID: {selectedPhoto.id}</p>
                            <p>{`>`} DIMENSIONS: {selectedPhoto.width}x{selectedPhoto.height}</p>
                            <p>{`>`} TIMESTAMP: {new Date().toISOString()}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PhotoModal; 