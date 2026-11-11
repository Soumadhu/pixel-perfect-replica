import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Menu, X, ArrowUpRight, ShieldCheck, MapPin } from "lucide-react";
import { useSavedRentals } from "@/hooks/useSavedRentals";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count } = useSavedRentals();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Rentals", to: "/rentals" },
    { label: "San Francisco", to: "/rentals/san-francisco" },
    { label: "Ohio", to: "/rentals/ohio" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#F7F6F2]/95 backdrop-blur-md shadow-xs border-b border-[#E4E0D6]"
            : "bg-[#F7F6F2] border-b border-[#E4E0D6]/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-hidden"
            aria-label="Field & Form Home"
          >
            <div className="w-10 h-10 rounded-xs bg-[#142B40] text-[#C6A56B] flex items-center justify-center font-editorial text-lg tracking-wider font-semibold shadow-xs transition-transform duration-300 group-hover:scale-105">
              F<span className="text-white text-xs">&</span>F
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-[#142B40] leading-none">
                FIELD <span className="font-editorial font-normal italic text-[#C6A56B]">&</span> FORM
              </span>
              <span className="text-[10px] tracking-widest text-[#57616C] uppercase font-medium mt-0.5">
                Residences · SF & Ohio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3.5 py-2 text-sm font-medium text-[#252B32] hover:text-[#142B40] rounded-md transition-colors hover:bg-[#EFECE4]/70 [&.active]:text-[#142B40] [&.active]:font-semibold [&.active]:bg-[#EFECE4]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions on right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin shortcut */}
            <Link
              to="/admin"
              className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-[#57616C] hover:text-[#142B40] px-2.5 py-1.5 rounded border border-[#E4E0D6] hover:bg-[#EFECE4] transition-colors"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A56B]" />
              <span>Admin</span>
            </Link>

            {/* Saved properties icon */}
            <Link
              to="/saved"
              className="relative p-2.5 text-[#252B32] hover:text-[#142B40] hover:bg-[#EFECE4] rounded-full transition-colors focus:outline-hidden"
              aria-label={`Saved properties, ${count} saved`}
              title="Saved properties"
            >
              <Heart
                className={`w-5 h-5 transition-transform duration-200 active:scale-90 ${
                  count > 0 ? "fill-[#C6A56B] text-[#C6A56B]" : "text-[#252B32]"
                }`}
              />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#142B40] text-[#C6A56B] text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs border-2 border-[#F7F6F2] animate-in zoom-in-50 duration-200">
                  {count}
                </span>
              )}
            </Link>

            {/* Find a home CTA */}
            <Button
              asChild
              className="hidden sm:inline-flex bg-[#142B40] hover:bg-[#1D3A55] text-white px-5 py-2 text-sm font-medium rounded-md shadow-xs hover:shadow-md transition-all duration-200"
            >
              <Link to="/rentals">
                <span>Explore Rentals</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 text-[#C6A56B]" />
              </Link>
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#252B32] hover:bg-[#EFECE4] rounded-md transition-colors focus:outline-hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-30 md:hidden bg-[#F7F6F2]/98 backdrop-blur-lg border-t border-[#E4E0D6] flex flex-col justify-between p-6 animate-in slide-in-from-top-4 duration-200 overflow-y-auto">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#57616C] uppercase px-3">
              Explore Collections
            </span>
            <div className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-3 text-base font-medium text-[#252B32] rounded-md hover:bg-[#EFECE4] transition-colors flex items-center justify-between [&.active]:bg-[#EFECE4] [&.active]:font-semibold [&.active]:text-[#142B40]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C6A56B]" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E4E0D6] mt-4">
              <Link
                to="/saved"
                className="px-4 py-3 text-base font-medium text-[#252B32] rounded-md hover:bg-[#EFECE4] transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Heart className={`w-5 h-5 ${count > 0 ? "fill-[#C6A56B] text-[#C6A56B]" : ""}`} />
                  <span>Saved Properties</span>
                </div>
                <span className="bg-[#142B40] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {count}
                </span>
              </Link>

              <Link
                to="/admin"
                className="px-4 py-3 text-base font-medium text-[#252B32] rounded-md hover:bg-[#EFECE4] transition-colors flex items-center justify-between mt-1"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#C6A56B]" />
                  <span>Admin Dashboard</span>
                </div>
                <span className="text-xs text-[#57616C]">Management</span>
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E4E0D6] space-y-3">
            <Button asChild className="w-full bg-[#142B40] text-white py-3">
              <Link to="/rentals">Browse All Properties</Link>
            </Button>
            <div className="text-center text-xs text-[#57616C] flex items-center justify-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C6A56B]" />
              <span>San Francisco, CA & Columbus / Cleveland, OH</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

