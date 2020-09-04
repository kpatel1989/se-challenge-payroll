
const multipart = require('aws-lambda-multipart-parser');
const PayrollService = require('./service/payroll-service');
import {
  APIGatewayEvent, Callback, Context, Handler,
} from 'aws-lambda';

export const hello: Handler = (event: APIGatewayEvent, _context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  cb(null, response);
};

exports.uploadFile = async (event: APIGatewayEvent) => {
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

exports.getReport = async () => {
    try {
        const report = await new PayrollService().generateReport();
        return {
            statusCode: 200,
            body: JSON.stringify(report)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error.message),
        };
    }
}