'use strict';

let express = require('express');
let router = express.Router();
let multer = require('multer');
var Subcategory = require('../Models/subcategory');
var category = require('../Models/Category');
var { mysql } = require('../config/database');

router.get('/fetchone/:id',(req,res) => {
    res.setHeader("content-type","application/json")
    Subcategory.findById(req.params.id).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.delete('/delete/:id',(req,res) => {
    res.setHeader("content-type","application/json")
    Subcategory.destroy({where: { SUbCategoryId: req.params.id }}).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.put('/update/:Id',(req,res) => {
    res.setHeader("content-type","application/json")
    Subcategory.update(req.body, { where: { SUbCategoryId: req.params.Id } }).then(data => {
        res.end(JSON.stringify(data, null, 2))
    })
})

router.post('/save',(req,res) => {
    res.setHeader("content-type","application/json")
    Subcategory.create(req.body).then(data => {
        res.end(JSON.stringify(data, null, 2))
    })
})

router.get('/show',(req,res) => {
    res.setHeader("content-type","application/json")
    Subcategory.findAll({include:[{model:category,as: "category"}]}).then(data => {
        res.end(JSON.stringify(data, null, 2))
    })
})

module.exports = router;
