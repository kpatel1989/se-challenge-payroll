import {
  PrimaryKey, Column, Table, Model, DataType,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'payscale'
})
export class Payscale extends Model<Payscale> {

    @PrimaryKey
    @Column({
      field: 'job_group',
      type: DataType.STRING
    })
    jobGroup: string;

    @Column({
      field: 'pay_rate',
      type: DataType.NUMERIC
    })
    payRate: number;
}
