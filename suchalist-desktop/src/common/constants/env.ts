import { z } from 'zod';

const envSchema = z.enum(['development', 'production']);

// TODO: 'development' is set automatically, check if 'production' is the same
export const ENV = envSchema.parse(process.env.NODE_ENV);
