const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('postback/index', { title: 'Postback | Singular'});
});

router.post('/', (req, res) => {
    const postback_body = req.body;

    console.log(`postback: ${JSON.stringify(req.body)}`);

    res.json({ "result": "ok" }).status(200);
});

module.exports = router;