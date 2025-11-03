import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Heart } from "lucide-react";
import { useState } from "react";

export interface TrailCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  category: string;
  isSaved?: boolean;
  onSave?: (id: string) => void;
}

const fallbackImage = "https://source.unsplash.com/800x600/?mumbai,travel";

export function TrailCard({
  id,
  title,
  description,
  imageUrl,
  duration,
  difficulty,
  category,
  isSaved = false,
  onSave,
}: TrailCardProps) {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [saved, setSaved] = useState(isSaved);

  const handleImageError = () => {
    setImgSrc(fallbackImage);
  };

  const handleSave = () => {
    setSaved(!saved);
    onSave?.(id);
    console.log(`Trail ${id} ${!saved ? 'saved' : 'unsaved'}`);
  };

  const difficultyColors = {
    Easy: "text-green-600 dark:text-green-400",
    Moderate: "text-yellow-600 dark:text-yellow-400",
    Challenging: "text-red-600 dark:text-red-400",
  };

  return (
    <Card
      className="overflow-hidden hover-elevate transition-all duration-300 group"
      data-testid={`card-trail-${id}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 right-4">
          <Button
            size="icon"
            variant="secondary"
            className="backdrop-blur-md bg-white/90 dark:bg-black/60"
            onClick={handleSave}
            data-testid={`button-save-${id}`}
          >
            <Heart
              className={`h-5 w-5 ${saved ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className={difficultyColors[difficulty]}>{difficulty}</span>
          </div>
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {category}
          </span>
        </div>

        <Button className="w-full" data-testid={`button-view-${id}`}>
          View Details
        </Button>
      </div>
    </Card>
  );
}
