const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('applinks/index', { title: 'App Links'});
});

module.exports = router;