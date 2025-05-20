import type { Request, Response } from "express";
import {errorResponse, successResponse} from "../utils/response/index.ts";
import { db } from "../utils/db/index.ts";
import * as questionTable from "../models/question.ts";
import { eq } from "drizzle-orm";

const adminController = {
    createQuestion: async (req: Request, res: Response) => {
        try {
            const { question, options, type, correctAnswer } = req.body;
    
            // Validate that options is an array and has the required format
            if (!Array.isArray(options) || options.length === 0) {
                throw new Error("Options must be a non-empty array.");
            }
    
            // Ensure options have 'text' and 'letter' properties
            options.forEach(option => {
                if (!option.text || !option.letter) {
                    throw new Error("Each option must have a 'text' and 'letter' property.");
                }
            });

            await db
                .insert(questionTable.default)
                .values({
                    question,
                    options,
                    type,
                    correctAnswer
                })
            
            successResponse(res, "Created question")
        } catch (error) {
            errorResponse(res, error);
        }
    },

    deleteQuestion: async (req: Request, res: Response) => {
        const { id } = req.body

        try {
            await db
            .delete(questionTable.default)
            .where(eq(questionTable.default.id, id))

            successResponse(res, "Deleted question")
        } catch (error) {
            errorResponse(res, error)
        }
    }
    
}

export default adminController;