/**
 * Auth routes:
 *  - POST /api/auth/register
 *  - POST /api/auth/login
 *
 * Uses Zod for body validation. On register, creates a User and optional Student profile.
 * On login, verifies credentials and returns a JWT.
 */

import { Router } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";          // <-- import Types to cast _id when needed
import User, { IUser } from "../models/User";
import Student from "../models/Student";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRES_IN = "7d";

// Helper to sign JWTs
function signToken(params: { id: string; email: string; role: "user" | "admin" }) {
  return jwt.sign(
    { sub: params.id, email: params.email, role: params.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * POST /api/auth/register
 * Body:
 * {
 *   name: string,
 *   email: string,
 *   password: string,
 *   role?: "user" | "admin",
 *   student?: { firstName, lastName, email, major?, gradTerm? }
 * }
 */
const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]).optional(),
  student: z
    .object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      major: z.string().optional(),
      gradTerm: z.string().optional()
    })
    .optional()
});

router.post("/register", async (req, res) => {
  try {
    if (!JWT_SECRET) {
      return res.status(500).json({ error: "JWT secret not configured" });
    }

    const body = registerSchema.parse(req.body);

    // Ensure email is unique
    const exists = await User.findOne({ email: body.email });
    if (exists) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Create user (password is hashed in User model pre-save hook)
    const user: IUser = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role || "user"
    });

    // Optionally create a Student profile tied to this user
    if (body.student) {
      await Student.create({
        ...body.student,
        user: user._id
      });
    }

    // Cast user._id to Types.ObjectId then to string for JWT payload
    const token = signToken({
      id: (user._id as Types.ObjectId).toString(),
      email: user.email,
      role: user.role
    });

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err: any) {
    if (err?.issues) {
      return res.status(400).json({ error: "Invalid request", details: err.issues });
    }
    return res.status(500).json({ error: "Registration failed" });
  }
});

/**
 * POST /api/auth/login
 * Body: { email: string, password: string }
 */
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

router.post("/login", async (req, res) => {
  try {
    if (!JWT_SECRET) {
      return res.status(500).json({ error: "JWT secret not configured" });
    }

    const { email, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({
      id: (user._id as Types.ObjectId).toString(),
      email: user.email,
      role: user.role
    });

    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err: any) {
    if (err?.issues) {
      return res.status(400).json({ error: "Invalid request", details: err.issues });
    }
    return res.status(500).json({ error: "Login failed" });
  }
});

export default router;





