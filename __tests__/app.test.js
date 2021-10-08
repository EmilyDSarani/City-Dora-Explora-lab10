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

    test('returns the business', async() => {

      [
        'name',
        'image_url',
        'price',
        'rating',
        'url'
      ];

      const data = await fakeRequest(app)
        .get('/reviews?latitude=38.123&longitude=-78.543')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body[0]).toHaveProperty('name', expect.any(String)); //does this very first property in this value have a string
      expect(data.body[0]).toHaveProperty('image_url', expect.any(String)); //this is actually just coded in here to read it overall
      expect(data.body[0]).toHaveProperty('price', expect.any(String)); //I can see how this would be useful if you work for a car company, or like...even...idk...like for fun.
      expect(data.body[0]).toHaveProperty('rating', expect.any(Number));
      expect(data.body[0]).toHaveProperty('url', expect.any(String));

    });
  });
});
