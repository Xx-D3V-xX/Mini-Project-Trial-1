import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Sparkles } from "lucide-react";

const interestOptions = [
  "Heritage Sites",
  "Street Food",
  "Nature & Parks",
  "Adventure",
  "Shopping",
  "Nightlife",
  "Art & Culture",
  "Photography",
];

interface ItineraryFormProps {
  onGenerate?: (data: any) => void;
  isGenerating?: boolean;
}

export function ItineraryForm({ onGenerate, isGenerating }: ItineraryFormProps) {
  const [duration, setDuration] = useState("3");
  const [travelers, setTravelers] = useState("2");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [requirements, setRequirements] = useState("");

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      duration,
      travelers,
      interests: selectedInterests,
      requirements,
    };
    console.log("Generating itinerary:", data);
    onGenerate?.(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Trip Details</h3>
          <p className="text-sm text-muted-foreground">
            Tell us about your travel plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Duration (days)
            </Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="14"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              data-testid="input-duration"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Number of Travelers
            </Label>
            <Input
              id="travelers"
              type="number"
              min="1"
              max="20"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              data-testid="input-travelers"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Your Interests</h3>
          <p className="text-sm text-muted-foreground">
            Select what you'd like to experience
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {interestOptions.map((interest) => (
            <Badge
              key={interest}
              variant={selectedInterests.includes(interest) ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 hover-elevate"
              onClick={() => toggleInterest(interest)}
              data-testid={`badge-interest-${interest.toLowerCase().replace(/\s/g, '-')}`}
            >
              {interest}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Special Requirements</h3>
          <p className="text-sm text-muted-foreground">
            Any dietary restrictions, accessibility needs, or preferences?
          </p>
        </div>

        <Textarea
          placeholder="E.g., vegetarian food only, wheelchair accessible places, prefer mornings..."
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          rows={4}
          className="resize-none"
          data-testid="textarea-requirements"
        />
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={selectedInterests.length === 0 || isGenerating}
        data-testid="button-generate"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        {isGenerating ? "Generating..." : "Generate AI Itinerary"}
      </Button>
    </form>
  );
}
