import { z } from 'zod';

// Frontend environment validation schema
export const envSchema = z.object({
  // API
  VITE_API_URL: z.string().url('VITE_API_URL must be a valid URL'),
  VITE_WS_URL: z.string().url('VITE_WS_URL must be a valid URL').optional(),

  // App
  VITE_APP_NAME: z.string().default('Snappie'),
  VITE_APP_VERSION: z.string().default('1.0.0'),

  // Features
  VITE_ENABLE_PWA: z.string().transform(val => val === 'true').default('true'),
  VITE_ENABLE_ANALYTICS: z.string().transform(val => val === 'true').default('false'),

  // External Services (public keys only)
  VITE_CLOUDINARY_CLOUD_NAME: z.string().optional(),
  VITE_MIDTRANS_CLIENT_KEY: z.string().optional(),

  // Sentry
  VITE_SENTRY_DSN: z.string().url().optional(),
});

// Parse and validate environment variables
export function validateEnv(config: Record<string, string | undefined>) {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    result.error.errors.forEach(err => {
      console.error(`  ${err.path.join('.')}: ${err.message}`);
    });
    // Don't exit in development, just warn
    if (import.meta.env.PROD) {
      throw new Error('Invalid environment variables');
    }
  }

  return result.data;
}

// Type-safe environment access
export const env = validateEnv(import.meta.env);

export type Env = z.infer<typeof envSchema>;