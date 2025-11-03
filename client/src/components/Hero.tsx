import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Gateway_of_India_sunset_hero_968c51a3.png";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
            Discover Mumbai's Hidden Gems
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore the vibrant culture, iconic landmarks, and authentic experiences in the City of Dreams with AI-powered personalized itineraries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore" data-testid="link-hero-explore">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover-elevate active-elevate-2 border border-primary-border"
              >
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/itinerary" data-testid="link-hero-plan">
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-md bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                Plan Your Trip
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
