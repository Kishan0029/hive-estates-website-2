import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { createPublicInquiry } from "../lib/api";

export function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!firstName.trim() || !phone.trim() || !message.trim()) {
      setError("Please fill in your name, phone number, and message.");
      return;
    }

    setSubmitting(true);
    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      await createPublicInquiry({
        name: fullName,
        phone,
        email: email || undefined,
        message,
      });
      setSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message || "Failed to send your inquiry. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-hive-green mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-hive-ink leading-[1.05]">
            Let's find your perfect property.
          </h1>
          <p className="mt-4 text-lg text-neutral-500 leading-relaxed">
            Whether you're looking to buy, sell, or just want to chat about the Belagavi real estate market, our team is here to help.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Contact Form */}
          <div className="min-w-0 bg-white rounded-[32px] p-8 md:p-10 border border-neutral-200 shadow-sm">
            <h2 className="text-2xl font-bold text-hive-ink mb-6">Send us a message</h2>

                {success ? (
                  <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl animate-in fade-in duration-300">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-hive-ink mb-2">Message Received!</h3>
                    <p className="text-neutral-600 text-sm mb-6 max-w-md mx-auto">
                      Thank you for reaching out. A Hive property specialist will contact you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 bg-neutral-900 text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-semibold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 min-w-0">
                    <label className="text-sm font-semibold text-neutral-700">First Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-hive-ink focus:ring-1 focus:ring-hive-ink transition-colors" 
                      placeholder="John" 
                    />
                  </div>
                  <div className="space-y-2 min-w-0">
                    <label className="text-sm font-semibold text-neutral-700">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-hive-ink focus:ring-1 focus:ring-hive-ink transition-colors" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2 min-w-0">
                  <label className="text-sm font-semibold text-neutral-700">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-hive-ink focus:ring-1 focus:ring-hive-ink transition-colors" 
                    placeholder="john@example.com" 
                  />
                </div>

                <div className="space-y-2 min-w-0">
                  <label className="text-sm font-semibold text-neutral-700">Phone Number <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-hive-ink focus:ring-1 focus:ring-hive-ink transition-colors" 
                    placeholder="+91 98765 43210" 
                  />
                </div>

                <div className="space-y-2 min-w-0">
                  <label className="text-sm font-semibold text-neutral-700">Message <span className="text-red-500">*</span></label>
                  <textarea 
                    rows={4} 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-hive-ink focus:ring-1 focus:ring-hive-ink transition-colors resize-none" 
                    placeholder="How can we help you?"
                  />
                </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-hive-ink hover:bg-neutral-800 disabled:opacity-50 text-white font-semibold rounded-xl px-6 py-4 transition-all duration-200 hover:scale-[1.01] shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
            )}
        </div>

        {/* Info & Map */}
        <div className="min-w-0 flex flex-col gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="w-12 h-12 shrink-0 bg-neutral-100 rounded-full flex items-center justify-center mb-4 text-hive-ink" style={{ width: 48, height: 48 }}>
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-hive-ink mb-2">Visit Us</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Hive Estates HQ<br />
                1st Main Road, Tilakwadi<br />
                Belagavi, Karnataka 590006
              </p>
            </div>

            <div>
              <div className="w-12 h-12 shrink-0 bg-neutral-100 rounded-full flex items-center justify-center mb-4 text-hive-ink" style={{ width: 48, height: 48 }}>
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-hive-ink mb-2">Call Us</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-1">
                Sales: <a href="tel:+919876543210" className="hover:text-hive-ink transition-colors">+91 98765 43210</a>
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed">
                Support: <a href="tel:+919876543211" className="hover:text-hive-ink transition-colors">+91 98765 43211</a>
              </p>
            </div>

            <div>
              <div className="w-12 h-12 shrink-0 bg-neutral-100 rounded-full flex items-center justify-center mb-4 text-hive-ink" style={{ width: 48, height: 48 }}>
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-hive-ink mb-2">Email Us</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-1">
                <a href="mailto:hello@hiveestates.in" className="hover:text-hive-ink transition-colors">hello@hiveestates.in</a>
              </p>
              <p className="text-neutral-500 text-sm leading-relaxed">
                <a href="mailto:support@hiveestates.in" className="hover:text-hive-ink transition-colors">support@hiveestates.in</a>
              </p>
            </div>
          </div>

          <div className="h-[300px] md:h-[400px] w-full rounded-[32px] overflow-hidden border border-neutral-200 shadow-sm relative">
            <iframe
              src="https://maps.google.com/maps?q=15.843344192455298,74.49440617116439&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
              title="Hive Estates Office Location"
            ></iframe>
          </div>
        </div>
      </div>

    </div>
    </div >
  );
}
