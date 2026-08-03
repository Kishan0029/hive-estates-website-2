import { useState } from 'react';

const FAQS = [
  {
    q: 'What does "Hive Verified" actually mean?',
    a: "Every Hive Verified listing has been physically checked by our team — ownership documents, title clarity, and on-ground details are confirmed before it goes live. The badge is our promise that what you see is real.",
  },
  {
    q: "How do I contact a property owner or agent?",
    a: 'Open any listing and tap "Contact". You can reach the verified owner or agent directly — there are no middlemen inserted between you and the seller.',
  },
  {
    q: "Is there any fee to browse listings?",
    a: "No. Browsing, searching, and shortlisting properties on Hive Estates is completely free for buyers and renters. You only ever deal directly with the seller.",
  },
  {
    q: "How do I post my own property?",
    a: 'Tap "Post Property", add your details and photos, and our team verifies it before publishing. Verified listings receive up to 3x more genuine enquiries.',
  },
  {
    q: "Which areas of Belagavi do you cover?",
    a: "We cover all major localities including Tilakwadi, Camp, Shahapur, Vadgaon, Hindwadi and Nehru Nagar, with new verified properties added every week.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-[#FAFAFA] border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-5 py-20 md:py-28">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-hive-green">
            FAQs
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tighter text-hive-ink">
            Questions, answered
          </h2>
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {FAQS.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div key={index} className="py-1">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-lg md:text-xl font-semibold transition-colors ${
                      isOpen
                        ? "text-neutral-900 font-bold"
                        : "text-neutral-900 group-hover:text-neutral-600"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      isOpen
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-900 group-hover:bg-neutral-200"
                    }`}
                  >
                    {isOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    )}
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-7 pr-12 text-base text-neutral-600 leading-relaxed max-w-3xl">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
