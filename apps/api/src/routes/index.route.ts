import express from "express";
import indexController from "../controllers/index.controller.ts";
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: The default endpoint for when API is first accessed
 *     responses:
 *       200:
 *         description: A JSON object with different information about DailySAT backend
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: StockSavvy Backend
 *                 author:
 *                   type: string
 *                   example: Hemit Patel
 *                 date_created:
 *                   type: string
 *                   example: December 24 2024
 *                 message:
 *                   type: string
 *                   example: The backend that powers the StockSavvy educational platform
 */

router.get("/", indexController.get);

export default router;
