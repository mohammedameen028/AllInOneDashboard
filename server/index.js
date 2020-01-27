const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const  request = require('request');
const axios = require('axios')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/locationMapping', (req,res) => {

  const access_token = process.env.MAPBOX_LOCATION_API_KEY

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${access_token}`

  axios.get(url)
    .then(function(response) {
      console.log("response in axios::",response.data)
      res.send(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
})

 app.get('/WeatherConditions', (req,res) => {
  console.log("inside server!!!");
  console.log("req::",req.query);
  
  const latitude = req.query.latitude
  const longitude = req.query.longitude
  console.log("latitude::",latitude);
  console.log("longitude::",longitude);
   // const url = "https://api.darksky.net/forecast/d664f129563fc25cb2a35313a27a9e12/37.8267,-122.4233"
   const url = `https://api.darksky.net/forecast/d664f129563fc25cb2a35313a27a9e12/${latitude},${longitude}`

   console.log("url::",url);
   
 request({ url, json:true }, (error, response) => {
    console.log("data from weather data::", response.body)
    res.json(response.body)
})
});



app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);