"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerSections = [
    {
      title: "Explore",
      links: [
        { href: "/about", text: "About Us" },
        { href: "/ranges", text: "Our Ranges" },
        { href: "/membership", text: "Membership" },
        { href: "/events", text: "Events Calendar" },
        { href: "/gallery", text: "Club Gallery" },
        { href: "/contact", text: "Contact & Directions" },
      ],
    },
    {
      title: "Connect",
      links: [
        {
          href: "https://facebook.com/boisegunclub",
          text: "Facebook",
          icon: FaFacebookF,
        },
        {
          href: "https://instagram.com/boisegunclub",
          text: "Instagram",
          icon: FaInstagram,
        },
        {
          href: "https://twitter.com/boisegunclub",
          text: "Twitter",
          icon: FaTwitter,
        },
        {
          href: "https://youtube.com/boisegunclub",
          text: "YouTube",
          icon: FaYoutube,
        },
      ],
    },
    {
      title: "Contact Us",
      content: (
        <>
          <p className="mb-1">Boise Gun Club</p>
          <p className="mb-1">123 Gun Club Lane</p>
          <p className="mb-1">Boise, ID 837XX</p>
          <a
            href="tel:+12085551212"
            className="hover:text-[var(--accent-primary)] transition-colors"
          >
            (208) 555-1212
          </a>
          <br />
          <a
            href="mailto:info@boisegunclub.com"
            className="hover:text-[var(--accent-primary)] transition-colors"
          >
            info@boisegunclub.com
          </a>
        </>
      ),
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.footer
      className="bg-neutral-900 text-neutral-400 border-t-2 border-[var(--accent-primary)]/30 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {/* Subtle background pattern or effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <Image
          src="/images/bgcv3-shattered-clay.svg" // Replace with a suitable subtle pattern
          alt="Subtle background pattern"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10 md:mb-12">
          {/* Club Info / Logo */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 lg:col-span-1"
          >
            <Link href="/" legacyBehavior>
              <a className="inline-block mb-4">
                {/* Replace with actual logo if available, or styled text */}
                <h2 className="text-3xl font-bold text-white font-['Heading_Pro_Trial']">
                  Boise{" "}
                  <span className="text-[var(--accent-primary)]">Gun Club</span>
                </h2>
              </a>
            </Link>
            <p className="text-sm leading-relaxed font-['Museo']">
              Promoting safe and responsible firearm ownership, sportsmanship,
              and community since 1947.
            </p>
          </motion.div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <motion.div variants={itemVariants} key={index}>
              <h3 className="text-lg font-semibold text-white mb-4 font-['Heading_Pro_Trial'] tracking-wide">
                {section.title}
              </h3>
              {section.content ? (
                <div className="text-sm space-y-1 font-['Museo']">
                  {section.content}
                </div>
              ) : (
                <ul className="space-y-2 font-['Museo']">
                  {section.links?.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} legacyBehavior>
                        <a className="text-sm hover:text-[var(--accent-primary)] transition-colors duration-200 flex items-center group">
                          {link.icon && (
                            <link.icon className="w-4 h-4 mr-2.5 text-neutral-500 group-hover:text-[var(--accent-primary)] transition-colors duration-200" />
                          )}
                          {link.text}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar: Copyright and Back to Top */}
        <motion.div
          variants={itemVariants}
          className="border-t border-neutral-700/50 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm"
        >
          <p className="font-['Museo'] mb-4 md:mb-0">
            &copy; {currentYear} Boise Gun Club. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center text-neutral-400 hover:text-[var(--accent-primary)] transition-colors duration-200 font-['Museo']"
            aria-label="Back to top"
          >
            Back to Top
            <ArrowUpIcon className="w-5 h-5 ml-2 opacity-70 group-hover:opacity-100 transform transition-transform group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
