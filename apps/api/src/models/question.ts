import { text, pgTable, serial, jsonb } from "drizzle-orm/pg-core";

const question = pgTable("question", {
    id: serial("id").primaryKey(),
    question: text("question").notNull(),
    options: jsonb("options").notNull(), // store options as a JSON array,
    type: text("type").notNull(),
    correctAnswer: text("correctanswer").notNull()
});

export default question;