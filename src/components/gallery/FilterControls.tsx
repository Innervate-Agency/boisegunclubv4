'use client';

import { motion } from 'framer-motion';
import { useGallery } from './GalleryContext';

const FilterControls = () => {
    const { filter, setFilter, sortBy, setSortBy } = useGallery();

    const categories = [
        { id: 'all', label: 'ALL PHOTOS' },
        { id: 'range', label: 'RANGE' },
        { id: 'events', label: 'EVENTS' },
        { id: 'historical', label: 'HISTORICAL' },
        { id: 'members', label: 'MEMBERS' }
    ];

    const sortOptions = [
        { id: 'date', label: 'BY DATE' },
        { id: 'photographer', label: 'BY PHOTOGRAPHER' }
    ];

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-black/20 p-6 rounded-lg backdrop-blur-sm">
            {/* Category filters */}
            <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                    <motion.button
                        key={category.id}
                        onClick={() => setFilter(category.id)}
                        className={`
                            relative px-6 py-2 font-space-grotesk font-bold tracking-wider
                            transition-colors duration-300
                            ${filter === category.id
                                ? 'text-[#4ECDC4]'
                                : 'text-white/70 hover:text-white'
                            }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Retro border effect */}
                        <div className={`
                            absolute inset-0 border-2 rounded
                            transition-colors duration-300
                            ${filter === category.id
                                ? 'border-[#4ECDC4] glow'
                                : 'border-white/30'
                            }
                        `} />

                        {/* Hover smoke effect */}
                        <div className="absolute inset-0 pointer-events-none">
                            {filter === category.id && (
                                <motion.div
                                    className="absolute inset-0 bg-[#4ECDC4]/10 rounded blur-xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: 'reverse'
                                    }}
                                />
                            )}
                        </div>

                        {/* Button text */}
                        <span className="relative z-10">{category.label}</span>
                    </motion.button>
                ))}
            </div>

            {/* Sort controls */}
            <div className="flex gap-4 items-center">
                <span className="text-white/50 font-vt323">SORT:</span>
                {sortOptions.map((option) => (
                    <motion.button
                        key={option.id}
                        onClick={() => setSortBy(option.id as 'date' | 'photographer')}
                        className={`
                            px-4 py-1 font-vt323
                            ${sortBy === option.id
                                ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
                                : 'text-white/50 hover:text-white'
                            }
                        `}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                    >
                        {option.label}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default FilterControls; 