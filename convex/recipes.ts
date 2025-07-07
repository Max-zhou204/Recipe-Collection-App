import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a recipe
export const create = mutation({
  args: {
    title: v.string(),
    ingredients: v.array(v.string()),
    instructions: v.string(),
    rating: v.number(),
    imageRef: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const newRecipeId = await ctx.db.insert("recipes", {
      title: args.title,
      ingredients: args.ingredients,
      instructions: args.instructions,
      rating: args.rating,
      createdAt: Date.now(),
      imageRef: args.imageRef,
    });
    return newRecipeId;
  }
});

// Fetch recipes
export const list = query({
  handler: async (ctx) => {
    const recs = await ctx.db
      .query("recipes")
      .order("desc")
      .collect();

    return Promise.all(
      recs.map(async (r) => ({
        ...r,
        imageUrl: r.imageRef // If imageRef exists, ask for a signed URL
          ? await ctx.storage.getUrl(r.imageRef)
          : null,
      }))
    );
  },
});

// Update a recipe
export const update = mutation({
  args: {
    id: v.id("recipes"),
    title: v.string(),
    ingredients: v.array(v.string()),
    instructions: v.string(),
    rating: v.number(),
    imageRef: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
      ingredients: args.ingredients,
      instructions: args.instructions,
      rating: args.rating,
      imageRef: args.imageRef,
    });
  }
});

// Delete a recipe
export const remove = mutation({
  args: { id: v.id("recipes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  }
});

// Generate upload URL for images
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return uploadUrl; 
  },
});