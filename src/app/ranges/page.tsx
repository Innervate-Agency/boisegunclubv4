'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import components that are client-side only
const ParticleAnimation = dynamic(() => import('@/components/effects/ParticleAnimation'), { ssr: false });

// Placeholder data for different ranges - replace with actual content
const rangeTypes = [
  {
    name: 'Trap Fields',
    image: '/images/gallery/trap-range.jpg', // Replace with actual image
    description: 'Our 10 professionally maintained trap fields are perfect for shooters of all levels. Equipped with automated voice release systems and high-quality targets, they provide an exceptional trap shooting experience.',
    features: ['10 Fields Available', 'ATA Standard Layouts', 'Automated Voice Release', 'Regularly Maintained'],
    link: '/ranges/trap' // Example link to a more detailed page or section
  },
  {
    name: 'Skeet Fields',
    image: '/images/events/steel-challenge.jpg', // Replace with actual image - using placeholder
    description: 'Challenge your skills on our 5 regulation skeet fields. Ideal for honing your accuracy and reaction time, our skeet ranges offer a classic shotgun sport experience.',
    features: ['5 Regulation Fields', 'High & Low Houses', 'Consistent Target Flight', 'Practice & Competition'],
    link: '/ranges/skeet'
  },
  {
    name: 'Sporting Clays Course',
    image: '/images/events/youth-shooting.jpg', // Replace with actual image - using placeholder
    description: 'Experience \"golf with a shotgun\" on our scenic 15-station sporting clays course. Designed to simulate various field shooting conditions, it offers a fun and challenging day out.',
    features: ['15 Unique Stations', 'Varied Target Presentations', 'Natural Terrain Course', 'Cart Paths Available'],
    link: '/ranges/sporting-clays'
  },
  {
    name: 'Practice & Patterning Range',
    image: '/images/range1.jpg', // Replace with actual image
    description: 'Fine-tune your shotgun and loads at our dedicated patterning range. Essential for understanding your equipment and improving your performance across all disciplines.',
    features: ['Safe Patterning Boards', 'Multiple Distances', 'Shotgun Check & Tuning', 'Improve Accuracy'],
    link: '/ranges/patterning'
  }
];

const RangesPage: FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-900 to-black text-white overflow-x-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleAnimation colors={['#F28705', '#E85E27']} count={25} size={1.3} speed={0.1} className="opacity-[0.07]" />
      </div>

      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'circOut' }}
        className="container mx-auto px-6 text-center mb-16 md:mb-24 relative z-10"
      >
        <h1 className="font-['Clutch_Block'] text-5xl md:text-7xl uppercase tracking-wider text-white relative inline-block leading-tight">
          Our <span className="text-[var(--accent-primary)]">Ranges</span>
        </h1>
        <div className="w-1/2 h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent mx-auto mt-4"></div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'circOut' }}
          className="text-white/70 max-w-3xl mx-auto mt-8 font-body text-lg md:text-xl"
        >
          Explore our world-class shotgun sports facilities, designed for safety, challenge, and enjoyment for shooters of all skill levels.
        </motion.p>
      </motion.header>

      <div className="container mx-auto px-6 relative z-10 space-y-48 md:space-y-64 pb-24">
        {rangeTypes.map((range, index) => (
          <motion.section 
            key={range.name}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'circOut', delay: 0.1 }}
            className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <motion.div 
              className="relative aspect-video md:aspect-[5/4] rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 group"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1}}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'circOut' }}
            >
              <Image 
                src={range.image} 
                alt={range.name} 
                layout="fill" 
                objectFit="cover" 
                className="transform transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-5 left-5 p-2 bg-black/50 backdrop-blur-sm rounded">
                <h3 className="font-['Refrigerator_Deluxe'] text-2xl text-white leading-tight">{range.name}</h3>
              </div>
            </motion.div>
            
            <div className={`${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
              <h2 className="font-['Clutch_Block'] text-3xl md:text-4xl text-[var(--accent-primary)] mb-6 uppercase tracking-wide">
                {range.name}
              </h2>
              <p className="font-body text-white/80 text-base md:text-lg leading-relaxed mb-6">
                {range.description}
              </p>
              <ul className="space-y-2 mb-8">
                {range.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 font-body text-white/70">
                    <svg className="w-5 h-5 text-[var(--accent-secondary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                href={range.link} 
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-transparent border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] rounded-lg font-heading tracking-wider text-sm shadow-md hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300 ease-in-out overflow-hidden transform hover:-translate-y-0.5"
              >
                <span className="relative z-10">Learn More</span>
                <svg className="w-4 h-4 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
          </motion.section>
        ))}

        {/* General Range Information / Safety Rules CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="text-center py-12 mt-16 bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-8 md:p-12"
        >
          <h2 className="font-['Clutch_Block'] text-3xl md:text-4xl text-white mb-6">
            Safety & <span className="text-[var(--accent-primary)]">Etiquette</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto font-body text-lg mb-8">
            The safety of our members and guests is paramount. Please familiarize yourself with our range rules and general firearm safety guidelines before your visit.
          </p>
          <Link 
            href="/safety-rules" // Replace with actual link to safety rules page
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg font-heading tracking-wider text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out overflow-hidden"
          >
            <span className="relative z-10">View Range Rules</span>
            <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
          </Link>
        </motion.section>

      </div>
    </div>
  );
};

export default RangesPage;
