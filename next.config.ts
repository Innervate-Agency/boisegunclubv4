import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' use.typekit.net; style-src 'self' 'unsafe-inline' use.typekit.net; font-src 'self' use.typekit.net fonts.gstatic.com fonts.adobe.com data:; img-src 'self' data: blob: p.typekit.net;"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
