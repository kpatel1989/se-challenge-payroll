import React from 'react';
import ReportService from '../../Services/ReportService';

class Report extends React.Component {

    getReport = () => {
        ReportService.getReport();
    }
    render() {
        return (
            <div>
                <h1>Report</h1>
                <button onClick={this.getReport}>Get Report</button>
            </div>
        )
    }
}
export default Report;