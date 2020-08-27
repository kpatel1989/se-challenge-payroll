module.exports = function(client) {

    const { DataTypes, Model } = require('sequelize');
    const PAYSCALE = require('./payscale')(client);

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
                // this.setDataValue('date', value);
                this.setDataValue('date', `${dateAttributes[2]}-${dateAttributes[1]}-${dateAttributes[0]}`)
            },
            get() {
                return new Date(this.getDataValue('date')).toDateString();
            }
        },
        job_group: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
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
    return Payroll;
};