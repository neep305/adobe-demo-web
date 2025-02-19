const express = require('express');
const axios = require('axios');
const requestIp = require('request-ip');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('banner/index', { title: 'Banner | Singular' });
});

router.get('/:id', (req, res) => {
    if (req.params.id == 'hns') {
        res.render('banner/hns/index', { title: '홈앤쇼핑 데모 | Singular'});
    }
});

module.exports = router;