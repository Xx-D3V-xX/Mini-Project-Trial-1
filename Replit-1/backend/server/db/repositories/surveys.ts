import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { surveys, type Survey, type InsertSurvey } from "@shared/schema";

export class SurveysRepository {
  async getSurveyByUser(userId: string): Promise<Survey | undefined> {
    const result = await db.select().from(surveys).where(eq(surveys.userId, userId)).orderBy(desc(surveys.createdAt)).limit(1);
    return result[0];
  }

  async createSurvey(insertSurvey: InsertSurvey): Promise<Survey> {
    const result = await db.insert(surveys).values(insertSurvey).returning();
    return result[0];
  }

  async updateSurvey(id: string, answers: any): Promise<Survey | undefined> {
    const result = await db.update(surveys).set({ answers }).where(eq(surveys.id, id)).returning();
    return result[0];
  }
}

export const surveysRepo = new SurveysRepository();
