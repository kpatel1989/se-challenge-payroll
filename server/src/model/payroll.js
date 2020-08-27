module.exports = function (client) {

    const { DataTypes, Model } = require('sequelize');
    const Payscale = require('./payscale')(client);

    class Payroll extends Model { }

    Payroll.init({
        employee_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            primaryKey: true,
            set(value) {
                let dateAttributes = value.split('/');
                this.setDataValue('date', `${dateAttributes[2]}-${dateAttributes[1]}-${dateAttributes[0]}`)
            },
            get() {
                return new Date(this.getDataValue('date')).toDateString();
            }
        },
        job_group: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Payscale,
                key: 'job_group'
            }
        },
        hours_worked: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
    }, {
        timestamps: false,
        sequelize: client,
        tableName: `payroll`
    });
    Payroll.hasOne(Payscale, {sourceKey: 'job_group', foreignKey: 'job_group'});

    Payroll.addScope('getDataForPayReport', {
        attributes: {
            include: ["date","hours_worked","employee_id"]
        },
        include: [
            {
                model: Payscale,
                attributes: {
                    include: ['pay_rate'],
                    exclude: ['job_group']
                }
            }
        ]
    })
    Payroll.getDataForPayroll = async () => {
        return await client.query(Payroll.getReportQuery(), { type: client.QueryTypes.SELECT});
    }
    Payroll.getReportQuery = () => {
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
    return Payroll;
};