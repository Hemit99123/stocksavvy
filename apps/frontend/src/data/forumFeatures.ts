import { Home, PersonStanding } from "lucide-react";
import type { Item } from "../types/item";

export const features: Item[] = [
  { id: 1, name: "Home", description: "Go back to posts", icon: Home },
  { id: 2, name: "Me", description: "Manage your posts", icon: PersonStanding },
];
