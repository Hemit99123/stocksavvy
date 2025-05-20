import type { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response/index.ts";
import comment from "../models/comment.ts";
import forum from "../models/forum.ts";
import { db } from "../utils/db/index.ts";
import { eq, and } from "drizzle-orm";
import { handleGetSession } from "../utils/auth/sessions.ts";

export const forumController = {
    createQuestion: async (req: Request, res: Response) => {
        const { question, content } = req.body;

        const session = await handleGetSession(req)

        if (!question) {
            return res.status(400).json({
                message: "Question is required",
            });
        }

        try {
            // create a document
            await db
                .insert(forum)
                .values({
                    question,
                    email: session.email,
                    content
                });
            successResponse(res, "Forum question created")

        } catch (error: unknown) {
            errorResponse(res,error)
        }
    },

    deleteQuestion: async (req: Request, res: Response) => {
        const { id } = req.body;
        const session = await handleGetSession(req)

        try {

            // delete all all associated documents where forum id is foreign key
            await db.delete(comment).where(eq(comment.forumID, id));

            // delete a document 
            await db
                .delete(forum)
                // Match by both email and id, this way only the owner can delete a question
                .where(and(eq(forum.email, session.email as string),eq(forum.id, id))); 

            successResponse(res, "Deleted your question")
            
        } catch(error) {
            errorResponse(res,error)
        }
    },

    updateQuestion: async (req: Request, res: Response) => {
        const { id, question, content } = req.body;
        const session = await handleGetSession(req)

        try {
            await db.update(forum)
                .set({ content,question })
                .where(and(eq(forum.id, id), eq(forum.email, session.email)));
            successResponse(res, "Updated forum")

        } catch (error: unknown) {
            errorResponse(res, error);
        }
    },
    

    getAllQuestions: async (req: Request, res: Response) => {
        try {
            const questions = await db 
                .select()
                .from(forum)
            
            res.status(200).json({
                questions
            })

        } catch(error: unknown) {
            errorResponse(res,error)
        }
    },

    getAllUserQuestions: async (req: Request, res: Response) => {
        const session = await handleGetSession(req)

        try {
            const questions = await db
                .select()
                .from(forum)
                .where(eq(forum.email, session.email as string))
            
            res.status(200).json({
                questions,
            })
        } catch(error) {
            errorResponse(res,error)
        }
    },

    getOnePost: async (req: Request, res: Response) => {
        const { id } = req.query;

        try {
            const questions = await db
                .select()
                .from(forum)
                .where(eq(forum.id, Number(id)))
            
            res.status(200).json({
                question: questions[0],
            })
                
        } catch(error) {
            errorResponse(res, error)
        }
    }
};

export const forumCommentController = {
    createComment: async (req: Request, res: Response) => {
        const { forumID, content } = req.body;
        const session = await handleGetSession(req)
        
        try {
            await db
                .insert(comment)
                .values({
                    forumID,
                    content,
                    email: session.email
                })
            successResponse(res, "Successfully sent")

        } catch(error) {
            errorResponse(res, error)
        }
    },


    deleteQuestion: async (req: Request, res: Response) => {
        const { id } = req.body;
        const session = await handleGetSession(req)
    
        try {
            // Delete comment where id matches and belongs to the user
            await db
                .delete(comment)
                .where(and(eq(comment.email, session.email), eq(comment.id, id))); 
            
            successResponse(res, "Deleted your comment successfully")
            
        } catch (error) {
            errorResponse(res, error);
        }
    },

    getForumComments: async (req: Request, res: Response) => {
        const { id } = req.query;

        try {
            const comments = await db 
                .select()
                .from(comment)
                .where(eq(comment.forumID, Number(id)))
            
            res.status(200).json({
                comments
            })

        } catch(error: unknown) {
            errorResponse(res,error)
        }
    },
}