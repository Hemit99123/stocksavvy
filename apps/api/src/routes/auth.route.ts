import express from "express";
import authController from "../controllers/auth.controller.ts";

const router = express.Router();

/**
 * @swagger
 *  /auth/login:
 *    get:
 *      summary: Log in a user using email
 *      tags: [authentication]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  example: user@stocksavvy.com
 *                password:
 *                  type: string
 *                  example: supersecretpassword123
 *      responses:
 *        200:
 *          description: Login successful
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Login successful
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Invalid email or password
 *                  error:
 *                    type: string
 *                    example: invalid-credentials
 */

/**
 * @swagger
 *  /auth/logout:
 *    post:
 *      summary: Log out the current user
 *      tags: [authentication]
 *      responses:
 *        200:
 *          description: User logged out successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Logged user out and killed session from express-session and redis
 *        500:
 *          description: User is not logged in
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: User is not logged in and therefore cannot be logged out
 *                  error:
 *                    type: string
 *                    example: no-session-id
 */

/**
 * @swagger
 *  /auth/delete:
 *    delete:
 *      summary: Delete a user account
 *      tags: [authentication]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  example: user@stocksavvy.com
 *      responses:
 *        200:
 *          description: User deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: User deleted successfully
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: You do not have access to update this user
 *                  error:
 *                    type: string
 *                    example: no-auth-access
 */


router.post("/login", authController.login)
router.post("/assign-otp", authController.assignOtp)
router.get("/logout", authController.logout);
router.delete("/delete", authController.deleteUser);
router.get("/get-session", authController.getInfoSession);
export default router;
