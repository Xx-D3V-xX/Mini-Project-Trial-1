import { eq, like, or, desc, asc } from "drizzle-orm";
import { db } from "../index";
import { pois, type POI, type InsertPOI } from "@shared/schema";

export class POIsRepository {
  async getAllPOIs(): Promise<POI[]> {
    return await db.select().from(pois).orderBy(asc(pois.createdAt));
  }

  async getPOIById(id: string): Promise<POI | undefined> {
    const result = await db.select().from(pois).where(eq(pois.id, id)).limit(1);
    return result[0];
  }

  async getPOIsByCategory(category: string): Promise<POI[]> {
    return await db.select().from(pois).where(eq(pois.category, category));
  }

  async searchPOIs(query: string): Promise<POI[]> {
    const searchPattern = `%${query}%`;
    return await db.select().from(pois).where(
      or(
        like(pois.title, searchPattern),
        like(pois.description, searchPattern),
        like(pois.category, searchPattern)
      )
    );
  }

  async createPOI(insertPOI: InsertPOI): Promise<POI> {
    const result = await db.insert(pois).values(insertPOI).returning();
    return result[0];
  }

  async updatePOI(id: string, data: Partial<InsertPOI>): Promise<POI | undefined> {
    const result = await db.update(pois).set({ ...data, updatedAt: new Date() }).where(eq(pois.id, id)).returning();
    return result[0];
  }

  async deletePOI(id: string): Promise<void> {
    await db.delete(pois).where(eq(pois.id, id));
  }

  async getPaginatedPOIs(page: number = 1, pageSize: number = 20): Promise<{ pois: POI[], total: number }> {
    const offset = (page - 1) * pageSize;
    const [poisData, totalResult] = await Promise.all([
      db.select().from(pois).limit(pageSize).offset(offset).orderBy(desc(pois.createdAt)),
      db.select({ count: pois.id }).from(pois)
    ]);
    return { pois: poisData, total: totalResult.length };
  }
}

export const poisRepo = new POIsRepository();
