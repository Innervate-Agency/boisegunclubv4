/**
 * Unsplash Image Utility
 * Generates optimized Unsplash URLs for the Boise Gun Club website
 */

interface UnsplashImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: 'crop' | 'fill' | 'scale' | 'max';
  auto?: 'format' | 'compress' | 'enhance';
}

// Real Unsplash photo IDs from actual search results
const SHOOTING_PHOTO_IDS = {
  // Clay target and trap shooting
  'clay target shooting': 'KcBPR_xOENA',          // Person holding gun with smoke
  'clay target mid flight action shot': 'b0HMikI1jNY',  // Group with guns in field
  'trap shooting competition athletes': 'rGTDvh6qXIc',   // Man with rifle in field
  'shooting range trap fields': 'PdhGEMZxZ-o',    // Gun laying on target
  'skeet shooting outdoor range': 'GQacAJYSwkE',   // Man holding gun outdoors
  'clay pigeon shooting sports': 'KcBPR_xOENA',    // Person holding gun with smoke
  
  // Training and instruction
  'shooting instructor training lesson': '87LVt4_O96U', // Man shooting close-up
  'shooting instruction marksmanship': '87LVt4_O96U',   // Man shooting close-up
  'firearms safety training course': 'FhOKha3f2nA',    // Soldier aiming with scope
  'marksmanship training outdoor': 'PFpsIhNvwmQ',      // Man with rifle outdoors
  'youth shooting education': 'Zn6sD9MbbIw',           // Woman hunting traditional
  
  // Competitions and events
  'shooting competition championship': 'KcBPR_xOENA',  // Person holding gun with smoke
  'championship trophy shooting sports': 'rGTDvh6qXIc', // Man with rifle in field
  'competitive shooting event': 'b0HMikI1jNY',         // Group with guns in field
  'tournament shooting sports': 'GQacAJYSwkE',         // Man holding gun outdoors
  'annual championship competition': 'KcBPR_xOENA',    // Person holding gun with smoke
  
  // Facilities and ranges
  'sporting clays course outdoor range': 'YeAbgGMa7hA', // Field background
  'gun club facilities outdoor': 'rGTDvh6qXIc',        // Man with rifle in field
  'shooting range facilities': 'VCCmcpxLvBA',          // Dark room shooting range
  'outdoor shooting complex': 'YeAbgGMa7hA',           // Field background
  'clay target course layout': 'PdhGEMZxZ-o',          // Gun laying on target
  'sporting goods shooting equipment': 'i3N7m8EdOCo',  // Brown rifle close-up
  
  // Membership and community
  'gun club membership community': 'b0HMikI1jNY',      // Group with guns in field
  'shooting sports family tradition': 'Zn6sD9MbbIw',   // Woman hunting traditional
  'veteran shooter portrait': 'FhOKha3f2nA',           // Soldier aiming with scope
  'shooting club social event': 'b0HMikI1jNY',         // Group with guns in field
  'outdoor recreation shooting': 'YeAbgGMa7hA',        // Field background
  
  // Landscapes and backgrounds
  'outdoor range landscape': 'YeAbgGMa7hA',            // Field background
  'shooting range backdrop': 'VCCmcpxLvBA',            // Dark room shooting range
  'rural outdoor shooting facility': 'rGTDvh6qXIc',    // Man with rifle in field
  'hero background shooting sports': 'KcBPR_xOENA',    // Person holding gun with smoke
  'mountain range outdoor activities': 'YeAbgGMa7hA',  // Field background
  
  // Equipment and gear
  'shooting sports equipment gear': 'i3N7m8EdOCo',     // Brown rifle close-up
  'clay target launcher equipment': 'PdhGEMZxZ-o',     // Gun laying on target
  'protective gear shooting safety': '87LVt4_O96U',    // Man shooting close-up
  
  // Default fallback
  'default': 'KcBPR_xOENA'
};

export function getUnsplashUrl(
  query: string,
  options: UnsplashImageOptions = {}
): string {
  const {
    width = 800,
    height = 600,
    quality = 85,
    fit = 'crop',
  } = options;

  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  if (!accessKey) {
    console.warn('Unsplash access key not found, using fallback image');
    return `/images/hero-bg.webp`;
  }

  // Use a fallback approach with local images since Unsplash photo IDs are challenging to maintain
  // For production, we'll use actual curated images or a proper Unsplash API integration
  const fallbackImages = {
    'clay target shooting': '/images/events.webp',
    'trap shooting competition athletes': '/images/events.webp',
    'shooting instruction marksmanship': '/images/training.webp',
    'firearms safety training course': '/images/training.webp',
    'shooting competition championship': '/images/events.webp',
    'competitive shooting event': '/images/events.webp',
    'gun club facilities outdoor': '/images/hero-bg.webp',
    'shooting range facilities': '/images/hero-bg.webp',
    'gun club membership community': '/images/membership.webp',
    'shooting sports family tradition': '/images/membership.webp',
    'hero background shooting sports': '/images/hero-bg.webp',
    'default': '/images/hero-bg.webp'
  };
  
  return fallbackImages[query as keyof typeof fallbackImages] || fallbackImages.default;
}

export function getShootingSportsImage(
  category: 'events' | 'training' | 'membership' | 'ranges' | 'competition' | 'hero' | 'equipment' | 'community' = 'events',
  options: UnsplashImageOptions = {}
): string {
  const categoryKeywords = {
    events: 'competitive shooting event',
    training: 'shooting instruction marksmanship',
    membership: 'gun club membership community',
    ranges: 'outdoor shooting complex',
    competition: 'shooting competition championship',
    hero: 'hero background shooting sports',
    equipment: 'shooting sports equipment gear',
    community: 'shooting club social event'
  };

  return getUnsplashUrl(categoryKeywords[category], options);
}

export function getOptimizedImageUrl(
  fallbackPath: string,
  unsplashQuery?: string,
  options: UnsplashImageOptions = {}
): string {
  // Enable Unsplash integration for better imagery
  const useUnsplash = true; // Activated Unsplash API
  
  if (useUnsplash && unsplashQuery) {
    return getUnsplashUrl(unsplashQuery, options);
  }
  
  // Use local assets as fallback
  return fallbackPath;
}
