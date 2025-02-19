const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    // go to event
    res.render('ga/index', { title : 'Google Analytics | Jason Nam' });
});

router.get('/event', (req, res) => {
    res.render('gaevent/index', { title: 'GA Event | Jason Nam' });
});

router.get('/ecommerce', (req, res) => {
    
    res.render('gaecommerce/index', { title: 'GA Ecommerce | Jason Nam' });
});

module.exports = router;