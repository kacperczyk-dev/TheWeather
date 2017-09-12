const express = require('express');
const router = express.Router();
const Place = require('./../db/models/place');

router.get('', (req, res, next) => {
    Place.find({}, '-_id').then((cities) => {
        cities = cities.map((city) => {
            return city.city;
        });
        res.send(cities);
    });
});


module.exports = router;