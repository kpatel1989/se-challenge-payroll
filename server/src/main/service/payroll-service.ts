import { DBService } from '../utils/db-init';
import { Parse } from '../utils/csv-parser';


import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';

import { Payroll } from '../model/payroll';

const client:Sequelize = DBService.createDBClient();

export class PayrollService {
    sequelize: Sequelize;
    constructor(client) {
        this.sequelize = client;
    }
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


            let payrollReport:any = await client.query(Payroll.getReportQuery(), { type: QueryTypes.SELECT });
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