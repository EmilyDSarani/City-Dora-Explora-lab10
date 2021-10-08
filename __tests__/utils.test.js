const { mungeLocationData, mungeWeatherData } = require('../lib/utils.js');
const { data } = require('../data/location-raw.js');
const { dataWeather } = require ('../data/weather-raw');

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
});