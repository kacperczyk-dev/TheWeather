const express = require('express');
const router = express.Router();
const Forecast = require('./../db/models/forecast');

// Start defining routes for /weather
router.get('', (req, res, next) => {
    Forecast.find({}).then((docs) => {
        res.send(docs);
    });
});

router.get('/place', (req, res, next) => {
    res.send('/place responds');
});


module.exports = router;