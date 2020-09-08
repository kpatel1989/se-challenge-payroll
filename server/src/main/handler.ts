
import 'reflect-metadata';
import 'sequelize';
import 'pg';
import multipart from 'aws-lambda-multipart-parser';
import { APIGatewayEvent } from 'aws-lambda';
import { Sequelize } from 'sequelize-typescript';

import { DBService } from './utils/db-init';
import { PayrollService } from './service/payroll-service';

const client: Sequelize = DBService.createDBClient();

exports.uploadFile = async (event: APIGatewayEvent) => {
    try {
        let payrollData = new Buffer(multipart.parse(event, true).file.content).toString('utf-8');
        const result = await new PayrollService(client).saveData(payrollData);
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
        const report = await new PayrollService(client).generateReport();
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