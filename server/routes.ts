import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { insertUserSchema } from "@shared/schema";
import OpenAI from "openai";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable must be set for JWT authentication");
}

const JWT_SECRET = process.env.SESSION_SECRET;
const SALT_ROUNDS = 10;

// JWT middleware
interface AuthRequest extends Request {
  userId?: string;
}

function authenticateToken(req: AuthRequest, res: Response, next: Function) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable CORS
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  // Authentication Routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        token,
        user: { id: user.id, username: user.username },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        token,
        user: { id: user.id, username: user.username },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Login failed" });
    }
  });

  app.get("/api/auth/validate", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        user: { id: user.id, username: user.username },
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Validation failed" });
    }
  });

  // POI Routes
  app.get("/api/pois", async (_req: Request, res: Response) => {
    try {
      const pois = await storage.getAllPOIs();
      res.json(pois);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch POIs" });
    }
  });

  app.get("/api/pois/:id", async (req: Request, res: Response) => {
    try {
      const poi = await storage.getPOIById(req.params.id);
      if (!poi) {
        return res.status(404).json({ message: "POI not found" });
      }
      res.json(poi);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch POI" });
    }
  });

  // Profile Routes
  app.get("/api/profile", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const itineraries = await storage.getItinerariesByUser(req.userId!);
      const visitHistory = await storage.getVisitHistory(req.userId!);

      res.json({
        user: { id: user.id, username: user.username },
        stats: {
          tripsCount: itineraries.length,
          placesVisited: visitHistory.length,
          savedCount: itineraries.length,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch profile" });
    }
  });

  app.get("/api/profile/itineraries", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const itineraries = await storage.getItinerariesByUser(req.userId!);
      const formattedItineraries = itineraries.map((itinerary) => ({
        id: itinerary.id,
        title: itinerary.title,
        date: itinerary.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        days: itinerary.days,
        locations: JSON.parse(itinerary.data).reduce(
          (sum: number, day: any) => sum + day.pois.length,
          0
        ),
      }));

      res.json(formattedItineraries);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch itineraries" });
    }
  });

  app.get("/api/profile/history", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const history = await storage.getVisitHistory(req.userId!);
      const enrichedHistory = await Promise.all(
        history.map(async (visit) => {
          const poi = await storage.getPOIById(visit.poiId);
          return {
            id: visit.id,
            name: poi?.title || "Unknown",
            date: visit.visitedAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            category: poi?.category || "Unknown",
          };
        })
      );

      res.json(enrichedHistory);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch history" });
    }
  });

  app.post("/api/profile/itineraries", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { title, days, data } = req.body;

      if (!title || !days || !data) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const itinerary = await storage.createItinerary({
        userId: req.userId!,
        title,
        days,
        data: JSON.stringify(data),
      });

      res.json(itinerary);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to save itinerary" });
    }
  });

  app.delete("/api/profile/itineraries/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const itinerary = await storage.getItinerary(req.params.id);
      if (!itinerary) {
        return res.status(404).json({ message: "Itinerary not found" });
      }

      if (itinerary.userId !== req.userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      await storage.deleteItinerary(req.params.id);
      res.json({ message: "Itinerary deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete itinerary" });
    }
  });

  app.get("/api/profile/itineraries/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const itinerary = await storage.getItinerary(req.params.id);
      if (!itinerary) {
        return res.status(404).json({ message: "Itinerary not found" });
      }

      if (itinerary.userId !== req.userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      res.json({
        ...itinerary,
        data: JSON.parse(itinerary.data),
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch itinerary" });
    }
  });

  // Itinerary Generation Route (AI-powered)
  app.post("/api/itinerary/generate", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { duration, travelers, interests, requirements } = req.body;

      if (!duration || !interests || interests.length === 0) {
        return res.status(400).json({ message: "Missing required fields: duration and interests are required" });
      }

      const pois = await storage.getAllPOIs();

      // Check if OpenAI is configured
      if (!process.env.OPENAI_API_KEY) {
        console.log("[Itinerary] Using fallback rule-based generation (no OPENAI_API_KEY configured)");
        
        const filteredPOIs = pois.filter((poi) =>
          interests.some((interest: string) =>
            poi.category.toLowerCase().includes(interest.toLowerCase().split(" ")[0])
          )
        );

        if (filteredPOIs.length === 0) {
          console.warn(`[Itinerary] No POIs matched interests: ${interests.join(", ")}`);
          return res.status(400).json({ message: "No attractions found matching your interests. Try different categories." });
        }

        const days = parseInt(duration);
        const poisPerDay = Math.ceil(filteredPOIs.length / days);

        const itinerary = [];
        for (let day = 1; day <= days; day++) {
          const startIdx = (day - 1) * poisPerDay;
          const dayPOIs = filteredPOIs.slice(startIdx, startIdx + poisPerDay);

          if (dayPOIs.length > 0) {
            itinerary.push({
              day,
              title: `Day ${day}: ${interests[0] || "Exploration"}`,
              pois: dayPOIs.map((poi) => ({
                name: poi.title,
                description: poi.description,
                duration: poi.duration,
                imageUrl: poi.imageUrl,
              })),
            });
          }
        }

        console.log(`[Itinerary] Generated ${itinerary.length}-day fallback itinerary with ${filteredPOIs.length} POIs`);
        return res.json(itinerary);
      }

      // OpenAI-powered generation
      console.log(`[Itinerary] Generating AI-powered itinerary: ${duration} days, interests: ${interests.join(", ")}`);
      
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const poisContext = pois
        .map((poi) => `- ${poi.title} (${poi.category}, ${poi.duration}): ${poi.description}`)
        .join("\n");

      const prompt = `Create a ${duration}-day Mumbai itinerary for ${travelers} travelers interested in: ${interests.join(", ")}.
${requirements ? `Special requirements: ${requirements}` : ""}

Available attractions:
${poisContext}

Return a JSON array with this structure:
[
  {
    "day": 1,
    "title": "Day theme",
    "pois": [
      {
        "name": "attraction name",
        "description": "why visit and what to expect",
        "duration": "time needed"
      }
    ]
  }
]

Create a balanced itinerary with 3-4 attractions per day, considering travel time and interests.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a Mumbai travel expert. Create personalized, well-paced itineraries.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      });

      const response = completion.choices[0].message.content;
      const parsedResponse = JSON.parse(response || "{}");

      // Handle different response structures
      const itinerary = parsedResponse.itinerary || parsedResponse.days || parsedResponse;
      const finalItinerary = Array.isArray(itinerary) ? itinerary : [];

      console.log(`[Itinerary] Successfully generated AI itinerary with ${finalItinerary.length} days`);
      res.json(finalItinerary);
    } catch (error: any) {
      console.error("[Itinerary] Generation error:", error.message || error);
      
      // Provide more specific error messages
      if (error.code === 'insufficient_quota') {
        return res.status(500).json({ 
          message: "AI service quota exceeded. Please try again later or contact support." 
        });
      }
      
      if (error.code === 'invalid_api_key') {
        console.error("[Itinerary] Invalid OpenAI API key configured");
        return res.status(500).json({ 
          message: "AI service configuration error. Please contact support." 
        });
      }

      res.status(500).json({ 
        message: "Failed to generate itinerary. Please try again or contact support if the issue persists." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
