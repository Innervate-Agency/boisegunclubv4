'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ParticleAnimation from '@/components/effects/ParticleAnimation';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const MembershipPage: React.FC = () => {
  const pageTitle = "Become a Member";
  const annualFee = 75;
  const standardRoundPrice = 8;
  const memberRoundPrice = 6;
  const savingsPerRound = standardRoundPrice - memberRoundPrice;

  const benefits = [
    { 
      title: "Exclusive Event Access", 
      description: "Participate in member-only tournaments, leagues, and unique fun shoots like our popular 'glow shoots'." 
    },
    { 
      title: "Skill Enhancement Discounts", 
      description: "Receive special pricing on advanced training courses, guest instructor workshops, and firearm safety refreshers." 
    },
    { 
      title: "Community & Voice", 
      description: "Join a passionate community, attend club meetings, volunteer for initiatives, and help shape the club's future." 
    },
    { 
      title: "Guest Privileges", 
      description: "Bring friends and family along with discounted guest rates or a set number of complimentary guest passes annually." 
    },
    { 
      title: "Club Newsletter", 
      description: "Stay informed with regular updates on club news, upcoming events, member achievements, and important announcements." 
    },
    { 
      title: "Pro Shop Savings", 
      description: "Enjoy discounts on ammunition, shooting accessories, cleaning supplies, and official Boise Gun Club merchandise." 
    },
    { 
      title: "Support Our Legacy", 
      description: "Your membership directly contributes to the maintenance, improvement, and long-term preservation of our historic club." 
    },
  ];

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
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 text-white overflow-hidden">
      <ParticleAnimation />
      
      {/* Header Section */}
      <motion.header 
        className="relative py-24 md:py-32 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/membership.jpg')" }}
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
            Join the Boise Gun Club family and unlock a world of benefits, savings, and community. While our ranges are open to the public, membership offers the best value and experience.
          </motion.p>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 space-y-48 md:space-y-64">
        {/* Core Offer Section */}
        <motion.section 
          className="bg-neutral-800/50 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl border border-neutral-700"
          variants={sectionVariants} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold font-['Heading_Pro_Trial'] text-[#F25D27] mb-6">
            Membership At a Glance
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-5xl font-bold text-white">${annualFee}<span className="text-xl font-normal text-neutral-400">/year</span></p>
              <p className="mt-2 text-neutral-300 font-['Museo']">
                Enjoy significant savings on every visit. Members pay just ${memberRoundPrice} per round of Skeet or Trap (25 shots), compared to the standard ${standardRoundPrice} – that's a ${savingsPerRound} saving per round!
              </p>
            </div>
            <div className="bg-neutral-700/70 p-6 rounded-lg text-center">
              <p className="text-lg font-['Museo'] text-neutral-300">Non-Member Price: <span className="font-bold text-white">${standardRoundPrice}/round</span></p>
              <p className="text-2xl font-bold font-['Museo'] text-[#F25D27] my-2">Member Price: <span className="text-white">${memberRoundPrice}/round</span></p>
              <p className="text-sm font-['Museo'] text-neutral-400">(Skeet/Trap - 25 shots)</p>
            </div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          variants={sectionVariants} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold font-['Heading_Pro_Trial'] text-center text-[#F25D27] mb-12">
            More Than Just Savings: Unlock Exclusive Perks
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="bg-neutral-800/50 backdrop-blur-md p-6 rounded-lg shadow-xl border border-neutral-700 hover:shadow-[#F25D27]/30 hover:border-[#F25D27]/50 transition-all duration-300 transform hover:-translate-y-1"
                variants={sectionVariants} custom={index}
              >
                <h3 className="text-xl font-semibold font-['Heading_Pro_Trial'] text-[#F25D27] mb-3">{benefit.title}</h3>
                <p className="text-neutral-300 font-['Museo'] text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section 
          className="text-center py-12 bg-gradient-to-r from-[#F25D27]/80 to-[#FF8C00]/80 backdrop-blur-sm rounded-xl shadow-2xl border border-orange-400/50"
          variants={sectionVariants} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-['Refrigerator_Deluxe'] text-neutral-900 mb-6">
            Ready to Join?
          </h2>
          <p className="text-neutral-800 font-['Museo'] text-lg max-w-xl mx-auto mb-8">
            Become a part of the Boise Gun Club legacy today. Experience the best of shooting sports with unparalleled benefits and a welcoming community.
          </p>
          <motion.button 
            className="bg-neutral-900 text-white font-semibold font-['Heading_Pro_Trial'] py-3 px-8 rounded-lg shadow-md hover:bg-neutral-800 transition-colors duration-300 text-lg flex items-center justify-center mx-auto group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up for Membership 
            <ChevronRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
          <p className="mt-6 text-sm text-neutral-800/80 font-['Museo']">
            Have questions? Feel free to <a href="/contact" className="underline hover:text-neutral-900">contact us</a> for more information.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default MembershipPage;
