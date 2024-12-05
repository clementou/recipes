import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllRecipes } from "@/lib/recipes"
import Link from "next/link"

export default async function Home () {
  const recipes = await getAllRecipes()

  return (
    <div className="container py-10">
      <header className="flex flex-col gap-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Recipe Collection</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A curated collection of delicious recipes from around the world
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link key={recipe.slug} href={`/recipes/${recipe.slug}`}>
            <Card className="hover:shadow-lg transition-all hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="line-clamp-2">{recipe.title}</CardTitle>
                {recipe.subtitle && (
                  <CardDescription className="line-clamp-2">
                    {recipe.subtitle}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">
                    {recipe.times.total}
                  </Badge>
                  <Badge variant="outline">
                    Serves {recipe.servings.amount}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}