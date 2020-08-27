require('pg');
const { Sequelize } = require('sequelize');

export class DBService {
    static createDBClient(DB_HOST = process.env.DB_HOST,
        DB_NAME = process.env.DB_NAME,
        DB_USER = process.env.DB_USER,
        DB_PASSWORD = process.env.DB_PASSWORD) {

        const host = DB_HOST ? DB_HOST.split(':') : [];
        const client = new Sequelize({
                database: DB_NAME,
                username: DB_USER,
                password: DB_PASSWORD,
                dialect: 'postgres',
                host: host[0],
                port: (2 === host.length ? Number(host[1]) : 5432),
                logging: console.log,
            });
        return client;
    }
}