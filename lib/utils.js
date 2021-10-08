function mungeLocationData(body) {
 
  return {
    formatted_query: body[0].display_name,
    latitude: body[0].lat,
    longitude: body[0].lon,
  };
}


function mungeWeatherData(data) {

  const shapeCloud = data.map(item => { //I am already passing the data in app.get for the weather
    if(item.weather) {

      return{
        forecast: item.weather.description,
        time: item.valid_date
      }; }
  });
  const spliceCloud = shapeCloud.splice(-7);
  return spliceCloud;

}

module.exports = {
  mungeLocationData, mungeWeatherData
};  


  
