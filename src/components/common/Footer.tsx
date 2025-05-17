'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const socialLinks = [
    { name: 'Facebook', url: '#', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
    { name: 'Instagram', url: '#', icon: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z' },
    { name: 'Twitter', url: '#', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
];

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateEmail(email)) {
            // Handle newsletter signup
            console.log('Newsletter signup:', email);
            setEmail('');
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };

    return (
        <footer className="bg-[#212529] text-white py-8">
            <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
                {/* Left Column - Contact & Navigation */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-space-grotesk mb-3">Contact Us</h3>
                        <address className="not-italic text-base space-y-1 text-gray-300">
                            <p>Boise Gun Club</p>
                            <p>1234 Range Road</p>
                            <p>Boise, ID 83702</p>
                            <p>
                                <a href="tel:+12083451234" className="hover:text-accent transition-colors">
                                    (208) 345-1234
                                </a>
                            </p>
                            <p>
                                <a href="mailto:info@boisegungclub.com" className="hover:text-accent transition-colors">
                                    info@boisegungclub.com
                                </a>
                            </p>
                        </address>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3 footer-socials">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                className="text-gray-400 hover:text-accent transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={social.name}
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    style={{
                                        minWidth: '24px',
                                        maxWidth: '24px',
                                        minHeight: '24px',
                                        maxHeight: '24px',
                                        fontSize: '16px',
                                        lineHeight: 'normal'
                                    }}
                                >
                                    <path d={social.icon} />
                                </svg>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Right Column - Newsletter */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-space-grotesk mb-3">Stay Updated</h3>
                        <p className="text-gray-300 mb-4 text-base">
                            Subscribe to our newsletter for the latest events, matches, and club news.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setIsValidEmail(true);
                                    }}
                                    placeholder="Enter your email"
                                    className={`w-full px-3 py-2 bg-gray-800 border text-base ${isValidEmail ? 'border-gray-700' : 'border-red-500'
                                        } rounded-lg focus:outline-none focus:border-accent transition-colors`}
                                />
                                {!isValidEmail && (
                                    <p className="mt-1 text-red-500 text-sm">Please enter a valid email address</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-accent hover:bg-accentHover text-white rounded-lg transition-colors text-base"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="col-span-1 md:col-span-2 pt-6 mt-6 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Boise Gun Club. All rights reserved.
                        </p>
                        <nav>
                            <ul className="flex flex-wrap gap-4">
                                {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-accent transition-colors text-sm"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
} 
