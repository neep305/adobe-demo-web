const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const gtm_tf = req.query.gtm_tf;
    console.log(gtm_tf)
    res.render('gtm/index', { title: 'GTM | Singular', gtm_tf: gtm_tf });
});

router.get('/signup', (req, res) => {
    res.render('gtm/signup/index', { title: 'GTM Signup | Singular' });
});
module.exports = router;