import { useState, useEffect } from "react";
import { getSavedRentals, saveRental } from "@/lib/rental-data";
import { toast } from "sonner";

export function useSavedRentals() {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSavedSlugs(getSavedRentals());

    const handleSync = (event: Event) => {
      const detail = (event as CustomEvent<string[]>).detail;
      if (Array.isArray(detail)) {
        setSavedSlugs(detail);
      }
    };

    window.addEventListener("saved-rentals-change", handleSync);
    return () => window.removeEventListener("saved-rentals-change", handleSync);
  }, []);

  const toggleSave = (slug: string, title?: string) => {
    const isNowSaved = saveRental(slug);
    if (isNowSaved) {
      toast.success(title ? `Saved "${title}" to your favorites` : "Property saved to your favorites");
    } else {
      toast.info(title ? `Removed "${title}" from favorites` : "Property removed from favorites");
    }
  };

  const isSaved = (slug: string) => savedSlugs.includes(slug);

  return {
    savedSlugs,
    count: savedSlugs.length,
    toggleSave,
    isSaved,
  };
}

