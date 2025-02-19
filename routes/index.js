var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const browser = req.query.browser;

  if (browser === 'ie') {
    res.render('index_without_emca', { title: 'Singular web-to-app for IE' }); // For IE test
  } else {
    res.render('index', { title: 'Singular web-to-app', gtm_tf: true });
  }
});

module.exports = router;
