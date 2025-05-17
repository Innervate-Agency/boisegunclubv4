/**
 * Utility functions for date formatting and manipulation
 * specific to the Boise Gun Club website
 */

/**
 * Formats a date string into a more readable format for display
 * @param dateString - Date string in format YYYY-MM-DD
 * @param includeYear - Whether to include the year in the output
 * @returns Formatted date string (e.g., "November 15, 2023" or "November 15")
 */
export function formatEventDate(dateString: string, includeYear: boolean = true): string {
  const date = new Date(dateString);
  
  // Format options
  const options: Intl.DateTimeFormatOptions = {
    month: 'long', 
    day: 'numeric'
  };
  
  if (includeYear) {
    options.year = 'numeric';
  }
  
  return date.toLocaleDateString('en-US', options);
}

/**
 * Checks if an event is upcoming (today or in the future)
 * @param dateString - Date string in format YYYY-MM-DD
 * @returns boolean indicating if the event is upcoming
 */
export function isUpcomingEvent(dateString: string): boolean {
  const eventDate = new Date(dateString);
  eventDate.setHours(0, 0, 0, 0); // Start of the day
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today
  
  return eventDate >= today;
}

/**
 * Gets the relative time description for an event (e.g., "In 5 days", "Tomorrow", "Today")
 * @param dateString - Date string in format YYYY-MM-DD
 * @returns String describing when the event is scheduled relative to today
 */
export function getRelativeEventTime(dateString: string): string {
  const eventDate = new Date(dateString);
  eventDate.setHours(0, 0, 0, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays > 1) return `In ${diffDays} days`;
  if (diffDays === -1) return "Yesterday";
  return `${Math.abs(diffDays)} days ago`;
}
