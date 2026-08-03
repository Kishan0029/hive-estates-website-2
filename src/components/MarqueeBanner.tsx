

const MARQUEE_ITEMS = [
  "Hive Verified - Clear Titles",
  "Apartments",
  "Bungalows",
  "Land & Plots",
  "Belagavi",
  "Direct Owner Contact",
];

export function MarqueeBanner() {
  return (
    <section className="border-y border-neutral-200 bg-[#FAFAFA] py-6 mt-48 md:mt-28 overflow-hidden">
      <div
        className="rfm-marquee-container hive-marquee-track"
        style={{ width: "100%" }}
      >
        <div className="rfm-marquee" style={{ minWidth: "100%" }}>
          <div className="rfm-initial-child-container">
            {MARQUEE_ITEMS.map((item) => (
              <div key={item} className="rfm-child">
                <span className="flex items-center text-2xl md:text-3xl font-bold tracking-tight text-hive-ink/80 mx-8">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rfm-marquee" style={{ minWidth: "100%" }}>
          {MARQUEE_ITEMS.map((item) => (
            <div key={item} className="rfm-child">
              <span className="flex items-center text-2xl md:text-3xl font-bold tracking-tight text-hive-ink/80 mx-8">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
