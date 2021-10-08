const { mungeLocationData, mungeWeatherData, mungeReviewsData } = require('../lib/utils.js');
const { data } = require('../data/location-raw.js');
const { dataWeather } = require ('../data/weather-raw');
const { dataBusiness } = require ('../data/business-raw');

describe('utils', () => {
  
  test('mungeLocationData', async() => {

    const expectation = {
      'formatted_query': 'Austin, Travis County, Texas, USA',
      'latitude': '30.2711286',
      'longitude': '-97.7436995',
      
    };
    const mungedDataL = mungeLocationData(data);
    expect(mungedDataL).toEqual(expectation);
  });

  test('mungeWeatherData', async() => {

    const expectation = {
        
      forecast: expect.any(String), //expect.any(String)
      time: expect.any(String)
      ,
      
    };
    const mungedDataW = mungeWeatherData(dataWeather.data);
    expect(mungedDataW).toEqual(expect.arrayContaining([expectation])); //array containing thing
  });

  test('mungeReviewsData', async() => {

    const expectation = {
      name: 'Hunt Country Market',
      image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/oNCifGD6_xAMSbzFST3HZw/o.jpg',
      price: '$',
      rating: 4.0,
      url: 'https://www.yelp.com/biz/hunt-country-market-charlottesville?adjust_creative=1nGQfGUJWa41VMEVvCvqnw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=1nGQfGUJWa41VMEVvCvqnw',
    };
    const mungedDataB = mungeReviewsData(dataBusiness.businesses);
    expect(mungedDataB).toEqual(expect.arrayContaining([expectation])); //array containing thing
  });
});