'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import components that are client-side only
const ParticleAnimation = dynamic(() => import('@/components/effects/ParticleAnimation'), { ssr: false });

// Placeholder data - replace with actual content
const aboutStats = [
  { label: 'Founded', value: '1898' },
  { label: 'Members', value: '1200+' },
  { label: 'Acres', value: '320' },
  { label: 'Disciplines', value: 'Trap, Skeet, Sporting Clays' },
];

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Club President',
    image: '/images/team/john-doe.jpg', // Replace with actual image path
    bio: 'John has been a member for over 20 years and is passionate about promoting shotgun sports.'
  },
  {
    name: 'Jane Smith',
    role: 'Head Instructor',
    image: '/images/team/jane-smith.jpg', // Replace with actual image path
    bio: 'Jane is a certified NRA instructor with a knack for helping beginners find their footing.'
  },
  // Add more team members if desired
];

const AboutPage: FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-900 to-black text-white overflow-x-hidden">
      
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleAnimation colors={['#F28705', '#E85E27']} count={20} size={1.2} speed={0.15} className="opacity-5" />
      </div>

      {/* Page Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'circOut' }}
        className="container mx-auto px-6 text-center mb-16 md:mb-24 relative z-10"
      >
        <h1 className="font-['Clutch_Block'] text-5xl md:text-7xl uppercase tracking-wider text-white relative inline-block leading-tight">
          About <span className="text-[var(--accent-primary)]">Us</span>
        </h1>
        <div className="w-1/2 h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent mx-auto mt-4"></div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'circOut' }}
          className="text-white/70 max-w-3xl mx-auto mt-8 font-body text-lg md:text-xl"
        >
          Discover the rich history, vibrant community, and unwavering dedication that define the Boise Gun Club, Idaho's premier shotgun sports facility since 1898.
        </motion.p>
      </motion.header>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 relative z-10 space-y-48 md:space-y-64 pb-24">

        {/* Our Story Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <Image 
              src="/images/gallery/clubhouse-vintage.jpg" // Replace with a relevant historical image
              alt="Boise Gun Club Historic Clubhouse" 
              layout="fill" 
              objectFit="cover" 
              className="transform transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white font-['Refrigerator_Deluxe'] text-xl">Since 1898</div>
          </div>
          <div>
            <h2 className="font-['Clutch_Block'] text-3xl md:text-4xl text-[var(--accent-primary)] mb-6 uppercase tracking-wide">Our Enduring Legacy</h2>
            <p className="font-body text-white/80 text-base md:text-lg leading-relaxed mb-4">
              For over a century, the Boise Gun Club has been a cornerstone of the shooting sports community in Idaho. Founded in 1898, we have grown from a small group of enthusiasts into a thriving club with world-class facilities. Our commitment to safety, sportsmanship, and community has remained steadfast through the years.
            </p>
            <p className="font-body text-white/80 text-base md:text-lg leading-relaxed">
              We are proud of our heritage and excited about our future, continually striving to provide the best possible experience for our members and guests.
            </p>
          </div>
        </motion.section>

        {/* Mission & Values Section */}
        <motion.section
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="text-center bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-8 md:p-12"
        >
          <h2 className="font-['Clutch_Block'] text-3xl md:text-4xl text-[var(--accent-primary)] mb-8 uppercase tracking-wide">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8 font-body text-white/80 text-base md:text-lg">
            <div>
              <h3 className="font-['Refrigerator_Deluxe'] text-2xl text-white mb-3">Safety First</h3>
              <p>Promoting responsible firearm handling and a safe environment for all.</p>
            </div>
            <div>
              <h3 className="font-['Refrigerator_Deluxe'] text-2xl text-white mb-3">Sportsmanship</h3>
              <p>Fostering fair play, respect, and camaraderie among shooters.</p>
            </div>
            <div>
              <h3 className="font-['Refrigerator_Deluxe'] text-2xl text-white mb-3">Community</h3>
              <p>Building a welcoming and inclusive club for all shotgun enthusiasts.</p>
            </div>
          </div>
        </motion.section>

        {/* Club Stats Section - Animated Counters */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {aboutStats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: 'circOut' }}
                className="bg-white/5 p-6 rounded-lg shadow-lg border border-white/10"
              >
                <div className="font-['Clutch_Block'] text-4xl md:text-5xl text-[var(--accent-primary)] mb-2">
                  {stat.value}
                </div>
                <div className="font-body text-white/70 text-sm md:text-base uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Placeholder for Team Section - if desired */}
        {/* 
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="text-center"
        >
          <h2 className="font-['Clutch_Block'] text-3xl md:text-4xl text-[var(--accent-primary)] mb-12 uppercase tracking-wide">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: 'circOut' }}
                className="bg-gradient-to-br from-black/20 to-black/40 p-6 rounded-xl shadow-xl border border-white/10"
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden mb-6 border-2 border-[var(--accent-primary)]">
                  <Image src={member.image} alt={member.name} layout="fill" objectFit="cover" />
                </div>
                <h3 className="font-['Refrigerator_Deluxe'] text-2xl text-white mb-1">{member.name}</h3>
                <p className="text-[var(--accent-secondary)] font-semibold mb-3">{member.role}</p>
                <p className="font-body text-white/70 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        */}

        {/* Call to Action / Visit Us Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'circOut' }}
          className="text-center py-12"
        >
          <h2 className="font-['Clutch_Block'] text-3xl md:text-4xl text-white mb-6">
            Become a Part of Our <span className="text-[var(--accent-primary)]">Story</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto font-body text-lg mb-8">
            Whether you're a seasoned shooter or new to the sport, we invite you to visit us, explore our facilities, and join our welcoming community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/membership" 
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg font-heading tracking-wider text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10">Join The Club</span>
              <svg className="w-5 h-5 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
            <Link 
              href="/contact" 
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] rounded-lg font-heading tracking-wider text-base shadow-md hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300 ease-in-out overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10">Contact Us</span>
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default AboutPage;

