import { useEffect } from "react";

/**
 * Custom hook to update the document title dynamically.
 * @param title The new title for the page.
 */
export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `Client | ${title}`; // Dynamically change the page title
  }, [title]); // Update the title whenever the `title` prop changes
};
