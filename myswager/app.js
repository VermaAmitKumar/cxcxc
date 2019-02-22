const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swager');
var path = require('path');
let app = express();
const cors = require('cors');
var ImageDir = path.join(__dirname, '/imageUploads');
app.use(express.static(ImageDir));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(require('./controllers'));
app.listen(3000);