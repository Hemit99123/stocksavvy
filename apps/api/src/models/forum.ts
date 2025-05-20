import { pgTable, serial, text } from "drizzle-orm/pg-core";
import user from "./user.ts";

const forum = pgTable("forum", {
    id: serial("id").primaryKey(),
    question: text("question").notNull(),
    email: text("email")
      .references(() => user.email) 
      .notNull(),
    content: text("content").notNull()
});

export default forum