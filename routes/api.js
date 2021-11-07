// ============= NODE PACKAGE IMPORTS =================
require('dotenv').config();
const express = require('express'); // Importing express from node modules
const router = express.Router(); // Instantiating Router class to route web services from index.js to api.js
const yelp = require('yelp-fusion');
const client = yelp.client(`${process.env.YELP_TOKEN}`);
router.get('/:latitude/:longitude/:limit',(req, res) => {
  client.search({
  term: 'Food',
  open_now: true,
  latitude: req.params.latitude,
  longitude: req.params.longitude,
  limit: req.params.limit
  }).then(response => {
    res.send(response.jsonBody.businesses);
  }).catch(e => {
    res.send(e);
  });
});

module.exports = router;