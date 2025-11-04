import { eq, desc } from "drizzle-orm";
import { db } from "../index";
import { chats, type Chat, type InsertChat } from "@shared/schema";

export class ChatsRepository {
  async getChat(id: string): Promise<Chat | undefined> {
    const result = await db.select().from(chats).where(eq(chats.id, id)).limit(1);
    return result[0];
  }

  async getChatBySessionId(sessionId: string): Promise<Chat | undefined> {
    const result = await db.select().from(chats).where(eq(chats.sessionId, sessionId)).limit(1);
    return result[0];
  }

  async getChatsByUser(userId: string): Promise<Chat[]> {
    return await db.select().from(chats).where(eq(chats.userId, userId)).orderBy(desc(chats.createdAt));
  }

  async createChat(insertChat: InsertChat): Promise<Chat> {
    const result = await db.insert(chats).values(insertChat).returning();
    return result[0];
  }
}

export const chatsRepo = new ChatsRepository();
