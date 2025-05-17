import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Photo Gallery | Boise Gun Club',
    description: 'Browse through our collection of historical and recent photos from Boise Gun Club events and activities.',
};

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 