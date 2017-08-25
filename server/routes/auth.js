const express = require('express');
const router = express.Router();
const Forecast = require('./../db/models/forecast');

// Start defining routes for /weather
router.get('/', (req, res, next) => {
    res.send('/login');
});


module.exports = router;