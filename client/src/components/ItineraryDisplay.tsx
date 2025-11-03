import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Save } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface POI {
  name: string;
  description: string;
  duration: string;
  imageUrl?: string;
}

interface DayPlan {
  day: number;
  title: string;
  pois: POI[];
}

interface ItineraryDisplayProps {
  itinerary: DayPlan[];
  onSave?: () => void;
  isSaving?: boolean;
}

export function ItineraryDisplay({ itinerary, onSave, isSaving }: ItineraryDisplayProps) {
  const handleSave = () => {
    console.log("Saving itinerary");
    onSave?.();
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-2">
              Your Mumbai Itinerary
            </h2>
            <p className="text-sm text-muted-foreground">
              {itinerary.length} days of curated experiences
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} data-testid="button-save-itinerary">
            <Save className="mr-2 h-5 w-5" />
            {isSaving ? "Saving..." : "Save to Profile"}
          </Button>
        </div>
      </Card>

      <Accordion type="single" collapsible className="space-y-4">
        {itinerary.map((day) => (
          <AccordionItem
            key={day.day}
            value={`day-${day.day}`}
            className="border rounded-lg"
          >
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover-elevate">
                <div className="flex items-center gap-4 text-left">
                  <Badge variant="outline" className="shrink-0">
                    Day {day.day}
                  </Badge>
                  <span className="font-semibold">{day.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-4 space-y-4">
                  {day.pois.map((poi, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 rounded-lg bg-muted/50"
                      data-testid={`poi-${day.day}-${index}`}
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold">{poi.name}</h4>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                            <Clock className="h-4 w-4" />
                            <span>{poi.duration}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {poi.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 -ml-2"
                          data-testid={`button-location-${day.day}-${index}`}
                        >
                          <MapPin className="h-4 w-4" />
                          View on Map
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
