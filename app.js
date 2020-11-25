const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { logger } = require('./utils');
const axios = require('axios');

const app = express();
const router = express.Router();

app.set('view engine', 'ejs');
app.use(logger)
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Load static resources like the landing page and the site assets like css, js and images
 */
app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname + 'public')));

/**
 * About route. Renders about page* 
 * @param req
 * @param res
 */
app.get('/about', (req, res) => {
    res.render('pages/about');
});

/**
 * App route. Render the app page with the search form.
 * @param req
 * @param res
 */
router.get('/', (req, res) => {
    res.render('pages/app')
});

/**
 * Search route: Retrieves data from the APIs for the request query "country".
 * Renders a page containing the info as a response
 * @param req
 * @param res
 */
router.get('/search', (req, res) => {
    const country = req.query.country;

    let countriesAPIUrl = "https://restcountries.eu/rest/v2/name/" + country + "?fullText=true";
    let covidAPIUrl = "https://api.covid19api.com/total/country/" + country;

    let countriesAPIRequest = axios.get(countriesAPIUrl) ;
    let covidAPIRequest = axios.get(covidAPIUrl);

    axios
        .all([countriesAPIRequest, covidAPIRequest])
        .then(
            axios.spread((...responses) => {
                const countriesAPIResponse = responses[0].data;
                const covidAPIResponse = responses[1].data;
                const currentCovidData = covidAPIResponse[covidAPIResponse.length - 1];

                res.status(200);
                res.render('pages/search', {
                    country: req.query.country,
                    countryInfo: countriesAPIResponse[0],
                    countryCovidData: currentCovidData
                });
            })
        )
        .catch(errors => {
            res.status(404).render('pages/error404', {
                reason: "API Error"
            });
        });
});

/**
 * Use router for specified path
 */
app.use('/app', router);

/**
 * Handle invalid routes
 */
app.get('*', (req, res) => res.status(404).render('pages/error404', {
    reason: "Resource not found"
}));
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is running at port " + port);
});

module.exports = app;
