import { useState } from "react";
import { createPortal } from "react-dom";
import { useParams, Link } from "react-router-dom";
import { MapPin, Grid, Phone, Share2, Heart, BedDouble, Bath, Square, ShieldCheck, FileText, Check, X } from "lucide-react";
import { landListings, homeListings, justAddedListings } from "../data/listings";
import { PropertyCard } from "../components/PropertyCard";

export function PropertyDetailPage() {
  const { id } = useParams();
  const [showGallery, setShowGallery] = useState(false);
  
  // Find listing
  const allListings = [...landListings, ...homeListings, ...justAddedListings];
  const listing = allListings.find(l => l.id === id);

  if (!listing) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h1 className="text-3xl font-bold">Listing not found</h1>
        <Link to="/" className="text-hive-ink underline mt-4 block">Return Home</Link>
      </div>
    );
  }

  const isLand = listing.type === "Land";

  // Mock extended details based on user prompt
  const propertyDetails = isLand ? {
    "Property Type": "NA Plot",
    "Dimensions": "—",
    "Layout Name": "—",
    "Plot Size": listing.specs[0] || "1200",
    "Facing": listing.specs[1] || "—",
    "Electricity": "Not Available",
    "Drainage / Gutters": "Not Available",
    "Water Connection": "Not Available",
    "Approvals": "None",
    "Survey Number": "—",
    "Nearby Landmark": "—",
    "Price / sqft": "Request Call",
    "Road Width": "—"
  } : {
    "Area": listing.specs.find(s => s.includes("sq")) || "2100 sqft",
    "Bedrooms": listing.specs[0]?.split(" ")[0] || "—",
    "Bathrooms": listing.specs[1]?.split(" ")[0] || "—",
    "Parking": "0",
    "Facing": "—",
    "Furnishing": "—",
    "Age": "—",
    "Type": listing.type
  };

  // Helper to extract a number from the ID or generate one
  const listingNumber = id?.replace(/\D/g, "") + "823";

  // Find similar properties
  const similarProperties = allListings
    .filter(l => l.type === listing.type && l.id !== listing.id)
    .slice(0, 3);

  return (
    <>
      {/* Full Screen Photo Gallery Modal via Portal */}
      {showGallery && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col overflow-hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent absolute top-0 w-full z-10">
            <div className="text-white font-bold text-lg">{listing.title} - Photo Gallery</div>
            <button 
              onClick={() => setShowGallery(false)} 
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col gap-8 items-center pt-24 pb-24">
            {/* Displaying the same image 5 times as placeholder since we don't have a real array of different photos yet */}
            {[1, 2, 3, 4, 5].map((num) => (
              <img 
                key={num} 
                src={listing.image} 
                alt={`${listing.title} Photo ${num}`} 
                className="w-full max-w-5xl rounded-lg shadow-2xl object-cover"
              />
            ))}
          </div>
        </div>,
        document.body
      )}

      <div className="pt-24 md:pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-5">
          
          {/* Breadcrumb & Top Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
              <Link to="/" className="hover:text-hive-ink transition-colors">Home</Link>
              <span>/</span>
              <Link to={isLand ? "/land" : "/apartments"} className="hover:text-hive-ink transition-colors">
                {isLand ? "Land" : "Properties"}
              </Link>
              <span>/</span>
              <span className="text-neutral-900 truncate max-w-[200px] sm:max-w-xs">{listing.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-sm font-semibold text-neutral-600 hover:text-hive-ink hover:border-neutral-300 transition-colors shadow-sm">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-sm font-semibold text-neutral-600 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm">
                <Heart className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>

          {/* Hero Gallery (Zillow / Modern Marketplace Style) */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 mb-10 h-[350px] md:h-[500px] rounded-3xl overflow-hidden relative group cursor-pointer" onClick={() => setShowGallery(true)}>
            <div className="md:col-span-2 md:row-span-2 relative h-full overflow-hidden">
              <img src={listing.image} alt={listing.title} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="hidden md:block relative h-full overflow-hidden">
              <img src={listing.image} alt={`${listing.title} View 2`} className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500" />
            </div>
            <div className="hidden md:block relative h-full overflow-hidden">
              <img src={listing.image} alt={`${listing.title} View 3`} className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500" />
            </div>
            <div className="hidden md:block relative h-full overflow-hidden">
              <img src={listing.image} alt={`${listing.title} View 4`} className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500" />
            </div>
            <div className="hidden md:block relative h-full overflow-hidden">
              <img src={listing.image} alt={`${listing.title} View 5`} className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-500" />
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); setShowGallery(true); }}
              className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border border-white/20 text-hive-ink font-semibold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 hover:bg-white transition-colors"
            >
              <Grid className="w-4 h-4" />
              View All Photos
            </button>
          </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Property Details */}
          <div className="lg:col-span-2">
            
            {/* Header Info */}
            <div className="mb-8 pb-8 border-b border-neutral-200">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3 py-1.5 rounded-md">
                  Listing #{listingNumber.substring(0, 4)}
                </span>
                {listing.verified && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-hive-green bg-green-50 px-3 py-1.5 rounded-md border border-green-100">
                    <ShieldCheck className="w-4 h-4" />
                    Hive Verified
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-hive-ink tracking-tight mb-4">
                {listing.title}
              </h1>
              
              <div className="flex items-center gap-2 text-neutral-500 text-lg mb-6">
                <MapPin className="w-5 h-5 shrink-0" />
                <span>{listing.location}</span>
              </div>

              {!isLand && (
                <div className="flex items-center gap-6 text-hive-ink font-semibold">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-neutral-400" />
                    <span>{listing.specs[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-neutral-400" />
                    <span>{listing.specs[1]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-neutral-400" />
                    <span>{listing.specs.find(s => s.includes("sq")) || "2100 sq.ft"}</span>
                  </div>
                </div>
              )}
              {isLand && (
                <div className="flex items-center gap-6 text-hive-ink font-semibold">
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-neutral-400" />
                    <span>{listing.specs[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-neutral-400" />
                    <span>{listing.specs[2] || "NA Plot"}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-hive-ink mb-4">About this {isLand ? "plot" : "property"}</h2>
              <div className="text-neutral-600 leading-relaxed space-y-4 text-lg">
                <p>
                  Discover the perfect opportunity in {listing.location} with this exceptional {isLand ? "piece of land" : "property"}. 
                  Located in a highly sought-after neighborhood, it offers great connectivity to major landmarks while providing a peaceful environment.
                </p>
                <p>
                  {isLand 
                    ? "Ideal for building your dream home or a lucrative investment project. The plot boasts clear titles and is situated in a rapidly developing zone." 
                    : "Featuring modern architecture, ample natural light, and premium fittings. This home is designed for comfort and luxury, making it perfect for families looking for a superior lifestyle."}
                </p>
              </div>
            </div>

            {/* Comprehensive Details Grid */}
            <div className="mb-10 bg-[#FAFAFA] rounded-[24px] p-8 border border-neutral-200">
              <h2 className="text-xl font-bold text-hive-ink mb-6">Facts & Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                {Object.entries(propertyDetails).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">
                      {key}
                    </div>
                    <div className="text-base font-medium text-hive-ink">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder (Approximate Location) */}
            <div>
               <h2 className="text-2xl font-bold text-hive-ink mb-2">Location</h2>
               <p className="text-neutral-500 mb-6">Exact location provided after booking/request.</p>
               <div className="w-full h-[350px] rounded-[32px] bg-neutral-100 border border-neutral-200 overflow-hidden relative group">
                  {/* Google Map Background */}
                  <iframe 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(listing.location + ", Belagavi")}&z=14&output=embed&z=13&iwloc=near`} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    className="absolute inset-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                    title="Approximate Location Map"
                  ></iframe>
                  
                  {/* Airbnb Style Approximate Zone Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="relative flex items-center justify-center">
                        {/* Outer pulsating ring */}
                        <div className="absolute w-40 h-40 bg-hive-ink/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                        {/* Inner approximate zone */}
                        <div className="w-32 h-32 bg-hive-ink/20 border-2 border-hive-ink/50 rounded-full backdrop-blur-[2px] flex items-center justify-center shadow-lg">
                           <MapPin className="w-6 h-6 text-hive-ink opacity-70" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

          </div>

          {/* Right Column: Sticky CTA (Zillow Style) */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-28 bg-white border border-neutral-200 rounded-[32px] p-6 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.1)]">
              <div className="mb-6">
                <div className="text-4xl font-extrabold text-hive-ink tracking-tight mb-2">
                  {listing.price}
                </div>
                {!isLand && (
                  <div className="text-sm font-semibold text-neutral-500">
                    Est. ₹ 6,900 / sqft
                  </div>
                )}
              </div>
              
              <div className="space-y-3 mb-8">
                <button className="w-full bg-hive-ink hover:bg-neutral-800 text-white font-bold py-4 px-6 rounded-full transition-colors flex items-center justify-center gap-2 shadow-md">
                  <Phone className="w-5 h-5" />
                  Request Call
                </button>
                <button className="w-full bg-white border border-neutral-200 hover:border-hive-ink hover:bg-neutral-50 text-hive-ink font-bold py-4 px-6 rounded-full transition-colors flex items-center justify-center gap-2">
                  Schedule Tour
                </button>
              </div>

              <div className="border-t border-neutral-100 pt-6">
                <h4 className="font-bold text-hive-ink mb-4">Why Hive Estates?</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-hive-green shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600">Zero brokerage for buyers on verified listings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-hive-green shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600">Free legal consultation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-hive-green shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600">Dedicated property expert</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
        
        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-24 pt-16 border-t border-neutral-200">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-hive-ink">
                  Similar {isLand ? "Plots" : "Properties"}
                </h2>
                <Link to={isLand ? "/land" : "/apartments"} className="text-sm font-bold text-hive-ink underline underline-offset-4 hover:text-neutral-600 transition-colors">
                  View All
                </Link>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {similarProperties.map(p => (
                 <PropertyCard key={p.id} listing={p} />
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
    </>
  );
}
