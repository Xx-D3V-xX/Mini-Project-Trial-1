import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { itineraries, type Itinerary, type InsertItinerary } from "@shared/schema";

export class ItinerariesRepository {
  async getItinerary(id: string): Promise<Itinerary | undefined> {
    const result = await db.select().from(itineraries).where(eq(itineraries.id, id)).limit(1);
    return result[0];
  }

  async getItinerariesByUser(userId: string): Promise<Itinerary[]> {
    return await db.select().from(itineraries).where(eq(itineraries.userId, userId)).orderBy(desc(itineraries.createdAt));
  }

  async createItinerary(insertItinerary: InsertItinerary): Promise<Itinerary> {
    const result = await db.insert(itineraries).values(insertItinerary).returning();
    return result[0];
  }

  async deleteItinerary(id: string): Promise<void> {
    await db.delete(itineraries).where(eq(itineraries.id, id));
  }

  async getAllItineraries(limit: number = 100): Promise<Itinerary[]> {
    return await db.select().from(itineraries).orderBy(desc(itineraries.createdAt)).limit(limit);
  }
}

export const itinerariesRepo = new ItinerariesRepository();
