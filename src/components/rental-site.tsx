import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  House,
  KeyRound,
  LayoutGrid,
  Map,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { rentals, formatRent, heroImage, locationImages, type Rental } from "@/lib/rental-data";

const SAVED_KEY = "field-form-saved-rentals";

function useSavedRentals() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]") as string[]);
    } catch {
      setSaved([]);
    }
    const sync = (event: Event) => setSaved((event as CustomEvent<string[]>).detail);
    window.addEventListener("saved-rentals-change", sync);
    return () => window.removeEventListener("saved-rentals-change", sync);
  }, []);
  const toggle = (slug: string) => {
    const next = saved.includes(slug) ? saved.filter((item) => item !== slug) : [...saved, slug];
    setSaved(next);
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("saved-rentals-change", { detail: next }));
  };
  return { saved, toggle };
}

function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className={`brand${inverted ? " brand-inverted" : ""}`} aria-label="Field & Form home">
      <span className="brand-mark">F<span>&</span>F</span>
      <span className="brand-name">FIELD <i>&</i> FORM</span>
    </Link>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { saved } = useSavedRentals();
  const navItems = [
    ["Rentals", "/rentals"],
    ["San Francisco", "/rentals/san-francisco"],
    ["Ohio", "/rentals/ohio"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ] as const;
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/" className="nav-home">Home</Link>
          {navItems.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
        </nav>
        <div className="nav-actions">
          <Link to="/saved" className="saved-nav" aria-label={`Saved homes, ${saved.length} saved`} title="Saved homes">
            <Heart size={19} strokeWidth={1.7} />
            {saved.length > 0 && <span className="saved-count">{saved.length}</span>}
          </Link>
          <Link to="/rentals" className="nav-find">Find a home <ArrowUpRight size={15} /></Link>
          <Button className="mobile-menu" variant="ghost" size="icon" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)}>{label}<ArrowRight size={16} /></Link>)}<Link to="/saved" onClick={() => setOpen(false)}>Saved homes <Heart size={16} /></Link></nav>}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><Brand inverted /><p>Considered homes. A more thoughtful way to rent.</p></div>
        <div className="footer-column"><span className="footer-label">EXPLORE</span><Link to="/rentals">All rentals</Link><Link to="/rentals/san-francisco">San Francisco</Link><Link to="/rentals/ohio">Ohio</Link></div>
        <div className="footer-column"><span className="footer-label">OUR STUDIO</span><Link to="/about">About us</Link><Link to="/contact">Get in touch</Link><Link to="/saved">Saved homes</Link></div>
        <div className="footer-invite"><span className="footer-label">A PLACE TO BEGIN</span><p>Your next chapter starts with a good address.</p><Link to="/rentals">Explore available homes <ArrowRight size={15} /></Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Field & Form Homes</span><span>San Francisco · Ohio</span><span className="demo-footnote">Demonstration website · Listings shown are illustrative</span></div>
    </footer>
  );
}

function SiteLayout({ children }: { children: ReactNode }) {
  return <><SiteHeader />{children}<SiteFooter /></>;
}

function SectionHeading({ eyebrow, title, link, linkTo = "/rentals" }: { eyebrow: string; title: string; link?: string; linkTo?: string }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{link && <Link to={linkTo} className="text-link">{link}<ArrowRight size={16} /></Link>}</div>;
}

function PropertyCard({ property, featured = false }: { property: Rental; featured?: boolean }) {
  const { saved, toggle } = useSavedRentals();
  const isSaved = saved.includes(property.slug);
  return (
    <article className={`property-card${featured ? " property-card-featured" : ""}`}>
      <div className="property-photo-wrap">
        <Link to="/property/$slug" params={{ slug: property.slug }} className="property-photo-link" aria-label={`View ${property.title}`}>
          <img src={property.photos[0]} alt={`${property.title} rental home`} loading="lazy" width={1200} height={900} />
        </Link>
        <span className={`status-pill${property.status === "Coming soon" ? " status-soon" : ""}`}><span />{property.status}</span>
        <Button size="icon" variant="outline" className={`save-button${isSaved ? " is-saved" : ""}`} aria-label={isSaved ? "Remove from saved homes" : "Save home"} onClick={() => toggle(property.slug)}><Heart size={18} fill={isSaved ? "currentColor" : "none"} /></Button>
        <span className="sample-stamp">DEMO LISTING</span>
      </div>
      <div className="property-info">
        <div className="property-price">{formatRent(property.price)}<span> / month</span></div>
        <Link to="/property/$slug" params={{ slug: property.slug }} className="property-title">{property.title}</Link>
        <div className="property-location"><MapPin size={14} />{property.neighborhood}</div>
        <div className="property-specs"><span><BedDouble size={15} />{property.beds} bd</span><span><Bath size={15} />{property.baths} ba</span><span>{property.sqft.toLocaleString()} sqft</span><Link to="/property/$slug" params={{ slug: property.slug }} aria-label={`View ${property.title}`}><ArrowUpRight size={17} /></Link></div>
      </div>
    </article>
  );
}

function SearchBar({ compact = false }: { compact?: boolean }) {
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const url = `/rentals?location=${encodeURIComponent(location)}&bedrooms=${bedrooms}&maxRent=${maxRent}`;
  return (
    <form className={`search-panel${compact ? " search-panel-compact" : ""}`} action="/rentals" method="get">
      <label className="search-field search-location"><span>LOCATION</span><span className="search-input-line"><MapPin size={17} /><Input name="location" aria-label="Location or ZIP code" placeholder="City, neighborhood or ZIP" value={location} onChange={(e) => setLocation(e.target.value)} /></span></label>
      <label className="search-field"><span>BEDROOMS</span><select name="bedrooms" aria-label="Minimum bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}><option value="">Any</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option></select></label>
      <label className="search-field"><span>MAX. MONTHLY RENT</span><select name="maxRent" aria-label="Maximum monthly rent" value={maxRent} onChange={(e) => setMaxRent(e.target.value)}><option value="">No max</option><option value="2500">$2,500</option><option value="3500">$3,500</option><option value="5000">$5,000</option><option value="6000">$6,000</option></select></label>
      <Button asChild className="search-submit"><a href={url} aria-label="Search rental homes"><Search size={18} />Search homes</a></Button>
    </form>
  );
}

export function HomePage() {
  const featured = [rentals[0], rentals[4], rentals[1]];
  const latest = [...rentals].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 3);
  return <SiteLayout>
    <main>
      <section className="home-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-shade" />
        <div className="hero-content"><span className="hero-kicker"><span /> RESIDENCES, CONSIDERED</span><h1>Find a place you'll<br className="desktop-break" /> love to call <em>home.</em></h1><p>Thoughtfully selected homes in San Francisco and Ohio.</p></div>
        <div className="hero-search"><SearchBar /></div>
        <div className="hero-caption"><span>01 / A HOME WITH ROOM TO BREATHE</span><span>SAN FRANCISCO, CALIFORNIA</span></div>
      </section>
      <section className="home-intro content-width"><span className="eyebrow">A MORE PERSONAL WAY TO RENT</span><p>Good homes make room for the life you want to live. We bring together a considered collection of rentals and a more thoughtful way to find your next one.</p><Link to="/about" className="text-link">A little about us <ArrowRight size={16} /></Link></section>
      <section className="content-section content-width"><SectionHeading eyebrow="A FEW PLACES TO BEGIN" title="Homes worth coming home to." link="See all homes" /><div className="property-grid home-feature-grid">{featured.map((property) => <PropertyCard key={property.slug} property={property} featured />)}</div></section>
      <section className="location-section"><div className="content-width"><SectionHeading eyebrow="TWO PLACES, MANY POSSIBILITIES" title="Find your kind of somewhere." /><div className="location-grid"><Link to="/rentals/san-francisco" className="location-tile"><img src={locationImages.sanFrancisco} alt="Bright San Francisco rental home interior" loading="lazy" width={1200} height={900} /><span className="location-shade" /><span className="location-copy"><span>CALIFORNIA</span><strong>San Francisco</strong><span>Explore the city <ArrowUpRight size={16} /></span></span></Link><Link to="/rentals/ohio" className="location-tile"><img src={locationImages.ohio} alt="Welcoming Ohio home with a front porch" loading="lazy" width={1200} height={900} /><span className="location-shade" /><span className="location-copy"><span>THE BUCKEYE STATE</span><strong>Ohio</strong><span>Explore Ohio <ArrowUpRight size={16} /></span></span></Link></div></div></section>
      <section className="content-section content-width recent-section"><SectionHeading eyebrow="JUST ADDED" title="A fresh look at home." link="Browse all rentals" /><div className="property-grid">{latest.map((property) => <PropertyCard key={property.slug} property={property} />)}</div></section>
      <section className="values-section"><div className="content-width"><div className="values-heading"><span className="eyebrow">THE FIELD & FORM DIFFERENCE</span><h2>Finding a home should<br />feel like the beginning.</h2></div><div className="values-grid"><article><span><House size={21} /></span><h3>Homes with a point of view</h3><p>A thoughtfully gathered collection of residences we know and care about.</p></article><article><span><ShieldCheck size={21} /></span><h3>Clear from the start</h3><p>Helpful details, straightforward expectations, and room to make a considered choice.</p></article><article><span><Sparkles size={21} /></span><h3>A human touch</h3><p>Real help to make your next move feel a little more like coming home.</p></article></div></div></section>
      <section className="home-cta content-width"><div><span className="eyebrow">YOUR NEXT CHAPTER</span><h2>There’s a place<br />waiting for you.</h2><Link to="/rentals" className="cta-link">Find your next home <ArrowRight size={17} /></Link></div><img src={heroImage} alt="A light-filled San Francisco home" loading="lazy" width={1600} height={1000} /></section>
    </main>
  </SiteLayout>;
}

type Filters = { location: string; minRent: string; maxRent: string; bedrooms: string; bathrooms: string; type: string; availability: string; amenity: string };
const emptyFilters: Filters = { location: "", minRent: "", maxRent: "", bedrooms: "", bathrooms: "", type: "", availability: "", amenity: "" };

function RentalFilters({ filters, setFilters, close }: { filters: Filters; setFilters: (f: Filters) => void; close?: () => void }) {
  const update = (key: keyof Filters, value: string) => setFilters({ ...filters, [key]: value });
  return <div className="filter-fields">
    <label className="filter-label">LOCATION<Input placeholder="City, neighborhood or ZIP" value={filters.location} onChange={(e) => update("location", e.target.value)} /></label>
    <div className="filter-pair"><label className="filter-label">MIN. RENT<Input type="number" min="0" placeholder="$ Any" value={filters.minRent} onChange={(e) => update("minRent", e.target.value)} /></label><label className="filter-label">MAX. RENT<Input type="number" min="0" placeholder="$ Any" value={filters.maxRent} onChange={(e) => update("maxRent", e.target.value)} /></label></div>
    <label className="filter-label">BEDROOMS<select value={filters.bedrooms} onChange={(e) => update("bedrooms", e.target.value)}><option value="">Any bedrooms</option><option value="1">1+ bedrooms</option><option value="2">2+ bedrooms</option><option value="3">3+ bedrooms</option></select></label>
    <label className="filter-label">BATHROOMS<select value={filters.bathrooms} onChange={(e) => update("bathrooms", e.target.value)}><option value="">Any bathrooms</option><option value="1">1+ bathrooms</option><option value="2">2+ bathrooms</option><option value="3">3+ bathrooms</option></select></label>
    <label className="filter-label">PROPERTY TYPE<select value={filters.type} onChange={(e) => update("type", e.target.value)}><option value="">All property types</option><option>Apartment</option><option>House</option><option>Condo</option></select></label>
    <label className="filter-label">AVAILABILITY<select value={filters.availability} onChange={(e) => update("availability", e.target.value)}><option value="">Any availability</option><option>Available</option><option>Coming soon</option></select></label>
    <label className="filter-label">AMENITIES<select value={filters.amenity} onChange={(e) => update("amenity", e.target.value)}><option value="">Any amenity</option>{["Pet friendly", "In-unit laundry", "Dishwasher", "Private yard", "Garage"].map((a) => <option key={a}>{a}</option>)}</select></label>
    {close && <Button className="filter-done" onClick={close}>Show homes <ArrowRight size={16} /></Button>}
  </div>;
}

export function RentalsPage({ city }: { city?: "San Francisco" | "Ohio" }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "map">("grid");
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters((current) => ({ ...current, location: params.get("location") ?? "", bedrooms: params.get("bedrooms") ?? "", maxRent: params.get("maxRent") ?? "" }));
  }, []);
  const filtered = useMemo(() => rentals.filter((item) => {
    const q = filters.location.trim().toLowerCase();
    return (!city || item.city === city) && (!q || `${item.city} ${item.neighborhood} ${item.zip} ${item.title}`.toLowerCase().includes(q)) && (!filters.minRent || item.price >= Number(filters.minRent)) && (!filters.maxRent || item.price <= Number(filters.maxRent)) && (!filters.bedrooms || item.beds >= Number(filters.bedrooms)) && (!filters.bathrooms || item.baths >= Number(filters.bathrooms)) && (!filters.type || item.type === filters.type) && (!filters.availability || item.status === filters.availability) && (!filters.amenity || item.amenities.includes(filters.amenity));
  }), [filters, city]);
  const sorted = useMemo(() => [...filtered].sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : b.added.localeCompare(a.added)), [filtered, sort]);
  const activeCount = Object.values(filters).filter(Boolean).length;
  const title = city ? `${city} rentals` : "Find your next home";
  const clear = () => setFilters(emptyFilters);
  return <SiteLayout><main className="listing-page">
    <div className="listing-top content-width"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span>{city ? <><Link to="/rentals">Rentals</Link><span>/</span><b>{city}</b></> : <b>Rentals</b>}</div><span className="sample-notice"><span /> DEMONSTRATION LISTINGS</span></div>
    <section className="listing-intro content-width"><span className="eyebrow">A MORE CONSIDERED COLLECTION</span><h1>{title}<span>.</span></h1><p>{city === "San Francisco" ? "Find your place in the neighborhoods, character, and everyday rhythm of San Francisco." : city === "Ohio" ? "Explore welcoming homes, leafy streets, and a little more room to breathe across Ohio." : "Thoughtfully selected rentals in San Francisco and Ohio, ready for what comes next."}</p></section>
    <section className="listing-layout content-width">
      <aside className="filter-sidebar"><div className="filter-title"><span>REFINE YOUR SEARCH</span><SlidersHorizontal size={17} /></div><RentalFilters filters={filters} setFilters={setFilters} /><Button variant="ghost" className="clear-filters" onClick={clear}>Clear all filters</Button></aside>
      <div className="results-area"><div className="results-toolbar"><span className="results-count"><b>{sorted.length}</b> homes <span>in our collection</span></span><div className="results-actions"><Button variant="outline" className="mobile-filter-trigger" onClick={() => setDrawer(true)}><SlidersHorizontal size={16} /> Filters{activeCount > 0 && ` (${activeCount})`}</Button><label className="sort-control"><ArrowDownWideNarrow size={16} /><span>Sort:</span><select aria-label="Sort homes" value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label><div className="view-switch"><Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")}><LayoutGrid size={17} /></Button><Button variant={view === "map" ? "secondary" : "ghost"} size="icon" aria-label="Map view" aria-pressed={view === "map"} onClick={() => setView("map")}><Map size={17} /></Button></div></div></div>
        {activeCount > 0 && <div className="active-filters"><span>Filters applied</span>{Object.entries(filters).filter(([, value]) => value).map(([key, value]) => <button key={key} onClick={() => setFilters({ ...filters, [key]: "" })}>{value}<X size={13} /></button>)}<Button variant="link" onClick={clear}>Clear all</Button></div>}
        {sorted.length ? <div className={`property-grid results-grid${view === "map" ? " map-view-grid" : ""}`}>{sorted.map((property) => <PropertyCard key={property.slug} property={property} />)}</div> : <div className="empty-state"><span><Search size={23} /></span><h2>No homes found this time.</h2><p>Try changing your filters to see more of our collection.</p><Button variant="outline" onClick={clear}>Clear filters</Button></div>}
        {view === "map" && <div className="map-note"><MapPin size={17} /><span>Browse by neighborhood above. Pin locations are not shown for demonstration listings.</span></div>}
      </div>
    </section>
    {drawer && <div className="filter-overlay" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setDrawer(false); }}><section className="filter-drawer" aria-label="Filter homes"><div className="drawer-heading"><h2>Filter homes</h2><Button variant="ghost" size="icon" aria-label="Close filters" onClick={() => setDrawer(false)}><X /></Button></div><RentalFilters filters={filters} setFilters={setFilters} close={() => setDrawer(false)} /><Button variant="link" onClick={clear}>Clear all filters</Button></section></div>}
  </main></SiteLayout>;
}

export function LocationPage({ city }: { city: "San Francisco" | "Ohio" }) {
  const isSF = city === "San Francisco";
  const image = isSF ? locationImages.sanFrancisco : locationImages.ohio;
  const intro = isSF ? "A city of neighborhood rituals, morning light, and unexpected little corners. Find a home that feels like yours." : "Room for familiar routines, tree-lined streets, and a little more breathing room. Find a home to grow into.";
  const properties = rentals.filter((r) => r.city === city);
  return <SiteLayout><main><section className="location-hero" style={{ backgroundImage: `url(${image})` }}><div className="hero-shade" /><div className="location-hero-copy"><span className="hero-kicker"><span /> OUR COLLECTION · {isSF ? "CALIFORNIA" : "THE MIDWEST"}</span><h1>Make yourself<br /><em>at home</em> in {city}.</h1><p>{intro}</p><Link to="/rentals" className="hero-outline-link">Explore homes <ArrowRight size={16} /></Link></div><span className="location-hero-caption">{city.toUpperCase()} · A PLACE TO BEGIN</span></section>
    <section className="local-intro content-width"><span className="eyebrow">A LITTLE ABOUT {city.toUpperCase()}</span><p>{isSF ? "From classic city flats to bright, easygoing retreats, our San Francisco homes invite you to find a neighborhood that feels like your own." : "From welcoming front porches to flexible rooms for everyday life, our Ohio homes make it easier to find a place that fits."}</p><span className="local-note">Our current collection features {properties.length} sample residences.</span></section>
    <section className="content-section content-width"><SectionHeading eyebrow={`THE ${city.toUpperCase()} COLLECTION`} title="A few places to begin." /><div className="property-grid">{properties.map((property) => <PropertyCard key={property.slug} property={property} />)}</div></section>
    <section className="location-faq content-width"><span className="eyebrow">A FEW HELPFUL DETAILS</span><h2>Before you settle in.</h2><div className="faq-grid"><article><h3>How do I arrange a visit?</h3><p>Open any home to send a private tour request. In this preview, requests are not sent or stored.</p></article><article><h3>Are these available homes?</h3><p>Homes and prices shown here are illustrative samples, not actual availability or offers to rent.</p></article><article><h3>Can I save a home?</h3><p>Yes. Tap the heart on any listing to keep it in your saved homes on this device.</p></article></div></section>
  </main></SiteLayout>;
}

function Gallery({ property }: { property: Rental }) {
  const [index, setIndex] = useState(0);
  const [full, setFull] = useState(false);
  const step = (offset: number) => setIndex((index + offset + property.photos.length) % property.photos.length);
  useEffect(() => {
    if (!full) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setFull(false); if (event.key === "ArrowRight") step(1); if (event.key === "ArrowLeft") step(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [full, index]);
  return <><div className="gallery-main"><button className="gallery-image-button" onClick={() => setFull(true)} aria-label="Open full-screen photo"><img src={property.photos[index]} alt={`${property.title}, photo ${index + 1}`} width={1200} height={900} /><span><Camera size={16} /> View all photos</span></button><div className="gallery-thumbs">{property.photos.map((photo, i) => <Button key={photo} variant="ghost" aria-label={`Show photo ${i + 1}`} aria-pressed={index === i} className={index === i ? "thumb-active" : ""} onClick={() => setIndex(i)}><img src={photo} alt="" width={1200} height={900} /></Button>)}</div><div className="gallery-controls"><Button variant="outline" size="icon" aria-label="Previous photo" onClick={() => step(-1)}><ChevronLeft /></Button><span>{index + 1} / {property.photos.length}</span><Button variant="outline" size="icon" aria-label="Next photo" onClick={() => step(1)}><ChevronRight /></Button></div></div>{full && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Property photos"><Button variant="ghost" size="icon" className="lightbox-close" aria-label="Close photo viewer" onClick={() => setFull(false)}><X /></Button><Button variant="outline" size="icon" aria-label="Previous photo" onClick={() => step(-1)}><ChevronLeft /></Button><img src={property.photos[index]} alt={`${property.title}, photo ${index + 1}`} width={1200} height={900} /><Button variant="outline" size="icon" aria-label="Next photo" onClick={() => step(1)}><ChevronRight /></Button><span className="lightbox-count">{index + 1} / {property.photos.length}</span></div>}</>;
}

export function PropertyPage({ slug }: { slug: string }) {
  const property = rentals.find((home) => home.slug === slug);
  if (!property) return <SiteLayout><main className="not-found content-width"><span className="eyebrow">A LITTLE DETOUR</span><h1>This home has moved on.</h1><p>Explore the rest of our collection and find another place to begin.</p><Link to="/rentals" className="text-link">Browse all homes <ArrowRight size={16} /></Link></main></SiteLayout>;
  const { saved, toggle } = useSavedRentals();
  const [sent, setSent] = useState(false);
  const similar = rentals.filter((home) => home.city === property.city && home.slug !== property.slug).slice(0, 2);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <SiteLayout><main className="detail-page content-width"><div className="breadcrumbs detail-breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/rentals">Rentals</Link><span>/</span><b>{property.neighborhood}</b></div><div className="detail-heading"><div><span className="eyebrow">{property.city.toUpperCase()} · DEMO LISTING</span><h1>{property.title}</h1><p><MapPin size={16} />{property.address}</p></div><Button variant="outline" className={`detail-save${saved.includes(property.slug) ? " is-saved" : ""}`} onClick={() => toggle(property.slug)}><Heart size={17} fill={saved.includes(property.slug) ? "currentColor" : "none"} />{saved.includes(property.slug) ? "Saved" : "Save home"}</Button></div>
    <Gallery property={property} />
    <div className="detail-columns"><div className="detail-primary"><div className="detail-price-row"><div><strong>{formatRent(property.price)}</strong><span> / month</span></div><span className="status-pill"><span />{property.status}</span></div><div className="detail-specs"><span><BedDouble />{property.beds} bedrooms</span><span><Bath />{property.baths} bathrooms</span><span><Building2 />{property.sqft.toLocaleString()} sq ft</span><span><House />{property.type}</span></div><section className="detail-section"><span className="eyebrow">A PLACE TO MAKE YOURS</span><h2>About this home</h2><p>{property.description}</p><p className="available-line"><CalendarDays size={17} />{property.available}</p></section><section className="detail-section amenities-section"><span className="eyebrow">THE THOUGHTFUL DETAILS</span><h2>Home comforts</h2><div className="amenities-list">{property.amenities.map((amenity) => <span key={amenity}><Check size={16} />{amenity}</span>)}</div></section><section className="detail-section fees-section"><span className="eyebrow">GOOD TO KNOW</span><h2>At a glance</h2><div><span>Security deposit</span><b>{formatRent(property.deposit)}</b></div><div><span>Application fee <small>(illustrative)</small></span><b>{formatRent(property.applicationFee)}</b></div></section><section className="detail-section detail-location"><span className="eyebrow">THE NEIGHBORHOOD</span><h2>{property.neighborhood}</h2><div className="location-placeholder"><MapPin size={22} /><span>Public location area only</span><small>Exact address details are not provided in this preview.</small></div></section></div>
    <aside className="enquiry-card"><span className="eyebrow">YOUR NEXT STEP</span><h2>Come see if it feels like home.</h2><p>Tell us a little about yourself and the timing that works for you.</p>{sent ? <div className="form-success"><span><Check /></span><h3>Request noted</h3><p>This is a demonstration website; your request has not been sent.</p><Button variant="outline" onClick={() => setSent(false)}>Send another request</Button></div> : <form onSubmit={submit}><label>Your name<Input required placeholder="Name" autoComplete="name" /></label><label>Email address<Input required type="email" placeholder="you@example.com" autoComplete="email" /></label><label>Preferred visit date<Input required type="date" /></label><label>A note <textarea rows={3} placeholder="Anything you'd like us to know?" /></label><Button className="enquiry-submit" type="submit">Request a private tour <ArrowRight size={16} /></Button><span className="enquiry-note"><ShieldCheck size={14} /> A preview only — no message will be sent.</span></form>}</aside></div>
    {similar.length > 0 && <section className="content-section similar-section"><SectionHeading eyebrow="MORE PLACES TO CONSIDER" title="You might feel at home here, too." link="Explore all homes" /><div className="property-grid">{similar.map((home) => <PropertyCard key={home.slug} property={home} />)}</div></section>}
  </main><div className="mobile-enquiry-bar"><span><b>{formatRent(property.price)}</b> / month</span><a href="#tour-request">Request a tour <ArrowRight size={15} /></a></div></SiteLayout>;
}

export function SavedPage() {
  const { saved } = useSavedRentals();
  const homes = rentals.filter((home) => saved.includes(home.slug));
  return <SiteLayout><main className="saved-page content-width"><span className="eyebrow">YOUR SHORTLIST</span><h1>Saved homes<span>.</span></h1><p className="page-lede">A few places you might like to call your own.</p>{homes.length ? <div className="property-grid saved-grid">{homes.map((home) => <PropertyCard key={home.slug} property={home} />)}</div> : <div className="empty-state saved-empty"><span><Heart size={23} /></span><h2>A little room for something lovely.</h2><p>Tap the heart on a home you like, and it’ll be here when you’re ready.</p><Link to="/rentals" className="text-link">Explore our homes <ArrowRight size={16} /></Link></div>}</main></SiteLayout>;
}

export function AboutPage() {
  return <SiteLayout><main className="about-page"><section className="about-hero content-width"><div><span className="eyebrow">A MORE HUMAN WAY HOME</span><h1>Good homes.<br /><em>Better beginnings.</em></h1><p>We believe finding a place to live should feel thoughtful, clear, and a little more personal.</p><Link to="/rentals" className="solid-link">Meet the collection <ArrowRight size={16} /></Link></div><img src={heroImage} alt="Soft evening light in a San Francisco home" width={1600} height={1000} /></section><section className="about-story content-width"><div><span className="eyebrow">OUR POINT OF VIEW</span><h2>It’s more than<br />an address.</h2></div><div><p className="story-lede">A home is where everyday life takes shape. The small rituals, the fresh starts, the things you didn’t know you were looking for.</p><p>Field & Form is a considered collection of residential rentals in San Francisco and Ohio. We bring care to the details, clarity to the process, and a human perspective to finding the right fit.</p><p>This preview uses illustrative homes while our collection is being prepared.</p></div></section><section className="about-process"><div className="content-width"><span className="eyebrow">A THOUGHTFUL PROCESS</span><h2>One step at a time.</h2><div className="process-grid"><article><span>01</span><h3>Find your fit</h3><p>Explore homes by neighborhood, price, and the little details that matter to you.</p></article><article><span>02</span><h3>Get to know the home</h3><p>Review the details, save your favorites, and imagine how each space might work.</p></article><article><span>03</span><h3>Come take a look</h3><p>Request a private tour and take the next step at a pace that feels right.</p></article></div></div></section><section className="about-bottom content-width"><div><span className="eyebrow">TWO PLACES TO CALL HOME</span><h2>Rooted in San Francisco<br />and Ohio.</h2></div><div><p>Distinct places, each with their own pace and character. Wherever you're headed, we’re here to make the search feel a little more like home.</p><Link to="/contact" className="text-link">Start a conversation <ArrowRight size={16} /></Link></div></section></main></SiteLayout>;
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <SiteLayout><main className="contact-page content-width"><div className="contact-intro"><span className="eyebrow">WE’RE HERE TO HELP</span><h1>Let’s find your<br /><em>next place.</em></h1><p>Tell us what you’re looking for. We’d love to help you find a place that feels right.</p><div className="contact-service-area"><MapPin size={18} /><span>San Francisco, California<br />Ohio</span></div></div><section className="contact-form-wrap"><span className="eyebrow">A NOTE TO OUR TEAM</span>{sent ? <div className="form-success contact-success"><span><Check /></span><h2>Thank you for your note.</h2><p>This is a demonstration website; your message has not been sent or stored.</p><Button variant="outline" onClick={() => setSent(false)}>Write another note</Button></div> : <form onSubmit={submit} className="contact-form"><label>Your name<Input required placeholder="Name" autoComplete="name" /></label><label>Email address<Input required type="email" placeholder="you@example.com" autoComplete="email" /></label><label>What can we help with?<select defaultValue=""><option value="" disabled>Choose a topic</option><option>Finding a home</option><option>Scheduling a tour</option><option>Something else</option></select></label><label>Your message<textarea rows={5} required placeholder="Tell us a little about what you're looking for…" /></label><Button type="submit">Send your message <ArrowRight size={16} /></Button><p className="form-disclaimer">Preview form only — no message will be sent.</p></form>}</section></main></SiteLayout>;
}

export function AdminPage() {
  const [tab, setTab] = useState("Properties");
  const items = tab === "Properties" ? rentals.slice(0, 5).map((p) => ({ name: p.title, place: p.city, status: p.status, detail: formatRent(p.price) + " / mo" })) : [];
  return <div className="admin-shell"><aside className="admin-sidebar"><Brand inverted /><span className="admin-workspace">DEMO WORKSPACE</span>{["Overview", "Properties", "Enquiries", "Tour requests", "Media", "Locations", "SEO settings"].map((item) => <Button key={item} variant="ghost" className={tab === item ? "admin-active" : ""} onClick={() => setTab(item)}>{item}</Button>)}<Link to="/" className="admin-return"><ArrowRight size={15} /> Return to website</Link></aside><main className="admin-main"><div className="admin-topbar"><span>Property management / {tab}</span><span className="admin-preview-tag">FRONTEND PREVIEW · NO SIGN-IN</span></div><div className="admin-content"><span className="eyebrow">FIELD & FORM · ADMIN PREVIEW</span><h1>{tab === "Overview" ? "Good morning." : tab}</h1><p className="admin-lede">A preview of the private property workspace. No account or live data is connected.</p><div className="admin-stats"><article><span>LISTINGS IN PREVIEW</span><strong>{rentals.length}</strong><small>Illustrative sample homes</small></article><article><span>TOUR REQUESTS</span><strong>—</strong><small>No real requests received</small></article><article><span>ENQUIRIES</span><strong>—</strong><small>No real messages received</small></article></div>{tab === "Properties" || tab === "Overview" ? <section className="admin-table-wrap"><div className="admin-table-title"><h2>Sample properties</h2><span>DEMO DATA</span></div><table><thead><tr><th>PROPERTY</th><th>LOCATION</th><th>STATUS</th><th>MONTHLY RENT</th></tr></thead><tbody>{items.map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.place}</td><td><span className="admin-status">{item.status}</span></td><td>{item.detail}</td></tr>)}</tbody></table></section> : <div className="admin-empty"><span><KeyRound size={22} /></span><h2>{tab} workspace preview</h2><p>This section will be ready when private property management is connected.</p><span>NO LIVE DATA</span></div>}</div></main></div>;
}