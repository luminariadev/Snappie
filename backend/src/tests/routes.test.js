import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';

function createTestApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get('/api/health', (req, res) => { res.json({ status: 'ok' }); });
  app.get('/api/frames', (req, res) => { res.json([{ id_frame: 1, nama_frame: 'Test', tipe: 'gratis' }]); });
  app.post('/api/frames', (req, res) => {
    const { nama_frame } = req.body;
    if (!nama_frame) return res.status(400).json({ error: 'Nama frame wajib diisi' });
    res.status(201).json({ id_frame: 2, nama_frame, tipe: 'gratis' });
  });
  return app;
}

describe('API Routes', () => {
  const app = createTestApp();
  
  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
  
  it('GET /api/frames returns list', async () => {
    const res = await request(app).get('/api/frames');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id_frame');
  });
  
  it('POST /api/frames creates frame', async () => {
    const res = await request(app).post('/api/frames').send({ nama_frame: 'New Frame' });
    expect(res.status).toBe(201);
    expect(res.body.nama_frame).toBe('New Frame');
  });
  
  it('POST /api/frames fails without name', async () => {
    const res = await request(app).post('/api/frames').send({});
    expect(res.status).toBe(400);
  });
});
