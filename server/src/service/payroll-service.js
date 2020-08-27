const { DBService } = require('../utils/db-init');
const { Parse } = require('../utils/csv-parser');
const client = DBService.createDBClient();

const Payroll = require('../model/payroll')(client);

class PayrollService {

    async saveData(payrollData) {
        try {
            await client.authenticate();
            console.log('Connection has been established successfully.');

            payrollData = Parse(payrollData);
            await payrollData.forEach(async dataItem => {
                try {
                    await Payroll.upsert(dataItem);
                } catch (e) {
                    console.log(e.message);
                }
            });
            return payrollData;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    async generateReport() {
        try {
            await client.authenticate();
            console.log('Connection has been established successfully.');

            let payrollData = await Payroll.getDataForPayroll();
            payrollData = JSON.stringify(payrollData);
            console.log(payrollData);

            return payrollData;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}

module.exports = PayrollService;