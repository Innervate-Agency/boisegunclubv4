'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/ui/ThemeContext';
import { NavigationProvider } from '@/components/navigation/NavigationContext';
import NavBar from '@/components/navigation/NavBar';
import Footer from '@/components/layout/Footer';
import AccessibilityFAB from '@/components/ui/AccessibilityFAB';
import './globals.css';
import './fonts.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false); // Correctly declared useState

  useEffect(() => {
    setMounted(true);
    // Apply theme class based on system preference - client-side only
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // The suppressHydrationWarning is crucial for preventing hydration mismatch errors
  // Any client-side-only rendering should be conditional on mounted state
  return (
    <html lang="en" className={`h-full font-body`} suppressHydrationWarning={true}>
      <head>
        {/* Adobe Fonts script - this is more reliable than CSS link */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(d) {
              var config = {
                kitId: 'gly5pnr',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `
        }} />

        {/* Preconnect to Adobe Fonts domain */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.adobe.com" crossOrigin="anonymous" />

        {/* Fallback font in case Adobe Fonts fails to load */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* Additional preload for critical assets */}
        <link rel="preload" as="image" href="/images/Grid/Grid (3).jpg" />
        <link rel="preload" as="image" href="/images/Smoke/Background_01.jpg" />
      </head>
      <body className="min-h-full flex flex-col font-body bg-[#121212] text-white" suppressHydrationWarning={true}>
        <ThemeProvider>
          <NavigationProvider>
            <NavBar />
            <main className="flex-grow pt-80">
              {children}
            </main>
            <Footer />
            {mounted && <AccessibilityFAB />} {/* FAB rendered conditionally */}
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
