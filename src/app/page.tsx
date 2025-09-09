import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedEvents } from "@/components/home/FeaturedEvents";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { StatsSection } from "@/components/home/StatsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedEvents />
      <NewsletterSection />
    </>
  );
}
