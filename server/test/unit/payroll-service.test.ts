import * as sinon  from 'sinon';

import { DBService } from '../../src/main/utils/db-init';
import { PayrollService } from '../../src/main/service/payroll-service';
import { Payroll } from '../../src/main/model/payroll';
import data from './data';

describe('Payroll Service', () => {

    let service;
    let dbClient;
    let payrollUpsertStub;

    beforeEach(() => {
        dbClient = DBService.createDBClient();
        service = new PayrollService(dbClient);
    });
    afterEach(() => {
        if (payrollUpsertStub) payrollUpsertStub.restore();
    })

    it('should save the data to the database', async () => {
        payrollUpsertStub = sinon.stub(Payroll, 'upsert').returns(true);
        const result = await service.saveData(data.PAYROLL_SERVICE_UPLOAD_TEST_DATA);
        expect(payrollUpsertStub.callCount).toBe(10);
        expect(result).toEqual('Success');
    });

    it('should fail if the upsert fails', async () => {
        payrollUpsertStub = sinon.stub(Payroll, 'upsert').callsFake(() => {
            return Promise.reject('Something wrong while upserting data to database');
        });
        const result = await service.saveData(data.PAYROLL_SERVICE_UPLOAD_TEST_DATA);
        expect(payrollUpsertStub.callCount).toBe(10);
        expect(result).toEqual('Success');
    });

    it('should return the payroll report.', async () => {
        const queryStub = sinon.stub(dbClient, 'query').resolves(data.PAYROLL_SERVICE_REPORT_QUERY_DATA);
        const report = await service.generateReport();
        const expectedOutput = {
            "payrollReport": {
                "employeeReports": data.PAYROLL_SERVICE_REPORT_SERVICE_RESPONSE
            }
        }
        expect(report).toEqual(expectedOutput);
        queryStub.restore();
    });
});