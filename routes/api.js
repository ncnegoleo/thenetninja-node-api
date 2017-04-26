const express = require('express');
const router = express.Router();

//Temp: list of ninjas
var ninjas = [{id: 2, name: 'Leonardo', age: 29}, {id: 1, name: 'Maria', age: 18}];

// get list of all ninjas from the db
router.get('/ninjas', function (req, res) {
    res.send({type: 'GET'})
});

// get a record of ninja from db
router.get('/ninjas/:id', function (req, res) {
   ninjas.forEach(function (ninja) {
        if(ninja.id == req.params.id) {
            res.json(ninja);
            return;
        }
   });
   res.status(404).end();
});

// add new ninja to the db
router.post('/ninjas', function (req, res) {
    console.log(req.body);
    res.send({type: 'POST'})
});

// update a ninja in db
router.put('/ninjas/:id', function (req, res) {
    res.send({type: 'PUT'})
});

// delete a ninja from the db
router.delete('/ninjas/:id', function (req, res) {
    res.send({type: 'DELETE'})
});

module.exports = router