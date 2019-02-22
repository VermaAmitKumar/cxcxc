let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    res.send('this is base route');
});

router.use('/Category', require('./CategoryRoute'));
router.use('/SubCategory', require('./SubCategory'));
router.use('/Product', require('./Product'));
module.exports = router;