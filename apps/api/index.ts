import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./src/utils/docs/swaggerConfig.ts";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Server configuration
const PORT = 3001;
const app = express();

// Routers
import indexRoutes from "./src/routes/index.route.ts";
import authRoutes from "./src/routes/auth.route.ts";
import forumRoutes from "./src/routes/forum.route.ts";
import questionRoutes from "./src/routes/questions.route.ts";
import adminRoutes from "./src/routes/admin.route.ts";
import cookieParser from "cookie-parser";

// JSON middleware
app.use(express.json());

// CORS middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(cookieParser())

// Setup routing
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/forum", forumRoutes);
app.use("/question", questionRoutes);
app.use("/admin", adminRoutes);

// Route for api docs from Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Start server
app.listen(PORT || process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;