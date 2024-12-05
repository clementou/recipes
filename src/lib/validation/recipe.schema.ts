import { z } from "zod";

// Helper schemas
const ServingSchema = z.object({
  amount: z.number(),
  notes: z.string().optional(),
});

const TimesSchema = z.object({
  prep: z.string(),
  cook: z.string(),
  total: z.string(),
  marinate: z.string().optional(),
  notes: z.string().optional(),
});

const IngredientSchema = z.object({
  item: z.string(),
  amount: z.number().optional(),
  unit: z.string().optional().or(z.string()),
  notes: z.string().optional(),
});

const InstructionStepSchema = z.object({
  step: z.number(),
  text: z.string(),
  notes: z.string().optional(),
});

export const recipeSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  servings: ServingSchema,
  times: TimesSchema,
  ingredients: z.record(z.array(IngredientSchema)),
  instructions: z.record(z.array(InstructionStepSchema)),
  notes: z.array(z.string()),
  storage: z.array(z.string()),
});