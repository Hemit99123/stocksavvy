import { pgTable, integer, text, serial } from "drizzle-orm/pg-core";
import user from "./user.ts";
import forum from "./forum.ts";

const comment = pgTable("comment", {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
  
    // foreign keys to properly associate comment w/ owner + post
  
    forumID: integer("forumid")
      .references(() => forum.id)
      .notNull(),
    email: text("email")
      .references(() => user.email)
      .notNull()
})

export default comment