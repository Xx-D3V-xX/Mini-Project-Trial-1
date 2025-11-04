import { useState } from "react";
import { Header } from "@/components/Header";
import { ItineraryForm } from "@/components/ItineraryForm";
import { ItineraryDisplay } from "@/components/ItineraryDisplay";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ItineraryDay {
  day: number;
  title: string;
  pois: {
    name: string;
    description: string;
    duration: string;
  }[];
}

export default function Itinerary() {
  const [generatedItinerary, setGeneratedItinerary] = useState<ItineraryDay[] | null>(null);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (formData: any) => {
      const response = await apiRequest("POST", "/api/itinerary/generate", formData);
      return await response.json();
    },
    onSuccess: (data) => {
      setGeneratedItinerary(data);
      toast({
        title: "Itinerary generated!",
        description: "Your personalized Mumbai itinerary is ready",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate itinerary",
        variant: "destructive",
      });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!generatedItinerary) return;
      const response = await apiRequest("POST", "/api/profile/itineraries", {
        title: generatedItinerary[0]?.title || "My Mumbai Trip",
        days: generatedItinerary.length,
        data: generatedItinerary,
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile/itineraries"] });
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Itinerary saved!",
        description: "You can view it in your profile",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Save failed",
        description: error.message || "Failed to save itinerary",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = (data: any) => {
    generateMutation.mutate(data);
  };

  const handleSave = () => {
    saveMutation.mutate();
  };

  return (
    <div className="min-h-screen">
      <Header />

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
            <ItineraryForm
              onGenerate={handleGenerate}
              isGenerating={generateMutation.isPending}
            />
          ) : (
            <ItineraryDisplay
              itinerary={generatedItinerary}
              onSave={handleSave}
              isSaving={saveMutation.isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
}
