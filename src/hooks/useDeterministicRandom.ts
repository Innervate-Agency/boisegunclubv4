'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

// A seeded random number generator for consistent values 
// between server and client renders
const seededRandom = (seed: number): () => number => {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

export const useDeterministicRandom = (
  count: number,
  seed: number = 42
): {
  getRandomValue: (index: number, min: number, max: number) => number;
  getRandomFromArray: <T>(index: number, array: T[]) => T;
  isClient: boolean;
} => {
  // Track if we're on the client side to handle animations
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []); // Runs once after initial mount
  
  // Memoize the random number generator instance based on the seed
  const generator = useMemo(() => {
    return seededRandom(seed);
  }, [seed]);
  
  // Memoize the array of pre-generated random values
  const randomValues = useMemo(() => {
    const values: number[] = [];
    // The 'count' parameter determines the size of the pre-generated randomValues array.
    // Original code used count * 10.
    for (let i = 0; i < count * 10; i++) {
      values.push(generator());
    }
    return values;
  }, [generator, count]); // Depends on the memoized generator and count
  
  // Get a random value for a specific index within a range
  const getRandomValue = useCallback((index: number, min: number, max: number): number => {
    const baseIndex = index * 10;
    // Ensure index is within bounds for which randomValues were populated
    if (index >= 0 && index < count && baseIndex >= 0 && baseIndex < randomValues.length) {
      return min + randomValues[baseIndex] * (max - min);
    }
    // Fallback if index is out of expected range
    return min; 
  }, [randomValues, count]); // Depends on memoized randomValues and count
  
  // Get a random item from an array based on the index
  const getRandomFromArray = useCallback(<T,>(index: number, array: T[]): T => {
    const baseIndex = index * 10 + 5; // offset by 5 to use different values
    if (index >= 0 && index < count && baseIndex >= 0 && baseIndex < randomValues.length && array.length > 0) {
      const randomIndex = Math.floor(randomValues[baseIndex] * array.length);
      return array[Math.min(randomIndex, array.length - 1)]; // Ensure randomIndex is in bounds
    }
    // Fallback to first item if index is out of range or array is empty
    return array[0]; 
  }, [randomValues, count]); // Depends on memoized randomValues and count
  
  return { getRandomValue, getRandomFromArray, isClient };
};

export default useDeterministicRandom;
