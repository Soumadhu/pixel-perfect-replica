import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PropertyCard } from "@/components/PropertyCard";
import { InteractiveMap } from "@/components/InteractiveMap";
import { rentals, formatRent, type Rental, type PropertyType, type PropertyStatus } from "@/lib/rental-data";
import {
  SlidersHorizontal,
  LayoutGrid,
  Map as MapIcon,
  Search,
  X,
  ArrowUpDown,
  Filter,
  Check,
  Building,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RentalsSearch {
  location?: string;
  bedrooms?: string;
  bathrooms?: string;
  minRent?: string;
  maxRent?: string;
  type?: string;
  status?: string;
  amenity?: string;
  sort?: string;
  view?: string;
}

export const Route = createFileRoute("/rentals/")({
  validateSearch: (search: Record<string, unknown>): RentalsSearch => ({
    location: (search.location as string) || undefined,
    bedrooms: (search.bedrooms as string) || undefined,
    bathrooms: (search.bathrooms as string) || undefined,
    minRent: (search.minRent as string) || undefined,
    maxRent: (search.maxRent as string) || undefined,
    type: (search.type as string) || undefined,
    status: (search.status as string) || undefined,
    amenity: (search.amenity as string) || undefined,
    sort: (search.sort as string) || undefined,
    view: (search.view as string) || undefined,
  }),
  component: RentalsPage,
  head: () => ({
    meta: [
      { title: "Residential Rentals Portfolio | Field & Form" },
      {
        name: "description",
        content:
          "Browse our curated collection of residential rental apartments and homes across San Francisco and Ohio. Filter by price, bedrooms, and amenities.",
      },
    ],
  }),
});

function RentalsPage() {
  const searchParams = useSearch({ from: "/rentals/" });

  const [locationQuery, setLocationQuery] = useState(searchParams.location || "");
  const [selectedBedrooms, setSelectedBedrooms] = useState(searchParams.bedrooms || "");
  const [selectedBathrooms, setSelectedBathrooms] = useState(searchParams.bathrooms || "");
  const [minRent, setMinRent] = useState(searchParams.minRent || "");
  const [maxRent, setMaxRent] = useState(searchParams.maxRent || "");
  const [selectedType, setSelectedType] = useState(searchParams.type || "");
  const [selectedStatus, setSelectedStatus] = useState(searchParams.status || "");
  const [selectedAmenity, setSelectedAmenity] = useState(searchParams.amenity || "");
  const [sortBy, setSortBy] = useState(searchParams.sort || "newest");
  const [viewMode, setViewMode] = useState<"grid" | "map">((searchParams.view as "grid" | "map") || "grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Sync state if search params change
  useEffect(() => {
    if (searchParams.location !== undefined) setLocationQuery(searchParams.location);
    if (searchParams.bedrooms !== undefined) setSelectedBedrooms(searchParams.bedrooms);
    if (searchParams.maxRent !== undefined) setMaxRent(searchParams.maxRent);
    if (searchParams.type !== undefined) setSelectedType(searchParams.type);
    if (searchParams.status !== undefined) setSelectedStatus(searchParams.status);
  }, [searchParams]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return rentals.filter((property) => {
      // Location search (city, neighborhood, zip, title)
      if (locationQuery.trim()) {
        const query = locationQuery.toLowerCase().trim();
        const haystack = `${property.city} ${property.neighborhood} ${property.zip} ${property.title} ${property.address}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      // Bedrooms
      if (selectedBedrooms && property.beds < Number(selectedBedrooms)) {
        return false;
      }

      // Bathrooms
      if (selectedBathrooms && property.baths < Number(selectedBathrooms)) {
        return false;
      }

      // Min rent
      if (minRent && property.price < Number(minRent)) {
        return false;
      }

      // Max rent
      if (maxRent && property.price > Number(maxRent)) {
        return false;
      }

      // Property type
      if (selectedType && property.type !== selectedType) {
        return false;
      }

      // Availability status
      if (selectedStatus && property.status !== selectedStatus) {
        return false;
      }

      // Amenity
      if (selectedAmenity && !property.amenities.includes(selectedAmenity)) {
        return false;
      }

      return true;
    });
  }, [
    locationQuery,
    selectedBedrooms,
    selectedBathrooms,
    minRent,
    maxRent,
    selectedType,
    selectedStatus,
    selectedAmenity,
  ]);

  // Sort properties
  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "beds-desc") return b.beds - a.beds;
      // Default: newest
      return b.added.localeCompare(a.added);
    });
  }, [filteredProperties, sortBy]);

  // Active filter count
  const activeFiltersCount = [
    locationQuery,
    selectedBedrooms,
    selectedBathrooms,
    minRent,
    maxRent,
    selectedType,
    selectedStatus,
    selectedAmenity,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setLocationQuery("");
    setSelectedBedrooms("");
    setSelectedBathrooms("");
    setMinRent("");
    setMaxRent("");
    setSelectedType("");
    setSelectedStatus("");
    setSelectedAmenity("");
  };

  const paginatedProperties = sortedProperties.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProperties.length;

  return (
    <SiteLayout>
      <div className="bg-[#F7F6F2] py-8 sm:py-12 border-b border-[#E4E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#57616C] mb-3">
            <Link to="/" className="hover:text-[#142B40] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#142B40]">Rentals Portfolio</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                Curated Residential Collection
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#142B40] mt-1">
                Property Portfolio
              </h1>
              <p className="text-sm text-[#57616C] mt-2 max-w-xl">
                Explore our residential rentals across San Francisco, CA and Ohio. Authentic photography, transparent lease terms, and dedicated tenant stewardship.
              </p>
            </div>

            {/* Quick region pills */}
            <div className="flex items-center gap-2">
              <Link
                to="/rentals/san-francisco"
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#E4E0D6] hover:border-[#142B40] text-[#142B40] transition-colors"
              >
                San Francisco Only
              </Link>
              <Link
                to="/rentals/ohio"
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#E4E0D6] hover:border-[#142B40] text-[#142B40] transition-colors"
              >
                Ohio Only
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-[#E4E0D6]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C6A56B]" />
                  <h3 className="font-semibold text-sm text-[#142B40]">Filter Collection</h3>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-[#C6A56B] hover:text-[#142B40] font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Location Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Location or ZIP</label>
                <div className="relative">
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="City, neighborhood, ZIP..."
                    className="w-full bg-[#F7F6F2] text-xs text-[#252B32] pl-8 pr-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                  />
                  <Search className="w-3.5 h-3.5 text-[#57616C] absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Monthly Rent Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    value={minRent}
                    onChange={(e) => setMinRent(e.target.value)}
                    className="w-full bg-[#F7F6F2] text-xs text-[#252B32] px-2.5 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                  />
                  <input
                    type="number"
                    placeholder="Max $"
                    value={maxRent}
                    onChange={(e) => setMaxRent(e.target.value)}
                    className="w-full bg-[#F7F6F2] text-xs text-[#252B32] px-2.5 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Bedrooms</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["", "1", "2", "3"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSelectedBedrooms(val)}
                      className={`py-1.5 text-xs font-medium rounded-md border transition-colors ${
                        selectedBedrooms === val
                          ? "bg-[#142B40] text-white border-[#142B40]"
                          : "bg-[#F7F6F2] text-[#252B32] border-[#E4E0D6] hover:bg-[#EFECE4]"
                      }`}
                    >
                      {val === "" ? "Any" : `${val}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Bathrooms</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {["", "1", "2"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSelectedBathrooms(val)}
                      className={`py-1.5 text-xs font-medium rounded-md border transition-colors ${
                        selectedBathrooms === val
                          ? "bg-[#142B40] text-white border-[#142B40]"
                          : "bg-[#F7F6F2] text-[#252B32] border-[#E4E0D6] hover:bg-[#EFECE4]"
                      }`}
                    >
                      {val === "" ? "Any" : `${val}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#F7F6F2] text-xs text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                </select>
              </div>

              {/* Availability Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Availability</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-[#F7F6F2] text-xs text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden cursor-pointer"
                >
                  <option value="">Any Status</option>
                  <option value="Available">Available Now</option>
                  <option value="Coming soon">Coming Soon</option>
                </select>
              </div>

              {/* Amenities */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Featured Amenity</label>
                <select
                  value={selectedAmenity}
                  onChange={(e) => setSelectedAmenity(e.target.value)}
                  className="w-full bg-[#F7F6F2] text-xs text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden cursor-pointer"
                >
                  <option value="">Any Amenity</option>
                  <option value="In-unit laundry">In-unit Laundry</option>
                  <option value="Dishwasher">Dishwasher</option>
                  <option value="Pet friendly">Pet Friendly</option>
                  <option value="Private yard">Private Yard</option>
                  <option value="Garage">Garage Parking</option>
                  <option value="Central A/C">Central A/C</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Toolbar */}
            <div className="bg-white rounded-xl p-4 border border-[#E4E0D6] shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#142B40]">
                  {sortedProperties.length}
                </span>
                <span className="text-xs text-[#57616C]">
                  {sortedProperties.length === 1 ? "residence available" : "residences available"}
                </span>
                {activeFiltersCount > 0 && (
                  <span className="bg-[#C6A56B]/20 text-[#142B40] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    {activeFiltersCount} active filter{activeFiltersCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Trigger */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden text-xs flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C6A56B]" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#142B40] text-white text-[10px] flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>

                {/* Sort Control */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[#57616C] hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#F7F6F2] text-[#252B32] text-xs font-medium px-2.5 py-1.5 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="beds-desc">Bedrooms: Most</option>
                  </select>
                </div>

                {/* View Switch: Grid vs Map */}
                <div className="flex items-center bg-[#F7F6F2] p-1 rounded-md border border-[#E4E0D6]">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#142B40] text-white shadow-xs"
                        : "text-[#57616C] hover:text-[#142B40]"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("map")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "map"
                        ? "bg-[#142B40] text-white shadow-xs"
                        : "text-[#57616C] hover:text-[#142B40]"
                    }`}
                    title="Map View"
                  >
                    <MapIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Badges */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#57616C]">Active filters:</span>
                {locationQuery && (
                  <span className="inline-flex items-center gap-1 text-xs bg-white px-2.5 py-1 rounded-full border border-[#E4E0D6] text-[#142B40]">
                    Location: {locationQuery}
                    <button onClick={() => setLocationQuery("")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {selectedBedrooms && (
                  <span className="inline-flex items-center gap-1 text-xs bg-white px-2.5 py-1 rounded-full border border-[#E4E0D6] text-[#142B40]">
                    Beds: {selectedBedrooms}+
                    <button onClick={() => setSelectedBedrooms("")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {minRent && (
                  <span className="inline-flex items-center gap-1 text-xs bg-white px-2.5 py-1 rounded-full border border-[#E4E0D6] text-[#142B40]">
                    Min: ${minRent}
                    <button onClick={() => setMinRent("")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {maxRent && (
                  <span className="inline-flex items-center gap-1 text-xs bg-white px-2.5 py-1 rounded-full border border-[#E4E0D6] text-[#142B40]">
                    Max: ${maxRent}
                    <button onClick={() => setMaxRent("")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {selectedType && (
                  <span className="inline-flex items-center gap-1 text-xs bg-white px-2.5 py-1 rounded-full border border-[#E4E0D6] text-[#142B40]">
                    Type: {selectedType}
                    <button onClick={() => setSelectedType("")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {selectedStatus && (
                  <span className="inline-flex items-center gap-1 text-xs bg-white px-2.5 py-1 rounded-full border border-[#E4E0D6] text-[#142B40]">
                    Status: {selectedStatus}
                    <button onClick={() => setSelectedStatus("")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {selectedAmenity && (
                  <span className="inline-flex items-center gap-1 text-xs bg-white px-2.5 py-1 rounded-full border border-[#E4E0D6] text-[#142B40]">
                    Amenity: {selectedAmenity}
                    <button onClick={() => setSelectedAmenity("")}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#C6A56B] hover:text-[#142B40] font-semibold underline underline-offset-2 ml-1"
                >
                  Reset all
                </button>
              </div>
            )}

            {/* Results Grid OR Map View */}
            {sortedProperties.length === 0 ? (
              /* Empty Search State */
              <div className="bg-white rounded-xl p-12 text-center border border-[#E4E0D6] shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFECE4] text-[#142B40] flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-[#C6A56B]" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="font-editorial text-2xl text-[#142B40]">No Residences Found</h3>
                  <p className="text-xs text-[#57616C]">
                    No properties match your specific filter criteria. Try widening your price range, reducing bedroom requirements, or resetting your search.
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    onClick={clearAllFilters}
                    className="bg-[#142B40] hover:bg-[#1D3A55] text-white text-xs px-5 py-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    Reset All Filters
                  </Button>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProperties.map((property) => (
                    <PropertyCard key={property.slug} property={property} />
                  ))}
                </div>

                {/* Pagination / Load More */}
                {hasMore && (
                  <div className="pt-8 text-center">
                    <Button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      variant="outline"
                      className="border-[#142B40] text-[#142B40] hover:bg-[#142B40] hover:text-white px-8 py-2.5 text-xs font-semibold"
                    >
                      Load More Residences ({sortedProperties.length - visibleCount} remaining)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* Map View */
              <InteractiveMap properties={sortedProperties} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-over Drawer */}
      {mobileFilterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
        >
          <div className="bg-white w-full max-w-sm h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#E4E0D6]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C6A56B]" />
                  <h3 className="font-semibold text-base text-[#142B40]">Filter Collection</h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#57616C] hover:text-[#142B40]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Location Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Location or ZIP</label>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City, neighborhood, ZIP..."
                  className="w-full bg-[#F7F6F2] text-xs text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Monthly Rent Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    value={minRent}
                    onChange={(e) => setMinRent(e.target.value)}
                    className="w-full bg-[#F7F6F2] text-xs text-[#252B32] px-2.5 py-2 rounded-md border border-[#E4E0D6]"
                  />
                  <input
                    type="number"
                    placeholder="Max $"
                    value={maxRent}
                    onChange={(e) => setMaxRent(e.target.value)}
                    className="w-full bg-[#F7F6F2] text-xs text-[#252B32] px-2.5 py-2 rounded-md border border-[#E4E0D6]"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Bedrooms</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["", "1", "2", "3"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSelectedBedrooms(val)}
                      className={`py-1.5 text-xs font-medium rounded-md border ${
                        selectedBedrooms === val
                          ? "bg-[#142B40] text-white"
                          : "bg-[#F7F6F2] text-[#252B32] border-[#E4E0D6]"
                      }`}
                    >
                      {val === "" ? "Any" : `${val}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#F7F6F2] text-xs text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6]"
                >
                  <option value="">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                </select>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#252B32]">Availability</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-[#F7F6F2] text-xs text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6]"
                >
                  <option value="">Any Status</option>
                  <option value="Available">Available Now</option>
                  <option value="Coming soon">Coming Soon</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4E0D6] space-y-2">
              <Button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#142B40] text-white py-2.5 text-xs font-semibold"
              >
                Apply Filters ({sortedProperties.length} Homes)
              </Button>
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="w-full text-xs text-[#57616C]"
              >
                Reset All Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

