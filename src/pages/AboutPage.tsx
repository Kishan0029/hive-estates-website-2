import { Target, Shield, Users, Trophy } from "lucide-react";

export function AboutPage() {
  const VALUES = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Our Mission",
      description: "To simplify the real estate journey by providing verified, high-quality properties with complete transparency."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trust & Transparency",
      description: "Every property on Hive Estates goes through rigorous legal and physical verification before being listed."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client-Centric",
      description: "We put our clients first, ensuring a seamless experience from property discovery to final handover."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Excellence",
      description: "We strive for excellence in every interaction, building long-term relationships based on reliability."
    }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 mb-4">
            About Hive Estates
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-hive-ink leading-[1.05]">
            Built on Trust. Made for Belgaum.
          </h1>
          <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
            We are a transparent, trusted, and one-stop real estate solution for Belgaum. We are dedicated to helping you find your dream home or perfect investment with local expertise and a global standard of service.
          </p>
        </div>

        {/* Image Grid / Hero Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-24 h-[400px] md:h-[500px]">
          <div className="bg-neutral-100 rounded-[32px] overflow-hidden relative col-span-1 md:col-span-2 shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" 
              alt="Luxury Home" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="bg-neutral-100 rounded-[32px] overflow-hidden relative hidden md:block shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" 
              alt="Modern Interior" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-hive-ink mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-neutral-500 leading-relaxed text-lg">
              <p>
                Founded with a vision to bring professionalism and trust to the Belagavi real estate market, Hive Estates has quickly become the region's most trusted property partner.
              </p>
              <p>
                We noticed that buyers often struggled with unverified listings, hidden costs, and complex legalities. We set out to change that. By curating only the best properties and offering end-to-end guidance, we've helped hundreds of families find their perfect space.
              </p>
            </div>
          </div>
          <div className="bg-[#FAFAFA] rounded-[32px] p-10 border border-neutral-200 relative overflow-hidden shadow-sm">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <Trophy className="w-32 h-32 text-hive-ink" />
             </div>
             <div className="grid grid-cols-2 gap-8 relative z-10">
                <div>
                  <div className="text-4xl font-extrabold text-hive-ink mb-2">200+</div>
                  <div className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Happy Families</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-hive-ink mb-2">50+</div>
                  <div className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Exclusive Projects</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-hive-ink mb-2">100%</div>
                  <div className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Verified Listings</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-hive-ink mb-2">5+</div>
                  <div className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Years Experience</div>
                </div>
             </div>
          </div>
        </div>

        {/* Hive Verified Section */}
        <div className="bg-hive-ink rounded-[32px] p-10 md:p-16 mb-24 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <Shield className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10 backdrop-blur-md">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">The Hive Promise</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
              Hive Verified.
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-10">
              Every property listed with us undergoes our strict "Hive Verified" protocol. We don't just list properties; we vet them. This ensures complete peace of mind for you, knowing that what you see is authentic, legally sound, and fairly priced.
            </p>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="font-bold text-lg mb-2">1. Legal Check</div>
                <div className="text-sm text-neutral-400 leading-relaxed">Clear titles and zero encumbrances, thoroughly vetted by our experts.</div>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="font-bold text-lg mb-2">2. Physical Check</div>
                <div className="text-sm text-neutral-400 leading-relaxed">On-site verification to ensure structural integrity and factual accuracy.</div>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="font-bold text-lg mb-2">3. Price Check</div>
                <div className="text-sm text-neutral-400 leading-relaxed">Fair market pricing analysis to prevent artificial inflation and ensure value.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-hive-ink mb-4">
              Our Core Values
            </h2>
            <p className="text-neutral-500 text-lg">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val, idx) => (
              <div key={idx} className="bg-[#FAFAFA] rounded-[32px] p-8 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-colors shadow-sm">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-hive-ink shadow-sm mb-6 border border-neutral-100">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-hive-ink mb-3">{val.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
