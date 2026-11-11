import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, MapPin, BedDouble, DollarSign, Home, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  initialLocation?: string;
  initialBedrooms?: string;
  initialMaxRent?: string;
  initialType?: string;
  compact?: boolean;
}

export function SearchBar({
  initialLocation = "",
  initialBedrooms = "",
  initialMaxRent = "",
  initialType = "",
  compact = false,
}: SearchBarProps) {
  const [location, setLocation] = useState(initialLocation);
  const [bedrooms, setBedrooms] = useState(initialBedrooms);
  const [maxRent, setMaxRent] = useState(initialMaxRent);
  const [propertyType, setPropertyType] = useState(initialType);
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/rentals",
      search: {
        location: location.trim() || undefined,
        bedrooms: bedrooms || undefined,
        maxRent: maxRent || undefined,
        type: propertyType || undefined,
      },
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full bg-white rounded-xl shadow-xl border border-[#E4E0D6] ${
        compact ? "p-3" : "p-4 sm:p-5 lg:p-6"
      }`}
    >
      <div
        className={`grid gap-3 sm:gap-4 ${
          compact
            ? "grid-cols-1 sm:grid-cols-4 items-center"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-end"
        }`}
      >
        {/* Location / Neighborhood / ZIP */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#57616C] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span>Location or ZIP</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="San Francisco, Columbus, 94115..."
              className="w-full bg-[#F7F6F2] hover:bg-[#EFECE4]/80 focus:bg-white text-sm text-[#252B32] font-medium placeholder:text-[#57616C]/60 px-3.5 py-2.5 rounded-md border border-[#E4E0D6] focus:border-[#142B40] focus:ring-1 focus:ring-[#142B40] transition-colors outline-hidden"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#57616C] flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span>Bedrooms</span>
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-[#F7F6F2] hover:bg-[#EFECE4]/80 focus:bg-white text-sm text-[#252B32] font-medium px-3.5 py-2.5 rounded-md border border-[#E4E0D6] focus:border-[#142B40] focus:ring-1 focus:ring-[#142B40] transition-colors outline-hidden cursor-pointer"
          >
            <option value="">Any Bedrooms</option>
            <option value="1">1+ Bedrooms</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
          </select>
        </div>

        {/* Max Rent */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#57616C] flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span>Max Monthly Rent</span>
          </label>
          <select
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            className="w-full bg-[#F7F6F2] hover:bg-[#EFECE4]/80 focus:bg-white text-sm text-[#252B32] font-medium px-3.5 py-2.5 rounded-md border border-[#E4E0D6] focus:border-[#142B40] focus:ring-1 focus:ring-[#142B40] transition-colors outline-hidden cursor-pointer"
          >
            <option value="">No Maximum</option>
            <option value="2500">Up to $2,500</option>
            <option value="3500">Up to $3,500</option>
            <option value="4500">Up to $4,500</option>
            <option value="5500">Up to $5,500</option>
            <option value="6500">Up to $6,500</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-1 sm:pt-0">
          <Button
            type="submit"
            className="w-full h-11 bg-[#142B40] hover:bg-[#1D3A55] text-white font-semibold text-sm rounded-md shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#C6A56B]" />
            <span>Find Residences</span>
          </Button>
        </div>
      </div>

      {/* Quick filter pills */}
      {!compact && (
        <div className="mt-4 pt-3.5 border-t border-[#E4E0D6]/70 flex flex-wrap items-center justify-between gap-2 text-xs text-[#57616C]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#142B40]">Popular searches:</span>
            <button
              type="button"
              onClick={() => {
                setLocation("Pacific Heights");
                navigate({ to: "/rentals", search: { location: "Pacific Heights" } });
              }}
              className="px-2.5 py-1 rounded-full bg-[#F7F6F2] hover:bg-[#EFECE4] text-[#252B32] border border-[#E4E0D6] transition-colors"
            >
              Pacific Heights
            </button>
            <button
              type="button"
              onClick={() => {
                setLocation("Marina");
                navigate({ to: "/rentals", search: { location: "Marina" } });
              }}
              className="px-2.5 py-1 rounded-full bg-[#F7F6F2] hover:bg-[#EFECE4] text-[#252B32] border border-[#E4E0D6] transition-colors"
            >
              Marina District
            </button>
            <button
              type="button"
              onClick={() => {
                setLocation("Columbus");
                navigate({ to: "/rentals", search: { location: "Columbus" } });
              }}
              className="px-2.5 py-1 rounded-full bg-[#F7F6F2] hover:bg-[#EFECE4] text-[#252B32] border border-[#E4E0D6] transition-colors"
            >
              Columbus, OH
            </button>
            <button
              type="button"
              onClick={() => {
                setLocation("German Village");
                navigate({ to: "/rentals", search: { location: "German Village" } });
              }}
              className="px-2.5 py-1 rounded-full bg-[#F7F6F2] hover:bg-[#EFECE4] text-[#252B32] border border-[#E4E0D6] transition-colors"
            >
              German Village
            </button>
          </div>

          <span className="text-[11px] text-[#57616C]/80 italic">
            All listings verified by client
          </span>
        </div>
      )}
    </form>
  );
}

