const express = require('express');
const axios = require('axios');
const requestIp = require('request-ip');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('mixpanel/index', { title: 'Mixpanel | Singular' });
});

module.exports = router;