function mungeLocationData(body) {
 
  return {
    formatted_query: body[0].display_name,
    latitude: body[0].lat,
    longitude: body[0].lon,
  };
}

module.exports = {
  mungeLocationData
};  

function mungeWeatherData(body) {
  const shapeCloud = body.map(cloud => {
    return{
      date: cloud.weather.description,
      weather: cloud.valid_date
    };
  });

  return shapeCloud;
}
  
module.exports = {
  mungeWeatherData
}; 