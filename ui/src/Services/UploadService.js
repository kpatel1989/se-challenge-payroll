import config from '../Config';

class UploadService {
    static uploadFileToServer(file) {
        const formData = new FormData();
        formData.append('file', file);
        return fetch(`${config.domain}${config.uploadUrl}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: formData
        });
    }
}
export default UploadService;