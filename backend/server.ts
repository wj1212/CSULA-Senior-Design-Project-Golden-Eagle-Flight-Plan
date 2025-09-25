/**
 * Entry point of the backend server.
 * Loads env, connects to MongoDB, bootstraps Express, and mounts routes.
 */

import "dotenv/config";              // Loads .env into process.env
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Route modules
import authRouter from "./src/routes/auth";
import meRouter from "./src/routes/me";

// Read required env variables with simple fallback messages
const MONGODB_URI = process.env.MONGODB_URI || "";
const PORT = Number(process.env.PORT || 4000);

async function bootstrap() {
  // Connect to MongoDB once on startup
  try {
    if (!MONGODB_URI) {
      throw new Error("Missing MONGODB_URI in .env");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }

  const app = express();

  // Basic middleware
  app.use(cors());                 // Allow cross origin requests for local dev and mobile testing
  app.use(express.json());         // Parse JSON bodies

  // Health endpoint for quick checks
  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "gefp-backend", uptime: process.uptime() });
  });

  // Mount feature routers
  app.use("/api/auth", authRouter);  // /api/auth/register, /api/auth/login
  app.use("/api/me", meRouter);      // /api/me (protected)

  // Central error handler
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unhandled error:", err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Server error" });
  });

  app.listen(PORT, () => {
    console.log(`Server ready on http://localhost:${PORT}`);
  });
}

bootstrap();


