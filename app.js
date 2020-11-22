const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { logger } = require('./utils');

const app = express();

const router = express.Router();

app.set('view engine', 'ejs');
app.use(logger)
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

app.use('/', express.static(path.join(__dirname + 'public')));
app.get('/about', (req, res) => {
    res.render('pages/app');
});


router.get('/', (req, res) => {
    res.render('pages/app')
});

router.get('/search', (req, res) => {
    res.render('pages/search')
});

app.use('/app', router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is running at port " + port);
});
