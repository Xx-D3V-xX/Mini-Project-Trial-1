import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trash2 } from "lucide-react";

interface SavedItinerary {
  id: string;
  title: string;
  date: string;
  days: number;
  locations: number;
}

interface SavedItinerariesProps {
  itineraries: SavedItinerary[];
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export function SavedItineraries({
  itineraries,
  onDelete,
  onView,
}: SavedItinerariesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Saved Itineraries</h3>

      {itineraries.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No saved itineraries yet</p>
          <p className="text-sm text-muted-foreground mt-2">
            Generate your first itinerary to get started
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {itineraries.map((itinerary) => (
            <Card
              key={itinerary.id}
              className="p-6 hover-elevate transition-all"
              data-testid={`card-itinerary-${itinerary.id}`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold text-lg">{itinerary.title}</h4>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{itinerary.date}</span>
                    </div>
                    <Badge variant="outline">{itinerary.days} days</Badge>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{itinerary.locations} locations</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    onClick={() => onView?.(itinerary.id)}
                    data-testid={`button-view-${itinerary.id}`}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      console.log(`Deleting itinerary ${itinerary.id}`);
                      onDelete?.(itinerary.id);
                    }}
                    data-testid={`button-delete-${itinerary.id}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
