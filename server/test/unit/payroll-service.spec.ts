const { expect } = require('chai');
const sinon  = require('sinon');
const { beforeEach, describe, it } = require('mocha');
var SequelizeMock = require('sequelize-mock');

const { Model } = require('sequelize');
const {DBService} = require('../../src/utils/db-init');
const PayrollService = require('../../src/service/payroll-service');
const Payroll = require('../../src/model/payroll');
const { Parse } = require('../../src/utils/csv-parser');

const data = require('./data');

describe('Payroll Service', () => {

    let service;
    let dbClientStub;
    let dbClient;
    let payrollStub;
    let DBConnectionMock;

    beforeEach(() => {
        DBConnectionMock = new SequelizeMock();
        // dbClient = sinon.stub(DBService, 'createDBClient').returns(DBConnectionMock);
        dbClient = DBService.createDBClient();
        // var PayrollMock = DBConnectionMock.define('Payroll', {}, {
        //     instanceMethods: {
        //         upsert: function () {
        //             console.log('Upserting');
        //             return true;
        //         },
        //     },
        // });
        service = new PayrollService();
        // dbClientStub = sinon.stub(DBService, 'createDBClient').returns({});


        // sinon.stub(mockDB, 'authenticate').returns(true);
        // sinon.stub(DBService, 'createDBClient').returns(mockDB);
    });

    it('should save the data to the database', async () => {
        // sinon.stub(dbClient, 'authenticate').returns(true);
        // console.log(payroll.upsert);
        // const upsertStub = sinon.stub(payrollStub, 'upsert').returns(true);
        service.saveData(data.PAYROLL_SERVICE_UPLOAD_TEST_DATA);
        // expect(upsertStub.callCount).equals(9);
    });
});