import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  recipes: defineTable({
    title: v.string(),
    ingredients: v.array(v.string()),
    instructions: v.string(),
    createdAt: v.number(),
    rating: v.number(), 
    imageRef: v.optional(v.id("_storage")),
  }),
});