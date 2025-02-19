const express = require('express');
const axios = require('axios');
const requestIp = require('request-ip');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('payment/index', { title: 'Mixpanel | Singular' });
});

router.post('/webhook', (req, res) => {
    let params = req.body;
    const signature = req.get('X-Signature');

    console.log(signature);

    res.status(204).send();

});

module.exports = router;