import RestaurantHero from "./components/RestaurantHome/RestaurantHero";
import OffersSection from "./components/RestaurantHome/OffersSection";
import SignatureSection from "./components/RestaurantHome/SignatureSection";
import TestimonialsSection from "./components/RestaurantHome/TestimonialsSection";
import FaqSection from "./components/RestaurantHome/FaqSection";
import ReservationCTA from "./components/RestaurantHome/ReservationCTA";

export default function Page() {
  return (
    <div className="bg-white dark:bg-zinc-950 transition-colors duration-300">
      <RestaurantHero />
      <OffersSection />
      <SignatureSection />
      <TestimonialsSection />
      <FaqSection />
      <ReservationCTA />
    </div>
  );
}
