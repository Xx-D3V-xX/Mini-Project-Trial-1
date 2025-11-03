import { Map, Sparkles, Heart, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Map,
    title: "Curated Trails",
    description: "Discover handpicked routes covering heritage sites, food streets, nature spots, and adventure destinations across Mumbai",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Itineraries",
    description: "Generate personalized travel plans based on your interests, duration, and preferences with intelligent recommendations",
  },
  {
    icon: Heart,
    title: "Save & Share",
    description: "Bookmark your favorite places, save custom itineraries, and share your Mumbai experiences with fellow travelers",
  },
  {
    icon: Clock,
    title: "Smart Planning",
    description: "Optimize your time with duration estimates, best visiting hours, and insider tips for each destination",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Why Choose Mumbai Explorer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to experience Mumbai like a local
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover-elevate transition-all duration-300"
                data-testid={`card-feature-${index}`}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
