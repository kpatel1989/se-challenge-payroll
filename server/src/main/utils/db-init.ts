import { Sequelize } from 'sequelize-typescript';
import { Payroll } from '../model/payroll';
import { Payscale } from '../model/payscale';

const DIALECT = 'postgres';

export class DBService {
    static client: Sequelize = null;

    static createDBClient(DB_HOST = process.env.DB_HOST,
        DB_NAME = process.env.DB_NAME,
        DB_USER = process.env.DB_USER,
        DB_PASSWORD = process.env.DB_PASSWORD): Sequelize {
        if (DBService.client) {
            return DBService.client;
        }
        const host = DB_HOST ? DB_HOST.split(':') : [];
        DBService.client = new Sequelize({
            database: DB_NAME,
            username: DB_USER,
            password: DB_PASSWORD,
            dialect: DIALECT,
            host: host[0],
            port: (host.length === 2 ? Number(host[1]) : 5432),
            logging: (msg: string, elapsedTime: number) => {
                console.log(`DB log - ${msg}. Time elapsed: ${elapsedTime}`);
            }
        });
        DBService.client.addModels([
            Payroll,
            Payscale
        ])
        return DBService.client;
    }
}

