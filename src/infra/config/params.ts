import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3001"),
  NODE_ENV: z.enum(["dev", "test", "local", "prod"]),
  SECRET_KEY: z.string().default('@Secret_Pantor3'),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_HOST: z.string()
});

export const ENV = envSchema.parse(process.env);
