import React from 'react';
import ReportService from '../../Services/ReportService';

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: null,
        }
    }
    getReport = async () => {
        const data = await ReportService.getReport();
        if (data.payrollReport) {
            this.setState({
                report: data
            });
        } else if (data.error) {
            alert(data.error);
        } else {
            alert(JSON.stringify(data));
        }
    }
    render() {
        let reportData = '';
        if (this.state.report && this.state.report.payrollReport && this.state.report.payrollReport.employeeReports) {
            reportData = (
                <div class='container'>
                    <h1>Salary Report</h1>
                    <table class='table'>
                        <tr>
                            <th>Employee Id</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Amount Paid</th>
                        </tr>
                        {
                            this.state.report.payrollReport.employeeReports.map(data => (
                                <tr>
                                    <td>{data.employeeId}</td>
                                    <td>{data.payPeriod.startDate}</td>
                                    <td>{data.payPeriod.endDate}</td>
                                    <td>{data.amountPaid}</td>
                                </tr>
                            ))
                        }
                    </table>
                </div>)
        }
        return (
            <div>
                <button type="button" class="btn btn-primary" onClick={this.getReport}>Get Report</button>
                {reportData}
            </div>
        );
    }
}
export default Report;