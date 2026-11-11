import heroPhoto from "@/assets/rental-hero.jpg";
import cityHomePhoto from "@/assets/rental-city.jpg";
import ohioHomePhoto from "@/assets/rental-ohio.jpg";

export type PropertyType = "Apartment" | "House" | "Condo" | "Townhome";
export type PropertyStatus = "Available" | "Coming soon" | "Pending";

export type AgentInfo = {
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
};

export type Rental = {
  slug: string;
  title: string;
  tagline: string;
  city: "San Francisco" | "Ohio";
  region: string;
  neighborhood: string;
  address: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: PropertyType;
  status: PropertyStatus;
  available: string;
  deposit: number;
  applicationFee: number;
  description: string;
  longDescription: string[];
  amenities: string[];
  features: {
    petPolicy: string;
    parking: string;
    laundry: string;
    heatingCooling: string;
    leaseTerm: string;
  };
  scores: {
    walk: number;
    transit: number;
    bike: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  photos: string[];
  videoThumbnail: string;
  videoDuration: string;
  agent: AgentInfo;
  added: string;
  featured?: boolean;
};

export const defaultAgents: Record<string, AgentInfo> = {
  sf: {
    name: "Eleanor Vance",
    role: "Senior Leasing Partner, California",
    phone: "(415) 890-4210",
    email: "e.vance@fieldandform.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  ohio: {
    name: "Marcus Thorne",
    role: "Regional Director, Midwest",
    phone: "(614) 732-9014",
    email: "m.thorne@fieldandform.com",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  },
};

export const rentals: Rental[] = [
  {
    slug: "pacific-heights-residence",
    title: "Light-filled Pacific Heights Residence",
    tagline: "Panoramic bay views, classic bay windows, and refined modern finishes.",
    city: "San Francisco",
    region: "Bay Area",
    neighborhood: "Pacific Heights",
    address: "Pacific Heights, San Francisco, CA",
    zip: "94115",
    price: 4850,
    beds: 2,
    baths: 2,
    sqft: 1280,
    type: "Apartment",
    status: "Available",
    available: "Available now",
    deposit: 4850,
    applicationFee: 45,
    description:
      "A gracious home with bay-window light, thoughtful finishes, and room to settle in. Enjoy an easy neighborhood rhythm with cafés, parks, and everyday essentials close by.",
    longDescription: [
      "Perched on a serene, tree-lined block of prestigious Pacific Heights, this residence marries quintessential San Francisco architectural character with contemporary tranquility.",
      "The airy living salon features oversized bay windows capturing crisp morning sunlight, original coved ceilings, and wide-plank white oak flooring. The chef's kitchen offers custom millwork, honed Carrara marble counters, and integrated Bosch appliances.",
      "The primary suite overlooks a quiet landscaped courtyard with an en-suite bath clad in artisanal tiles and brass hardware. Located steps from Fillmore Street’s bespoke boutiques, Alta Plaza Park, and neighborhood dining."
    ],
    amenities: [
      "In-unit laundry",
      "Dishwasher",
      "Hardwood floors",
      "Pet friendly",
      "Natural light",
      "Central heating",
      "Dedicated storage",
      "High-speed fiber ready"
    ],
    features: {
      petPolicy: "Cats and small dogs welcome (up to 2 pets, under 45 lbs)",
      parking: "1 dedicated garage parking space available",
      laundry: "In-unit washer and dryer",
      heatingCooling: "Radiant heat with smart Nest thermostat",
      leaseTerm: "12-month standard lease",
    },
    scores: { walk: 94, transit: 88, bike: 76 },
    coordinates: { lat: 37.7925, lng: -122.4382 },
    photos: [
      heroPhoto,
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=85",
      cityHomePhoto,
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    videoDuration: "2:45",
    agent: defaultAgents.sf,
    added: "2026-11-10",
    featured: true,
  },
  {
    slug: "marina-corner-flat",
    title: "Sunny Corner Flat near Marina Green",
    tagline: "Golden hour glow, curated dining nook, and steps to the waterfront promenade.",
    city: "San Francisco",
    region: "Bay Area",
    neighborhood: "Marina District",
    address: "Marina District, San Francisco, CA",
    zip: "94123",
    price: 3950,
    beds: 1,
    baths: 1,
    sqft: 840,
    type: "Apartment",
    status: "Available",
    available: "Available Dec 1",
    deposit: 3950,
    applicationFee: 45,
    description:
      "An airy corner home with a calm palette and a welcoming dining nook. A lovely starting point for exploring the Marina and nearby waterfront paths.",
    longDescription: [
      "Flooded with dual-exposure western and northern light, this thoughtfully restored Marina flat exemplifies relaxed coastal city living.",
      "A warm palette of chalk whites and natural woods is complemented by an oversized bay dining area perfect for morning coffee and entertaining. Includes an efficient gourmet galley kitchen and an updated spa bathroom.",
      "Enjoy weekend strolls across the Marina Green, runs to Crissy Field, and spontaneous dinners along Chestnut and Union streets."
    ],
    amenities: [
      "Dishwasher",
      "Hardwood floors",
      "Natural light",
      "Bike storage",
      "Walk-in closet",
      "Intercom entry",
      "Double-pane acoustic windows"
    ],
    features: {
      petPolicy: "Cats allowed upon review",
      parking: "Street parking with 'A' residential permit",
      laundry: "On-site high-efficiency laundry facility",
      heatingCooling: "Central steam heat included in rent",
      leaseTerm: "12-month standard lease",
    },
    scores: { walk: 96, transit: 82, bike: 91 },
    coordinates: { lat: 37.8016, lng: -122.4385 },
    photos: [
      cityHomePhoto,
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
      heroPhoto,
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    videoDuration: "1:50",
    agent: defaultAgents.sf,
    added: "2026-11-08",
    featured: true,
  },
  {
    slug: "noe-valley-garden-home",
    title: "Garden-Level Sanctuary in Noe Valley",
    tagline: "Private patio sanctuary with floor-to-ceiling glass and leafy views.",
    city: "San Francisco",
    region: "Bay Area",
    neighborhood: "Noe Valley",
    address: "Noe Valley, San Francisco, CA",
    zip: "94114",
    price: 5600,
    beds: 3,
    baths: 2,
    sqft: 1540,
    type: "Condo",
    status: "Coming soon",
    available: "Available Dec 15",
    deposit: 5600,
    applicationFee: 45,
    description:
      "A comfortable, generously proportioned home with a private garden retreat. A versatile layout makes space for slow mornings, dinner with friends, and working from home.",
    longDescription: [
      "Nestled on the sunnier microclimate slopes of Noe Valley, this garden home provides an expansive three-bedroom sanctuary with direct indoor-outdoor transition.",
      "French doors open from the open-concept living pavilion onto a cedar deck and landscaped drought-tolerant private garden framed by Japanese maples.",
      "Features a chef-grade gas range, radiant heated bathroom floors, an executive home office alcove, and bespoke built-ins throughout."
    ],
    amenities: [
      "In-unit laundry",
      "Dishwasher",
      "Private garden",
      "Pet friendly",
      "Wine cooler",
      "Gas fireplace",
      "EV charger ready"
    ],
    features: {
      petPolicy: "Pets warmly welcomed with deposit",
      parking: "Attached 1-car EV-ready private garage",
      laundry: "Full-sized side-by-side Samsung washer & dryer",
      heatingCooling: "Multi-zone ductless heat pump with cooling",
      leaseTerm: "12-month lease with renewal option",
    },
    scores: { walk: 91, transit: 84, bike: 74 },
    coordinates: { lat: 37.7502, lng: -122.4337 },
    photos: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
      heroPhoto,
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=85",
      cityHomePhoto,
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
    videoDuration: "3:10",
    agent: defaultAgents.sf,
    added: "2026-11-06",
  },
  {
    slug: "presidio-heights-retreat",
    title: "Quiet Retreat with Classic Millwork",
    tagline: "Edwardian proportions, fireplace mantel, and quiet courtyard garden.",
    city: "San Francisco",
    region: "Bay Area",
    neighborhood: "Presidio Heights",
    address: "Presidio Heights, San Francisco, CA",
    zip: "94118",
    price: 4400,
    beds: 2,
    baths: 1,
    sqft: 1120,
    type: "Apartment",
    status: "Available",
    available: "Available now",
    deposit: 4400,
    applicationFee: 45,
    description:
      "A peaceful apartment with enduring character, generous windows, and an inviting living room. A lovely fit for a slower, more spacious city routine.",
    longDescription: [
      "Situated in the tranquil enclave of Presidio Heights, this top-floor classic home commands quiet serenity just blocks from the national park trails.",
      "Highlights include handsome pocket doors, a decorative limestone hearth, and a formal dining room that functions effortlessly as a creative workspace.",
      "Walk to the Presidio promenade, Sacramento Street patisseries, and gourmet grocers."
    ],
    amenities: [
      "Hardwood floors",
      "Dishwasher",
      "Natural light",
      "Storage",
      "Intercom",
      "Ceiling fans"
    ],
    features: {
      petPolicy: "Cats welcome",
      parking: "Covered carport space included",
      laundry: "Private washer/dryer in basement suite",
      heatingCooling: "Hydronic baseboard heating",
      leaseTerm: "12 or 24-month lease",
    },
    scores: { walk: 89, transit: 79, bike: 78 },
    coordinates: { lat: 37.7885, lng: -122.4514 },
    photos: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
      cityHomePhoto,
      heroPhoto,
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    videoDuration: "2:05",
    agent: defaultAgents.sf,
    added: "2026-11-03",
  },
  {
    slug: "mission-dolores-loft",
    title: "Designer Mission Dolores Loft",
    tagline: "Industrial elegance, soaring timber ceilings, and sunny private balcony.",
    city: "San Francisco",
    region: "Bay Area",
    neighborhood: "Mission Dolores",
    address: "Mission Dolores, San Francisco, CA",
    zip: "94110",
    price: 5200,
    beds: 2,
    baths: 2,
    sqft: 1350,
    type: "Condo",
    status: "Available",
    available: "Available Jan 1",
    deposit: 5200,
    applicationFee: 45,
    description:
      "An architecturally stunning conversion loft in the cultural heart of the city. Combines dramatic exposed steel beams with warm organic textures.",
    longDescription: [
      "A rare architectural jewel converted from a historic printworks, this bi-level loft boasts dramatic 16-foot ceiling heights and floor-to-ceiling industrial sash windows.",
      "The upper mezzanine sleeping quarter overlooks the voluminous living gallery, accompanied by a custom walk-in dressing suite and spa wet room.",
      "Located half a block from Dolores Park, world-class bakeries, and seamless tech shuttle and BART access."
    ],
    amenities: [
      "In-unit laundry",
      "Dishwasher",
      "Private balcony",
      "Pet friendly",
      "Central A/C",
      "Keyless entry",
      "Secure bike room"
    ],
    features: {
      petPolicy: "All pets welcome without breed restrictions",
      parking: "Underground deeded parking space with EV charger",
      laundry: "In-unit LG stackable washer/dryer",
      heatingCooling: "Central HVAC system with climate zoning",
      leaseTerm: "12-month lease",
    },
    scores: { walk: 98, transit: 95, bike: 99 },
    coordinates: { lat: 37.7601, lng: -122.427 },
    photos: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85",
      heroPhoto,
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    videoDuration: "2:30",
    agent: defaultAgents.sf,
    added: "2026-11-11",
    featured: true,
  },
  {
    slug: "columbus-brick-home",
    title: "Restored Historic Brick Craftsman",
    tagline: "Wrap-around front porch, mature sugar maples, and open artisan kitchen.",
    city: "Ohio",
    region: "Columbus Metro",
    neighborhood: "Clintonville",
    address: "Clintonville, Columbus, OH",
    zip: "43214",
    price: 2450,
    beds: 3,
    baths: 2,
    sqft: 1760,
    type: "House",
    status: "Available",
    available: "Available now",
    deposit: 2450,
    applicationFee: 35,
    description:
      "A classic brick home with a generous porch, mature trees, and welcoming rooms for gathering. Updated comforts meet the quiet charm of a leafy neighborhood.",
    longDescription: [
      "Set along a tranquil, tree-arched avenue in central Clintonville, this 1920s brick craftsman has undergone an exacting, conservation-focused renovation.",
      "The expansive wrap-around front porch invites evening relaxation, while the interior reveals refinished heart-pine floorboards, exposed masonry, and custom cabinetry.",
      "A private fenced backyard with established perennial borders and a detached two-car garage complete this welcoming residence."
    ],
    amenities: [
      "In-unit laundry",
      "Dishwasher",
      "Private yard",
      "Pet friendly",
      "Driveway",
      "Garage",
      "Basement storage",
      "Central A/C"
    ],
    features: {
      petPolicy: "Cats and dogs welcome, large yard for pets",
      parking: "Detached 2-car garage plus private driveway",
      laundry: "Dedicated laundry suite in finished basement",
      heatingCooling: "High-efficiency central furnace and A/C",
      leaseTerm: "12 or 24-month lease",
    },
    scores: { walk: 82, transit: 61, bike: 85 },
    coordinates: { lat: 40.0337, lng: -83.0185 },
    photos: [
      ohioHomePhoto,
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
      heroPhoto,
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
    videoDuration: "3:40",
    agent: defaultAgents.ohio,
    added: "2026-11-09",
    featured: true,
  },
  {
    slug: "dublin-meadow-townhome",
    title: "Light Modern Townhome near Dublin Greenway",
    tagline: "Vaulted ceilings, attached double garage, and immediate trail connectivity.",
    city: "Ohio",
    region: "Columbus Metro",
    neighborhood: "Dublin",
    address: "Dublin, OH",
    zip: "43017",
    price: 2850,
    beds: 3,
    baths: 2.5,
    sqft: 1980,
    type: "House",
    status: "Available",
    available: "Available Dec 1",
    deposit: 2850,
    applicationFee: 35,
    description:
      "An easy-living townhome with a bright open plan, a little extra breathing room, and neighborhood greenways nearby. Settle in and make the space your own.",
    longDescription: [
      "Built with precision and an emphasis on airy proportions, this multi-story townhome provides effortless luxury on the edge of Dublin's park network.",
      "The two-story great room welcomes southern sunlight, framed by an architectural staircase and a quartz waterfall kitchen island.",
      "Minutes to Historic Dublin, Bridge Park’s riverside dining, and top-rated regional schools."
    ],
    amenities: [
      "In-unit laundry",
      "Dishwasher",
      "Garage",
      "Pet friendly",
      "Central A/C",
      "Walk-in pantry",
      "Private patio"
    ],
    features: {
      petPolicy: "Up to 2 domestic pets accepted",
      parking: "Attached 2-car garage with interior access",
      laundry: "Second-floor dedicated laundry room",
      heatingCooling: "Smart dual-zone central climate control",
      leaseTerm: "12-month standard lease",
    },
    scores: { walk: 68, transit: 45, bike: 80 },
    coordinates: { lat: 40.0992, lng: -83.1141 },
    photos: [
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1400&q=85",
      ohioHomePhoto,
      cityHomePhoto,
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1400&q=85",
    videoDuration: "2:15",
    agent: defaultAgents.ohio,
    added: "2026-11-07",
  },
  {
    slug: "grandview-avenue-flat",
    title: "Thoughtful Flat near Grandview Avenue",
    tagline: "Walkable village vibe, butcher-block counters, and cozy window seat.",
    city: "Ohio",
    region: "Columbus Metro",
    neighborhood: "Grandview Heights",
    address: "Grandview Heights, Columbus, OH",
    zip: "43212",
    price: 1950,
    beds: 2,
    baths: 1,
    sqft: 1040,
    type: "Apartment",
    status: "Coming soon",
    available: "Available Jan 1",
    deposit: 1950,
    applicationFee: 35,
    description:
      "A well-planned home with warm details and a flexible second bedroom. Walkable neighborhood favorites and daily conveniences are close at hand.",
    longDescription: [
      "Located in the highly sought-after enclave of Grandview Heights, this sun-drenched residence delivers charm and convenience in equal measure.",
      "Features natural birch joinery, original restored trim, and an expansive living layout that allows seamless remote working.",
      "Just around the corner from Grandview Avenue coffee roasters, independent bookshops, and boutique fitness studios."
    ],
    amenities: [
      "Hardwood floors",
      "Dishwasher",
      "Natural light",
      "Pet friendly",
      "Storage locker",
      "Shared courtyard"
    ],
    features: {
      petPolicy: "Cats and dogs under 35 lbs allowed",
      parking: "1 reserved off-street parking space",
      laundry: "On-site washer and dryer facilities",
      heatingCooling: "Central heat and cooling with digital thermostat",
      leaseTerm: "12-month lease",
    },
    scores: { walk: 90, transit: 65, bike: 89 },
    coordinates: { lat: 39.9798, lng: -83.0416 },
    photos: [
      "https://images.unsplash.com/photo-1600566752734-2a0cd66050b5?auto=format&fit=crop&w=1400&q=85",
      cityHomePhoto,
      ohioHomePhoto,
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1600566752734-2a0cd66050b5?auto=format&fit=crop&w=1400&q=85",
    videoDuration: "1:45",
    agent: defaultAgents.ohio,
    added: "2026-11-02",
  },
  {
    slug: "german-village-cottage",
    title: "Brick Courtyard Cottage in German Village",
    tagline: "Historic cobblestone street, exposed beam ceiling, and private ivy terrace.",
    city: "Ohio",
    region: "Columbus Metro",
    neighborhood: "German Village",
    address: "German Village, Columbus, OH",
    zip: "43206",
    price: 2600,
    beds: 2,
    baths: 1.5,
    sqft: 1320,
    type: "House",
    status: "Available",
    available: "Available Dec 1",
    deposit: 2600,
    applicationFee: 35,
    description:
      "An enchanting 19th-century residence carefully adapted for modern living with exposed brick accents and a private paved courtyard garden.",
    longDescription: [
      "Nestled along one of the Midwest's most picturesque brick-paved lanes, this German Village residence captures timeless historic charm.",
      "Inside, dual fireplaces ground the open living area, complemented by custom ironwork and an open chef's island.",
      "Stroll to Schiller Park, the Book Loft, and historic neighborhood bistros."
    ],
    amenities: [
      "In-unit laundry",
      "Dishwasher",
      "Private yard",
      "Pet friendly",
      "Fireplace",
      "Courtyard garden"
    ],
    features: {
      petPolicy: "Well-behaved pets welcome",
      parking: "Private off-street parking pad",
      laundry: "In-unit washer and dryer",
      heatingCooling: "Central heating and air conditioning",
      leaseTerm: "12-month lease",
    },
    scores: { walk: 92, transit: 68, bike: 86 },
    coordinates: { lat: 39.9472, lng: -82.9942 },
    photos: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=85",
      ohioHomePhoto,
      heroPhoto,
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=85",
    videoDuration: "2:55",
    agent: defaultAgents.ohio,
    added: "2026-11-05",
    featured: true,
  },
  {
    slug: "shaker-heights-manor-flat",
    title: "Tudor Manor Flat in Shaker Heights",
    tagline: "Leaded glass casements, formal library, and rapid transit to University Circle.",
    city: "Ohio",
    region: "Cleveland Metro",
    neighborhood: "Shaker Heights",
    address: "Shaker Heights, Cleveland, OH",
    zip: "44120",
    price: 3100,
    beds: 3,
    baths: 2,
    sqft: 1850,
    type: "Apartment",
    status: "Available",
    available: "Available now",
    deposit: 3100,
    applicationFee: 35,
    description:
      "Exceptional craftsmanship and stately proportions situated near the Shaker Lakes and green rapid transit lines.",
    longDescription: [
      "Occupying an entire floor of an authentic English Tudor landmark, this home features original quarter-sawn oak paneling, leaded glass casement windows, and a generous sun parlor.",
      "The updated eat-in kitchen includes quartz countertops, custom subway backsplashes, and high-performance stainless steel appliances.",
      "Direct rapid transit line connection into Cleveland Clinic, University Hospitals, and Downtown Cleveland."
    ],
    amenities: [
      "In-unit laundry",
      "Dishwasher",
      "Hardwood floors",
      "Pet friendly",
      "Garage",
      "Sunroom",
      "Basement storage"
    ],
    features: {
      petPolicy: "Pets welcome with approval",
      parking: "Covered garage parking included",
      laundry: "In-unit washer and dryer",
      heatingCooling: "Central boiler heat & ductless cooling",
      leaseTerm: "12 or 24-month lease",
    },
    scores: { walk: 75, transit: 78, bike: 72 },
    coordinates: { lat: 41.4828, lng: -81.5362 },
    photos: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
      heroPhoto,
      cityHomePhoto,
    ],
    videoThumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    videoDuration: "3:00",
    agent: defaultAgents.ohio,
    added: "2026-11-04",
  },
];

export const heroImage = heroPhoto;
export const locationImages = {
  sanFrancisco: cityHomePhoto,
  ohio: ohioHomePhoto,
};

export function formatRent(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

// Local Storage for Saved Rentals
const SAVED_STORAGE_KEY = "field-form-saved-rentals-v1";

export function getSavedRentals(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRental(slug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getSavedRentals();
    const updated = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("saved-rentals-change", { detail: updated }));
    return updated.includes(slug);
  } catch {
    return false;
  }
}

export const locationDetails = {
  "san-francisco": {
    city: "San Francisco",
    state: "California",
    tagline: "Iconic architecture, dynamic cultural neighborhoods, and morning light.",
    heroImage: cityHomePhoto,
    description:
      "San Francisco blends celebrated Victorian and Edwardian craftsmanship with forward-looking urban design. Our hand-selected residences across Pacific Heights, Marina, Noe Valley, and Mission Dolores offer discerning residents architectural integrity, walkable convenience, and thoughtful management.",
    neighborhoods: [
      {
        name: "Pacific Heights",
        highlight: "Tree-shaded mansions, panoramic bay vistas, and Fillmore Street dining.",
        count: 1,
      },
      {
        name: "Marina District",
        highlight: "Waterfront runs along Crissy Field and vibrant cafes along Chestnut Street.",
        count: 1,
      },
      {
        name: "Noe Valley",
        highlight: "Sunny hillside microclimate, community farmers markets, and family-friendly parks.",
        count: 1,
      },
      {
        name: "Mission Dolores",
        highlight: "Historic park lawns, world-class bakeries, and exceptional transit connections.",
        count: 1,
      },
      {
        name: "Presidio Heights",
        highlight: "Quiet residential serenity adjacent to the vast eucalyptus trails of the Presidio.",
        count: 1,
      },
    ],
    faqs: [
      {
        q: "What is required to lease a property in San Francisco?",
        a: "Our application process requires proof of income (typically 3x monthly rent), standard credit check verification, and government-issued ID. Private tours can be scheduled online.",
      },
      {
        q: "Are pets allowed in the San Francisco residences?",
        a: "Most of our San Francisco properties welcome domestic pets. Specific breed or weight policies are detailed on each property’s listing profile.",
      },
      {
        q: "How does the private tour process work?",
        a: "You can book an accompanied in-person walkthrough or a live virtual video tour directly from any listing page using our scheduling form.",
      },
    ],
  },
  ohio: {
    city: "Ohio",
    state: "Midwest",
    tagline: "Welcoming porch culture, leafy avenues, and room to grow.",
    heroImage: ohioHomePhoto,
    description:
      "From Columbus’s historic Clintonville and German Village to Dublin’s modern townhomes and Cleveland’s stately Shaker Heights, our Ohio collection embodies gracious space, neighborhood warmth, and unmatched value.",
    neighborhoods: [
      {
        name: "Clintonville (Columbus)",
        highlight: "Classic brick bungalows, mature trees, and walkable High Street coffee shops.",
        count: 1,
      },
      {
        name: "German Village (Columbus)",
        highlight: "Historic brick-paved lanes, European bakeries, and Schiller Park.",
        count: 1,
      },
      {
        name: "Dublin (Columbus)",
        highlight: "Bridge Park amenities, scenic Scioto River trails, and top school districts.",
        count: 1,
      },
      {
        name: "Grandview Heights",
        highlight: "Village atmosphere minutes from downtown Columbus with boutique dining.",
        count: 1,
      },
      {
        name: "Shaker Heights (Cleveland)",
        highlight: "Landmark Tudor estates, Shaker Lakes nature paths, and rapid transit access.",
        count: 1,
      },
    ],
    faqs: [
      {
        q: "What lease durations are available for Ohio residences?",
        a: "We offer standard 12-month residential leases, with 24-month fixed options available on select single-family homes upon request.",
      },
      {
        q: "Is parking included with Ohio rental homes?",
        a: "Yes, all single-family homes and townhomes in our Ohio collection include either attached or detached garage parking at no additional cost.",
      },
      {
        q: "Are maintenance requests handled locally?",
        a: "Yes, our dedicated local property management teams in Columbus and Cleveland ensure immediate assistance and prompt scheduled upkeep.",
      },
    ],
  },
};
