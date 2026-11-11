import heroPhoto from "@/assets/rental-hero.jpg";
import cityHomePhoto from "@/assets/rental-city.jpg";
import ohioHomePhoto from "@/assets/rental-ohio.jpg";

export type Rental = {
  slug: string;
  title: string;
  city: "San Francisco" | "Ohio";
  neighborhood: string;
  address: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: "Apartment" | "House" | "Condo";
  status: "Available" | "Coming soon";
  available: string;
  deposit: number;
  applicationFee: number;
  description: string;
  amenities: string[];
  photos: string[];
  added: string;
};

export const rentals: Rental[] = [
  {
    slug: "pacific-heights-residence",
    title: "Light-filled Pacific Heights residence",
    city: "San Francisco",
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
    amenities: ["In-unit laundry", "Dishwasher", "Hardwood floors", "Pet friendly", "Natural light"],
    photos: [heroPhoto, cityHomePhoto, ohioHomePhoto],
    added: "2026-11-10",
  },
  {
    slug: "marina-corner-flat",
    title: "Sunny corner flat near the Marina",
    city: "San Francisco",
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
    amenities: ["Dishwasher", "Hardwood floors", "Natural light", "Bike storage"],
    photos: [cityHomePhoto, heroPhoto, ohioHomePhoto],
    added: "2026-11-08",
  },
  {
    slug: "noe-valley-garden-home",
    title: "Garden-level home in Noe Valley",
    city: "San Francisco",
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
    amenities: ["In-unit laundry", "Dishwasher", "Private garden", "Pet friendly"],
    photos: [heroPhoto, ohioHomePhoto, cityHomePhoto],
    added: "2026-11-06",
  },
  {
    slug: "presidio-heights-retreat",
    title: "Quiet retreat with classic details",
    city: "San Francisco",
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
    amenities: ["Hardwood floors", "Dishwasher", "Natural light", "Storage"],
    photos: [cityHomePhoto, heroPhoto, ohioHomePhoto],
    added: "2026-11-03",
  },
  {
    slug: "columbus-brick-home",
    title: "Renovated brick home with a front porch",
    city: "Ohio",
    neighborhood: "Clintonville, Columbus",
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
    amenities: ["In-unit laundry", "Dishwasher", "Private yard", "Pet friendly", "Driveway"],
    photos: [ohioHomePhoto, cityHomePhoto, heroPhoto],
    added: "2026-11-09",
  },
  {
    slug: "dublin-meadow-townhome",
    title: "Open-plan townhome near the greenway",
    city: "Ohio",
    neighborhood: "Dublin, Columbus",
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
    amenities: ["In-unit laundry", "Dishwasher", "Garage", "Pet friendly"],
    photos: [ohioHomePhoto, heroPhoto, cityHomePhoto],
    added: "2026-11-07",
  },
  {
    slug: "grandview-avenue-flat",
    title: "Thoughtful two-bedroom near Grandview Avenue",
    city: "Ohio",
    neighborhood: "Grandview Heights, Columbus",
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
    amenities: ["Hardwood floors", "Dishwasher", "Natural light", "Pet friendly"],
    photos: [cityHomePhoto, ohioHomePhoto, heroPhoto],
    added: "2026-11-02",
  },
];

export const heroImage = heroPhoto;
export const locationImages = { sanFrancisco: cityHomePhoto, ohio: ohioHomePhoto };

export function formatRent(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}