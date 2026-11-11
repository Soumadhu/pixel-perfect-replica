import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { rentals, heroImage, locationImages } from "@/lib/rental-data";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, Building, Key, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Field & Form | Premium Rental Homes in San Francisco & Ohio" },
      {
        name: "description",
        content:
          "Find a place you'll love to call home. Thoughtfully selected residential rental residences across San Francisco, CA and Ohio.",
      },
    ],
  }),
});

function HomePage() {
  const featuredProperties = rentals.filter((r) => r.featured).slice(0, 3);
  const recentProperties = [...rentals]
    .sort((a, b) => b.added.localeCompare(a.added))
    .slice(0, 3);

  const sfCount = rentals.filter((r) => r.city === "San Francisco").length;
  const ohioCount = rentals.filter((r) => r.city === "Ohio").length;

  return (
    <SiteLayout>
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[620px] lg:min-h-[720px] w-full flex items-center justify-center overflow-hidden bg-[#142B40]">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Warm light-filled residential property interior"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105 scale-100 animate-in fade-in zoom-in-105 duration-1000"
          />
          {/* Multi-stage gradient overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-[#142B40] via-[#142B40]/60 to-black/30" />
          <div className="absolute inset-0 bg-[#142B40]/25 mix-blend-multiply" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full flex flex-col items-center text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#C6A56B] text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C6A56B] animate-pulse" />
            <span>Single-Client Residential Portfolio</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-normal max-w-4xl tracking-tight leading-[1.1]">
            Find a place you'll <br />
            <span className="italic font-normal text-[#C6A56B]">love to call home.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-[#F7F6F2]/90 max-w-2xl font-light leading-relaxed">
            Considered architectural residences across San Francisco, California and Ohio. High-resolution galleries, transparent rental terms, and accompanied private tours.
          </p>

          {/* Integrated Search Bar */}
          <div className="mt-10 w-full max-w-4xl text-left">
            <SearchBar />
          </div>

          {/* Trust badges below hero search */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#F7F6F2]/75 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C6A56B]" />
              Direct Client Management
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#C6A56B]" />
              No Hidden Administrative Fees
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C6A56B]" />
              Accompanied In-Person & Virtual Tours
            </span>
          </div>
        </div>
      </section>

      {/* 2. Editorial Introduction */}
      <section className="py-16 sm:py-20 bg-[#F7F6F2] border-b border-[#E4E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
              A More Personal Way to Rent
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#142B40] mt-3 leading-tight">
              Homes with character, space to gather, and room to live well.
            </h2>
            <p className="mt-4 text-[#57616C] leading-relaxed text-base">
              We curate and steward a private portfolio of residential rental properties in two distinctive regions: the architectural hills and waterfront corners of San Francisco, and the leafy, welcoming communities of Ohio. Each home is documented with rigorous photography and presented with clarity.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#142B40] hover:text-[#C6A56B] transition-colors"
              >
                <span>Read about our studio philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Residences */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
              Curated Highlights
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#142B40] mt-1">
              Featured Residences
            </h2>
            <p className="text-sm text-[#57616C] mt-1">
              Hand-selected homes offering exceptional light, private outdoor spaces, and craftsmanship.
            </p>
          </div>
          <Link
            to="/rentals"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#142B40] hover:text-[#C6A56B] transition-colors shrink-0"
          >
            <span>View all {rentals.length} properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.slug} property={property} featured />
          ))}
        </div>
      </section>

      {/* 4. Explore by Location Section */}
      <section className="py-20 bg-[#EFECE4] border-y border-[#E4E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
              Two Regions, Distinct Lifestyles
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#142B40] mt-1">
              Explore Our Service Enclaves
            </h2>
            <p className="text-sm text-[#57616C] mt-2">
              Whether you are drawn to San Francisco's coastal bay breezes or Ohio's neighborhood porches and generous space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* San Francisco Card */}
            <Link
              to="/rentals/san-francisco"
              className="group relative rounded-xl overflow-hidden aspect-16/10 sm:aspect-16/9 bg-[#142B40] shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={locationImages.sanFrancisco}
                alt="San Francisco city architecture and bay views"
                className="w-full h-full object-cover filter brightness-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#142B40] via-[#142B40]/40 to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C6A56B] bg-[#142B40]/70 backdrop-blur-md px-3 py-1 rounded-full">
                    California Collection
                  </span>
                  <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    {sfCount} Available Residences
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-white group-hover:text-[#C6A56B] transition-colors">
                    San Francisco
                  </h3>
                  <p className="text-sm text-[#F7F6F2]/80 mt-2 max-w-md line-clamp-2">
                    Pacific Heights, Marina District, Noe Valley, Mission Dolores, and Presidio Heights.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#C6A56B] group-hover:text-white transition-colors">
                    <span>Explore San Francisco Rentals</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Ohio Card */}
            <Link
              to="/rentals/ohio"
              className="group relative rounded-xl overflow-hidden aspect-16/10 sm:aspect-16/9 bg-[#142B40] shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={locationImages.ohio}
                alt="Ohio craftsman porch and tree-lined street"
                className="w-full h-full object-cover filter brightness-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#142B40] via-[#142B40]/40 to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C6A56B] bg-[#142B40]/70 backdrop-blur-md px-3 py-1 rounded-full">
                    Midwest Collection
                  </span>
                  <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    {ohioCount} Available Residences
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-white group-hover:text-[#C6A56B] transition-colors">
                    Ohio Portfolio
                  </h3>
                  <p className="text-sm text-[#F7F6F2]/80 mt-2 max-w-md line-clamp-2">
                    Columbus (Clintonville, Dublin, German Village, Grandview Heights) and Cleveland (Shaker Heights).
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#C6A56B] group-hover:text-white transition-colors">
                    <span>Explore Ohio Rentals</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Recently Added Properties */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
              Fresh to Portfolio
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#142B40] mt-1">
              Recently Added Residences
            </h2>
            <p className="text-sm text-[#57616C] mt-1">
              The newest additions to our managed residential listings.
            </p>
          </div>
          <Link
            to="/rentals"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#142B40] hover:text-[#C6A56B] transition-colors shrink-0"
          >
            <span>Browse All Rentals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentProperties.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </section>

      {/* 6. Why Choose Us / Trust Pillars */}
      <section className="py-20 bg-[#142B40] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
              The Field & Form Standard
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-white mt-2 leading-tight">
              A rental experience designed with the tenant at center stage.
            </h2>
            <p className="text-sm text-[#F7F6F2]/75 mt-3 leading-relaxed">
              Unlike broad multi-broker marketplaces with unverified postings, our single-client portfolio is directly maintained and managed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#C6A56B]/40 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#C6A56B]/20 text-[#C6A56B] flex items-center justify-center mb-6">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl text-white mb-2 font-medium">
                Residences with Character
              </h3>
              <p className="text-sm text-[#F7F6F2]/75 leading-relaxed">
                Every property in our portfolio is selected for enduring craftsmanship, natural light, thoughtful floorplans, and prime neighborhood placement.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#C6A56B]/40 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#C6A56B]/20 text-[#C6A56B] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl text-white mb-2 font-medium">
                Transparent & Upfront Terms
              </h3>
              <p className="text-sm text-[#F7F6F2]/75 leading-relaxed">
                Clear monthly rent, explicit deposit figures, and authentic photography with zero wide-angle distortion or synthetic styling.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#C6A56B]/40 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#C6A56B]/20 text-[#C6A56B] flex items-center justify-center mb-6">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl text-white mb-2 font-medium">
                Dedicated Leasing Partner
              </h3>
              <p className="text-sm text-[#F7F6F2]/75 leading-relaxed">
                Accompanied walkthroughs with dedicated licensed leasing professionals who know every corner, utility, and neighborhood detail of the property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Editorial Call to Action */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#EFECE4] border border-[#E4E0D6] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
              Your Next Step
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#142B40] mt-2 leading-tight">
              Ready to find a space that feels like home?
            </h2>
            <p className="text-sm text-[#57616C] mt-4 leading-relaxed">
              Explore our current availability in San Francisco and Ohio, or get in touch with our team to arrange an accompanied private walkthrough.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild className="bg-[#142B40] hover:bg-[#1D3A55] text-white px-6 py-3 font-semibold text-sm">
                <Link to="/rentals">
                  <span>Browse Available Homes</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-[#C6A56B]" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-[#142B40] text-[#142B40] hover:bg-[#142B40] hover:text-white px-6 py-3 font-semibold text-sm">
                <Link to="/contact">Request a Consultation</Link>
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-96 aspect-4/3 rounded-xl overflow-hidden shadow-lg border border-white">
            <img
              src={locationImages.sanFrancisco}
              alt="Cozy reading corner in a San Francisco residence"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
