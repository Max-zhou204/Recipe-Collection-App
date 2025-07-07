"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import RecipeForm from "@/app/components/RecipeForm";
import RecipeCard from "@/app/components/RecipeCard";

export default function Home() {
  const recipes = useQuery(api.recipes.list); // Fetch all recipes
  const deleteRecipe = useMutation(api.recipes.remove); // Mutation func that deletes a recipe
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <div className="flex-[2] overflow-auto">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-3 gap-8">
            {!recipes?.length && (
              <p className="text-gray-500 col-span-3 text-center">
                No recipes yet
              </p>
            )}
            {recipes?.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onDelete={() => deleteRecipe({ id: recipe._id })}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-[1] px-6 py-8 flex justify-center items-start bg-white border-t">
        <div className="w-4/5 max-w-lg bg-gray-50 p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Add New Recipe
          </h2>
          <RecipeForm />
        </div>
      </div>
    </div>
  );
}
