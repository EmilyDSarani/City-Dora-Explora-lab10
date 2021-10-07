function mungeLocationData(body) {
 
  return {
    formatted_query: body[0].display_name,
    latitude: body[0].lat,
    longitude: body[0].lon,
  };
}


function mungeWeatherData(body) {
  
  return{
    date: body.weather.description,
    weather: body.valid_date
  };

}

module.exports = {
  mungeLocationData, mungeWeatherData
};  


  
