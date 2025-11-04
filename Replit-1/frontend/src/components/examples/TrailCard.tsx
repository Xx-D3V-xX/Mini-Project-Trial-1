import { TrailCard } from "../TrailCard";
import marinedriveImage from "@assets/generated_images/Marine_Drive_aerial_view_d30963bb.png";

export default function TrailCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <TrailCard
        id="1"
        title="Marine Drive Promenade"
        description="Walk along Mumbai's iconic Queen's Necklace, enjoy the sea breeze and stunning sunset views"
        imageUrl={marinedriveImage}
        duration="2-3 hours"
        difficulty="Easy"
        category="Heritage"
        onSave={(id) => console.log(`Saved trail ${id}`)}
      />
    </div>
  );
}
