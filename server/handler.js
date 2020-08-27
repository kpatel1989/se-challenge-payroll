'use strict';
const multipart = require('aws-lambda-multipart-parser');
const PayrollService = require('./src/service/payroll-service');

module.exports.uploadFile = async (event) => {
    try {
        let payrollData = new Buffer(multipart.parse(event, true).file.content).toString('utf-8');
        const result = await new PayrollService().saveData(payrollData);
        return {
            statusCode: 200,
            body: JSON.stringify(result),
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
        const report = await new PayrollService().generateReport();
        return {
            statusCode: 200,
            body: report
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error.message),
        };
    }
}