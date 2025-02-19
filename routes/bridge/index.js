const express = require('express');
const axios = require('axios');
const requestIp = require('request-ip');

const router = express.Router();

const extractIp = () => {
    const clientIp = Object.values(require("os").networkInterfaces())
        .flat()
        .filter((item) => !item.internal && item.family === "IPv4")
        .find(Boolean).address;

    console.log(`${clientIp}`);
    return clientIp;
}

router.get('/', (req, res, next) => {
    res.render('bridge/index', { title: 'Bridge | Singular' });
});

router.get('/s2s', (req, res) => {
    const axios = require('axios');
    let data = '';

    const pcn = req.query.pcn || '';

    const ip_address = extractIp();
    const my_user_agent = req.headers['user-agent'];
    const baselink = 'https://jared.sng.link/Asyhj/b5ao?_dl=jasonapp%3A%2F%2Fdeeplinking&_smtype=3&redirect=false';

    let final_url = `${baselink}&ip=${ip_address}&pcn=${pcn}`;

    const config = {
        method: 'get',
        url: final_url,
        headers: { useragent: my_user_agent },
        data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.status(200).json({
            ip: ip_address,
            useragent: my_user_agent,
            final_url: final_url
        });
    })
    .catch(function (error) {
        console.log(error);
    });
});

router.get('/redirect', (req, res) => {
    res.redirect('https://jared.sng.link/Asyhj/b5ao?_dl=jasonapp%3A%2F%2Fdeeplinking&_smtype=3');
})


module.exports = router;