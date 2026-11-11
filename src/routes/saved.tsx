import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PropertyCard } from "@/components/PropertyCard";
import { rentals } from "@/lib/rental-data";
import { useSavedRentals } from "@/hooks/useSavedRentals";
import { Heart, ArrowRight, Trash2, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/saved")({
  component: SavedPropertiesPage,
  head: () => ({
    meta: [
      { title: "Saved Residences | Field & Form" },
      {
        name: "description",
        content:
          "Review your saved shortlist of residential rental residences in San Francisco and Ohio.",
      },
    ],
  }),
});

function SavedPropertiesPage() {
  const { savedSlugs } = useSavedRentals();

  const savedProperties = rentals.filter((property) =>
    savedSlugs.includes(property.slug)
  );

  const clearAll = () => {
    localStorage.removeItem("field-form-saved-rentals-v1");
    window.dispatchEvent(new CustomEvent("saved-rentals-change", { detail: [] }));
  };

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
            <span className="font-semibold text-[#142B40]">Saved Residences</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                Your Private Shortlist
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#142B40] mt-1">
                Saved Residences
              </h1>
              <p className="text-sm text-[#57616C] mt-2 max-w-xl">
                Properties you have bookmarked on this device. Saved homes remain accessible as you compare layouts, prices, and locations.
              </p>
            </div>

            {savedProperties.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="text-xs text-red-700 border-red-200 hover:bg-red-50 hover:border-red-300 flex items-center gap-1.5 self-start sm:self-end"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Saved</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {savedProperties.length > 0 ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between text-xs text-[#57616C]">
              <span>
                <b>{savedProperties.length}</b> residence{savedProperties.length > 1 ? "s" : ""} saved on this browser
              </span>
              <Link
                to="/rentals"
                className="text-xs font-semibold text-[#142B40] hover:text-[#C6A56B] flex items-center gap-1"
              >
                <span>Continue browsing portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedProperties.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-md mx-auto py-16 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#EFECE4] text-[#C6A56B] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-editorial text-2xl text-[#142B40]">
                Your Shortlist is Empty
              </h3>
              <p className="text-xs text-[#57616C] leading-relaxed">
                As you explore our residences across San Francisco and Ohio, tap the heart icon on any property card to save it here for easy review and comparison.
              </p>
            </div>
            <div className="pt-2">
              <Button asChild className="bg-[#142B40] hover:bg-[#1D3A55] text-white text-xs px-6 py-2.5">
                <Link to="/rentals">
                  <Search className="w-3.5 h-3.5 mr-2 text-[#C6A56B]" />
                  <span>Browse Available Residences</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

