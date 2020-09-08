const { DBService } = require('../main/utils/db-init');
const { Parse } = require('../main/utils/csv-parser');
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
                    console.log('Upsert error', e);
                }
            });
            return;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    async generateReport() {
        try {
            await client.authenticate();
            console.log('Connection has been established successfully.');

            let payrollReport = await Payroll.getDataForPayroll();
            payrollReport = {
                employeeReports : payrollReport.map(data => {
                    return {
                        employeeId: data.employee_id,
                        payPeriod: {
                            startDate: data.start_date,
                            endDate: data.end_date
                        },
                        amountPaid: data.amount_paid
                    }
                })
            }
            return {payrollReport};
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}

module.exports = PayrollService;