import { HeroSection } from "../components/HeroSection";
import { MarqueeBanner } from "../components/MarqueeBanner";
import { FeaturedLand } from "../components/FeaturedLand";
import { FeaturedHomes } from "../components/FeaturedHomes";
import { JustAdded } from "../components/JustAdded";
import { Neighbourhoods } from "../components/Neighbourhoods";
import { WhyHive } from "../components/WhyHive";
import { FAQSection } from "../components/FAQSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <main className="bg-white">
        <MarqueeBanner />
        <FeaturedLand />
        <FeaturedHomes />
        <JustAdded />
        <Neighbourhoods />
        <WhyHive />
        <FAQSection />
      </main>
    </>
  );
}
