import { z } from 'zod';

const envSchema = z.enum(['development', 'production']);

export const ENV = envSchema.parse(process.env.NODE_ENV ?? 'development');
