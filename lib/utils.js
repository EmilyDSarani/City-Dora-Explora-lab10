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
  const spliceCloud = shapeCloud.splice(0, 7);
  return spliceCloud;

}

function mungeReviewsData(businesses){
  const buisnessMap = businesses.map(item => {
    return {
      name: item.name,
      image_url: item.image_url,
      price: item.price,
      rating: item.rating,
      url: item.url
    };
    
  });
  return buisnessMap;
}

module.exports = {
  mungeLocationData, mungeWeatherData, mungeReviewsData
};  


  
