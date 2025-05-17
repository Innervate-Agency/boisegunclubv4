'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDaysIcon, ClockIcon, MapPinIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ParticleAnimation = dynamic(() => import('@/components/effects/ParticleAnimation'), { ssr: false });

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  repeats?: string;
  location: string;
  description: string;
  category: string;
  image: string;
  detailsLink?: string;
}

const placeholderEvents: Event[] = [
  {
    id: '1',
    title: "Summer Kick-off Trap Tournament",
    date: "June 15, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Main Trap Range",
    description: "Join us for our annual Summer Kick-off Trap Tournament! 100 targets, multiple classes, and prizes.",
    category: "Competition",
    image: '/images/events.jpg', // Placeholder, replace with actual: /images/events/trap-tournament.jpg
    detailsLink: '/events/summer-trap-2025'
  },
  {
    id: '2',
    title: "Introduction to Skeet Shooting Clinic",
    date: "July 6, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Skeet Field 3",
    description: "New to skeet? This clinic covers the basics, safety, and etiquette. Loaner shotguns available.",
    category: "Training",
    image: '/images/training.jpg', // Placeholder, replace with actual: /images/events/skeet-clinic.jpg
    detailsLink: '/events/skeet-clinic-july-2025'
  },
  {
    id: '3',
    title: "Member Appreciation BBQ & Fun Shoot",
    date: "August 10, 2025",
    time: "12:00 PM - 5:00 PM",
    location: "Clubhouse & Range Complex",
    description: "A day of fun shoots, great food, and camaraderie for our valued members and their families.",
    category: "Social",
    image: '/images/hero-bg.webp', // Placeholder, replace with actual: /images/events/member-bbq.jpg
  },
  {
    id: '4',
    title: "Steel Challenge Practice Night",
    date: "Upcoming Wednesdays",
    repeats: "Every Wednesday",
    time: "6:00 PM - 9:00 PM",
    location: "Action Pistol Bays",
    description: "Hone your speed and accuracy at our weekly Steel Challenge practice sessions. All skill levels welcome.",
    category: "Practice",
    image: '/images/range1.jpg', // Placeholder, replace with actual: /images/events/steel-challenge.jpg
  },
  {
    id: '5',
    title: "Advanced Sporting Clays Workshop",
    date: "September 21-22, 2025",
    time: "9:00 AM - 5:00 PM (Both Days)",
    location: "Sporting Clays Course",
    description: "Take your sporting clays game to the next level with this intensive two-day workshop led by a master-class instructor.",
    category: "Training",
    image: '/images/shotgun1.jpg', // Placeholder, replace with actual: /images/events/sporting-clays-workshop.jpg
    detailsLink: '/events/advanced-sporting-clays-sept-2025'
  },
];

const EventCard: React.FC<{ event: Event, index: number }> = ({ event, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.15, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-neutral-800/60 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-neutral-700/80 flex flex-col group hover:border-[var(--accent-primary)]/70 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[var(--accent-primary)]/20"
    >
      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        <Image 
          src={event.image} 
          alt={event.title} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <span className="absolute top-3 right-3 bg-[var(--accent-primary)]/90 text-white text-xs font-semibold px-3 py-1 rounded-full font-['Museo'] tracking-wide">
          {event.category}
        </span>
      </div>

      <div className="p-5 md:p-6 flex-grow flex flex-col">
        <h3 className="text-xl md:text-2xl font-bold font-['Heading_Pro_Trial'] text-white mb-2 leading-tight group-hover:text-[var(--accent-primary)] transition-colors duration-300">
          {event.title}
        </h3>
        
        <div className="space-y-2 text-sm text-neutral-300 font-['Museo'] mb-4">
          <div className="flex items-center">
            <CalendarDaysIcon className="w-4 h-4 mr-2 text-[var(--accent-secondary)]" />
            <span>{event.date}{event.repeats ? <span className="text-neutral-400"> ({event.repeats})</span> : ''}</span>
          </div>
          {event.time && (
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-2 text-[var(--accent-secondary)]" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-2 text-[var(--accent-secondary)]" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-neutral-400 font-['Museo'] text-sm leading-relaxed mb-5 flex-grow">
          {event.description}
        </p>

        {event.detailsLink ? (
          <Link href={event.detailsLink} legacyBehavior>
            <a className="mt-auto inline-flex items-center justify-center text-sm font-semibold font-['Heading_Pro_Trial'] text-[var(--accent-primary)] hover:text-white bg-neutral-700/50 hover:bg-[var(--accent-primary)]/80 px-5 py-2.5 rounded-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[var(--accent-primary)]/30">
              View Details <ChevronRightIcon className="w-4 h-4 ml-1.5 transform transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Link>
        ) : (
          <div className="mt-auto h-[42px]"></div> // Placeholder for consistent card height if no button
        )}
      </div>
    </motion.div>
  );
};

const EventsPage: React.FC = () => {
  const pageTitle = "Upcoming Events";

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" }
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 text-white overflow-hidden">
      <ParticleAnimation />
      
      <motion.header 
        className="relative py-24 md:py-32 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/events.jpg')" }} // Consider a specific events header image
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 container mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold font-['Refrigerator_Deluxe'] tracking-tight text-shadow-lg"
            variants={sectionVariants} custom={0}
          >
            {pageTitle}
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-['Museo']"
            variants={sectionVariants} custom={1}
          >
            Stay up-to-date with all the competitions, training sessions, and social gatherings at Boise Gun Club.
          </motion.p>
        </div>
      </motion.header>

      <main className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Add filtering/sorting options here in the future */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {placeholderEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {placeholderEvents.length === 0 && (
          <motion.div 
            initial={{opacity: 0, y: 20}} animate={{opacity:1, y: 0}} transition={{duration: 0.5}}
            className="text-center py-12 text-neutral-400 font-['Museo'] text-lg"
          >
            <p>No upcoming events at the moment. Please check back soon!</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default EventsPage;
