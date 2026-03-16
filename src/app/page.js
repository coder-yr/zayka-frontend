import HeroSection from "./components/Home/HeroSection";
import FeaturesSection from "./components/Home/FeaturesSection";
import GrowthModulesSection from "./components/Home/GrowthModulesSection";
import FloorMonitoringSection from "./components/Home/FloorMonitoringSection";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <GrowthModulesSection />
      <FloorMonitoringSection />
      {/* Baaki sections */}
    </div>
  );
}
