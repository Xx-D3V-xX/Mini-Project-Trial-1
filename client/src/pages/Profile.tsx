import { useState } from "react";
import { Header } from "@/components/Header";
import { ProfileStats } from "@/components/ProfileStats";
import { SavedItineraries } from "@/components/SavedItineraries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const mockItineraries = [
  {
    id: "1",
    title: "Weekend Heritage Tour",
    date: "Dec 15, 2024",
    days: 2,
    locations: 8,
  },
  {
    id: "2",
    title: "Mumbai Food Trail",
    date: "Nov 28, 2024",
    days: 1,
    locations: 6,
  },
  {
    id: "3",
    title: "Complete Mumbai Experience",
    date: "Oct 10, 2024",
    days: 5,
    locations: 20,
  },
];

const mockHistory = [
  {
    id: "1",
    name: "Gateway of India",
    date: "Dec 1, 2024",
    category: "Heritage",
  },
  {
    id: "2",
    name: "Marine Drive",
    date: "Nov 25, 2024",
    category: "Heritage",
  },
  {
    id: "3",
    name: "Elephanta Caves",
    date: "Nov 20, 2024",
    category: "Heritage",
  },
];

export default function Profile() {
  const [itineraries, setItineraries] = useState(mockItineraries);

  const handleDelete = (id: string) => {
    setItineraries(itineraries.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen">
      <Header isLoggedIn={true} onLogout={() => console.log("Logout")} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">
              My Profile
            </h1>
            <p className="text-lg text-muted-foreground">
              Your Mumbai exploration journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ProfileStats
                username="Mumbai Explorer"
                memberSince="Jan 2024"
                tripsCount={itineraries.length}
                placesVisited={23}
                savedCount={12}
              />
            </div>

            <div className="lg:col-span-3">
              <Tabs defaultValue="itineraries" className="space-y-6">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="itineraries" data-testid="tab-itineraries">
                    Saved Itineraries
                  </TabsTrigger>
                  <TabsTrigger value="history" data-testid="tab-history">
                    Visit History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="itineraries">
                  <SavedItineraries
                    itineraries={itineraries}
                    onDelete={handleDelete}
                    onView={(id) => console.log(`View itinerary ${id}`)}
                  />
                </TabsContent>

                <TabsContent value="history">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Visit History</h3>
                    <div className="space-y-3">
                      {mockHistory.map((visit) => (
                        <Card
                          key={visit.id}
                          className="p-4 hover-elevate transition-all"
                          data-testid={`card-visit-${visit.id}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MapPin className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{visit.name}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{visit.date}</span>
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline">{visit.category}</Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
