import { poisRepo } from "../db/repositories/pois";
import { adminsRepo } from "../db/repositories/admins";
import bcrypt from "bcrypt";

async function seed() {
  console.log("Seeding database...");

  const poisData = [
    {
      title: "Marine Drive Promenade",
      description: "Walk along Mumbai's iconic Queen's Necklace, enjoy the sea breeze and stunning sunset views over the Arabian Sea",
      imageUrl: "/assets/marine-drive.jpg",
      duration: "2-3 hours",
      difficulty: "Easy",
      category: "Heritage",
    },
    {
      title: "Street Food Paradise",
      description: "Experience authentic Mumbai flavors with vada pav, bhel puri, and pav bhaji at the city's most famous food streets",
      imageUrl: "/assets/street-food.jpg",
      duration: "3-4 hours",
      difficulty: "Easy",
      category: "Food",
    },
    {
      title: "Victorian Gothic Architecture",
      description: "Explore UNESCO World Heritage Site Chhatrapati Shivasu Terminus and surrounding colonial-era buildings",
      imageUrl: "/assets/cst.jpg",
      duration: "2 hours",
      difficulty: "Easy",
      category: "Heritage",
    },
    {
      title: "Elephanta Caves Journey",
      description: "Ferry ride to ancient rock-cut caves featuring impressive Hindu sculptures and temple complexes",
      imageUrl: "/assets/elephanta.jpg",
      duration: "4-5 hours",
      difficulty: "Moderate",
      category: "Heritage",
    },
    {
      title: "Haji Ali Spiritual Walk",
      description: "Visit the iconic mosque on a causeway, surrounded by the Arabian Sea, especially beautiful at sunset",
      imageUrl: "/assets/haji-ali.jpg",
      duration: "1-2 hours",
      difficulty: "Easy",
      category: "Heritage",
    },
    {
      title: "Crawford Market Experience",
      description: "Discover vibrant colonial-era market filled with fresh produce, spices, and local goods in historic building",
      imageUrl: "/assets/crawford.jpg",
      duration: "2 hours",
      difficulty: "Easy",
      category: "Food",
    },
    {
      title: "Sanjay Gandhi National Park Trek",
      description: "Escape to lush green trails, explore Kanheri Caves, and spot wildlife in this urban national park",
      imageUrl: "/assets/park.jpg",
      duration: "4-6 hours",
      difficulty: "Moderate",
      category: "Nature",
    },
    {
      title: "Mumbai Night Lights Tour",
      description: "Experience the city's dazzling nighttime skyline, from Bandra-Worli Sea Link to illuminated landmarks",
      imageUrl: "/assets/skyline.jpg",
      duration: "3 hours",
      difficulty: "Easy",
      category: "Adventure",
    },
  ];

  const existingPOIs = await poisRepo.getAllPOIs();
  if (existingPOIs.length === 0) {
    console.log("Seeding POIs...");
    for (const poi of poisData) {
      await poisRepo.createPOI(poi);
    }
    console.log(`Seeded ${poisData.length} POIs`);
  } else {
    console.log(`POIs already exist (${existingPOIs.length}), skipping...`);
  }

  const adminEmail = "admin@mumbaitravel.com";
  const existingAdmin = await adminsRepo.getAdminByEmail(adminEmail);
  if (!existingAdmin) {
    console.log("Creating admin user...");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await adminsRepo.createAdmin({
      email: adminEmail,
      name: "Admin User",
      password: hashedPassword,
      role: "superadmin",
    });
    console.log(`Created admin: ${adminEmail} / admin123`);
  } else {
    console.log("Admin user already exists, skipping...");
  }

  console.log("Seeding completed!");
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
