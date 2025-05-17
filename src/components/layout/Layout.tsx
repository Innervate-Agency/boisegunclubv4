'use client';

import NavBar from '../navigation/NavBar';
import { useNavigation } from '../navigation/NavigationContext';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { clubAnnouncements } = useNavigation();

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main
                className={`flex-grow ${clubAnnouncements.length > 0
                    ? 'pt-32 md:pt-36' // Extra padding when announcements are showing
                    : 'pt-24 md:pt-28' // Normal padding
                    }`}
            >
                {children}
            </main>
            <footer className="bg-kent-slate-gray text-chester-white p-4">
                <div className="container mx-auto">
                    © {new Date().getFullYear()} Boise Gun Club
                </div>
            </footer>
        </div>
    );
}
