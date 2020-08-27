import config from '../Config';

class ReportService {
    static getReport() {
        return fetch(`${config.domain}${config.getReport}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin'
        });
    }
}
export default ReportService;