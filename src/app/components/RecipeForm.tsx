"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

export default function RecipeForm() { // Input fields and image upload state vars
  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructions, setInstructions] = useState("");
  const [rating, setRating] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const createRecipe = useMutation(api.recipes.create); // Create Recipe
  const getUploadURL = useMutation(api.recipes.generateUploadUrl); // Upload image

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return; // Wait for previous submission to be done
    setSubmitting(true);

    let imageURL: Id<"_storage"> | undefined = undefined;

    if (file) {
      const uploadUrl = await getUploadURL(); // Get the upload URL
      const uploadResult = await fetch(uploadUrl, {   // POST image to URL
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      // Parse response to get storageId
      const { storageId } = await uploadResult.json();
      imageURL = storageId; // Set storageId as imageRef
    }
    // Create the recipe with imageRef
    await createRecipe({
      title: title.trim(),
      ingredients: ingredientsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      instructions: instructions.trim(),
      rating,
      imageRef: imageURL,
    });
    // Reset form after submission
    setTitle("");
    setIngredientsText("");
    setInstructions("");
    setRating(1);
    setFile(null);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        className="input input-bordered w-full"
        required
      />

      <input
        type="text"
        value={ingredientsText}
        onChange={(e) => setIngredientsText(e.target.value)}
        placeholder="Ingredients (comma separated)"
        className="input input-bordered w-full"
        required
      />

      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
        className="textarea textarea-bordered w-full"
        rows={4}
        required
      />

      <div className="flex items-center space-x-2">
        <label className="font-medium">Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min={1}
          max={5}
          className="input input-bordered w-20"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Image (optional):</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          className="file-input w-full"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={submitting}
      >
        {submitting ? "Adding…" : "Add Recipe"}
      </button>
    </form>
  );
}
