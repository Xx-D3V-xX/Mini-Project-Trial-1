import { useState } from "react";
import { Header } from "@/components/Header";
import { TrailCard } from "@/components/TrailCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import marinedriveImage from "@assets/generated_images/Marine_Drive_aerial_view_d30963bb.png";
import streetfoodImage from "@assets/generated_images/Mumbai_street_food_scene_c24e9da6.png";
import cstImage from "@assets/generated_images/CST_railway_station_architecture_9f2b55d3.png";
import elephantaImage from "@assets/generated_images/Elephanta_Caves_interior_42079583.png";
import hajialiImage from "@assets/generated_images/Haji_Ali_Dargah_sunset_cafe9eaf.png";
import crawfordImage from "@assets/generated_images/Crawford_Market_interior_08e7c3b6.png";
import parkImage from "@assets/generated_images/Sanjay_Gandhi_National_Park_30545ccd.png";
import skylineImage from "@assets/generated_images/Mumbai_skyline_at_night_8bdfc5a3.png";

const categories = ["All", "Heritage", "Food", "Nature", "Adventure"];

const mockTrails = [
  {
    id: "1",
    title: "Marine Drive Promenade",
    description: "Walk along Mumbai's iconic Queen's Necklace, enjoy the sea breeze and stunning sunset views over the Arabian Sea",
    imageUrl: marinedriveImage,
    duration: "2-3 hours",
    difficulty: "Easy" as const,
    category: "Heritage",
  },
  {
    id: "2",
    title: "Street Food Paradise",
    description: "Experience authentic Mumbai flavors with vada pav, bhel puri, and pav bhaji at the city's most famous food streets",
    imageUrl: streetfoodImage,
    duration: "3-4 hours",
    difficulty: "Easy" as const,
    category: "Food",
  },
  {
    id: "3",
    title: "Victorian Gothic Architecture",
    description: "Explore UNESCO World Heritage Site Chhatrapati Shivaji Terminus and surrounding colonial-era buildings",
    imageUrl: cstImage,
    duration: "2 hours",
    difficulty: "Easy" as const,
    category: "Heritage",
  },
  {
    id: "4",
    title: "Elephanta Caves Journey",
    description: "Ferry ride to ancient rock-cut caves featuring impressive Hindu sculptures and temple complexes",
    imageUrl: elephantaImage,
    duration: "4-5 hours",
    difficulty: "Moderate" as const,
    category: "Heritage",
  },
  {
    id: "5",
    title: "Haji Ali Spiritual Walk",
    description: "Visit the iconic mosque on a causeway, surrounded by the Arabian Sea, especially beautiful at sunset",
    imageUrl: hajialiImage,
    duration: "1-2 hours",
    difficulty: "Easy" as const,
    category: "Heritage",
  },
  {
    id: "6",
    title: "Crawford Market Experience",
    description: "Discover vibrant colonial-era market filled with fresh produce, spices, and local goods in historic building",
    imageUrl: crawfordImage,
    duration: "2 hours",
    difficulty: "Easy" as const,
    category: "Food",
  },
  {
    id: "7",
    title: "Sanjay Gandhi National Park Trek",
    description: "Escape to lush green trails, explore Kanheri Caves, and spot wildlife in this urban national park",
    imageUrl: parkImage,
    duration: "4-6 hours",
    difficulty: "Moderate" as const,
    category: "Nature",
  },
  {
    id: "8",
    title: "Mumbai Night Lights Tour",
    description: "Experience the city's dazzling nighttime skyline, from Bandra-Worli Sea Link to illuminated landmarks",
    imageUrl: skylineImage,
    duration: "3 hours",
    difficulty: "Easy" as const,
    category: "Adventure",
  },
];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrails = mockTrails.filter((trail) => {
    const matchesCategory =
      selectedCategory === "All" || trail.category === selectedCategory;
    const matchesSearch = trail.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Header isLoggedIn={true} onLogout={() => console.log("Logout")} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold">
              Explore Mumbai
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover curated trails and hidden gems across the city
            </p>
          </div>

          <div className="sticky top-20 z-40 bg-background py-4 -mt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search trails..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 whitespace-nowrap hover-elevate"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`badge-category-${category.toLowerCase()}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrails.map((trail) => (
              <TrailCard key={trail.id} {...trail} />
            ))}
          </div>

          {filteredTrails.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No trails found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
