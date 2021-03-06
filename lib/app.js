const express = require('express');
const cors = require('cors');
const request =  require ('superagent'); const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const { mungeLocationData, mungeWeatherData, mungeReviewsData } = require ('./utils');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/location', async(req, res) => {
  try {
    const cityHandle = req.query.search;
   
    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${cityHandle}&format=json`);
   
    const mungeResponseL = mungeLocationData(response.body);
    
    res.json(mungeResponseL);

  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

app.get('/weather', async(req, res) => {
  try {
    const weatherLat = req.query.lat;
    const weatherLon = req.query.lon;
    //it is .lon and .lat beccause we want to grab whatever the link is searching for
    const response = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${weatherLat}&lon=${weatherLon}&key=${process.env.WEATHER_KEY}`);
   
    const mungeResponseW = mungeWeatherData(response.body.data);

    
    res.json(mungeResponseW);

  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

app.get('/reviews', async(req, res) => {
  try {
    const businessLat = req.query.latitude;
    const businessLon = req.query.longitude;
    
    const response = await request
      .get(`https://api.yelp.com/v3/businesses/search?latitude=${businessLat}&longitude=${businessLon}`)
      .set('Authorization', `Bearer ${process.env.REVIEWS_KEY} `);
     

    const mungeResponseB = mungeReviewsData(response.body.businesses);

    res.json(
      mungeResponseB
    );

  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;



