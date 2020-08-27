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
        this.setState({
            report: data
        });
    }
    render() {
        let reportData = '';
        if (this.state.report && this.state.report.payrollReport && this.state.report.payrollReport.employeeReports) {
            reportData = (
                <div>
                    <h1>Salary Report</h1>
                    <table>
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
                <button onClick={this.getReport}>Get Report</button>
                {reportData}
            </div>
        );
    }
}
export default Report;