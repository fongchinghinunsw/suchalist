import { z } from 'zod';

export const TaskRowSchema = z.object({
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
  isCompleted: z.number(),
  isStarred: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  completedAt: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined)
});

export type TaskRow = z.infer<typeof TaskRowSchema>;
