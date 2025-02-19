const crypto = require('crypto-js');
const express = require('express');
const router = express.Router();

router.post('/hash', (req, res) => {
    const { em, ph } = req.body;
    const hashEm = crypto.SHA256(em).toString(crypto.enc.Hex);
    const hashPh = crypto.SHA256(ph).toString(crypto.enc.Hex);

    return res.status(200).json({ em: hashEm, ph: hashPh });
});

module.exports = router;