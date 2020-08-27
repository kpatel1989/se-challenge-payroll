'use strict';
const multipart = require('aws-lambda-multipart-parser');
const { DBService } = require('./src/service/db-init');
const { Parse } = require('./src/service/csv-parser');
const client = DBService.createDBClient();
const Payroll = require('./src/model/payroll')(client);
const Payscale = require('./src/model/payscale')(client);

module.exports.uploadFile = async (event, context) => {
    try {
        await client.authenticate();
        console.log('Connection has been established successfully.');

        let payrollData = new Buffer(multipart.parse(event, true).file.content).toString('utf-8');
        payrollData = Parse(payrollData);
        await payrollData.forEach(async dataItem => {
            try {
                await Payroll.upsert(dataItem);
            } catch (e) {
                console.log(e.message);
            }
        });
        return {
            statusCode: 200,
            body: JSON.stringify(payrollData),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error.message),
        };
    }

};

module.exports.getReport = async () => {
    try {
        await client.authenticate();
        console.log('Connection has been established successfully.');
        let payrollData = await Payroll.findAll();
        payrollData = JSON.stringify(payrollData);
        console.log(payrollData);
        return {
            statusCode: 200,
            body: payrollData
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error.message),
        };
    }
}