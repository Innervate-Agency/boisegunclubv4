'use client';

import TemplatePage from '@/components/layout/TemplatePage';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/layout/Section';

export default function Page() {
  const page = {
    title: 'Club Rules & Safety Regulations',
    description: 'A comprehensive overview of the rules that ensure a safe and enjoyable environment for everyone.',
    sections: [
      {
        title: 'Core Firearm Safety Rules',
        subtitle: 'Everyone\'s Responsibility',
        description: `These rules are absolute and strictly enforced. 1. Always keep your firearm pointed in a safe direction. 2. Keep your action open and unloaded until you are on the shooting station and it is your turn to shoot. 3. Keep your finger off the trigger until ready to fire. 4. Approved eye and ear protection are mandatory for everyone on the grounds.`,
        link: '/emergency',
        linkText: 'View Emergency Procedures',
        imageUrl: '/images/events.webp'
      },
      {
        title: 'Ammunition & Equipment',
        subtitle: 'Shotgun Sports Only',
        description: `This is a shotgun-only facility. The use of rifles, pistols, or any ammunition other than lead or steel shot is strictly prohibited. Maximum shot size is 7.5 for lead and 6 for steel. Slugs and buckshot are not allowed under any circumstances. <br/><br/>Our Range Safety Officers are happy to inspect your equipment if you have any questions.`,
        link: '/contact',
        linkText: 'Contact a Range Officer',
        imageUrl: '/images/events.webp'
      }
    ]
  };

  return (
    <TemplatePage
      title={page.title}
      description={page.description}
    >
      <div className="space-y-0">
        {page.sections.map((section, index) => {
          const contentOrder = index % 2 === 1 ? 'md:order-first' : '';
          const background = index % 2 === 0 ? 'grid' : 'mist';

          return (
            <Section key={index} background={background}>
              <motion.div
                className="glass-mica rounded-2xl p-8 md:p-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className={`relative h-64 md:h-80 w-full rounded-lg overflow-hidden ${contentOrder}`}>
                    <Image src={section.imageUrl} alt={section.title} fill className="object-cover transform hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-3xl font-bold uppercase text-leonard-yellow mb-2">{section.title}</h2>
                    <h3 className="text-xl font-semibold text-gray-300 mb-4">{section.subtitle}</h3>
                    <div className="text-lg text-gray-200 mb-6 space-y-4" dangerouslySetInnerHTML={{ __html: section.description }} />
                    {section.link && (
                      <Link href={section.link} className="inline-block bg-lahoma-orange text-dark-bg font-bold py-2 px-6 rounded-lg hover:bg-leonard-yellow transition-colors duration-300">
                        {section.linkText}
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </Section>
          );
        })}
      </div>
    </TemplatePage>
  );
}