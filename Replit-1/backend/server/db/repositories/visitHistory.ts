import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { visitHistory, type VisitHistory, type InsertVisitHistory } from "@shared/schema";

export class VisitHistoryRepository {
  async getVisitHistory(userId: string): Promise<VisitHistory[]> {
    return await db.select().from(visitHistory).where(eq(visitHistory.userId, userId)).orderBy(desc(visitHistory.visitedAt));
  }

  async addVisitHistory(insertVisit: InsertVisitHistory): Promise<VisitHistory> {
    const result = await db.insert(visitHistory).values(insertVisit).returning();
    return result[0];
  }

  async getAllVisitHistory(limit: number = 100): Promise<VisitHistory[]> {
    return await db.select().from(visitHistory).orderBy(desc(visitHistory.visitedAt)).limit(limit);
  }
}

export const visitHistoryRepo = new VisitHistoryRepository();
