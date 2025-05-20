import type { NextFunction, Request, Response } from "express";
import { handleGetSession } from "../utils/auth/sessions.ts";

export const authenticateSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // using express sessions for session management (instead of pure passportjs)
  // only using passportjs for the authentication middleware

  const session = await handleGetSession(req)
  if (session.name && session.email && session.role) {
    next();
  } else {
    return res.status(401).json({
      message:
        "You are currently not authenticated! Please log in and try again.",
    });
  }
};

export const authenticateAdminSession = async (
  req: Request,
  res: Response, 
  next: NextFunction,
) => {

  const session = await handleGetSession(req)

  if (session.name && session.email && session.role == "Admin") {
    next();
  } else {
    return res.status(401).json({
      message:
        "You are not an admin authenticated user. Contact StockSavvy technology department for more information.",
    });
  }
}