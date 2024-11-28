import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3001"),
  NODE_ENV: z.enum(["dev", "test", "local", "prod"]).default("dev")
});

export const ENV = envSchema.parse(process.env);
