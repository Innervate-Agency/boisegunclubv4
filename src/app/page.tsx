'use client';

// Import necessary libraries and components
import { FC, useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import HeroSection from '../components/home/HeroSection';
import UpcomingEvents from '../components/home/UpcomingEvents';

// Dynamic imports for client-side only components
const ParticleAnimation = dynamic(() => import('../components/effects/ParticleAnimation'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none"></div>
});

const DividerClayParticles = dynamic(() => import('../components/effects/DividerClayParticles'), {
  ssr: false
});

// Import SmokeAnimation with dynamic loading
const SmokeAnimation = dynamic(() => import('../components/effects/SmokeAnimation'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none"></div>
});

// Add Gallery component import
import GalleryPreview from '../components/home/GalleryPreview';

// Sample data - replace with actual data from your API/backend
const upcomingEvents = [
    {
        id: 1,
        title: "Annual Championship",
        date: "2023-11-15",
        location: "Main Range",1
    },
    {
        id: 2,
        title: "Winter League",
        date: "2023-12-01",
        location: "Clubhouse",
    },
];      

// Gallery
const galleryItems = [
    {
        id: 1,
        src: "/images/gallery/clay-shooting-1.jpg",
        alt: "Championship Winner 1978",
        year: "1978"
    },
    {
        id: 2,
        src: "/images/gallery/clubhouse-vintage.jpg",
        alt: "Original Clubhouse",
        year: "1975"
    },
    {
        id: 3,
        src: "/images/gallery/trap-range.jpg",
        alt: "Trap Range Opening Day",
        year: "1982"
    },
    {
        id: 4,
        src: "/images/gallery/team-photo.jpg",
        alt: "Club Team",
        year: "1979"
    },
];

// Facility highlights
const facilityHighlights = [
    {
        title: "RANGES",
        icon: "/images/clay1.jpg",
        description: "Our facility features 10 trap fields, 5 skeet fields, and a 15-station sporting clays course, all equipped with state-of-the-art target throwing systems.",
        linkText: "Explore Our Ranges",
        link: "/ranges"
    },
    {
        title: "TRAINING",
        icon: "/images/shotgun1.jpg",
        description: "Professional instruction for all skill levels. From beginners to advanced competitors, our certified instructors will help you improve your technique.",
        linkText: "Training Programs",
        link: "/training"
    },
    {
        title: "COMPETITIONS",
        icon: "/images/range1.jpg",
        description: "We host ATA registered shoots, local competitions, and championship events throughout the year. Test your skills against the best in Idaho.",
        linkText: "Competition Schedule",
        link: "/competitions"
    }
];

// Club statistics
const clubStats = [
    { value: "125", label: "YEARS OF HISTORY" },
    { value: "250+", label: "ACTIVE MEMBERS" },
    { value: "15", label: "SHOOTING LANES" },
    { value: "30+", label: "ANNUAL EVENTS" }
];

// Featured testimonial
// This is placeholder data. Replace with dynamic content from an API or database if needed.
const testimonial = {
    quote: "The Boise Gun Club has been my second home for over 30 years. The community here is unmatched and the facilities are world-class.",
    name: "John Winchester",
    title: "Member Since 1992",
    image: "/images/members/john-winchester.jpg"
};

// Inline SmokeAnimation component removed - using dynamically imported component instead

// Glassmorphic facility highlight card
const FacilityCard: FC<{
    title: string;
    icon: string;
    description: string;
    linkText: string;
    link: string;
}> = ({ title, icon, description, linkText, link }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-md bg-white/90 border border-[var(--accent-primary)]/20 p-6 rounded shadow-lg relative overflow-hidden h-full glass-effect"
        >
            {/* Subtle grid pattern within glass panel */}
            <div className="absolute inset-0 bg-[url('/images/Grid/Grid (1).jpg')] bg-cover opacity-5 mix-blend-overlay pointer-events-none"></div>

            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0 border border-[var(--accent-primary)]/30">
                    <Image src={icon} alt={title} width={60} height={60} className="object-cover" />
                </div>
                <h3 className="text-xl text-[var(--text-primary)] font-refrigerator">{title}</h3>
            </div>

            <p className="text-[var(--text-secondary)] mb-4 text-sm font-['Museo']">{description}</p>

            <Link href={link} className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] font-['Refrigerator_Deluxe'] text-sm flex items-center">
                {linkText}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </motion.div>
    );
};

// Animated statistic component
const StatCard: FC<{ value: string; label: string }> = ({ value, label }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="text-center"
        >
            <motion.div
                className="text-4xl md:text-5xl font-bold text-[var(--accent-gold)] mb-1 font-['Refrigerator_Deluxe']"
                initial={{ y: 20 }}
                animate={isInView ? { y: 0 } : { y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {value}
            </motion.div>
            <div className="text-white text-sm font-['Museo']">{label}</div>
        </motion.div>
    );
};

const HomePage: FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const [bgColor, setBgColor] = useState('transparent');

    // Refs for section background changes (optional, if needed for complex effects)
    const heroRef = useRef<HTMLDivElement>(null);
    const eventsRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null); // Ref for GalleryPreview
    const facilitiesRef = useRef<HTMLDivElement>(null); // Ref for OurFacilities

    return (
        <main ref={mainRef} className="flex flex-col min-h-screen bg-gradient-to-b from-neutral-900 to-black text-white overflow-x-hidden">
            <div ref={heroRef}>
                <HeroSection />
            </div>
            
            <UpcomingEvents />

            {/* Gallery Preview Section */}
            <div ref={galleryRef}>
                <GalleryPreview galleryItems={galleryItems} />
            </div>

            {/* Placeholder for Our Facilities Section - to be implemented next */}
            {/* <div ref={facilitiesRef}>
                <OurFacilities highlights={facilityHighlights} />
            </div> */}

            {/* Placeholder for CTA Section */}
            {/* <CTASection /> */}
        </main>
    );
};

export default HomePage;
