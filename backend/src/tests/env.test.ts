import { describe, it, expect } from 'vitest';
import { validateEnv, envSchema } from '../config/env.ts';

describe('validateEnv', () => {
  it('should validate correct env config', () => {
    const config = {
      DB_HOST: 'localhost',
      DB_PORT: '5432',
      DB_NAME: 'snappie',
      DB_USER: 'postgres',
      DB_PASS: 'password',
      JWT_SECRET: 'a'.repeat(32),
      JWT_REFRESH_SECRET: 'b'.repeat(32),
      FRONTEND_URL: 'http://localhost:5173',
      CLOUDINARY_CLOUD_NAME: 'test',
      CLOUDINARY_API_KEY: 'test',
      CLOUDINARY_API_SECRET: 'test',
      MIDTRANS_SERVER_KEY: 'test',
      MIDTRANS_CLIENT_KEY: 'test',
    };
    const env = validateEnv(config);
    expect(env.DB_HOST).toBe('localhost');
    expect(env.PORT).toBe(5000);
    expect(env.NODE_ENV).toBe('development');
  });

  it('should fail on missing required fields', () => {
    expect(() => validateEnv({})).toThrow();
  });

  it('should fail on invalid NODE_ENV', () => {
    const parse = envSchema.safeParse({ NODE_ENV: 'invalid' });
    expect(parse.success).toBe(false);
  });
});
