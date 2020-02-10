const User = require('../../models/User');
const request = require('supertest');
let server;


describe('/user/register', () => {
      beforeEach(() => {
            server = require('../../server');
      });

      afterEach(async () => {
            await User.deleteMany({});
            server.close();
      });

      describe('GET /user/register', () => {
            it('should return 200', async () => {
                  const res = await request(server).get('/user/register');

                  expect(res.status).toBe(200);
            });
      });

      describe('GET /user/login', () => {
            it('should return 200', async () => {
                  const res = await request(server).get('/user/login');

                  expect(res.status).toBe(200);
            });
      });
});