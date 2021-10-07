require('dotenv').config();
const fakeRequest = require('supertest');
const app = require('../lib/app');
//got all of the client stuff deleted

describe('app routes', () => {
  describe('routes', () => {
   
    test('returns the location', async() => {

      const expectation = {
        'formatted_query': expect.any(String),
        'latitude': expect.any(String),
        'longitude': expect.any(String)
      };

      const data = await fakeRequest(app)
        .get('/location?search=atlanta')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });


    test('returns the weather', async() => {

      const expectation = {
        'time': expect.any(String),
        'forecast': expect.any(String)
      };

      const data = await fakeRequest(app)
        .get('/weather?daily&lat=38.123&lon=-78.543')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expect.arrayContaining([expectation]));
    });
  });
});
