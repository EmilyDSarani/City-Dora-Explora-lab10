function mungeLocationData(body) {
 
  return {
    formatted_query: body[0].display_name,
    latitude: body[0].lat,
    longitude: body[0].lon,
  };
}


function mungeWeatherData(data) {
  const shapeCloud = data.map(item => {
    return{
      forecast: item.weather.description,
      time: item.valid_date
    }; 
  });
  return shapeCloud;

}

module.exports = {
  mungeLocationData, mungeWeatherData
};  


  
