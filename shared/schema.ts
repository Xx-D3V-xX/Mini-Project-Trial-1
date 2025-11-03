import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const pois = pgTable("pois", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  duration: text("duration").notNull(),
  difficulty: text("difficulty").notNull(),
  category: text("category").notNull(),
});

export const itineraries = pgTable("itineraries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  title: text("title").notNull(),
  days: integer("days").notNull(),
  data: text("data").notNull(), // JSON string
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const visitHistory = pgTable("visit_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  poiId: varchar("poi_id").notNull(),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPOISchema = createInsertSchema(pois).omit({
  id: true,
});

export const insertItinerarySchema = createInsertSchema(itineraries).omit({
  id: true,
  createdAt: true,
});

export const insertVisitHistorySchema = createInsertSchema(visitHistory).omit({
  id: true,
  visitedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type POI = typeof pois.$inferSelect;
export type InsertPOI = z.infer<typeof insertPOISchema>;
export type Itinerary = typeof itineraries.$inferSelect;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type VisitHistory = typeof visitHistory.$inferSelect;
export type InsertVisitHistory = z.infer<typeof insertVisitHistorySchema>;
