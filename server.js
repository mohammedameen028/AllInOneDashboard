const express = require('express');
const bodyParser = require('body-parser');
const  request = require('request');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get('/Covid19', (req,res) => {
  console.log("inside covid19 API!!!");
  
   // const url = "https://api.darksky.net/forecast/d664f129563fc25cb2a35313a27a9e12/37.8267,-122.4233"
   const url = `https://www.covidvisualizer.com/api`

   console.log("url::",url);
   
 request({ url, json:true }, (error, response) => {
    console.log("Data for covid19::", response.body)
    res.json(response.body)
})
});

app.listen(port, () => console.log(`Listening on port ${port}`));