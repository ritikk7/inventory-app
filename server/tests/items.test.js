// tests/items.test.js


require('dotenv').config();
const request = require('supertest');
const express = require('express');
const router = require('../routes/items');  // Make sure to adjust this import path
const connectToDB = require('../connectToDB');
const mongoose = require('mongoose').default;

const app = express();
app.use(express.json());
app.use('/', router);

describe('Item API', () => {
  beforeAll(async () => {
    await connectToDB();
  });

  it('should create a new item', async () => {
    const res = await request(app)
      .post('/')
      .send({
        id: 1,
        name: 'Test Item',
        description: 'Test Description',
        price: 123,
        imageURL: 'http://test.com/image.jpg'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('Test Item');
  });

  it('should fetch all items', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should fetch latestId', async () => {
    const res = await request(app).get('/latestId');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('latestId');
  });

  it('should delete an item', async () => {
    const postRes = await request(app)
      .post('/')
      .send({
        id: 2,
        name: 'Test Item 2',
        description: 'Test Description 2',
        price: 456,
        imageURL: 'http://test.com/image2.jpg'
      });
    const itemId = postRes.body.id;
    const res = await request(app).delete(`/${itemId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', itemId);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});