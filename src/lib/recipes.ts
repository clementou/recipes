import type { Recipe } from "@/types"
import { readdir } from "fs/promises"
import { join } from "path"
import { recipeSchema } from "./validation"

export async function getRecipe (slug: string): Promise<Recipe> {
  const rawData = await import(`../../content/recipes/${slug}.json`)
  const result = recipeSchema.safeParse(rawData)

  if (!result.success) {
    console.error("Invalid recipe data:", result.error.format())
    throw new Error(`Invalid recipe data for ${slug}`)
  }

  return result.data
}

export async function getAllRecipes (): Promise<Array<Recipe & { slug: string }>> {
  const recipesDirectory = join(process.cwd(), "content/recipes")
  const files = await readdir(recipesDirectory)
  const jsonFiles = files.filter((file) => file.endsWith(".json"))

  const recipes = await Promise.all(
    jsonFiles.map(async (file) => {
      const slug = file.replace(".json", "")
      const recipe = await getRecipe(slug)
      return { ...recipe, slug }
    })
  )

  return recipes
}