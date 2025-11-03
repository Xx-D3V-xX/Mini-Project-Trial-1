import { ItineraryDisplay } from "../ItineraryDisplay";

const mockItinerary = [
  {
    day: 1,
    title: "Heritage & Culture",
    pois: [
      {
        name: "Gateway of India",
        description: "Iconic monument overlooking the Arabian Sea, built during British Raj",
        duration: "1 hour",
      },
      {
        name: "Chhatrapati Shivaji Terminus",
        description: "UNESCO World Heritage Site, Victorian Gothic railway station",
        duration: "45 mins",
      },
    ],
  },
  {
    day: 2,
    title: "Food & Markets",
    pois: [
      {
        name: "Crawford Market",
        description: "Bustling market for fresh produce, spices and local goods",
        duration: "2 hours",
      },
      {
        name: "Mohammad Ali Road",
        description: "Famous street food destination, especially during Ramadan",
        duration: "1.5 hours",
      },
    ],
  },
];

export default function ItineraryDisplayExample() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <ItineraryDisplay
        itinerary={mockItinerary}
        onSave={() => console.log("Itinerary saved")}
      />
    </div>
  );
}
