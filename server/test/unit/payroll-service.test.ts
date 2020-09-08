import * as sinon  from 'sinon';
// var SequelizeMock = require('sequelize-mock');

import { DBService } from '../../src/main/utils/db-init';
import { PayrollService } from '../../src/main/service/payroll-service';
import { Payroll } from '../../src/main/model/payroll';
// import { Parse } from '../../src/main/utils/csv-parser';

import data from './data';

describe('Payroll Service', () => {

    let service;
    // let dbClientStub;
    let dbClient;
    // let payrollStub;
    // let DBConnectionMock;

    beforeEach(() => {
        dbClient = DBService.createDBClient();
        service = new PayrollService(dbClient);
    });

    it('should save the data to the database', async () => {
        // sinon.stub(dbClient, 'authenticate').returns(true);
        const upsertStub = sinon.stub(Payroll, 'upsert').returns(true);
        service.saveData(data.PAYROLL_SERVICE_UPLOAD_TEST_DATA);
        expect(upsertStub.callCount).toBe(10);
    });
});