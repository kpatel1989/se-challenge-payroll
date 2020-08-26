'use strict';
const multipart = require('aws-lambda-multipart-parser');

module.exports.uploadFile = async (event, context) => {
  const payrollData = new Buffer(multipart.parse(event, true).file.content).toString('utf-8');

  return {
    statusCode: 200,
    body: 'Success',
  };
};
