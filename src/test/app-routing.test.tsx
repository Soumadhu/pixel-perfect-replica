import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { rentals, locationDetails, formatRent } from "@/lib/rental-data";

describe("App routing", () => {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
  });

  const routesToTest = [
    "/",
    "/rentals",
    "/rentals/san-francisco",
    "/rentals/ohio",
    "/property/pacific-heights-residence",
    "/saved",
    "/about",
    "/contact",
    "/admin",
  ];

  routesToTest.forEach((path) => {
    it(`matches a page for ${path} without falling back to root not-found`, () => {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
      expect(matches.length).toBeGreaterThan(0);
    });
  });
});

describe("Rental Data & Integrity", () => {
  it("has complete portfolio for San Francisco and Ohio", () => {
    expect(rentals.length).toBe(10);

    const sfRentals = rentals.filter((r) => r.city === "San Francisco");
    const ohioRentals = rentals.filter((r) => r.city === "Ohio");

    expect(sfRentals.length).toBe(5);
    expect(ohioRentals.length).toBe(5);
  });

  it("ensures all properties have required fields, valid pricing, and photos", () => {
    rentals.forEach((property) => {
      expect(property.slug).toBeTruthy();
      expect(property.title).toBeTruthy();
      expect(property.price).toBeGreaterThan(0);
      expect(property.beds).toBeGreaterThan(0);
      expect(property.baths).toBeGreaterThan(0);
      expect(property.sqft).toBeGreaterThan(0);
      expect(property.photos.length).toBeGreaterThanOrEqual(2);
      expect(property.amenities.length).toBeGreaterThan(0);
      expect(property.coordinates.lat).toBeTypeOf("number");
      expect(property.coordinates.lng).toBeTypeOf("number");
      expect(property.scores.walk).toBeGreaterThan(0);
      expect(property.agent.name).toBeTruthy();
      expect(property.agent.phone).toBeTruthy();
      expect(property.agent.email).toBeTruthy();
    });
  });

  it("formats monthly rent currency correctly", () => {
    expect(formatRent(4850)).toBe("$4,850");
    expect(formatRent(1950)).toBe("$1,950");
  });

  it("has valid location details and FAQs", () => {
    expect(locationDetails["san-francisco"].neighborhoods.length).toBeGreaterThan(0);
    expect(locationDetails["ohio"].neighborhoods.length).toBeGreaterThan(0);
    expect(locationDetails["san-francisco"].faqs.length).toBeGreaterThan(0);
    expect(locationDetails["ohio"].faqs.length).toBeGreaterThan(0);
  });
});
