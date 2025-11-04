import { eq } from "drizzle-orm";
import { db } from "../index";
import { admins, type Admin, type InsertAdmin } from "@shared/schema";

export class AdminsRepository {
  async getAdmin(id: string): Promise<Admin | undefined> {
    const result = await db.select().from(admins).where(eq(admins.id, id)).limit(1);
    return result[0];
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    const result = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
    return result[0];
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const result = await db.insert(admins).values(insertAdmin).returning();
    return result[0];
  }

  async getAllAdmins(): Promise<Admin[]> {
    return await db.select().from(admins);
  }
}

export const adminsRepo = new AdminsRepository();
