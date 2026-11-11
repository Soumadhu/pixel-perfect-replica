import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Navigation, ArrowUpRight, BedDouble, Bath, Square, Heart, Sparkles } from "lucide-react";
import { formatRent, type Rental } from "@/lib/rental-data";
import { useSavedRentals } from "@/hooks/useSavedRentals";

interface InteractiveMapProps {
  properties: Rental[];
  activeRegion?: "All" | "San Francisco" | "Ohio";
}

export function InteractiveMap({ properties, activeRegion = "All" }: InteractiveMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Rental | null>(
    properties[0] || null
  );
  const [region, setRegion] = useState<"All" | "San Francisco" | "Ohio">(activeRegion);
  const { isSaved, toggleSave } = useSavedRentals();

  const filtered = properties.filter((p) => {
    if (region === "All") return true;
    return p.city === region;
  });

  // Normalized coordinate points for stylized vector canvas
  const getPosition = (property: Rental) => {
    if (property.city === "San Francisco") {
      // SF approximate boundary: Lat ~37.75 to 37.81, Lng ~ -122.46 to -122.42
      const xPercent = ((property.coordinates.lng - (-122.46)) / 0.05) * 80 + 10;
      const yPercent = (1 - (property.coordinates.lat - 37.75) / 0.06) * 75 + 12;
      return { x: Math.max(10, Math.min(88, xPercent)), y: Math.max(12, Math.min(85, yPercent)) };
    } else {
      // Ohio approximate cluster (Columbus & Cleveland)
      const xPercent = ((property.coordinates.lng - (-83.15)) / 1.7) * 75 + 12;
      const yPercent = (1 - (property.coordinates.lat - 39.9) / 1.6) * 75 + 12;
      return { x: Math.max(12, Math.min(88, xPercent)), y: Math.max(12, Math.min(85, yPercent)) };
    }
  };

  return (
    <div className="w-full bg-[#EFECE4] rounded-xl overflow-hidden border border-[#E4E0D6] shadow-inner relative flex flex-col min-h-[560px]">
      {/* Top Map Control Bar */}
      <div className="bg-[#142B40] text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 z-10 border-b border-[#1D3A55]">
        <div className="flex items-center gap-2 text-xs">
          <Navigation className="w-4 h-4 text-[#C6A56B]" />
          <span className="font-semibold text-white">Interactive Geographic Explorer</span>
          <span className="text-[#F7F6F2]/60 hidden sm:inline">
            · {filtered.length} client residences mapped
          </span>
        </div>

        {/* Region switch tabs */}
        <div className="flex items-center gap-1 bg-[#0D1E2D] p-1 rounded-md text-xs">
          {(["All", "San Francisco", "Ohio"] as const).map((r) => (
            <button
              key={r}
              onClick={() => {
                setRegion(r);
                const first = properties.find((p) => r === "All" || p.city === r);
                if (first) setSelectedProperty(first);
              }}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                region === r
                  ? "bg-[#C6A56B] text-[#142B40] font-semibold"
                  : "text-[#F7F6F2]/80 hover:text-white"
              }`}
            >
              {r === "All" ? "All Regions" : r}
            </button>
          ))}
        </div>
      </div>

      {/* Map Graphic Canvas */}
      <div className="relative flex-1 w-full min-h-[460px] bg-[#E8E4DA] overflow-hidden select-none">
        {/* Subtle decorative grid lines and topography rings */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C6A56B" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
          {/* Subtle coastline contour curves */}
          <path
            d="M -50,150 Q 200,80 400,220 T 900,140 T 1400,280"
            fill="none"
            stroke="#142B40"
            strokeWidth="1.5"
            strokeOpacity="0.15"
            strokeDasharray="4,4"
          />
          <path
            d="M 50,450 Q 300,320 600,480 T 1100,380 T 1500,460"
            fill="none"
            stroke="#142B40"
            strokeWidth="1.5"
            strokeOpacity="0.15"
          />
        </svg>

        {/* Region Watermark label */}
        <div className="absolute top-6 left-6 pointer-events-none opacity-20">
          <span className="font-editorial text-5xl md:text-7xl font-bold text-[#142B40] uppercase tracking-wider block">
            {region === "All" ? "CALIFORNIA · OHIO" : region.toUpperCase()}
          </span>
          <span className="text-xs font-semibold tracking-widest text-[#142B40] uppercase">
            PUBLIC AREA LOCATION MAP
          </span>
        </div>

        {/* Pins for each filtered property */}
        {filtered.map((property) => {
          const isSelected = selectedProperty?.slug === property.slug;
          const pos = getPosition(property);

          return (
            <div
              key={property.slug}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => setSelectedProperty(property)}
                className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-md transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#142B40] text-[#C6A56B] scale-110 ring-4 ring-[#C6A56B]/40 z-30"
                    : "bg-white text-[#142B40] hover:bg-[#142B40] hover:text-white hover:scale-105"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-[#C6A56B]" : "text-[#142B40] group-hover:text-[#C6A56B]"}`} />
                <span className="text-xs font-bold font-display">{formatRent(property.price)}</span>
              </button>

              {/* Ping effect when selected */}
              {isSelected && (
                <span className="absolute -inset-1 rounded-full bg-[#C6A56B]/30 animate-ping pointer-events-none" />
              )}
            </div>
          );
        })}

        {/* Floating Property Preview Card on Bottom-Right / Mobile Bottom */}
        {selectedProperty && (
          <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-30 animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-lg shadow-2xl border border-[#E4E0D6] p-4 overflow-hidden flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="w-24 h-20 rounded-md overflow-hidden bg-[#EFECE4] shrink-0 relative">
                  <img
                    src={selectedProperty.photos[0]}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase">
                    {selectedProperty.city === "San Francisco" ? "SF" : "OH"}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {selectedProperty.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSave(selectedProperty.slug, selectedProperty.title)}
                      className="text-[#57616C] hover:text-[#C6A56B] p-1"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isSaved(selectedProperty.slug) ? "fill-[#C6A56B] text-[#C6A56B]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-[#142B40] truncate mt-1">
                    {selectedProperty.title}
                  </h4>
                  <p className="text-[11px] text-[#57616C] truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#C6A56B] shrink-0" />
                    {selectedProperty.neighborhood}
                  </p>
                  <p className="text-sm font-bold font-display text-[#142B40] mt-1">
                    {formatRent(selectedProperty.price)}
                    <span className="text-[10px] text-[#57616C] font-normal"> / mo</span>
                  </p>
                </div>
              </div>

              {/* Specs & Link */}
              <div className="pt-2 border-t border-[#E4E0D6] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-[11px] text-[#57616C]">
                  <span>{selectedProperty.beds} bd</span>
                  <span>·</span>
                  <span>{selectedProperty.baths} ba</span>
                  <span>·</span>
                  <span>{selectedProperty.sqft} sqft</span>
                </div>

                <Link
                  to="/property/$slug"
                  params={{ slug: selectedProperty.slug }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#142B40] hover:text-[#C6A56B] transition-colors"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Public location safety banner */}
        <div className="absolute bottom-4 left-4 hidden md:flex items-center gap-2 bg-[#142B40]/80 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-md pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A56B]" />
          <span>Approximate public neighborhood coordinates for privacy</span>
        </div>
      </div>
    </div>
  );
}

