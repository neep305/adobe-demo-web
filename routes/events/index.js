const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('events/index', { title: 'GTM Events' });
});

router.get('/api', (req, res) => {
    const query = req.query;
    console.log(query);
    res.status(200).json({result:'success', data: query});
});

module.exports = router;