import type { Response, Request } from "express";
import { Repository } from "redis-om";
import sessionsSchema from "../../redisSchema/sessions.schema.ts"
import { redisOMClient, connectRedis, disconnectRedis } from "./redis.ts";
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv"

dotenv.config()

export const handleDestroySession = async (req: Request, res: Response) => {
  try {
    await connectRedis();
    
    const sid = req.cookies["session-id"];
    const sessionRepo = new Repository(sessionsSchema, redisOMClient);
  
    await sessionRepo.remove(sid);
  
    res.clearCookie("session-id");
  } catch (error) {
    console.error("Error destroying session:", error);
    throw error;
  } finally {
    await disconnectRedis();
  }
}

export const handleCreateSession = async (name: string, email: string, role: string, res: Response) => {
  try {
    await connectRedis();

    const sid = uuidv4();
    const sessionRepo = new Repository(sessionsSchema, redisOMClient);
  
    const sessionData = { name, email, role };
  
    await sessionRepo.save(sid, sessionData);
  
    res.cookie('session-id', sid, { httpOnly: true, domain: process.env.DOMAIN, secure: true, sameSite: "none" });
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  } finally {
    await disconnectRedis();
  }
}

export const handleGetSession = async (req: Request) => {
  const sid = req.cookies["session-id"];

  try {
    await connectRedis();

    const sessionRepo = new Repository(sessionsSchema, redisOMClient);
    const session = await sessionRepo.fetch(sid);

    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  } finally {
    await disconnectRedis();
  }
};
