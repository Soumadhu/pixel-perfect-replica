import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Mail, Phone, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#142B40] text-[#F7F6F2] border-t border-[#1D3A55]">
      {/* Top invitation banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              A Place to Begin
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-white mt-2">
              Your next chapter begins with an intentional address.
            </h3>
            <p className="text-sm text-[#F7F6F2]/75 mt-2">
              Explore our curated portfolio of residential rental residences across California and Ohio.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/rentals"
              className="inline-flex items-center gap-2 bg-[#C6A56B] hover:bg-[#B59356] text-[#142B40] font-semibold text-sm px-5 py-3 rounded-md transition-colors shadow-sm"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium text-sm px-5 py-3 rounded-md transition-colors"
            >
              <span>Speak with an Agent</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xs bg-white text-[#142B40] flex items-center justify-center font-editorial text-lg tracking-wider font-semibold">
                F<span className="text-[#C6A56B] text-xs">&</span>F
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                FIELD <span className="font-editorial italic font-normal text-[#C6A56B]">&</span> FORM
              </span>
            </div>
            <p className="text-sm text-[#F7F6F2]/75 max-w-sm leading-relaxed">
              A single-client property management and leasing studio presenting considered, architectural residences in San Francisco and Ohio. Built on clarity, authentic photography, and dedicated tenant stewardship.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-[#F7F6F2]/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C6A56B] shrink-0" />
                <span>San Francisco: Pacific Heights · Marina · Noe Valley · Mission</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C6A56B] shrink-0" />
                <span>Ohio: Columbus (Clintonville, Dublin, German Village) · Cleveland</span>
              </div>
            </div>
          </div>

          {/* Column 1: Rentals */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              Properties
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F7F6F2]/80">
              <li>
                <Link to="/rentals" className="hover:text-white transition-colors">
                  All Residences
                </Link>
              </li>
              <li>
                <Link to="/rentals/san-francisco" className="hover:text-white transition-colors">
                  San Francisco Portfolio
                </Link>
              </li>
              <li>
                <Link to="/rentals/ohio" className="hover:text-white transition-colors">
                  Ohio Portfolio
                </Link>
              </li>
              <li>
                <Link to="/rentals" search={{ status: "Available" }} className="hover:text-white transition-colors">
                  Immediate Availability
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#C6A56B]" />
                  <span>Saved Properties</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Studio */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              The Agency
            </h4>
            <ul className="space-y-2.5 text-sm text-[#F7F6F2]/80">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Field & Form
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Leasing Process
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Request Private Tour
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Office
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6A56B]" />
                  <span>Admin Workspace</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C6A56B] font-semibold">
              Offices & Inquiries
            </h4>
            <div className="space-y-3 text-sm text-[#F7F6F2]/80">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A56B] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#F7F6F2]/60">San Francisco Office</p>
                  <p className="text-white font-medium">(415) 890-4210</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A56B] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#F7F6F2]/60">Midwest / Ohio Office</p>
                  <p className="text-white font-medium">(614) 732-9014</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C6A56B] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#F7F6F2]/60">General Inquiries</p>
                  <p className="text-white font-medium">inquiries@fieldandform.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimers */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F7F6F2]/60">
          <p>© 2026 Field & Form Residences. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Single-client managed property portfolio
            </span>
            <span>San Francisco, CA · Columbus & Cleveland, OH</span>
            <span className="text-[#C6A56B]/90 font-medium">Demonstration Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

