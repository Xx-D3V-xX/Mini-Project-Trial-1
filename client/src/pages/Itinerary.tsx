import { useState } from "react";
import { Header } from "@/components/Header";
import { ItineraryForm } from "@/components/ItineraryForm";
import { ItineraryDisplay } from "@/components/ItineraryDisplay";

const mockGeneratedItinerary = [
  {
    day: 1,
    title: "Heritage & Iconic Landmarks",
    pois: [
      {
        name: "Gateway of India",
        description: "Start your Mumbai journey at this iconic monument overlooking the Arabian Sea, built during British Raj",
        duration: "1 hour",
      },
      {
        name: "Taj Mahal Palace Hotel",
        description: "Admire the architecture and history of this legendary luxury hotel next to Gateway",
        duration: "30 mins",
      },
      {
        name: "Chhatrapati Shivasu Terminus",
        description: "UNESCO World Heritage Site featuring stunning Victorian Gothic architecture",
        duration: "1 hour",
      },
      {
        name: "Marine Drive Sunset",
        description: "Evening stroll along Queen's Necklace with breathtaking sunset views",
        duration: "2 hours",
      },
    ],
  },
  {
    day: 2,
    title: "Food & Markets Adventure",
    pois: [
      {
        name: "Crawford Market",
        description: "Explore bustling colonial-era market with fresh produce, spices, and local goods",
        duration: "2 hours",
      },
      {
        name: "Mohammad Ali Road",
        description: "Indulge in famous street food - kebabs, biryani, and traditional sweets",
        duration: "2 hours",
      },
      {
        name: "Chor Bazaar",
        description: "Hunt for antiques, vintage items, and unique finds in this thieves' market",
        duration: "1.5 hours",
      },
    ],
  },
  {
    day: 3,
    title: "Nature & Spirituality",
    pois: [
      {
        name: "Elephanta Caves",
        description: "Ferry ride to ancient rock-cut temples with impressive Hindu sculptures",
        duration: "4 hours",
      },
      {
        name: "Haji Ali Dargah",
        description: "Visit iconic mosque on causeway, especially beautiful at sunset",
        duration: "1.5 hours",
      },
      {
        name: "Worli Sea Face",
        description: "Relax by the sea with views of Bandra-Worli Sea Link",
        duration: "1 hour",
      },
    ],
  },
];

export default function Itinerary() {
  const [generatedItinerary, setGeneratedItinerary] = useState<typeof mockGeneratedItinerary | null>(null);

  const handleGenerate = (data: any) => {
    console.log("Generating itinerary with:", data);
    setTimeout(() => {
      setGeneratedItinerary(mockGeneratedItinerary);
    }, 1000);
  };

  const handleSave = () => {
    console.log("Itinerary saved to profile");
  };

  return (
    <div className="min-h-screen">
      <Header isLoggedIn={true} onLogout={() => console.log("Logout")} />

      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">
              Plan Your Trip
            </h1>
            <p className="text-lg text-muted-foreground">
              Generate a personalized itinerary powered by AI
            </p>
          </div>

          {!generatedItinerary ? (
            <ItineraryForm onGenerate={handleGenerate} />
          ) : (
            <ItineraryDisplay
              itinerary={generatedItinerary}
              onSave={handleSave}
            />
          )}
        </div>
      </div>
    </div>
  );
}
