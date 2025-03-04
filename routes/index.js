require('dotenv').config();
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { 
    title: 'Adobe | Jason Nam',
    pageName: "Home",
    edgeConfigId: process.env.EDGE_CONFIG_ID,
    orgId: process.env.ORG_ID,
  });  
});

module.exports = router;
