import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PropertyGallery } from "@/components/PropertyGallery";
import { VideoWalkthrough } from "@/components/VideoWalkthrough";
import { PropertyCard } from "@/components/PropertyCard";
import { TourModal } from "@/components/TourModal";
import { ContactAgentModal } from "@/components/ContactAgentModal";
import { rentals, formatRent, type Rental } from "@/lib/rental-data";
import { useSavedRentals } from "@/hooks/useSavedRentals";
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Building,
  Calendar,
  Check,
  ShieldCheck,
  Phone,
  Mail,
  Video,
  ArrowRight,
  Footprints,
  Bus,
  Bike,
  Sparkles,
  Info,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/property/$slug")({
  loader: ({ params }) => {
    const property = rentals.find((r) => r.slug === params.slug);
    if (!property) {
      throw notFound();
    }
    return { property };
  },
  component: PropertyDetailPage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.property
          ? `${loaderData.property.title} | Field & Form`
          : "Property Details | Field & Form",
      },
      {
        name: "description",
        content: loaderData?.property?.description || "Curated residential rental listing.",
      },
    ],
  }),
});

function PropertyDetailPage() {
  const { property } = Route.useLoaderData();
  const { isSaved, toggleSave } = useSavedRentals();
  const saved = isSaved(property.slug);

  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [agentModalOpen, setAgentModalOpen] = useState(false);

  // Similar properties from same city
  const similarProperties = rentals
    .filter((p) => p.city === property.city && p.slug !== property.slug)
    .slice(0, 3);

  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#57616C] mb-5">
          <Link to="/" className="hover:text-[#142B40] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/rentals" className="hover:text-[#142B40] transition-colors">
            Rentals
          </Link>
          <span>/</span>
          <Link
            to={property.city === "San Francisco" ? "/rentals/san-francisco" : "/rentals/ohio"}
            className="hover:text-[#142B40] transition-colors"
          >
            {property.city}
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#142B40] truncate max-w-[200px] sm:max-w-none">
            {property.title}
          </span>
        </nav>

        {/* Top Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-emerald-950/80 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-800/50">
                {property.status}
              </span>
              <span className="bg-[#142B40]/10 text-[#142B40] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {property.type} · {property.neighborhood}
              </span>
              <span className="text-xs text-[#57616C] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C6A56B]" />
                {property.available}
              </span>
            </div>

            <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#142B40] font-normal leading-tight">
              {property.title}
            </h1>

            <p className="text-sm text-[#57616C] flex items-center gap-1.5 mt-1.5">
              <MapPin className="w-4 h-4 text-[#C6A56B] shrink-0" />
              <span>{property.address}</span>
            </p>
          </div>

          {/* Top Right Save & Share actions */}
          <div className="flex items-center gap-2 self-start">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSave(property.slug, property.title)}
              className={`text-xs flex items-center gap-2 border-[#E4E0D6] ${
                saved ? "bg-[#142B40] text-white hover:bg-[#1D3A55]" : "hover:bg-[#EFECE4]"
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-[#C6A56B] text-[#C6A56B]" : ""}`} />
              <span>{saved ? "Saved" : "Save Residence"}</span>
            </Button>
          </div>
        </div>

        {/* Photographic Gallery */}
        <div className="mb-12">
          <PropertyGallery photos={property.photos} title={property.title} />
        </div>

        {/* Main Grid: Details on Left (2/3), Sticky Inquiry Panel on Right (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Specs, Narrative, Amenities, Walkthrough, Public Location */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Specs Strip */}
            <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="space-y-1 p-2">
                <div className="flex items-center justify-center text-[#57616C]">
                  <BedDouble className="w-5 h-5 text-[#C6A56B]" />
                </div>
                <p className="text-xs text-[#57616C]">Bedrooms</p>
                <p className="text-base font-bold text-[#142B40]">{property.beds} Bedrooms</p>
              </div>

              <div className="space-y-1 p-2 border-l border-[#E4E0D6]">
                <div className="flex items-center justify-center text-[#57616C]">
                  <Bath className="w-5 h-5 text-[#C6A56B]" />
                </div>
                <p className="text-xs text-[#57616C]">Bathrooms</p>
                <p className="text-base font-bold text-[#142B40]">{property.baths} Baths</p>
              </div>

              <div className="space-y-1 p-2 border-l border-[#E4E0D6]">
                <div className="flex items-center justify-center text-[#57616C]">
                  <Square className="w-5 h-5 text-[#C6A56B]" />
                </div>
                <p className="text-xs text-[#57616C]">Living Space</p>
                <p className="text-base font-bold text-[#142B40]">{property.sqft.toLocaleString()} sq ft</p>
              </div>

              <div className="space-y-1 p-2 border-l border-[#E4E0D6]">
                <div className="flex items-center justify-center text-[#57616C]">
                  <Building className="w-5 h-5 text-[#C6A56B]" />
                </div>
                <p className="text-xs text-[#57616C]">Property Type</p>
                <p className="text-base font-bold text-[#142B40]">{property.type}</p>
              </div>
            </div>

            {/* Architectural Narrative Description */}
            <section className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                About This Residence
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#142B40]">
                Space, proportion, and natural light.
              </h2>
              <div className="space-y-3 text-sm text-[#57616C] leading-relaxed">
                {property.longDescription.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Amenities Section */}
            <section className="space-y-4 pt-8 border-t border-[#E4E0D6]">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                Curated Comforts
              </span>
              <h2 className="font-editorial text-2xl text-[#142B40]">
                Property Amenities & Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-[#E4E0D6] text-xs font-medium text-[#252B32]"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#142B40]/10 flex items-center justify-center text-[#142B40] shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Essential Policies & Fee Breakdown */}
            <section className="space-y-4 pt-8 border-t border-[#E4E0D6]">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                Lease Terms & Upfront Details
              </span>
              <h2 className="font-editorial text-2xl text-[#142B40]">
                At a Glance
              </h2>
              <div className="bg-white rounded-xl border border-[#E4E0D6] p-6 shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex justify-between py-2 border-b border-[#E4E0D6]">
                    <span className="text-[#57616C]">Monthly Rent</span>
                    <span className="font-bold text-[#142B40]">{formatRent(property.price)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E0D6]">
                    <span className="text-[#57616C]">Security Deposit</span>
                    <span className="font-bold text-[#142B40]">{formatRent(property.deposit)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E0D6]">
                    <span className="text-[#57616C]">Application Fee</span>
                    <span className="font-bold text-[#142B40]">${property.applicationFee}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E0D6]">
                    <span className="text-[#57616C]">Lease Duration</span>
                    <span className="font-bold text-[#142B40]">{property.features.leaseTerm}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E0D6]">
                    <span className="text-[#57616C]">Parking</span>
                    <span className="font-bold text-[#142B40]">{property.features.parking}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#E4E0D6]">
                    <span className="text-[#57616C]">Pet Policy</span>
                    <span className="font-bold text-[#142B40]">{property.features.petPolicy}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Video Walkthrough Section */}
            <section className="space-y-4 pt-8 border-t border-[#E4E0D6]">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                Virtual Immersion
              </span>
              <h2 className="font-editorial text-2xl text-[#142B40]">
                Cinematic Property Walkthrough
              </h2>
              <p className="text-xs text-[#57616C]">
                Explore every dimension of the space before your accompanied private tour.
              </p>
              <VideoWalkthrough property={property} />
            </section>

            {/* Public Location & Neighborhood Scores */}
            <section className="space-y-4 pt-8 border-t border-[#E4E0D6]">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                Public Location & Neighborhood
              </span>
              <h2 className="font-editorial text-2xl text-[#142B40]">
                {property.neighborhood}, {property.city}
              </h2>
              <p className="text-xs text-[#57616C] leading-relaxed">
                To respect current tenant privacy and security, exact street address numbers are provided upon confirmed appointment scheduling. Public transit, dining, and daily essentials are in close proximity.
              </p>

              {/* Transit & Walkability Scores */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-xl bg-white border border-[#E4E0D6]">
                  <div className="w-8 h-8 rounded-full bg-[#142B40]/10 text-[#142B40] flex items-center justify-center mx-auto mb-2">
                    <Footprints className="w-4 h-4 text-[#C6A56B]" />
                  </div>
                  <span className="text-2xl font-bold font-display text-[#142B40]">
                    {property.scores.walk}
                  </span>
                  <p className="text-[11px] font-semibold text-[#57616C] mt-0.5">Walk Score</p>
                  <p className="text-[10px] text-[#57616C]/70">Daily errands on foot</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E4E0D6]">
                  <div className="w-8 h-8 rounded-full bg-[#142B40]/10 text-[#142B40] flex items-center justify-center mx-auto mb-2">
                    <Bus className="w-4 h-4 text-[#C6A56B]" />
                  </div>
                  <span className="text-2xl font-bold font-display text-[#142B40]">
                    {property.scores.transit}
                  </span>
                  <p className="text-[11px] font-semibold text-[#57616C] mt-0.5">Transit Score</p>
                  <p className="text-[10px] text-[#57616C]/70">Rapid regional access</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E4E0D6]">
                  <div className="w-8 h-8 rounded-full bg-[#142B40]/10 text-[#142B40] flex items-center justify-center mx-auto mb-2">
                    <Bike className="w-4 h-4 text-[#C6A56B]" />
                  </div>
                  <span className="text-2xl font-bold font-display text-[#142B40]">
                    {property.scores.bike}
                  </span>
                  <p className="text-[11px] font-semibold text-[#57616C] mt-0.5">Bike Score</p>
                  <p className="text-[10px] text-[#57616C]/70">Bicycle friendly</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Desktop Sticky Inquiry Panel & Agent Profile */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Main Pricing & Tour Booking Card */}
              <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-lg space-y-5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold font-display text-[#142B40]">
                      {formatRent(property.price)}
                    </span>
                    <span className="text-xs text-[#57616C]"> / month</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {property.status}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#E4E0D6] space-y-3">
                  <Button
                    onClick={() => setTourModalOpen(true)}
                    className="w-full bg-[#142B40] hover:bg-[#1D3A55] text-white py-3 font-semibold text-sm rounded-md shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Calendar className="w-4 h-4 text-[#C6A56B]" />
                    <span>Request a Private Tour</span>
                  </Button>

                  <Button
                    onClick={() => setAgentModalOpen(true)}
                    variant="outline"
                    className="w-full border-[#142B40] text-[#142B40] hover:bg-[#142B40] hover:text-white py-3 font-semibold text-xs rounded-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact Leasing Specialist</span>
                  </Button>
                </div>

                <div className="pt-3 border-t border-[#E4E0D6] space-y-2 text-xs text-[#57616C]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C6A56B] shrink-0" />
                    <span>{property.available}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C6A56B] shrink-0" />
                    <span>Direct client leasing · No broker fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-[#C6A56B] shrink-0" />
                    <span>In-person accompanied or live virtual tour</span>
                  </div>
                </div>
              </div>

              {/* Dedicated Leasing Agent Profile Card */}
              <div className="bg-white rounded-xl p-5 border border-[#E4E0D6] shadow-xs space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C6A56B]">
                  Your Dedicated Leasing Partner
                </span>

                <div className="flex items-center gap-3">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#C6A56B]"
                  />
                  <div>
                    <h4 className="font-editorial text-base text-[#142B40] font-medium">
                      {property.agent.name}
                    </h4>
                    <p className="text-xs text-[#57616C]">{property.agent.role}</p>
                    <p className="text-xs font-semibold text-[#142B40] mt-0.5">
                      {property.agent.phone}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#57616C] leading-relaxed">
                  Eleanor and Marcus personally oversee showings, tenant vetting, and lease execution for all residences in their respective regions.
                </p>

                <button
                  type="button"
                  onClick={() => setAgentModalOpen(true)}
                  className="w-full text-center text-xs font-semibold text-[#142B40] hover:text-[#C6A56B] py-1 border-t border-[#E4E0D6] pt-3 transition-colors block"
                >
                  Send direct note to {property.agent.name.split(" ")[0]} →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Residences in Same Region */}
        {similarProperties.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[#E4E0D6]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                  Explore Comparable Properties
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#142B40] mt-1">
                  Similar Residences in {property.city}
                </h3>
              </div>
              <Link
                to={property.city === "San Francisco" ? "/rentals/san-francisco" : "/rentals/ohio"}
                className="text-xs font-semibold text-[#142B40] hover:text-[#C6A56B] flex items-center gap-1.5"
              >
                <span>View all in {property.city}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Enquiry Bar at Screen Bottom */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4E0D6] p-3 px-4 flex items-center justify-between shadow-lg">
        <div>
          <div className="text-lg font-bold font-display text-[#142B40] leading-none">
            {formatRent(property.price)}
          </div>
          <span className="text-[10px] text-[#57616C]">Monthly rent</span>
        </div>

        <Button
          onClick={() => setTourModalOpen(true)}
          className="bg-[#142B40] hover:bg-[#1D3A55] text-white text-xs font-semibold px-5 py-2.5"
        >
          <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#C6A56B]" />
          <span>Request Tour</span>
        </Button>
      </div>

      {/* Tour Scheduling Modal */}
      <TourModal
        property={property}
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
      />

      {/* Contact Agent Modal */}
      <ContactAgentModal
        agent={property.agent}
        property={property}
        isOpen={agentModalOpen}
        onClose={() => setAgentModalOpen(false)}
      />
    </SiteLayout>
  );
}

