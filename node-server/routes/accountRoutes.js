const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

router.post('/', async (req, res) => {
    try {
        const account = new Account(req.body);
        await account.save();
        res.status(201).send(account);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
