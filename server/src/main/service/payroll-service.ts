import { Parse } from '../utils/csv-parser';


import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

import { Payroll } from '../model/payroll';

export class PayrollService {
    sequelize: Sequelize;
    constructor(client) {
        this.sequelize = client;
    }
    async saveData(payrollData) {
        try {
            console.log('Connection has been established successfully.');

            payrollData = Parse(payrollData);
            await payrollData.forEach(async dataItem => {
                try {
                    await Payroll.upsert(dataItem);
                } catch (e) {
                    console.log(e.message);
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
            let payrollReport:any = {};
            payrollReport = await this.sequelize.query(Payroll.getReportQuery(), { type: QueryTypes.SELECT });
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