const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get list of all ninjas from the db
router.get('/ninjas', function (req, res, next) {
    if(Object.keys(req.query).length === 0) {
        Ninja.find({}, function (err, ninjas) {
            res.json(ninjas);
        });
    }
    Ninja.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true},
        function (err, ninjas) {
            if(err) {
                res.status(422).send({error: err.message});
            } else {
                res.json(ninjas);
            }
        }
    );
});

// get a record of ninja from db
router.get('/ninjas/:id', function (req, res, next) {
    Ninja.findOne({_id: req.params.id}, function (err, ninja) {
        if(err) {
            res.status(422).send({error: err.message});
        } else {
            res.send(ninja);
        }
    });
});

// add new ninja to the db
router.post('/ninjas', function (req, res, next) {
    Ninja.create(req.body).then(function (ninja) {
        res.send(ninja);
    }).catch(next);
});

// update a ninja in db
router.put('/ninjas/:id', function (req, res, next) {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body, function (err, ninja) {
        if(err) {
            res.status(422).send({error: err.message});
        } else {
            Ninja.findById({_id: ninja._id.toString()}, function (err, result) {
                res.json(result);
            });
        }
    });
});

// delete a ninja from the db
router.delete('/ninjas/:id', function (req, res, next) {
    Ninja.findByIdAndRemove({_id: req.params.id}, function (err, ninja) {
        if(err) {
            res.status(422).send({error: err.message});
        } else {
            res.json(ninja);
        }
    });
});

module.exports = router