const fs = require('fs');
const moment = require('moment');
const convertHrtime = require('convert-hrtime');

const logger = (req, res, next) => {
    const date = moment().format("DD/MM/YYYY hh:MM:SS A");
    const method = req.method;
    const request = req.url;
    const status = res.statusCode;

    const start = process.hrtime();
    const duration = convertHrtime(process.hrtime(start)).milliseconds;

    let log = `[${date}] | ${method}:${request} | Status: ${status} | Request Duration: ${duration} ms`;

    fs.appendFile("logs.txt", log + "\n", err => {
        if (err) {
          console.log(err);
        }
    });
    next();
}

module.exports = logger;
