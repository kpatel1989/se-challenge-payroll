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
            file : event.target.files[0]
        });
    }
    onFileUpload = async () => {
        await UploadService.uploadFileToServer(this.state.file).then(res => {
            console.log(res);
        }).catch(err => {
            console.log('Error:', err);
        });
    }
    render() {
        return (
            <div className="upload-component">
                <label>Choose a .csv file: </label>
                <input type='file' onChange={this.handleChange}/>
                <button type='submit' onClick={this.onFileUpload}> Upload File </button>
            </div>
        );
    }
}

export default UploadFile;