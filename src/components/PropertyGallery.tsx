import { useState, useEffect } from "react";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyGalleryProps {
  photos: string[];
  title: string;
}

export function PropertyGallery({ photos, title }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, photos.length]);

  return (
    <>
      {/* Grid Layout */}
      <div className="relative rounded-xl overflow-hidden shadow-md bg-[#EFECE4]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 aspect-16/10 md:aspect-21/9 max-h-[540px]">
          {/* Main Large Photo */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-2 relative h-full overflow-hidden cursor-pointer group"
          >
            <img
              src={photos[0]}
              alt={`${title} - Primary view`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 bg-[#142B40]/90 text-white text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-[#C6A56B]" />
                Enlarge View
              </span>
            </div>
          </div>

          {/* Right Sub-grid of Photos */}
          <div className="hidden md:grid col-span-2 grid-cols-2 gap-2 h-full">
            {photos.slice(1, 5).map((photo, i) => (
              <div
                key={photo}
                onClick={() => openLightbox(i + 1)}
                className="relative h-full overflow-hidden cursor-pointer group"
              >
                <img
                  src={photo}
                  alt={`${title} - View ${i + 2}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                {i === 3 && photos.length > 5 && (
                  <div className="absolute inset-0 bg-[#142B40]/75 backdrop-blur-xs flex items-center justify-center text-white font-semibold text-sm">
                    +{photos.length - 4} More Photos
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Floating "View all photos" button */}
        <Button
          type="button"
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-[#142B40] text-xs font-semibold px-4 py-2 rounded-md shadow-lg border border-[#E4E0D6] backdrop-blur-md flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Camera className="w-4 h-4 text-[#C6A56B]" />
          <span>View All {photos.length} Photos</span>
        </Button>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10 px-2 py-1">
            <div className="flex flex-col">
              <span className="font-editorial text-lg text-white font-medium">{title}</span>
              <span className="text-xs text-[#C6A56B]">
                Photo {currentIndex + 1} of {photos.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close photo viewer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Image with navigation buttons */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={prevPhoto}
              className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={photos[currentIndex]}
              alt={`${title} - Photo ${currentIndex + 1}`}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-md shadow-2xl transition-all duration-300 select-none"
            />

            <button
              onClick={nextPhoto}
              className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 max-w-4xl mx-auto">
            {photos.map((photo, i) => (
              <button
                key={photo}
                onClick={() => setCurrentIndex(i)}
                className={`relative w-16 h-12 rounded-sm overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  currentIndex === i
                    ? "border-[#C6A56B] scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

