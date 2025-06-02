import { z } from 'zod';

export const ListRowSchema = z.object({
  id: z.string(),
  folderId: z.union([z.string(), z.undefined(), z.null()]).transform((val) => val ?? null),
  title: z.string(),
  order: z.union([z.number(), z.undefined(), z.null()]).transform((val) => val ?? null),
  folderOrder: z.union([z.number(), z.undefined(), z.null()]).transform((val) => val ?? null),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type ListRow = z.infer<typeof ListRowSchema>;

export const ListSchema = z.object({
  id: z.string(),
  folderId: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined),
  title: z.string(),
  order: z
    .number()
    .nullable()
    .transform((val) => val ?? undefined),
  folderOrder: z
    .number()
    .nullable()
    .transform((val) => val ?? undefined),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type List = z.infer<typeof ListSchema>;
