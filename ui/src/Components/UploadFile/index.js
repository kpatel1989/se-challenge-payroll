import React from 'react';
import UploadService from '../../Services/UploadService';

class UploadFile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: ''
        };
    }
    handleChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }
    onFileUpload = async () => {
        if (!this.state.file) {
            alert('Please select a file');
            return;
        }
        await UploadService.uploadFileToServer(this.state.file).then(res => {
            console.log(res);
        }).catch(err => {
            console.log('Error:', err);
        });
    }
    render() {
        return (
            <div class='container'>
                <div class="input-group mb-3">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="chooseFileBtn" onChange={this.handleChange} required/>
                            <label class="custom-file-label" for="chooseFileBtn">Choose file</label>
                    </div>
                    <div class="input-group-append">
                        <span class="input-group-text" id="inputGroupFileAddon02" onClick={this.onFileUpload}>Upload</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadFile;