import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { TrailCard } from "@/components/TrailCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { POI } from "@shared/schema";
import marinedriveImage from "@assets/generated_images/Marine_Drive_aerial_view_d30963bb.png";
import streetfoodImage from "@assets/generated_images/Mumbai_street_food_scene_c24e9da6.png";
import cstImage from "@assets/generated_images/CST_railway_station_architecture_9f2b55d3.png";
import elephantaImage from "@assets/generated_images/Elephanta_Caves_interior_42079583.png";
import hajialiImage from "@assets/generated_images/Haji_Ali_Dargah_sunset_cafe9eaf.png";
import crawfordImage from "@assets/generated_images/Crawford_Market_interior_08e7c3b6.png";
import parkImage from "@assets/generated_images/Sanjay_Gandhi_National_Park_30545ccd.png";
import skylineImage from "@assets/generated_images/Mumbai_skyline_at_night_8bdfc5a3.png";

const categories = ["All", "Heritage", "Food", "Nature", "Adventure"];

const imageMap: Record<string, string> = {
  "marine-drive": marinedriveImage,
  "street-food": streetfoodImage,
  "cst": cstImage,
  "elephanta": elephantaImage,
  "haji-ali": hajialiImage,
  "crawford": crawfordImage,
  "park": parkImage,
  "skyline": skylineImage,
};

function getImageForPOI(imageUrl: string) {
  const key = imageUrl.split("/").pop()?.split(".")[0];
  return imageMap[key || ""] || marinedriveImage;
}

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: pois, isLoading } = useQuery<POI[]>({
    queryKey: ["/api/pois"],
  });

  const filteredTrails = useMemo(() => {
    if (!pois) return [];
    return pois.filter((poi) => {
      const matchesCategory =
        selectedCategory === "All" || poi.category === selectedCategory;
      const matchesSearch = poi.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [pois, selectedCategory, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-lg" data-testid="loading-pois">Loading trails...</div>
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
            {filteredTrails.map((poi) => (
              <TrailCard
                key={poi.id}
                id={poi.id}
                title={poi.title}
                description={poi.description}
                imageUrl={getImageForPOI(poi.imageUrl)}
                duration={poi.duration}
                difficulty={poi.difficulty as "Easy" | "Moderate" | "Hard"}
                category={poi.category}
              />
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
