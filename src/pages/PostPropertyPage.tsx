import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Home, Map as MapIcon, CheckCircle2, ChevronRight, MapPin, FileText, ArrowLeft, PhoneCall } from "lucide-react";

const STEPS = ["Property Type", "Location", "Documents"];

const ELIGIBILITY = [
  "Must be the legal owner or authorised agent.",
  "Property must be in Belagavi or nearby limits.",
  "Strictly a buy/sell platform (No rentals).",
];

const DOCUMENTS_BY_TYPE: Record<string, string[]> = {
  Plot: [
    "Registered Sale Deed / Title Deed",
    "Encumbrance Certificate (EC)",
    "Khata Certificate & Khata Extract",
    "Latest Property Tax Paid Receipt",
    "RTC / Record of Rights (for applicable properties)",
    "Approved Layout Plan (if applicable)",
    "Conversion Order (if converted from agricultural land)",
    "Owner's Aadhaar & PAN Card"
  ],
  Apartment: [
    "Registered Sale Deed",
    "Encumbrance Certificate (EC)",
    "Khata Certificate / e-Khata",
    "Latest Property Tax Receipt",
    "Occupancy Certificate (OC) (if applicable)",
    "Completion Certificate (CC) (if applicable)",
    "RERA Registration Details (for applicable projects)",
    "Approved Building Plan",
    "Owner's Aadhaar & PAN Card",
    "Latest Maintenance / No Dues Certificate (if applicable)"
  ],
  Bungalow: [
    "Registered Sale Deed",
    "Encumbrance Certificate (EC)",
    "Khata Certificate & Khata Extract",
    "Latest Property Tax Receipt",
    "Approved Building Plan",
    "Occupancy Certificate (where applicable)",
    "Completion Certificate (where applicable)",
    "Owner's Aadhaar & PAN Card",
    "Latest Utility Bills (optional for address verification)"
  ]
};

const PROPERTY_TYPES = [
  { id: "Apartment", icon: Building2, desc: "Flats, Penthouses" },
  { id: "Bungalow", icon: Home, desc: "Independent Houses, Villas" },
  { id: "Plot", icon: MapIcon, desc: "NA / Non-NA Lands" },
];

export function PostPropertyPage() {
  const [step, setStep] = useState(0);
  const [propertyType, setPropertyType] = useState("Apartment");
  
  // Location form state
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");

  const handleNext = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-5">
        
        {/* Header & Stepper */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-hive-ink mb-8 text-center">
            List Your Property
          </h1>
          
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-neutral-200 rounded-full z-0">
              <div 
                className="h-full bg-neutral-900 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
            
            {STEPS.map((s, idx) => {
              const isCompleted = idx < step;
              const isActive = idx === step;
              
              return (
                <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                      ${isActive ? 'bg-neutral-900 text-white shadow-lg ring-4 ring-neutral-900/10 scale-110' : 
                        isCompleted ? 'bg-hive-ink text-white' : 'bg-white border-2 border-neutral-200 text-neutral-400'}`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>
                  <span className={`text-xs md:text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`}>
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-neutral-900/5 border border-neutral-100 overflow-hidden">
          
          <div className="p-6 md:p-10">
            <form onSubmit={handleNext}>
              
              {/* STEP 1: PROPERTY TYPE */}
              {step === 0 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-hive-ink mb-2">What kind of property are you listing?</h2>
                  <p className="text-neutral-500 mb-8">Select the category that best describes your property.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {PROPERTY_TYPES.map(type => {
                      const Icon = type.icon;
                      const isSelected = propertyType === type.id;
                      
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setPropertyType(type.id)}
                          className={`text-left p-6 rounded-[1.5rem] border-2 transition-all duration-200 group
                            ${isSelected ? 'border-neutral-900 bg-neutral-900/5 shadow-md scale-[1.02]' : 'border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50'}`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors
                            ${isSelected ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold text-lg text-hive-ink">{type.id}</h3>
                          <p className="text-sm text-neutral-500 mt-1">{type.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: LOCATION */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-hive-ink mb-2">Where is it located?</h2>
                  <p className="text-neutral-500 mb-8">Help buyers find your property accurately.</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input 
                          readOnly 
                          value="Belagavi" 
                          className="w-full bg-neutral-100 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 text-neutral-500 font-semibold cursor-not-allowed outline-none" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Locality / Area <span className="text-red-500">*</span></label>
                      <input 
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Tilakwadi, Camp, Vadgaon" 
                        className="w-full bg-white border-2 border-neutral-200 rounded-2xl py-4 px-5 text-hive-ink font-medium focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10 transition-all outline-none" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Full Address <span className="text-red-500">*</span></label>
                      <input 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Building / Street / Landmark" 
                        className="w-full bg-white border-2 border-neutral-200 rounded-2xl py-4 px-5 text-hive-ink font-medium focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/10 transition-all outline-none" 
                        required 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DOCUMENTS */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-neutral-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-neutral-900/20 rotate-3">
                      <FileText className="w-8 h-8 -rotate-3" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-hive-ink mb-3">Almost there!</h2>
                    <p className="text-neutral-500 max-w-md mx-auto leading-relaxed">
                      To ensure trust and transparency for our buyers, we verify all properties before listing. Please keep the following documents ready.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 rounded-[1.5rem] p-6 border border-neutral-100">
                      <h3 className="font-bold text-hive-ink mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-neutral-900" /> Eligibility
                      </h3>
                      <ul className="space-y-4">
                        {ELIGIBILITY.map((text, i) => (
                          <li key={i} className="flex gap-3 text-sm text-neutral-600 font-medium">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" /> {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-neutral-50 rounded-[1.5rem] p-6 border border-neutral-100">
                      <h3 className="font-bold text-hive-ink mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-neutral-900" /> Required Documents
                      </h3>
                      <ul className="space-y-4">
                        {DOCUMENTS_BY_TYPE[propertyType]?.map((text, i) => (
                          <li key={i} className="flex gap-3 text-sm text-neutral-600 font-medium">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0" /> {text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-5 bg-amber-50 border border-amber-100 rounded-2xl">
                    <p className="text-xs text-amber-800 leading-relaxed font-medium">
                      <strong className="font-bold uppercase tracking-wider text-[10px] block mb-1">Disclaimer</strong>
                      Hive Verified confirms that the above documents have been submitted for basic verification. It does not constitute a legal title verification, legal opinion, or guarantee against future disputes. Buyers are encouraged to conduct independent legal due diligence before completing any transaction.
                    </p>
                  </div>

                  <div className="mt-10 bg-neutral-900 rounded-[1.5rem] p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    <h3 className="text-xl font-bold mb-2 relative z-10">Ready to proceed?</h3>
                    <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto relative z-10">
                      Contact our team directly on WhatsApp to submit your documents and finalize your listing.
                    </p>
                    <a 
                      href="https://wa.me/919900000000" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-neutral-900 font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300 relative z-10"
                    >
                      <PhoneCall className="w-5 h-5" />
                      Contact Team on WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              {step < 2 && (
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`px-6 py-4 font-bold text-sm rounded-full transition-all flex items-center gap-2
                      ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-neutral-500 hover:bg-neutral-100 hover:text-hive-ink'}`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-full font-bold text-sm bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-xl hover:shadow-neutral-900/20 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
}
