const express = require('express');
const router = express.Router();
const Place = require('./../db/models/place');

router.get('', (req, res, next) => {
    Place.find({}, '-_id').then((cities) => {
        cities = cities.map((city) => {
            return city.city;
        });
        res.status(200).send(cities);
    });
});

router.post('/:city', (req, res, next) => {
    Place.findOne({city: req.params.city}).then((city) => {
        if(city){
            return res.status(406).send();
        }       
        var place = new Place({city: req.params.city});
        place.save().then((doc) => {
            res.status(200).send(`${doc.city} succesfully saved`);
        });
    });
});

router.delete('/:city', (req, res, next) => {
    Place.remove({city: req.params.city}).then((city) => {
        res.status(200).send();
    }).catch((err) => {
        res.status(400).send();
    });
});

module.exports = router;