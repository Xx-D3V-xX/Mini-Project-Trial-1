import { ProfileStats } from "../ProfileStats";

export default function ProfileStatsExample() {
  return (
    <div className="p-8 max-w-xs">
      <ProfileStats
        username="Travel Explorer"
        memberSince="Jan 2024"
        tripsCount={5}
        placesVisited={23}
        savedCount={12}
      />
    </div>
  );
}
