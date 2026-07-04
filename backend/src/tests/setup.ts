import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-at-least-32-chars!!';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key-at-least-32-chars!!';
process.env.FRONTEND_URL = 'http://localhost:5173';
process.env.DB_NAME = 'snappie_test';
process.env.DB_USER = 'postgres';
process.env.DB_HOST = 'localhost';
process.env.DB_PASS = '';
process.env.CLOUDINARY_CLOUD_NAME = 'test';
process.env.CLOUDINARY_API_KEY = 'test';
process.env.CLOUDINARY_API_SECRET = 'test';
process.env.MIDTRANS_SERVER_KEY = 'test';
process.env.MIDTRANS_CLIENT_KEY = 'test';
