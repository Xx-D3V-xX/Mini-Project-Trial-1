import { ItineraryForm } from "../ItineraryForm";

export default function ItineraryFormExample() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <ItineraryForm
        onGenerate={(data) => console.log("Generate itinerary:", data)}
      />
    </div>
  );
}
