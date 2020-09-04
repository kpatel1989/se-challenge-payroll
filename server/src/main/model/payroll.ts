import {
  PrimaryKey, Column, Table, DataType, ForeignKey, HasMany, Model,
} from 'sequelize-typescript';
import { Payscale } from './payscale';

@Table({
  underscored: true,
  schema: process.env.PAYROLL_SCHEMA,
  tableName: 'payroll',
})
export class Payroll extends Model {
    @HasMany(() => Payscale)
    payscale: Payscale[];

    @PrimaryKey
    @Column({ field: 'employee_id' })
    employeeId: number;

    @PrimaryKey
    @Column({
      field: 'date',
      type: DataType.DATEONLY,
      set(value: string) {
        const dateAttributes = value.split('/');
        this.setDataValue('date', `${dateAttributes[2]}-${dateAttributes[1]}-${dateAttributes[0]}`);
      },
      get() {
        return new Date(this.getDataValue('date')).toDateString();
      },
    })
    date: number;

    @PrimaryKey
    @Column({ field: 'job_group' })
    @ForeignKey(() => Payscale)
    jobGroup: string;

    @Column({ field: 'hours_worked' })
    hoursWorked: number;


    static getReportQuery() {
        return `SELECT
        p2.employee_id , p2.job_group,
        CASE
            WHEN p2."date"
                between to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/01'), 'YYYY/MM/DD')
                    and to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/15'), 'YYYY/MM/DD')
                THEN to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/01'), 'YYYY/MM/DD')
            ELSE
                to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/16'), 'YYYY/MM/DD')
            end as "start_date",
        CASE
            WHEN p2."date"
                between to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/01'), 'YYYY/MM/DD')
                    and to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/15'), 'YYYY/MM/DD')
                THEN to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/15'), 'YYYY/MM/DD')
            ELSE
            to_date(to_char(to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/01'), 'YYYY/MM/DD') + interval '1 MONTH - 1 day', 'YYYY/MM/DD'), 'YYYY/MM/DD')
            end as "end_date",
        sum(p2.hours_worked * p3.pay_rate) as "amount_paid"
    FROM payroll p2
    join payscale p3 on p2.job_group  = p3.job_group
    group by employee_id, p2.job_group, CASE
        WHEN p2."date"
            between to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/01'), 'YYYY/MM/DD')
                and to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/15'), 'YYYY/MM/DD')
            THEN to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/01'), 'YYYY/MM/DD')
        ELSE to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/16'), 'YYYY/MM/DD')
    end,
    CASE
            WHEN p2."date"
                between to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/01'), 'YYYY/MM/DD')
                    and to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/15'), 'YYYY/MM/DD')
                THEN to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/15'), 'YYYY/MM/DD')
            ELSE
                to_date(to_char(to_date(CONCAT(extract("YEAR" from p2."date"), '/', extract("MONTH" from p2."date"), '/01'), 'YYYY/MM/DD') + interval '1 MONTH - 1 day', 'YYYY/MM/DD'), 'YYYY/MM/DD')
            end
    order by p2.employee_id,p2.job_group,start_date;`;
    }
}
