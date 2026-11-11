import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { defaultAgents, heroImage, locationImages } from "@/lib/rental-data";
import {
  ShieldCheck,
  CheckCircle2,
  Building2,
  Users,
  Compass,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Field & Form | Curated Rental Residences" },
      {
        name: "description",
        content:
          "Learn about Field & Form's considered approach to residential rental property management and leasing in San Francisco and Ohio.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <SiteLayout>
      {/* 1. About Hero Section */}
      <section className="relative min-h-[460px] lg:min-h-[520px] flex items-center justify-center overflow-hidden bg-[#142B40]">
        <img
          src={heroImage}
          alt="Warm, sun-drenched architectural interior"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#142B40] via-[#142B40]/60 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#C6A56B] text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Our Philosophy</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white font-normal max-w-3xl leading-tight">
            Considered homes. <br />
            <span className="italic text-[#C6A56B]">A more thoughtful way to rent.</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#F7F6F2]/90 max-w-2xl font-light leading-relaxed">
            We believe finding a place to live should feel clear, dignified, and personal. Field & Form stewards a private portfolio of residential residences across San Francisco and Ohio.
          </p>
        </div>
      </section>

      {/* 2. Editorial Narrative Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
              The Field & Form Story
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#142B40] leading-tight">
              More than an address. A place to settle in.
            </h2>
            <div className="w-12 h-0.5 bg-[#C6A56B]" />
          </div>

          <div className="md:col-span-7 space-y-4 text-sm text-[#57616C] leading-relaxed">
            <p className="text-base text-[#252B32] font-medium leading-relaxed">
              In an era dominated by sprawling, multi-agent real estate portals crowded with outdated listings and bait-and-switch advertising, Field & Form was established as a singular alternative.
            </p>
            <p>
              We manage a focused, client-owned portfolio of residential properties across two distinct geographical hubs: the enduring Victorian and Edwardian neighborhoods of San Francisco, and the welcoming porch communities and parkside townhomes of Ohio.
            </p>
            <p>
              By maintaining single-client custody over every residence we publish, we guarantee authentic, current photography, immediate maintenance response, and zero third-party broker markups.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 4-Step Rental Process */}
      <section className="py-20 bg-[#EFECE4] border-y border-[#E4E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
              The Tenant Journey
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#142B40] mt-1">
              A Thoughtful Leasing Process
            </h2>
            <p className="text-xs text-[#57616C] mt-2">
              From your initial digital inquiry to receiving the keys on move-in day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs relative">
              <span className="text-3xl font-editorial font-bold text-[#C6A56B]/40 block mb-3">
                01
              </span>
              <h3 className="font-editorial text-lg text-[#142B40] mb-2 font-medium">
                Explore & Shortlist
              </h3>
              <p className="text-xs text-[#57616C] leading-relaxed">
                Review verified properties with authentic room photography, floor plans, and clear monthly pricing.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs relative">
              <span className="text-3xl font-editorial font-bold text-[#C6A56B]/40 block mb-3">
                02
              </span>
              <h3 className="font-editorial text-lg text-[#142B40] mb-2 font-medium">
                Private Showing
              </h3>
              <p className="text-xs text-[#57616C] leading-relaxed">
                Schedule an accompanied in-person walkthrough or live virtual tour with our licensed regional leasing partner.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs relative">
              <span className="text-3xl font-editorial font-bold text-[#C6A56B]/40 block mb-3">
                03
              </span>
              <h3 className="font-editorial text-lg text-[#142B40] mb-2 font-medium">
                Transparent Application
              </h3>
              <p className="text-xs text-[#57616C] leading-relaxed">
                Direct online vetting with prompt credit and background review. Standard security deposit terms with zero hidden fees.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs relative">
              <span className="text-3xl font-editorial font-bold text-[#C6A56B]/40 block mb-3">
                04
              </span>
              <h3 className="font-editorial text-lg text-[#142B40] mb-2 font-medium">
                Dedicated Stewardship
              </h3>
              <p className="text-xs text-[#57616C] leading-relaxed">
                Seamless digital lease execution, personalized key handover, and responsive ongoing property maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leadership & Regional Leasing Partners */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
            Regional Leadership
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#142B40] mt-1">
            Meet Your Leasing Partners
          </h2>
          <p className="text-xs text-[#57616C] mt-2">
            Local specialists dedicated to finding your ideal residence and stewarding your tenancy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Eleanor Vance */}
          <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <img
              src={defaultAgents.sf.avatar}
              alt={defaultAgents.sf.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-[#C6A56B] shrink-0"
            />
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A56B]">
                California Portfolio
              </span>
              <h3 className="font-editorial text-xl text-[#142B40] font-medium">
                {defaultAgents.sf.name}
              </h3>
              <p className="text-xs text-[#57616C]">{defaultAgents.sf.role}</p>
              <p className="text-xs text-[#57616C] pt-1 leading-relaxed">
                Over 12 years of residential leasing expertise across San Francisco's historic neighborhoods.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#142B40]">
                {defaultAgents.sf.phone} · {defaultAgents.sf.email}
              </div>
            </div>
          </div>

          {/* Marcus Thorne */}
          <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <img
              src={defaultAgents.ohio.avatar}
              alt={defaultAgents.ohio.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-[#C6A56B] shrink-0"
            />
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C6A56B]">
                Midwest Portfolio
              </span>
              <h3 className="font-editorial text-xl text-[#142B40] font-medium">
                {defaultAgents.ohio.name}
              </h3>
              <p className="text-xs text-[#57616C]">{defaultAgents.ohio.role}</p>
              <p className="text-xs text-[#57616C] pt-1 leading-relaxed">
                Champion of Midwest historic preservation, neighborhood connectivity, and tenant care.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#142B40]">
                {defaultAgents.ohio.phone} · {defaultAgents.ohio.email}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-20 bg-[#142B40] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
            Begin Your Search
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
            Discover a home crafted for your everyday rhythms.
          </h2>
          <p className="text-sm text-[#F7F6F2]/80 max-w-xl mx-auto font-light leading-relaxed">
            Browse our current collection of residences in San Francisco and Ohio, or contact our leasing partners directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button asChild className="bg-[#C6A56B] hover:bg-[#B59356] text-[#142B40] font-semibold text-xs px-6 py-3">
              <Link to="/rentals">
                <span>Explore Current Availability</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 text-xs px-6 py-3">
              <Link to="/contact">Get in Touch with our Studio</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

