module.exports = function (client) {
    const { DataTypes, Model } = require('sequelize');

    class Payscale extends Model { }

    Payscale.init({
        job_group: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        pay_rate: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
    }, {
        timestamps: false,
        sequelize: client,
        tableName: `payscale`
    });
    return(Payscale)
};