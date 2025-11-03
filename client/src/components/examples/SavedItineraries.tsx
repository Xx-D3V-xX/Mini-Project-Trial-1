import { SavedItineraries } from "../SavedItineraries";

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
];

export default function SavedItinerariesExample() {
  return (
    <div className="p-8 max-w-2xl">
      <SavedItineraries
        itineraries={mockItineraries}
        onDelete={(id) => console.log(`Delete ${id}`)}
        onView={(id) => console.log(`View ${id}`)}
      />
    </div>
  );
}
