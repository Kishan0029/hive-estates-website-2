import { useState, useMemo } from "react";
import { ListingPageLayout, FilterGroup, FilterRadio } from "../components/ListingPageLayout";
import { PropertyCard } from "../components/PropertyCard";
import { useQuery } from "@tanstack/react-query";
import { getPropertiesByCategory } from "../lib/api";

function parsePrice(priceStr: string) {
  const clean = priceStr.replace(/[^0-9.CrL]/g, "");
  if (clean.includes("Cr")) return parseFloat(clean) * 10000000;
  if (clean.includes("L")) return parseFloat(clean) * 100000;
  return parseFloat(clean) || 0;
}

const BUDGET_LIMITS: Record<string, number> = {
  "Any": Infinity,
  "Under ₹25 L": 2500000,
  "Under ₹50 L": 5000000,
  "Under ₹1 Cr": 10000000,
  "Under ₹2 Cr": 20000000,
  "Under ₹5 Cr": 50000000,
};

export function ApartmentsPage() {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [bhk, setBhk] = useState("Any");
  const [budget, setBudget] = useState("Any");

  const { data: allHomes = [], isLoading } = useQuery({
    queryKey: ['properties', 'home'],
    queryFn: () => getPropertiesByCategory('home')
  });

  const filteredListings = useMemo(() => {
    return allHomes.filter((listing) => {
      // Search
      if (search) {
        const query = search.toLowerCase();
        const matchesTitle = listing.title.toLowerCase().includes(query);
        const matchesLoc = listing.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc) return false;
      }
      // Property Type
      if (propertyType !== "All" && listing.type !== propertyType) {
        return false;
      }
      // BHK
      if (bhk !== "Any") {
        const targetBeds = bhk.charAt(0); // "1 BHK" -> "1"
        const hasBeds = listing.specs.some((spec) => spec.includes(`${targetBeds} Beds`));
        if (!hasBeds) return false;
      }
      // Budget
      if (budget !== "Any") {
        const price = parsePrice(listing.price);
        if (price > BUDGET_LIMITS[budget]) return false;
      }
      return true;
    });
  }, [search, propertyType, bhk, budget, allHomes]);

  const sidebar = (
    <>
      <FilterGroup title="Property Type">
        {["All", "Apartment", "Bungalow"].map((pt) => (
          <FilterRadio key={pt} label={pt} name="ptype" value={pt} checked={propertyType === pt} onChange={setPropertyType} />
        ))}
      </FilterGroup>
      <FilterGroup title="BHK">
        {["Any", "1 BHK", "2 BHK", "3 BHK", "4 BHK"].map((b) => (
          <FilterRadio key={b} label={b} name="bhk" value={b} checked={bhk === b} onChange={setBhk} />
        ))}
      </FilterGroup>
      <FilterGroup title="Max Budget">
        {["Any", "Under ₹25 L", "Under ₹50 L", "Under ₹1 Cr", "Under ₹2 Cr", "Under ₹5 Cr"].map((bg) => (
          <FilterRadio key={bg} label={bg} name="budget" value={bg} checked={budget === bg} onChange={setBudget} />
        ))}
      </FilterGroup>
    </>
  );

  return (
    <ListingPageLayout
      title="Apartments & Bungalows"
      subtitle="Discover premium ready-to-move homes with verified ownership."
      sidebar={sidebar}
      onSearch={setSearch}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 text-center text-neutral-500">
            Loading properties...
          </div>
        ) : (
          <>
            {filteredListings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
            {filteredListings.length === 0 && (
              <div className="col-span-full py-20 text-center text-neutral-500">
                No properties found matching your criteria. Try adjusting the filters.
              </div>
            )}
          </>
        )}
      </div>
    </ListingPageLayout>
  );
}
