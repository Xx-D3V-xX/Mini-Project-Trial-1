import {
  type User,
  type InsertUser,
  type POI,
  type InsertPOI,
  type Itinerary,
  type InsertItinerary,
  type VisitHistory,
  type InsertVisitHistory,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // POI methods
  getAllPOIs(): Promise<POI[]>;
  getPOIById(id: string): Promise<POI | undefined>;
  createPOI(poi: InsertPOI): Promise<POI>;

  // Itinerary methods
  getItinerary(id: string): Promise<Itinerary | undefined>;
  getItinerariesByUser(userId: string): Promise<Itinerary[]>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  deleteItinerary(id: string): Promise<void>;

  // Visit history methods
  getVisitHistory(userId: string): Promise<VisitHistory[]>;
  addVisitHistory(visit: InsertVisitHistory): Promise<VisitHistory>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private pois: Map<string, POI>;
  private itineraries: Map<string, Itinerary>;
  private visitHistory: Map<string, VisitHistory>;

  constructor() {
    this.users = new Map();
    this.pois = new Map();
    this.itineraries = new Map();
    this.visitHistory = new Map();
    this.seedPOIs();
  }

  private seedPOIs() {
    const poisData: InsertPOI[] = [
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

    poisData.forEach((poi) => {
      const id = randomUUID();
      this.pois.set(id, { ...poi, id });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // POI methods
  async getAllPOIs(): Promise<POI[]> {
    return Array.from(this.pois.values());
  }

  async getPOIById(id: string): Promise<POI | undefined> {
    return this.pois.get(id);
  }

  async createPOI(insertPOI: InsertPOI): Promise<POI> {
    const id = randomUUID();
    const poi: POI = { ...insertPOI, id };
    this.pois.set(id, poi);
    return poi;
  }

  // Itinerary methods
  async getItinerary(id: string): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }

  async getItinerariesByUser(userId: string): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(
      (itinerary) => itinerary.userId === userId,
    );
  }

  async createItinerary(insertItinerary: InsertItinerary): Promise<Itinerary> {
    const id = randomUUID();
    const itinerary: Itinerary = {
      ...insertItinerary,
      id,
      createdAt: new Date(),
    };
    this.itineraries.set(id, itinerary);
    return itinerary;
  }

  async deleteItinerary(id: string): Promise<void> {
    this.itineraries.delete(id);
  }

  // Visit history methods
  async getVisitHistory(userId: string): Promise<VisitHistory[]> {
    return Array.from(this.visitHistory.values())
      .filter((visit) => visit.userId === userId)
      .sort((a, b) => b.visitedAt.getTime() - a.visitedAt.getTime());
  }

  async addVisitHistory(insertVisit: InsertVisitHistory): Promise<VisitHistory> {
    const id = randomUUID();
    const visit: VisitHistory = {
      ...insertVisit,
      id,
      visitedAt: new Date(),
    };
    this.visitHistory.set(id, visit);
    return visit;
  }
}

export const storage = new MemStorage();
