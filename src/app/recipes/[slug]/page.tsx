import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getRecipe } from "@/lib/recipes"
import type { Ingredient, Instruction, Recipe } from "@/types"
import { notFound } from "next/navigation"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function RecipePage (props: PageProps) {
  const params = await props.params
  let recipe: Recipe

  try {
    recipe = await getRecipe(params.slug)
  } catch {
    notFound()
  }

  return (
    <article className="container max-w-4xl py-10">
      <header className="flex flex-col gap-4 text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{recipe.title}</h1>
        {recipe.subtitle && (
          <p className="text-xl text-muted-foreground">{recipe.subtitle}</p>
        )}
      </header>

      <div className="flex gap-4 justify-center mb-8">
        <Badge variant="secondary">Prep: {recipe.times.prep}</Badge>
        <Badge variant="secondary">Cook: {recipe.times.cook}</Badge>
        <Badge variant="secondary">Total: {recipe.times.total}</Badge>
        <Badge variant="outline">Serves {recipe.servings.amount}</Badge>
      </div>

      <p className="text-lg mb-8">{recipe.description}</p>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        {Object.entries(recipe.ingredients).map(([section, items]: [string, Ingredient[]]) => (
          <div key={section} className="mb-6">
            <h3 className="font-medium mb-2">{section}</h3>
            <ul className="list-disc pl-5 space-y-2">
              {items.map((ingredient: Ingredient, idx: number) => (
                <li key={idx} className="text-muted-foreground">
                  <span className="text-foreground">
                    {ingredient.amount && `${ingredient.amount} ${ingredient.unit} `}
                    {ingredient.item}
                  </span>
                  {ingredient.notes && (
                    <span className="text-muted-foreground ml-1">({ingredient.notes})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        {Object.entries(recipe.instructions).map(([section, steps]: [string, Instruction[]]) => (
          <div key={section} className="mb-6">
            <h3 className="font-medium mb-2">{section}</h3>
            <ol className="list-decimal pl-5 space-y-4">
              {steps.map((instruction: Instruction) => (
                <li key={instruction.step} className="pl-2">
                  {instruction.text}
                  {instruction.notes && (
                    <p className="text-muted-foreground mt-1">{instruction.notes}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </article>
  )
}