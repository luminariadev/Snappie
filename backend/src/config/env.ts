import { z } from "zod";

export const envSchema = z.object({
  DB_HOST: z.string().min(1, "DB_HOST is required"),
  DB_PORT: z.string().regex(/^\d+$/).default("5432").transform(Number),
  DB_NAME: z.string().min(1, "DB_NAME is required"),
  DB_USER: z.string().min(1, "DB_USER is required"),
  DB_PASS: z.string().min(1, "DB_PASS is required"),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("1d"),
  JWT_REFRESH_SECRET: z.string().min(32, "JWT_REFRESH_SECRET must be at least 32 characters"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  PORT: z.string().regex(/^\d+$/).default("5000").transform(Number),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  FRONTEND_URL: z.string().url("FRONTEND_URL must be a valid URL"),

  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),

  MIDTRANS_SERVER_KEY: z.string().min(1, "MIDTRANS_SERVER_KEY is required"),
  MIDTRANS_CLIENT_KEY: z.string().min(1, "MIDTRANS_CLIENT_KEY is required"),
  MIDTRANS_IS_PRODUCTION: z.string().default("false").transform((val) => val === "true"),

  REDIS_URL: z.string().url().optional(),
  SENTRY_DSN: z.string().url().optional(),
});

export function validateEnv(config: Record<string, string | undefined>) {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    console.error("Invalid environment variables:");
    result.error.issues.forEach((issue) => {
      console.error("  " + issue.path.join(".") + ": " + issue.message);
    });
    process.exit(1);
  }
  return result.data;
}

export type Env = z.infer<typeof envSchema>;
