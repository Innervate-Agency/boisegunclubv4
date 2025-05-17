'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Sample gallery data - in a real app, this would come from a CMS or API
const galleryImages = [
    {
        src: '/images/range1.jpg',
        alt: 'Shooter at outdoor range',
        blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAYFBxEIISJBcf/EABUBAQEAAAAAAAAAAAAAAAAAAAMD/8QAHREAAQMFAAAAAAAAAAAAAAAAAQACEQMTMnGR/9oADAMBAAIRAxEAPwCatsPMc8kLXFxNI2nR8kx+PuGPojVCjUAk9hT79fUUUVBZZlXCWy6h3H//2Q==',
        aspect: 4 / 3
    },
    {
        src: '/images/range2.jpg',
        alt: 'Clay target shooting',
        blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAdEAACAgMBAQEAAAAAAAAAAAABAgMEBQAGERIh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAaEQEAAgMBAAAAAAAAAAAAAAABAAIDBCFB/9oADAMBAAIRAxEAPwCZp9d1/aLEFhLdWS1UjbjTdwAHvJ57Pr+nGcYwMZFJdZzULcf/2Q==',
        aspect: 16 / 9
    },
    {
        src: '/images/range3.jpg',
        alt: 'Vintage firearms display',
        blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAeEAACAQQDAQAAAAAAAAAAAAABAgMABAYFESExQf/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAECEQMhQXH/2gAMAwEAAhEDEQA/AKS3wLXJLsrNIzW9wNUCRzjQ1vvoD+6KKKnHFTeTTZ//2Q==',
        aspect: 1 / 1
    },
    {
        src: '/images/range4.jpg',
        alt: 'Club members at target practice',
        blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAfEAABBAICAwAAAAAAAAAAAAABAAIDBAYRBQchIjH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAGhEAAgMBAQAAAAAAAAAAAAAAAAECETFBYf/aAAwDAQACEQMRAD8Aqv3PZ1PFkbTqO1RvtRf8kjOcfyaB9JJJNCUUhaie9n//2Q==',
        aspect: 3 / 2
    },
    {
        src: '/images/range5.jpg',
        alt: 'Shotgun shooting competition',
        blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAeEAABBAIDAQAAAAAAAAAAAAABAAIDBAUGBxEhMf/EABUBAQEAAAAAAAAAAAAAAAAAAAAE/8QAGREAAwEBAQAAAAAAAAAAAAAAAAECAxFB/9oADAMBAAIRAxEAPwC2PFuC9RtSybltg3TbcNUPk8LMkDXdjQCQGggDZ9REUUqPXRm23tn/2Q==',
        aspect: 4 / 3
    },
    {
        src: '/images/range6.jpg',
        alt: 'Historic firearms collection',
        blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAgEAACAgEDBQAAAAAAAAAAAAABAgADBBEFBgcSITFB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAaEQACAwEBAAAAAAAAAAAAAAABAgADESFB/9oADAMBAAIRAxEAPwCas7m2Lg9Sx8etqbrLEWyt+hCOSD4YE8ZHBHHMREUN01q3bU2pqtz/2Q==',
        aspect: 16 / 9
    }
];

type ImageGalleryProps = {
    className?: string;
    withVintageEffect?: boolean;
    withParallax?: boolean;
};

const ImageGallery = ({
    className = '',
    withVintageEffect = true,
    withParallax = true
}: ImageGalleryProps) => {
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);

    // Track scroll position for parallax effect
    useEffect(() => {
        if (!withParallax) return;

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [withParallax]);

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
                    // If we had real images with data-src, we would handle the loading here
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        if (containerRef.current) {
            const images = containerRef.current.querySelectorAll('.gallery-image');
            images.forEach(img => observer.observe(img));
        }

        return () => {
            if (containerRef.current) {
                const images = containerRef.current.querySelectorAll('.gallery-image');
                images.forEach(img => observer.unobserve(img));
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
        >
            {/* 70s-style pattern overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none z-10">
                <div className="absolute inset-0 bg-[#FFC300]/10 mix-blend-overlay" />
                <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="seventies-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="15" fill="none" stroke="#FFC300" strokeWidth="2" />
                            <circle cx="0" cy="0" r="10" fill="#FFC300" opacity="0.3" />
                            <circle cx="40" cy="40" r="10" fill="#FFC300" opacity="0.3" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#seventies-pattern)" />
                </svg>
            </div>

            {/* Main image grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 relative z-0">
                {galleryImages.map((image, index) => (
                    <div
                        key={index}
                        className={`gallery-image relative overflow-hidden ${index === 0 ? 'col-span-2 row-span-2' : ''
                            }`}
                        style={{
                            aspectRatio: image.aspect,
                            transform: withParallax ? `translateY(${scrollY * (0.03 + index * 0.01)}px)` : 'none',
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1E352F]/70 to-[#36454F]/70 mix-blend-multiply z-10" />

                        {/* Vintage filter overlay */}
                        {withVintageEffect && (
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                <div className="absolute inset-0 bg-[#D4A76A]/20 mix-blend-overlay" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#3A2618]/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#000]/30 to-transparent" />
                            </div>
                        )}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: imagesLoaded > index ? 1 : 0.5,
                            }}
                            transition={{ duration: 0.5 }}
                            className="relative h-full w-full"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                                placeholder="blur"
                                blurDataURL={image.blurDataUrl}
                                style={{ filter: withVintageEffect ? 'saturate(0.9) contrast(1.1)' : 'none' }}
                                onLoadingComplete={() => setImagesLoaded(prev => prev + 1)}
                            />
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery; 