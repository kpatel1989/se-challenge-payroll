import {
  PrimaryKey, Column, Table, Model,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  schema: process.env.PAYROLL_SCHEMA,
  tableName: 'payscale',
})
export class Payscale extends Model {
    @PrimaryKey
    @Column({ field: 'job_group' })
    jobGroup: number;

    @Column({ field: 'pay_rate' })
    payRate: number;
}
