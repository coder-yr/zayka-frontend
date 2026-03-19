import HeroSection from "./components/Home/HeroSection";
import FeaturesSection from "./components/Home/FeaturesSection";
import GrowthModulesSection from "./components/Home/GrowthModulesSection";
import CTASection from "./components/Home/CTASection";
import SuccessStoriesSection from "./components/Home/SuccessStoriesSection";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <GrowthModulesSection />
      <CTASection />
      <SuccessStoriesSection />
      {/* Baaki sections */}
    </div>
  );
}
