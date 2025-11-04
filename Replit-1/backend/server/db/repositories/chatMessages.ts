import { eq, asc } from "drizzle-orm";
import { db } from "../index";
import { chatMessages, type ChatMessage, type InsertChatMessage } from "@shared/schema";

export class ChatMessagesRepository {
  async getChatMessages(chatId: string): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages).where(eq(chatMessages.chatId, chatId)).orderBy(asc(chatMessages.createdAt));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const result = await db.insert(chatMessages).values(insertMessage).returning();
    return result[0];
  }
}

export const chatMessagesRepo = new ChatMessagesRepository();
