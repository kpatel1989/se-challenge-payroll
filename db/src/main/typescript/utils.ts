/**
 * Created by Gia.Diep on 5/17/2017.
 */

const exec = require('child_process').exec;

export class Utils {
    public static print(err, data) {
        if (err) {
            console.error('error', err, err.stack);
        } else {
            console.log('success:');
            console.log(data);
        }
    }
    public static onData(dataline) {
        console.log(dataline);
    }
    public static resourceRoot() {
        return __dirname + '/resources';
    }

    public static loginEcr(region: string = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1') {
        const getEcrLogin = () => {
            const command = 'aws ecr get-login --no-include-email --region ' + region;
            return exeCommand(command);
        };

        const exeCommand = (command: string) => {
            if (!command) {
                throw Error('No docker login output generated');
            }
            return new Promise((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                    Utils.print(err, stdout);
                    if (err) {
                        reject(stderr);
                    } else {
                        resolve(stdout);
                    }
                });
            });
        };
        return getEcrLogin().then(exeCommand);
    }
}
