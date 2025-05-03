
/**
 * Utilities for sharing content from the Persona Future Builder app
 */

/**
 * Generate a shareable URL for a community discussion
 * 
 * @param discussionId - The ID of the discussion to share
 * @returns The complete shareable URL for the discussion
 */
export const generateShareableUrl = (discussionId: string): string => {
  // Get the base URL (removing any route paths)
  const baseUrl = window.location.origin;
  
  // Create the full shareable URL
  return `${baseUrl}/community?discussion=${discussionId}`;
};

/**
 * Share content using the Web Share API if available, or fallback to copying to clipboard
 * 
 * @param title - The title to share
 * @param text - The text description to share
 * @param url - The URL to share
 * @returns Promise that resolves once the share action is complete
 */
export const shareContent = async (
  title: string, 
  text: string, 
  url: string
): Promise<void> => {
  // Check if the Web Share API is supported
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      
      return;
    } catch (error) {
      // If the user cancels the share operation, it's not an error we need to handle
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing content:', error);
      }
    }
  }
  
  // Fallback: Copy the URL to clipboard
  try {
    await navigator.clipboard.writeText(url);
    console.log('Link copied to clipboard');
    return;
  } catch (error) {
    console.error('Failed to copy link to clipboard:', error);
  }
};

/**
 * Share content directly to WhatsApp
 * 
 * @param text - The text to share
 * @param url - The URL to share
 */
export const shareToWhatsApp = (text: string, url: string): void => {
  // Format text and URL for WhatsApp
  const encodedText = encodeURIComponent(`${text} ${url}`);
  
  // Generate WhatsApp sharing URL
  const whatsappUrl = `https://wa.me/?text=${encodedText}`;
  
  // Open WhatsApp in a new window
  window.open(whatsappUrl, '_blank');
};
