import { Header } from "@/components/Header";
import { ProfileStats } from "@/components/ProfileStats";
import { SavedItineraries } from "@/components/SavedItineraries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  user: { id: string; username: string };
  stats: {
    tripsCount: number;
    placesVisited: number;
    savedCount: number;
  };
}

interface Itinerary {
  id: string;
  title: string;
  date: string;
  days: number;
  locations: number;
}

interface VisitHistoryItem {
  id: string;
  name: string;
  date: string;
  category: string;
}

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: profile, isLoading: profileLoading } = useQuery<ProfileData>({
    queryKey: ["/api/profile"],
  });

  const { data: itineraries, isLoading: itinerariesLoading } = useQuery<Itinerary[]>({
    queryKey: ["/api/profile/itineraries"],
  });

  const { data: history, isLoading: historyLoading } = useQuery<VisitHistoryItem[]>({
    queryKey: ["/api/profile/history"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/profile/itineraries/${id}`, undefined);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile/itineraries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Itinerary deleted",
        description: "Itinerary has been removed from your profile",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete itinerary",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (profileLoading || itinerariesLoading || historyLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-lg" data-testid="loading-profile">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

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
                username={profile?.user.username || user?.username || "Explorer"}
                memberSince="Jan 2024"
                tripsCount={profile?.stats.tripsCount || 0}
                placesVisited={profile?.stats.placesVisited || 0}
                savedCount={profile?.stats.savedCount || 0}
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
                    itineraries={itineraries || []}
                    onDelete={handleDelete}
                    onView={(id) => console.log(`View itinerary ${id}`)}
                  />
                </TabsContent>

                <TabsContent value="history">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Visit History</h3>
                    {history && history.length > 0 ? (
                      <div className="space-y-3">
                        {history.map((visit) => (
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
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No visit history yet. Start exploring Mumbai!
                      </div>
                    )}
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
