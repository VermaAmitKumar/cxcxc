'use strict';

let express = require('express');
let router = express.Router();
var category = require('../Models/Category');

router.get('/fetchone/:id',(req,res) => {
    res.setHeader("content-type","application/json")
    category.findById(req.params.id).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.delete('/delete/:id',(req,res) => {
    res.setHeader("content-type","application/json")
    category.findByPk(req.params.id).then(data => {
    category.destroy({where: { CId: req.params.id }}).then(data2 => {       
            res.send(JSON.stringify(data, null, 2))
        })
    })
})
router.put('/update/:Id',(req,res) => {
    res.setHeader("content-type","application/json")
    category.update(req.body, { where: { CId: req.params.Id } }).then(data => {
        category.findByPk(req.params.Id).then(data => {
            res.send(JSON.stringify(data, null, 2))
        })
    })
})

router.post('/save',(req,res) => {
    res.setHeader("content-type","application/json")
    category.create(req.body).then(data => {
        res.end(JSON.stringify(data, null, 2))
    })
})

router.get('/show',(req,res) => {
    res.setHeader("content-type","application/json")
    category.findAll().then(data => {
        res.end(JSON.stringify(data, null, 2))
    })
})

module.exports = router;
