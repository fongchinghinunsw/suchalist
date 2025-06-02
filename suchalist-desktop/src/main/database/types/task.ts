import { z } from 'zod';

export const TaskRowSchema = z.object({
  id: z.string(),
  listId: z.string(),
  title: z.string(),
  note: z.union([z.string(), z.undefined(), z.null()]).transform((val) => val ?? null),
  dueDate: z.union([z.string(), z.undefined(), z.null()]).transform((val) => val ?? null),
  isCompleted: z.boolean().transform((val) => (val ? 1 : 0)),
  isStarred: z.boolean().transform((val) => (val ? 1 : 0)),
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z.union([z.string(), z.undefined(), z.null()]).transform((val) => val ?? null)
});

export type TaskRow = z.infer<typeof TaskRowSchema>;

export const TaskSchema = z.object({
  id: z.string(),
  listId: z.string(),
  title: z.string(),
  note: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined),
  dueDate: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined),
  isCompleted: z.number().transform((n) => n === 1),
  isStarred: z.number().transform((n) => n === 1),
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined)
});

export type Task = z.infer<typeof TaskRowSchema>;
