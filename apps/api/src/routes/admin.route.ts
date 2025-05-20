import express from "express"
import { authenticateAdminSession } from "../middleware/session.middleware.ts";
import adminController from "../controllers/admin.controller.ts";

const router = express.Router();

router.post("/create-question", authenticateAdminSession, adminController.createQuestion)
router.delete("/delete-question", authenticateAdminSession, adminController.deleteQuestion)

export default router;