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

export function LandPage() {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [naStatus, setNaStatus] = useState("Any");
  const [ownership, setOwnership] = useState("Any");
  const [budget, setBudget] = useState("Any");

  const { data: allLand = [], isLoading } = useQuery({
    queryKey: ['properties', 'land'],
    queryFn: () => getPropertiesByCategory('land')
  });

  const filteredListings = useMemo(() => {
    return allLand.filter((listing) => {
      // Search
      if (search) {
        const query = search.toLowerCase();
        const matchesTitle = listing.title.toLowerCase().includes(query);
        const matchesLoc = listing.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc) return false;
      }
      
      const isNA = listing.specs.some(s => s.toLowerCase().includes("na plot"));
      
      // Property Type
      if (propertyType !== "All") {
        if (propertyType === "NA Plot" && !isNA) return false;
        if (propertyType === "Non-NA Plot" && isNA) return false;
      }
      
      // NA Status
      if (naStatus !== "Any") {
        if (naStatus === "NA" && !isNA) return false;
        if (naStatus === "Non-NA" && isNA) return false;
      }
      
      // Ownership
      if (ownership !== "Any") {
        const term = ownership.toLowerCase();
        let hasTerm = listing.specs.some(s => s.toLowerCase().includes(term)) || listing.title.toLowerCase().includes(term);
        if (term === 'agricultural' && listing.title.toLowerCase().includes('farm')) hasTerm = true;
        if (!hasTerm) return false;
      }
      
      // Budget
      if (budget !== "Any") {
        const price = parsePrice(listing.price);
        if (price > BUDGET_LIMITS[budget]) return false;
      }
      
      return true;
    });
  }, [search, propertyType, naStatus, ownership, budget, allLand]);

  const sidebar = (
    <>
      <FilterGroup title="Property Type">
        {["All", "NA Plot", "Non-NA Plot"].map((pt) => (
          <FilterRadio key={pt} label={pt} name="ptype" value={pt} checked={propertyType === pt} onChange={setPropertyType} />
        ))}
      </FilterGroup>
      <FilterGroup title="NA Status">
        {["Any", "NA", "Non-NA"].map((na) => (
          <FilterRadio key={na} label={na} name="naStatus" value={na} checked={naStatus === na} onChange={setNaStatus} />
        ))}
      </FilterGroup>
      <FilterGroup title="Ownership">
        {["Any", "Agricultural", "Residential", "Converted"].map((own) => (
          <FilterRadio key={own} label={own} name="ownership" value={own} checked={ownership === own} onChange={setOwnership} />
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
      title="Land & Plots"
      subtitle="Clear-title plots and agricultural land for your next big project."
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
