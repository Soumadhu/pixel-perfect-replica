import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PropertyCard } from "@/components/PropertyCard";
import { rentals, locationDetails, locationImages, type Rental } from "@/lib/rental-data";
import { MapPin, ArrowRight, ShieldCheck, HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rentals/san-francisco")({
  component: SanFranciscoLocationPage,
  head: () => ({
    meta: [
      { title: "San Francisco Rental Residences | Field & Form" },
      {
        name: "description",
        content:
          "Explore luxury and architectural residential rental properties across San Francisco: Pacific Heights, Marina District, Noe Valley, Mission Dolores, and Presidio Heights.",
      },
    ],
  }),
});

function SanFranciscoLocationPage() {
  const sfData = locationDetails["san-francisco"];
  const sfProperties = useMemo(() => rentals.filter((r) => r.city === "San Francisco"), []);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const displayedProperties = useMemo(() => {
    if (selectedNeighborhood === "All") return sfProperties;
    return sfProperties.filter((p) => p.neighborhood === selectedNeighborhood);
  }, [sfProperties, selectedNeighborhood]);

  return (
    <SiteLayout>
      {/* 1. Location Hero */}
      <section className="relative min-h-[480px] lg:min-h-[540px] flex items-center justify-center overflow-hidden bg-[#142B40]">
        <img
          src={sfData.heroImage}
          alt="San Francisco architecture overlooking the bay"
          className="absolute inset-0 w-full h-full object-cover filter brightness-80 contrast-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#142B40] via-[#142B40]/60 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#C6A56B] text-xs font-semibold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>California Portfolio · San Francisco</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-normal max-w-3xl leading-tight">
            Considered Residences in <br />
            <span className="italic text-[#C6A56B]">San Francisco.</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#F7F6F2]/90 max-w-2xl font-light leading-relaxed">
            {sfData.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="bg-[#C6A56B] hover:bg-[#B59356] text-[#142B40] font-semibold text-xs px-6 py-2.5">
              <a href="#sf-listings">Explore Available Residences ({sfProperties.length})</a>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 text-xs px-6 py-2.5">
              <Link to="/contact">Speak with Eleanor Vance (SF Leasing)</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Neighborhood Showcase Bar */}
      <section className="bg-white py-10 border-b border-[#E4E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                Neighborhood Filter
              </span>
              <h2 className="font-editorial text-2xl text-[#142B40] mt-0.5">
                Explore by San Francisco Enclave
              </h2>
            </div>
            <span className="text-xs text-[#57616C]">
              Showing {displayedProperties.length} of {sfProperties.length} residences
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedNeighborhood("All")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                selectedNeighborhood === "All"
                  ? "bg-[#142B40] text-white shadow-xs"
                  : "bg-[#F7F6F2] text-[#252B32] hover:bg-[#EFECE4] border border-[#E4E0D6]"
              }`}
            >
              All San Francisco ({sfProperties.length})
            </button>
            {sfData.neighborhoods.map((n) => (
              <button
                key={n.name}
                onClick={() => setSelectedNeighborhood(n.name)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  selectedNeighborhood === n.name
                    ? "bg-[#142B40] text-white shadow-xs"
                    : "bg-[#F7F6F2] text-[#252B32] hover:bg-[#EFECE4] border border-[#E4E0D6]"
                }`}
              >
                {n.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. San Francisco Property Grid */}
      <section id="sf-listings" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProperties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </section>

      {/* 4. Enclave Architectural Guide */}
      <section className="py-16 bg-[#EFECE4] border-y border-[#E4E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
              Enclave Profiles
            </span>
            <h2 className="font-editorial text-3xl text-[#142B40] mt-1">
              San Francisco Neighborhood Character
            </h2>
            <p className="text-sm text-[#57616C] mt-2">
              Each neighborhood in our San Francisco portfolio offers a distinct architectural texture and daily tempo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sfData.neighborhoods.map((n) => (
              <div
                key={n.name}
                className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-xl text-[#142B40] font-medium">{n.name}</h3>
                    <span className="text-xs font-semibold text-[#C6A56B] bg-[#142B40]/5 px-2 py-0.5 rounded">
                      Walk Score 90+
                    </span>
                  </div>
                  <p className="text-xs text-[#57616C] mt-2 leading-relaxed">{n.highlight}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedNeighborhood(n.name);
                    const el = document.getElementById("sf-listings");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#142B40] hover:text-[#C6A56B] transition-colors pt-2 border-t border-[#E4E0D6]"
                >
                  <span>Filter homes in {n.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
            Leasing Details
          </span>
          <h2 className="font-editorial text-3xl text-[#142B40] mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#57616C] mt-2">
            Essential guidelines for leasing residential properties in San Francisco.
          </p>
        </div>

        <div className="space-y-3">
          {sfData.faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-lg border border-[#E4E0D6] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#142B40]"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#C6A56B] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#57616C] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#142B40]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#57616C] leading-relaxed border-t border-[#E4E0D6]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}

