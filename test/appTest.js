process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Home', () => {
    describe('/GET /', () => {
        it('it should GET the landing page', (done) => {
            chai.request(server)
                .get('/about')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.html;
                    done();
                });
        });
    });

    describe('/GET /baa', () => {
        it('it should return 404 for unrecognized routes', (done) => {
            chai.request(server)
                .get('/foo')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.should.to.html;
                    done();
                });
        });
    });
});

describe('About', () => {
    describe('/GET /about', () => {
        it('it should GET the about page', (done) => {
            chai.request(server)
                .get('/about')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.html;
                    done();
                });
        });
    });
});

describe('App', () => {
    describe('/GET /app', () => {
        it('it should GET the app page with the search field', (done) => {
            chai.request(server)
                .get('/app')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.html;
                    done();
                });
        });
    });

    describe('/GET /app/baa', () => {
        it('it should return 404 for unrecognized routes', (done) => {
            chai.request(server)
                .get('/app/baa')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.should.to.html;
                    done();
                });
        });
    });
});

describe('Search', () => {
    /*
    * Test the /GET route for search
    */
    describe('/GET /app/search', () => {
        it('it should GET a html page with the data of the country', (done) => {
            chai.request(server)
                .get('/app/search?country=South Africa')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.html;
                    done();
                });
        });
    });

    describe('/GET app/search', () => {
        it('it should return a 404 status code because of wrong spelling of query', (done) => {
            chai.request(server)
                .get('/app/search?country=South')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.should.to.html;
                    done();
                });
        });
    });
});
