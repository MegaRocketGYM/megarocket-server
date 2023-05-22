import request from 'supertest';
import app from '../app';
import Admin from '../models/admins';
import adminSeed from '../seeds/admins';

const mockAdmin = {
  firstName: 'Admin',
  lastName: 'Admin',
  dni: 61165476,
  phone: 1234567890,
  email: 'adminPost@admin.com',
  city: 'Admin',
  password: 'Admin1234',
};
const mockAdminEmail = {
  firstName: 'Admin',
  lastName: 'Admin',
  dni: 51165476,
  phone: 1234567890,
  email: 'adminPost@admin.com',
  city: 'Admin',
  password: 'Admin1234',
};
const mockAdminDni = {
  firstName: 'Admin',
  lastName: 'Admin',
  dni: 41165476,
  phone: 1234567890,
  email: 'adminPost2@admin.com',
  city: 'Admin',
  password: 'Admin1234',
};

beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
});

describe('GET /api/admins', () => {
  test('should return status 200 and length to be 2', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data.length).toBe(2);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body).toBeDefined();
    expect(response.body.message).toBeDefined();
  });
  test('should return status 404, as there are no admins in the DB', async () => {
    await Admin.collection.deleteMany();
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body).toBeDefined();
    expect(response.body.data.length).toBe(0);
    expect(response.body.message).toBeDefined();
  });
});

describe('GETBYID /api/admins/', () => {
  test('should return status 200', async () => {
    await Admin.collection.insertMany(adminSeed);
    const response = await request(app).get('/api/admins/646abc7bb96405301276e34f').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body).toBeDefined();
    expect(response.body.message).toBeDefined();
  });
  test('should return status 404 as the id is not in the DB', async () => {
    const response = await request(app).get('/api/admins/6468483feee5aba1cd3f748b').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
  });
  test('should return status 400 as the id is Invalid', async () => {
    const response = await request(app).get('/api/admins/hola soy un id').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });
});

describe('POST /api/admins', () => {
  test('should create an admin return status 201', async () => {
    const response = await request(app).post('/api/admins').send(mockAdmin);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body).toBeDefined();
    expect(response.body.message).toBeDefined();
  });
  test('should create an admin return status 400 due to same email', async () => {
    const response = await request(app).post('/api/admins').send(mockAdminEmail);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });
  test('should create an admin return status 400 due to same dni', async () => {
    const response = await request(app).post('/api/admins').send(mockAdminDni);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });
  test('should return 400 as no body is send', async () => {
    const response = await request(app).post('/api/admins').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });
});
