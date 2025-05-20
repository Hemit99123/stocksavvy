import express from "express";
import {forumCommentController, forumController} from "../controllers/forum.controller.ts";
import { authenticateSession } from "../middleware/session.middleware.ts";

const router = express.Router();

// all forum related routes
router.post("/create", authenticateSession, forumController.createQuestion);
router.put("/update", authenticateSession, forumController.updateQuestion)
router.delete("/delete", authenticateSession, forumController.deleteQuestion);
router.get("/all-questions", authenticateSession, forumController.getAllQuestions);
router.get("/user-questions", authenticateSession, forumController.getAllUserQuestions);
router.get("/get", authenticateSession, forumController.getOnePost)

// all comments related routes
router.post("/create-comment", authenticateSession, forumCommentController.createComment)
router.delete("/delete-comment", authenticateSession, forumCommentController.deleteQuestion)
router.get("/get-comments", authenticateSession, forumCommentController.getForumComments)

export default router;
