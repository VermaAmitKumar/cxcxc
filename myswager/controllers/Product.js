'use strict';

let express = require('express');
let router = express.Router();
let multer = require('multer');

var Product = require('../Models/Product');
var Category =  require('../models/Category');
var subCategory = require('../models/subcategory');

var { mysql } = require('../config/database');
var path = require('path');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './profileImage')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
}
});
var upload = multer({storage:storage});
router.get('/fetchone/:id',(req,res) => {
    res.setHeader("content-type","application/json")
    Product.findById(req.params.id).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.delete('/delete/:id',(req,res) => {
    res.setHeader("content-type","application/json")
    Product.destroy({where: { Id: req.params.id }}).then(data => {
        res.send(JSON.stringify(data, null, 2))
    })
})
router.put('/update/:Id',upload.single('Image'),(req,res) => {
    res.setHeader("content-type","application/json")
    req.body.Image= req.file.filename;
    Product.update(req.body, { where: { Id: req.params.Id } }).then(data => {
        res.end(JSON.stringify(data, null, 2))
    })
})

router.post('/save',upload.single('Image'),(req,res) => {
    res.setHeader("content-type","application/json")
    req.body.Image= req.file.filename;
    Product.create(req.body).then(data => {
        res.end(JSON.stringify(data, null, 2))
    })
})

router.get('/show',(req,res) => {
    res.setHeader("content-type","application/json")
    
    Product.findAll({
        attributes: ['name'],
        include: [{
            model: Category,
            as: 'category',
            required: false,
            include:[{
                model: subCategory,
                required: false
            }]
        },
    ]
    }).then(data => {
        res.end(JSON.stringify(data, null, 2))
    })
})

module.exports = router;
