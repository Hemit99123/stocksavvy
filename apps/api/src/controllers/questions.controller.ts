import type { Request, Response } from "express";
import question from "../models/question.ts";
import { db } from "../utils/db/index.ts";
import { errorResponse } from "../utils/response/index.ts";
import { eq, sql } from "drizzle-orm";

const questionsController = {
  getRandomQuestions: async (req: Request, res: Response) => {
    const { type } = req.query;

    if (!["Investing", "Budgeting", "Debt"].includes(type as string)) {
        return res.json({
            error: "Not a valid type"
        });
    }
    
    try {
        
        // Get random question document
        
        const countResult = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(question)
        .where(eq(question.type, type as string));
    
    const totalQuestions = countResult[0]?.count ?? 0;
    
    if (totalQuestions === 0) {
        return null; // No questions available
    }
    
    const randomOffset = Math.floor(Math.random() * totalQuestions);
    
    const questions = await db
        .select()
        .from(question)
        .where(eq(question.type, type as string))
        .offset(randomOffset)
        .limit(1);
    
        
        res.status(200).json({
            question: questions[0]
        })

    } catch(error: unknown) {
        errorResponse(res,error)
    }
  }
};

export default questionsController;
