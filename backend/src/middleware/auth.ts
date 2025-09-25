/**
 * Auth middleware to protect routes using a Bearer JWT.
 * Verifies the token, then attaches the decoded payload to req.user.
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  sub: string;     // user id
  email: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}

// Extend Express Request with "user"
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

const JWT_SECRET = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
  console.warn("Warning: JWT_SECRET is not set. Set it in .env for production use.");
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Unauthorized. Provide Bearer token in Authorization header." });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}



