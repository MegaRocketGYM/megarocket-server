/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Trainer from '../models/trainer';
import trainerSeed from '../seeds/trainer';

const mockTrainer = {
  firstName: 'Juanes',
  lastName: 'Péreza',
  dni: 12355679,
  phone: 1123334455,
  email: 'aaddan.pereza@example.com',
  city: 'Buenos Aires',
  password: 'contraseña',
  salary: 25000,
  is_active: true,
};

const mockRepeatedEmail = {
  firstName: 'Juana',
  lastName: 'Pérez',
  dni: 12325679,
  phone: 1122334455,
  email: 'asdan.pereza@example.com',
  city: 'Buenos Aires',
  password: 'contraseña',
  salary: 25000,
  is_active: true,
};

const mockRepeatedDni = {
  firstName: 'Juana',
  lastName: 'Pérez',
  dni: 12345679,
  phone: 1122334455,
  email: 'aereza@example.com',
  city: 'Buenos Aires',
  password: 'contraseña',
  salary: 25000,
  is_active: true,
};

beforeEach(async () => {
  await Trainer.collection.insertMany(trainerSeed);
});

afterEach(async () => {
  await Trainer.collection.deleteMany();
});

describe('GET /api/trainers', () => {
  test('Should bring data', async () => {
    const response = await request(app).get('/api/trainers').send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('If no trainers, correct error message', async () => {
    Trainer.collection.deleteMany();
    const response = await request(app).get('/api/trainers').send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('There is no trainers');
    expect(response.body.error).toBeTruthy();
  });
  test('If wrong URL status 404', async () => {
    const response = await request(app).get('/api/trainer').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET BY ID /api/trainers/:id', () => {
  test('If correct ID should found trainer', async () => {
    const response = await request(app)
      .get(`/api/trainers/${trainerSeed[0]._id}`)
      .send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty(
      '_id',
      'firstName',
      'lastName',
      'dni',
      'phone',
      'email',
      'city',
      'password',
      'salary',
      'isActive',
    );
    expect(response.body.error).toBeFalsy();
  });
  test('If incorrect ID, gives correct error message', async () => {
    const incorrectId = '645ea2e59338b2a843989320';
    const response = await request(app)
      .get(`/api/trainers/${incorrectId}`)
      .send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      `There are no trainer with id: ${incorrectId}`,
    );
  });
  test('If wrong URL, status 404', async () => {
    const response = await request(app).get('/api/trainer/:id').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('POST /api/trainers', () => {
  test('Post correctly when the right data is sent', async () => {
    const response = await request(app).post('/api/trainers').send(mockTrainer);
    const { _id, __v, ...res } = response.body.data;
    expect(response.status).toBe(201);
    expect(res).toEqual(mockTrainer);
    expect(response.body.error).toBeFalsy();
  });
  test('Error 409 if repeated email', async () => {
    const response = await request(app)
      .post('/api/trainers')
      .send(mockRepeatedEmail);
    expect(response.status).toBe(409);
    expect(response.body.message).toBe(
      'Trainer with that Email already exists',
    );
    expect(response.body.error).toBeTruthy();
  });
  test('Error 409 if repeated dni', async () => {
    const response = await request(app)
      .post('/api/trainers')
      .send(mockRepeatedDni);
    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Trainer with that DNI already exists');
    expect(response.body.error).toBeTruthy();
  });
  test('If wrong URL, status 404', async () => {
    const response = await request(app).post('/api/trainer').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
