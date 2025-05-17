'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface PhotoMetadata {
    id: string;
    src: string;
    blurDataUrl: string;
    alt: string;
    width: number;
    height: number;
    category: 'range' | 'events' | 'historical' | 'members';
    photographer?: string;
    year?: number;
    description?: string;
}

interface GalleryContextType {
    photos: PhotoMetadata[];
    selectedPhoto: PhotoMetadata | null;
    setSelectedPhoto: (photo: PhotoMetadata | null) => void;
    filter: string;
    setFilter: (filter: string) => void;
    sortBy: 'date' | 'photographer';
    setSortBy: (sortBy: 'date' | 'photographer') => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

// Sample photo data
const samplePhotos: PhotoMetadata[] = [
    {
        id: '1',
        src: '/images/range1.jpg',
        blurDataUrl: 'data:image/jpeg;base64,...', // Add actual blur data URL
        alt: 'Main shooting range panorama',
        width: 1920,
        height: 1080,
        category: 'range',
        photographer: 'John Smith',
        year: 1978,
        description: 'Panoramic view of the main shooting range during summer.'
    },
    {
        id: '2',
        src: '/images/events1.jpg',
        blurDataUrl: 'data:image/jpeg;base64,...', // Add actual blur data URL
        alt: 'Annual shooting competition',
        width: 1600,
        height: 1200,
        category: 'events',
        photographer: 'Jane Doe',
        year: 1982,
        description: 'Winners of the 1982 annual shooting competition.'
    },
    // Add more sample photos
];

export function GalleryProvider({ children }: { children: ReactNode }) {
    const [photos] = useState<PhotoMetadata[]>(samplePhotos);
    const [selectedPhoto, setSelectedPhoto] = useState<PhotoMetadata | null>(null);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState<'date' | 'photographer'>('date');

    return (
        <GalleryContext.Provider
            value={{
                photos,
                selectedPhoto,
                setSelectedPhoto,
                filter,
                setFilter,
                sortBy,
                setSortBy
            }}
        >
            {children}
        </GalleryContext.Provider>
    );
}

export function useGallery() {
    const context = useContext(GalleryContext);
    if (context === undefined) {
        throw new Error('useGallery must be used within a GalleryProvider');
    }
    return context;
} 