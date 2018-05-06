const express = require('express')
const port = process.env.PORT || 9000
const server = express();
const nodeWhere = require('node-where')

const COUNTRIES = require('./countries')

//IP addresses to try
//173.194.33.104 - USA
//41.190.14.225 - NG

/*server.use((req, res, next) => {
  // console.log(req.ip);
  // nodeWhere.is(req.ip, function(err, result) {
  nodeWhere.is('41.190.14.225', function(err, result) {
    const country = COUNTRIES.find(country=>(country.code==result.get('countryCode')))
    req.callingCode = country.callingCode;
    next();
  });
});*/

server.get('/get-call-code', (req, res) => {
  // console.log(req.ip);
  // console.log(req.callingCode);
  try {
    // nodeWhere.is(req.ip, (err, result) => {
    nodeWhere.is('41.190.14.225', (err, result) => {
      const country = COUNTRIES.find(country=>(country.code==result.get('countryCode')))
      console.log(`+${country.callingCode}`);
      res.json({code: country.callingCode});
    });
  } catch (e) {
    res.json(e);
  }
})

server.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
