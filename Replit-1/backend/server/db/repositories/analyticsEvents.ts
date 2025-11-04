import { eq, desc, and, gte, lte, sql } from "drizzle-orm";
import { db } from "../index";
import { analyticsEvents, type AnalyticsEvent, type InsertAnalyticsEvent } from "@shared/schema";

export class AnalyticsEventsRepository {
  async createEvent(insertEvent: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const result = await db.insert(analyticsEvents).values(insertEvent).returning();
    return result[0];
  }

  async getEventsByUser(userId: string, limit: number = 100): Promise<AnalyticsEvent[]> {
    return await db.select().from(analyticsEvents).where(eq(analyticsEvents.userId, userId)).orderBy(desc(analyticsEvents.createdAt)).limit(limit);
  }

  async getEventsByKind(kind: string, limit: number = 100): Promise<AnalyticsEvent[]> {
    return await db.select().from(analyticsEvents).where(eq(analyticsEvents.kind, kind)).orderBy(desc(analyticsEvents.createdAt)).limit(limit);
  }

  async getEventsInDateRange(startDate: Date, endDate: Date): Promise<AnalyticsEvent[]> {
    return await db.select().from(analyticsEvents).where(
      and(
        gte(analyticsEvents.createdAt, startDate),
        lte(analyticsEvents.createdAt, endDate)
      )
    ).orderBy(desc(analyticsEvents.createdAt));
  }

  async getEventCounts(startDate: Date, endDate: Date): Promise<Record<string, number>> {
    const results = await db.select({
      kind: analyticsEvents.kind,
      count: sql<number>`count(*)::int`
    }).from(analyticsEvents).where(
      and(
        gte(analyticsEvents.createdAt, startDate),
        lte(analyticsEvents.createdAt, endDate)
      )
    ).groupBy(analyticsEvents.kind);

    return results.reduce((acc, row) => {
      acc[row.kind] = row.count;
      return acc;
    }, {} as Record<string, number>);
  }

  async getUniqueUserCount(startDate: Date, endDate: Date): Promise<number> {
    const result = await db.select({
      count: sql<number>`count(distinct ${analyticsEvents.userId})::int`
    }).from(analyticsEvents).where(
      and(
        gte(analyticsEvents.createdAt, startDate),
        lte(analyticsEvents.createdAt, endDate)
      )
    );
    return result[0]?.count || 0;
  }
}

export const analyticsEventsRepo = new AnalyticsEventsRepository();
