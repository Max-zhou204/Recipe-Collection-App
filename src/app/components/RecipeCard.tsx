"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

interface Recipe {
  _id: Id<"recipes">;
  title: string;
  ingredients: string[];
  instructions: string;
  rating: number;
  imageUrl?: string | null; 
}

export default function RecipeCard({
  recipe,
  onDelete, // Hold Delete func from parent
}: {
  recipe: Recipe;
  onDelete: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false); // User can only submit when it's not editing
  const [formData, setFormData] = useState({
    title: recipe.title,
    ingredients: [...recipe.ingredients],
    instructions: recipe.instructions,
    rating: recipe.rating,
  }); // State vars that hold temp editing data
  const updateRecipe = useMutation(api.recipes.update);

  function handleChange( // Submit changes, fields optional
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "rating"
          ? Number(value)
          : name === "ingredients"
          ? value.split(",").map((i) => i.trim()).filter(Boolean)
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) { // Update the recipe
    e.preventDefault();
    await updateRecipe({
      id: recipe._id,
      title: formData.title.trim(),
      ingredients: formData.ingredients,
      instructions: formData.instructions.trim(),
      rating: formData.rating,
    });
    setIsEditing(false);
  }

  return (
    <div className="bg-white rounded-lg shadow-md border p-4 w-full max-w-xs">
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-36 object-cover rounded mb-3"
        />
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Title"
            required
          />
          <input
            name="ingredients"
            value={formData.ingredients.join(", ")}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Ingredients"
            required
          />
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={3}
            placeholder="Instructions"
            required
          />
          <div className="flex items-center space-x-2">
            <label className="font-medium">Rating:</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min={1}
              max={5}
              className="input input-bordered w-16"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="submit" className="btn btn-primary btn-sm">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-ghost btn-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="text-lg font-bold mb-2">{recipe.title}</h3>
          <div className="mb-2">
            <span className="font-semibold">Rating:</span>{" "}
            <span>{recipe.rating} / 5</span>
          </div>

          <div className="mb-2">
            <span className="font-semibold">Ingredients:</span>{" "}
            <span>{recipe.ingredients.join(", ")}</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Instructions:</span>{" "}
            <span>{recipe.instructions}</span>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-ghost btn-sm"
            >
              Edit
            </button>
            <button onClick={onDelete} className="btn btn-ghost btn-sm">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
