import { z } from 'zod';

export const ListRowSchema = z.object({
  id: z.string(),
  folderId: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type ListRow = z.infer<typeof ListRowSchema>;
