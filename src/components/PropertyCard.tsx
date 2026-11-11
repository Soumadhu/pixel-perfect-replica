import { Link } from "@tanstack/react-router";
import { Heart, MapPin, BedDouble, Bath, Square, ArrowUpRight, Sparkles } from "lucide-react";
import { formatRent, type Rental } from "@/lib/rental-data";
import { useSavedRentals } from "@/hooks/useSavedRentals";

interface PropertyCardProps {
  property: Rental;
  featured?: boolean;
}

export function PropertyCard({ property, featured = false }: PropertyCardProps) {
  const { isSaved, toggleSave } = useSavedRentals();
  const saved = isSaved(property.slug);

  const statusColors = {
    Available: "bg-emerald-950/80 text-emerald-300 border-emerald-800/50",
    "Coming soon": "bg-[#142B40]/90 text-[#C6A56B] border-[#C6A56B]/40",
    Pending: "bg-amber-950/80 text-amber-300 border-amber-800/50",
  };

  return (
    <article
      className={`group bg-white rounded-lg overflow-hidden border border-[#E4E0D6] hover:border-[#142B40]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col ${
        featured ? "md:col-span-1" : ""
      }`}
    >
      {/* Photo wrapper */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EFECE4]">
        <Link
          to="/property/$slug"
          params={{ slug: property.slug }}
          className="block w-full h-full focus:outline-hidden"
          aria-label={`View details for ${property.title}`}
        >
          <img
            src={property.photos[0]}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Gradient shadow overlay for badge readability */}
        <div className="absolute inset-x-0 top-0 h-20 bg-linear-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />

        {/* Top badges: Status & Featured */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
              statusColors[property.status] || statusColors.Available
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                property.status === "Available"
                  ? "bg-emerald-400 animate-pulse"
                  : property.status === "Coming soon"
                  ? "bg-[#C6A56B]"
                  : "bg-amber-400"
              }`}
            />
            {property.status}
          </span>

          {property.featured && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-[#142B40] backdrop-blur-md shadow-xs">
              <Sparkles className="w-3 h-3 text-[#C6A56B]" />
              Featured
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSave(property.slug, property.title);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md ${
            saved
              ? "bg-[#142B40] text-[#C6A56B] shadow-md scale-105"
              : "bg-white/85 text-[#252B32] hover:bg-white hover:text-[#142B40] hover:scale-110 shadow-xs"
          }`}
          aria-label={saved ? "Remove from saved properties" : "Save property"}
          title={saved ? "Remove from saved" : "Save property"}
        >
          <Heart className={`w-4 h-4 ${saved ? "fill-[#C6A56B]" : ""}`} />
        </button>

        {/* Property Type Pill on bottom */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded bg-[#142B40]/80 backdrop-blur-md text-white text-[11px] font-medium tracking-wide uppercase">
            {property.type} · {property.city}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Price & Availability date */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-display text-[#142B40] tracking-tight">
                {formatRent(property.price)}
              </span>
              <span className="text-xs text-[#57616C] font-normal">/ month</span>
            </div>
            <span className="text-xs text-[#57616C] font-medium">{property.available}</span>
          </div>

          {/* Title */}
          <h3 className="mt-2 text-base font-semibold text-[#142B40] group-hover:text-[#C6A56B] transition-colors line-clamp-1">
            <Link to="/property/$slug" params={{ slug: property.slug }}>
              {property.title}
            </Link>
          </h3>

          {/* Location */}
          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#57616C]">
            <MapPin className="w-3.5 h-3.5 text-[#C6A56B] shrink-0" />
            <span className="truncate">
              {property.neighborhood}, {property.city === "San Francisco" ? "CA" : "OH"}
            </span>
          </div>
        </div>

        {/* Specs: Beds, Baths, Sqft */}
        <div className="pt-3 border-t border-[#E4E0D6] flex items-center justify-between text-xs text-[#252B32]">
          <div className="flex items-center gap-3 sm:gap-4 font-medium">
            <div className="flex items-center gap-1.5" title={`${property.beds} Bedrooms`}>
              <BedDouble className="w-4 h-4 text-[#57616C]" />
              <span>{property.beds} bd</span>
            </div>
            <div className="flex items-center gap-1.5" title={`${property.baths} Bathrooms`}>
              <Bath className="w-4 h-4 text-[#57616C]" />
              <span>{property.baths} ba</span>
            </div>
            <div className="flex items-center gap-1.5" title={`${property.sqft} Square Feet`}>
              <Square className="w-3.5 h-3.5 text-[#57616C]" />
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>

          <Link
            to="/property/$slug"
            params={{ slug: property.slug }}
            className="w-7 h-7 rounded-full bg-[#EFECE4] group-hover:bg-[#142B40] group-hover:text-white flex items-center justify-center transition-colors shrink-0"
            aria-label={`View ${property.title}`}
          >
            <ArrowUpRight className="w-4 h-4 text-[#142B40] group-hover:text-[#C6A56B] transition-colors" />
          </Link>
        </div>
      </div>
    </article>
  );
}

