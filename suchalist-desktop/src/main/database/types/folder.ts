import { z } from 'zod';

export const FolderRowSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type FolderRow = z.infer<typeof FolderRowSchema>;
