import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useTime, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import ParticleAnimation for client-side rendering
const ParticleAnimation = dynamic(() => import('@/components/effects/ParticleAnimation'), { ssr: false });

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  year: string;
}

interface GalleryPreviewProps {
  galleryItems: GalleryItem[];
}

const GalleryPreview: FC<GalleryPreviewProps> = ({ galleryItems }) => {
  const time = useTime();
  const backgroundGradientRotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'conic-gradient(from var(--gradient-angle) at 50% 50%, #1a1a1a 0%, #2c2c2c 15%, #1a1a1a 30%, #111 50%, #1a1a1a 70%, #2c2c2c 85%, #1a1a1a 100%)',
          backgroundSize: '200% 200%',
          rotate: backgroundGradientRotate,
          opacity: 0.6,
        }}
        initial={{ '--gradient-angle': '0deg' }}
        animate={{ '--gradient-angle': '360deg' }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Subtle Particle Animation */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <ParticleAnimation
          colors={['#F28705', '#E85E27']}
          count={15}
          size={1}
          speed={0.1}
          className="opacity-5"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "circOut" }}
            className="font-['Clutch_Block'] text-5xl md:text-6xl tracking-wider mb-4 uppercase text-white relative inline-block"
          >
            Club <span className="text-[var(--accent-primary)]">Gallery</span>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent"></span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "circOut" }}
            className="text-white/70 max-w-2xl mx-auto mt-6 font-body text-lg"
          >
            Explore our rich history through these memorable moments
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3, ease: "circOut" }}
              className="relative overflow-hidden rounded-xl shadow-2xl group border border-white/10"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100 transition-opacity duration-500 group-hover:from-black/70 group-hover:via-black/40"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-5 w-full transition-all duration-500 transform group-hover:bottom-2">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-white text-xl font-['Refrigerator_Deluxe'] leading-tight mb-1 truncate group-hover:text-[var(--accent-primary)] transition-colors duration-300"
                >
                  {item.alt}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[var(--accent-gold)] text-sm font-body opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {item.year}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            href="/gallery" 
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-lg font-heading tracking-wider text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out overflow-hidden"
          >
            <span className="relative z-10">VIEW FULL GALLERY</span>
            <svg 
              className="w-5 h-5 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
