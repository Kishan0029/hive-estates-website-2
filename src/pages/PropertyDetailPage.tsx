import { useState } from "react";
import { createPortal } from "react-dom";
import { useParams, Link } from "react-router-dom";
import { MapPin, Grid, Phone, Share2, BedDouble, Bath, Square, ShieldCheck, FileText, Check, X, Calendar, Loader2, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPublicPropertyBySlug, getPropertiesByCategory, createPublicInquiry } from "../lib/api";
import { PropertyCard } from "../components/PropertyCard";

export function PropertyDetailPage() {
  const { slug } = useParams();
  const [showGallery, setShowGallery] = useState(false);
  const [inquiryType, setInquiryType] = useState<"call" | "tour" | null>(null);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadNote, setLeadNote] = useState("");
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const { data: listing, isLoading, error } = useQuery({
    queryKey: ['property', slug],
    queryFn: () => getPublicPropertyBySlug(slug as string),
    enabled: !!slug
  });

  const { data: similarListings = [] } = useQuery({
    queryKey: ['properties', listing?.type === 'Land' || listing?.type === 'Farm Land' ? 'land' : 'home'],
    queryFn: () => getPropertiesByCategory(listing?.type === 'Land' || listing?.type === 'Farm Land' ? 'land' : 'home'),
    enabled: !!listing
  });

  const handleOpenInquiry = (type: "call" | "tour") => {
    setInquiryType(type);
    setLeadSuccess(false);
    setLeadError(null);
    setLeadNote(
      type === "call"
        ? `Hi, I am interested in ${listing?.title || "this property"} and would like to request a callback.`
        : `Hi, I would like to schedule a site tour for ${listing?.title || "this property"}.`
    );
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) {
      setLeadError("Please provide your name and phone number.");
      return;
    }
    setSubmittingLead(true);
    setLeadError(null);
    try {
      await createPublicInquiry({
        name: leadName.trim(),
        phone: leadPhone.trim(),
        message: `[${inquiryType === 'tour' ? 'Schedule Tour' : 'Request Call'}] ${leadNote.trim()}`,
        property_id: listing?.id,
      });
      setLeadSuccess(true);
    } catch (err: any) {
      setLeadError(err?.message || "Failed to submit request. Please try again.");
    } finally {
      setSubmittingLead(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h1 className="text-3xl font-bold text-neutral-500">Loading...</h1>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h1 className="text-3xl font-bold">Listing not found</h1>
        <Link to="/" className="text-hive-ink underline mt-4 block">Return Home</Link>
      </div>
    );
  }

  const isLand = listing.type === "Land" || listing.type === "Farm Land";
  const raw = listing.raw || {};

  const galleryImages = (listing.images && listing.images.length > 0) ? listing.images : [listing.image];

  // Property details combining raw DB fields with fallbacks
  const propertyDetails = isLand ? {
    "Property Type": raw.property_type ? raw.property_type.toUpperCase() : "Plot",
    "Plot Area": raw.area_sqft ? `${raw.area_sqft} sq.ft` : (listing.specs[0] || "—"),
    "Dimensions": raw.dimensions || "—",
    "Layout Name": raw.layout_name || "—",
    "Facing": raw.facing_direction ? `${raw.facing_direction} Facing` : (listing.specs[1] || "—"),
    "NA Status": raw.na_status ? `${raw.na_status} Plot` : (listing.specs[2] || "—"),
    "RERA Approved": raw.rera_approved ? "Yes" : "Under Process / No",
    "Electricity": raw.electricity ? "Available" : "Not Available",
    "Water Connection": raw.water_connection ? "Available" : "Not Available",
    "Drainage": raw.drainage ? "Available" : "Not Available",
    "Survey Number": raw.survey_number || "—",
    "Nearby Landmark": raw.nearby_landmarks || "—",
  } : {
    "Property Type": listing.type,
    "Bedrooms": raw.bhk ? `${raw.bhk} BHK` : (listing.specs[0] || "—"),
    "Bathrooms": raw.bathrooms ? `${raw.bathrooms} Baths` : (listing.specs[1] || "—"),
    "Area": raw.area_sqft ? `${raw.area_sqft} sq.ft` : (listing.specs.find((s: string) => s.includes("sq")) || "—"),
    "Parking": raw.parking ? `${raw.parking} Spots` : "—",
    "Facing": raw.facing_direction ? `${raw.facing_direction} Facing` : "—",
    "Furnishing": raw.furnishing || "—",
    "Property Age": raw.property_age || "—",
    "RERA Approved": raw.rera_approved ? "Yes" : "—",
    "Vastu Compliant": raw.vastu_compliant ? "Yes" : "—",
  };

  const listingNumber = raw.listing_number || listing?.id?.replace(/\D/g, "").slice(0, 4) || "8234";

  // Find similar properties
  const similarProperties = similarListings
    .filter(l => l.type === listing.type && l.id !== listing.id)
    .slice(0, 3);

  return (
    <>
      {/* Inquiry Modal */}
      {inquiryType && createPortal(
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-100">
            <button
              onClick={() => setInquiryType(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {leadSuccess ? (
              <div className="py-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-hive-ink mb-2">Request Submitted!</h3>
                <p className="text-neutral-600 text-sm mb-6">
                  Our property specialist for <strong>{listing.title}</strong> will call you back shortly.
                </p>
                <button
                  onClick={() => setInquiryType(null)}
                  className="w-full bg-neutral-900 text-white font-bold py-3.5 rounded-full hover:bg-neutral-800 transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 mb-2">
                    {inquiryType === "tour" ? <Calendar className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                    {inquiryType === "tour" ? "Schedule a Tour" : "Request a Callback"}
                  </span>
                  <h3 className="text-xl font-extrabold text-hive-ink line-clamp-1">{listing.title}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">Direct verified owner/agent connection. Zero spam.</p>
                </div>

                {leadError && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-200">
                    {leadError}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium outline-none focus:border-hive-ink focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium outline-none focus:border-hive-ink focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-1.5">Message / Note</label>
                  <textarea
                    rows={3}
                    value={leadNote}
                    onChange={(e) => setLeadNote(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-medium outline-none focus:border-hive-ink focus:bg-white transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingLead}
                  className="w-full bg-hive-ink hover:bg-neutral-800 disabled:opacity-50 text-white font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer mt-2"
                >
                  {submittingLead && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submittingLead ? "Submitting..." : inquiryType === "tour" ? "Confirm Tour Request" : "Request Call Now"}
                </button>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}

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
            {
              galleryImages.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`${listing.title} Photo ${idx + 1}`}
                  className="w-full max-w-5xl rounded-lg shadow-2xl object-cover"
                />
              ))
            }
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
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert("Property link copied to clipboard!");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-sm font-semibold text-neutral-600 hover:text-hive-ink hover:border-neutral-300 transition-colors shadow-sm cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Hero Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 mb-10 h-[350px] md:h-[500px] rounded-3xl overflow-hidden relative group cursor-pointer" onClick={() => setShowGallery(true)}>
            <div className="md:col-span-2 md:row-span-2 relative h-full overflow-hidden">
              <img src={galleryImages[0] || listing.image} alt={listing.title} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="hidden md:block relative h-full overflow-hidden">
              <img src={galleryImages[1] || galleryImages[0] || listing.image} alt={`${listing.title} View 2`} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-500" />
            </div>
            <div className="hidden md:block relative h-full overflow-hidden">
              <img src={galleryImages[2] || galleryImages[0] || listing.image} alt={`${listing.title} View 3`} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-500" />
            </div>
            <div className="hidden md:block relative h-full overflow-hidden">
              <img src={galleryImages[3] || galleryImages[0] || listing.image} alt={`${listing.title} View 4`} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-500" />
            </div>
            <div className="hidden md:block relative h-full overflow-hidden">
              <img src={galleryImages[4] || galleryImages[0] || listing.image} alt={`${listing.title} View 5`} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-500" />
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); setShowGallery(true); }}
              className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border border-white/20 text-hive-ink font-semibold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 hover:bg-white transition-colors cursor-pointer"
            >
              <Grid className="w-4 h-4" />
              View All Photos ({galleryImages.length})
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
                    Listing {listingNumber}
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
                      <span>{raw.bhk ? `${raw.bhk} BHK` : listing.specs[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5 text-neutral-400" />
                      <span>{raw.bathrooms ? `${raw.bathrooms} Baths` : listing.specs[1]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="w-5 h-5 text-neutral-400" />
                      <span>{raw.area_sqft ? `${raw.area_sqft} sq.ft` : (listing.specs.find((s: string) => s.includes("sq")) || "—")}</span>
                    </div>
                  </div>
                )}
                {isLand && (
                  <div className="flex items-center gap-6 text-hive-ink font-semibold">
                    <div className="flex items-center gap-2">
                      <Square className="w-5 h-5 text-neutral-400" />
                      <span>{raw.area_sqft ? `${raw.area_sqft} sq.ft` : (listing.specs[0] || "—")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-neutral-400" />
                      <span>{raw.na_status ? `${raw.na_status} Plot` : (listing.specs[2] || "NA Plot")}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-hive-ink mb-4">About this {isLand ? "plot" : "property"}</h2>
                <div className="text-neutral-600 leading-relaxed space-y-4 text-lg">
                  {listing.description ? (
                    <p className="whitespace-pre-line">{listing.description}</p>
                  ) : (
                    <>
                      <p>
                        Discover the perfect opportunity in {listing.location} with this exceptional {isLand ? "piece of land" : "property"}.
                        Located in a highly sought-after neighborhood, it offers great connectivity to major landmarks while providing a peaceful environment.
                      </p>
                      <p>
                        {isLand
                          ? "Ideal for building your dream home or a lucrative investment project. The plot boasts clear titles and is situated in a rapidly developing zone."
                          : "Featuring modern architecture, ample natural light, and premium fittings. This home is designed for comfort and luxury, making it perfect for families looking for a superior lifestyle."}
                      </p>
                    </>
                  )}
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
                        {String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder (Approximate Location) */}
              <div>
                <h2 className="text-2xl font-bold text-hive-ink mb-2">Location</h2>
                <p className="text-neutral-500 mb-6">
                  {raw.address_line ? `${raw.address_line}, ${raw.city || "Belagavi"}` : "Approximate neighborhood zone in Belagavi."}
                  {raw.nearby_landmarks && (
                    <span className="block text-sm text-neutral-600 mt-1 font-medium">
                      <span className="text-hive-ink font-semibold">Key Landmarks:</span> {raw.nearby_landmarks}
                    </span>
                  )}
                </p>
                <div className="w-full h-[350px] rounded-[32px] bg-neutral-100 border border-neutral-200 overflow-hidden relative group">
                  <iframe
                    src={
                      raw.latitude && raw.longitude
                        ? `https://maps.google.com/maps?q=${raw.latitude},${raw.longitude}&z=14&output=embed`
                        : `https://maps.google.com/maps?q=${encodeURIComponent(listing.location + ", Belagavi")}&z=14&output=embed`
                    }
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    className="absolute inset-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                    title="Approximate Location Map"
                  ></iframe>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-40 h-40 bg-hive-ink/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                      <div className="w-32 h-32 bg-hive-ink/20 border-2 border-hive-ink/50 rounded-full backdrop-blur-[2px] flex items-center justify-center shadow-lg">
                        <MapPin className="w-6 h-6 text-hive-ink opacity-70" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky CTA */}
            <div className="lg:col-span-1 relative">
              <div className="sticky top-28 bg-white border border-neutral-200 rounded-[32px] p-6 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.1)]">
                <div className="mb-6">
                  <div className="text-4xl font-extrabold text-hive-ink tracking-tight mb-2">
                    {listing.price}
                  </div>
                  {
                    raw.area_sqft && raw.price > 0 && (
                      <div className="text-sm font-semibold text-neutral-500">
                        Est. ₹ {Math.round(raw.price / raw.area_sqft).toLocaleString("en-IN")} / sqft
                      </div>
                    )
                  }
                </div>

                <div className="space-y-3 mb-8">
                  <button
                    onClick={() => handleOpenInquiry("call")}
                    className="w-full bg-hive-ink hover:bg-neutral-800 text-white font-bold py-4 px-6 rounded-full transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Phone className="w-5 h-5" />
                    Request Call
                  </button>
                  <button
                    onClick={() => handleOpenInquiry("tour")}
                    className="w-full bg-white border border-neutral-200 hover:border-hive-ink hover:bg-neutral-50 text-hive-ink font-bold py-4 px-6 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule Tour
                  </button>
                </div>

                <div className="border-t border-neutral-100 pt-6">
                  <h4 className="font-bold text-hive-ink mb-4">Why Hive Estates?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-hive-green shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-600">Verified listing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-hive-green shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-600">Proper legal consultation</span>
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
