import { pgTable, text } from "drizzle-orm/pg-core";

const user = pgTable("user", {
    email: text("email").primaryKey(),
    name: text("name").notNull().unique(),
    role: text("role").notNull(),
});

export default user;