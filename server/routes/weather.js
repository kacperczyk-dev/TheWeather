const express = require('express');
const router = express.Router();
const Forecast = require('./../db/models/forecast');
var helper = require('./../helper-api/helper-promise');

// Routes for /weather*

router.get('', (req, res, next) => {
    let docs = [];
    let counter;
    Forecast.distinct('place')
    .then((doc) => {
        counter = doc.length;
        doc.forEach((city) => {
            Forecast.findOne({ place: city })
            .sort('-time')
            .then((doc) => {
                docs.push(doc);
                counter--;
                if(counter === 0){
                    res.send(docs);
                }
            });                
        });
    });
});

router.get('/:place', (req, res, next) => {
    Forecast.find({place: req.params.place})
    .sort('-time')
    .then((docs) => {
        res.send(docs);
    });
});


module.exports = router;