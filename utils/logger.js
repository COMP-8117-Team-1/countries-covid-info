const fs = require('fs');
const moment = require('moment');
const convertHrtime = require('convert-hrtime');

const logger = (req, res, next) => {
    const date = moment().format("DD/MM/YYYY hh:MM:SS A");
    const method = req.method;
    const request = req.url;
    //const status = res.statusCode;

    const start = process.hrtime();
    const duration = convertHrtime(process.hrtime(start)).milliseconds;

    res.on('finish', function() {
      let statusCode = this.statusCode;
      let errorMessage = statusCode != 200 ? `| Error Message: ${this.statusMessage}` : "";
      let log = `[${date}] | ${method}:${request} | Status: ${statusCode} | Request Duration: ${duration} ms ${errorMessage}`;

      fs.appendFile("logs.txt", log + "\n", err => {
          if (err) {
            console.log(err);
          }
      });
    })
    next();
}

module.exports = logger;
