import * as sinon  from 'sinon';
// var SequelizeMock = require('sequelize-mock');

import { DBService } from '../../src/main/utils/db-init';
import { PayrollService } from '../../src/main/service/payroll-service';
import { Payroll } from '../../src/main/model/payroll';
import data from './data';

describe('Payroll Service', () => {

    let service;
    let dbClient;

    beforeEach(() => {
        dbClient = DBService.createDBClient();
        service = new PayrollService(dbClient);
    });

    it('should save the data to the database', async () => {
        const upsertStub = sinon.stub(Payroll, 'upsert').returns(true);
        service.saveData(data.PAYROLL_SERVICE_UPLOAD_TEST_DATA);
        expect(upsertStub.callCount).toBe(10);
    });

    it('should return the payroll report.', async () => {
        sinon.stub(dbClient, 'query').resolves(data.PAYROLL_SERVICE_REPORT_QUERY_DATA);
        const report = await service.generateReport();
        const expectedOutput = {
            "payrollReport": {
                "employeeReports": data.PAYROLL_SERVICE_REPORT_SERVICE_RESPONSE
            }
        }
        expect(report).toEqual(expectedOutput);
    });
});