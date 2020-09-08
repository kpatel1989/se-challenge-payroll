import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import { Parse } from '../utils/csv-parser';
import { Payroll } from '../model/payroll';

export class PayrollService {
    sequelize: Sequelize;
    constructor(client) {
        this.sequelize = client;
    }
    async saveData(payrollData) {
        try {
            payrollData = Parse(payrollData);
            await payrollData.forEach(async dataItem => {
                // TODO : Handle individual error.
                await Payroll.upsert(dataItem);
            });
            return 'Success';
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
    async generateReport() {
        try {
            let payrollReport:any = {};
            payrollReport = await this.sequelize.query(Payroll.getReportQuery(), { type: QueryTypes.SELECT }).catch(err => {
                throw new Error(err);
            });
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
            return Promise.reject(error);
        }
    }
}