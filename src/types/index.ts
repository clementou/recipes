import { z } from 'zod';
import { recipeSchema } from '@/lib/validation/recipe.schema';

export type Recipe = z.infer<typeof recipeSchema>;
export type Ingredient = z.infer<typeof recipeSchema>['ingredients'][string][number];
export type Instruction = z.infer<typeof recipeSchema>['instructions'][string][number];