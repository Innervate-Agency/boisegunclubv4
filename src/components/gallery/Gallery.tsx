'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface GalleryItem {
    id: number;
    src: string;
    alt: string;
    year: string;
}

const Gallery: React.FC<{ galleryItems: GalleryItem[] }> = ({ galleryItems }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        const handleResize = () => {
            // Handle resize logic if needed
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative cursor-pointer"
                        onClick={() => handleImageClick(item.src)}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                    </div>
                ))}
            </div>
            {selectedImage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleCloseModal} />
                    <div className="relative w-full h-full">
                        <Image
                            src={selectedImage}
                            alt="Selected Image"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
