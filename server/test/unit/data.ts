export default {
    "PAYROLL_SERVICE_UPLOAD_TEST_DATA":
        `date,hours worked,employee id,job group\r\n14/11/2016,7.5,1,A\r\n9/11/2016,4,2,B\r\n10/11/2016,4,2,B\r\n9/11/2016,11.5,3,A\r\n8/11/2016,6,3,A\r\n11/11/2016,3,3,A\r\n2/11/2016,6,3,A\r\n3/11/2016,12,2,B\r\n4/11/2016,11,2,B\r\n6/11/2016,5,4,B`,

    'PAYROLL_SERVICE_PARSED_DATA': [{
        date: '14/11/2016',
        hours_worked: '7.5',
        employee_id: '1',
        job_group: 'A'
    },
    {
        date: '9/11/2016',
        hours_worked: '4',
        employee_id: '2',
        job_group: 'B'
    },
    {
        date: '10/11/2016',
        hours_worked: '4',
        employee_id: '2',
        job_group: 'B'
    },
    {
        date: '9/11/2016',
        hours_worked: '11.5',
        employee_id: '3',
        job_group: 'A'
    },
    {
        date: '8/11/2016',
        hours_worked: '6',
        employee_id: '3',
        job_group: 'A'
    },
    {
        date: '11/11/2016',
        hours_worked: '3',
        employee_id: '3',
        job_group: 'A'
    },
    {
        date: '2/11/2016',
        hours_worked: '6',
        employee_id: '3',
        job_group: 'A'
    },
    {
        date: '3/11/2016',
        hours_worked: '12',
        employee_id: '2',
        job_group: 'B'
    },
    {
        date: '4/11/2016',
        hours_worked: '11',
        employee_id: '2',
        job_group: 'B'
    },
    {
        date: '6/11/2016',
        hours_worked: '5',
        employee_id: '4',
        job_group: 'B'
    }],
    PAYROLL_SERVICE_REPORT_SERVICE_RESPONSE: [
        { "employeeId": "1", "payPeriod": { "startDate": "2016-11-01", "endDate": "2016-11-15" }, "amountPaid": "150.0" },
        { "employeeId": "1", "payPeriod": { "startDate": "2016-11-16", "endDate": "2016-11-30" }, "amountPaid": "220" },
        { "employeeId": "1", "payPeriod": { "startDate": "2016-12-01", "endDate": "2016-12-15" }, "amountPaid": "150.0" },
        { "employeeId": "1", "payPeriod": { "startDate": "2016-12-16", "endDate": "2016-12-31" }, "amountPaid": "220" },
        { "employeeId": "2", "payPeriod": { "startDate": "2016-11-01", "endDate": "2016-11-15" }, "amountPaid": "930" },
        { "employeeId": "2", "payPeriod": { "startDate": "2016-12-01", "endDate": "2016-12-15" }, "amountPaid": "930" },
        { "employeeId": "3", "payPeriod": { "startDate": "2016-11-01", "endDate": "2016-11-15" }, "amountPaid": "590.0" },
        { "employeeId": "3", "payPeriod": { "startDate": "2016-12-01", "endDate": "2016-12-15" }, "amountPaid": "470.0" },
        { "employeeId": "4", "payPeriod": { "startDate": "2015-02-16", "endDate": "2015-02-28" }, "amountPaid": "100" },
        { "employeeId": "4", "payPeriod": { "startDate": "2016-02-16", "endDate": "2016-02-29" }, "amountPaid": "150" },
        { "employeeId": "4", "payPeriod": { "startDate": "2016-11-01", "endDate": "2016-11-15" }, "amountPaid": "150" },
        { "employeeId": "4", "payPeriod": { "startDate": "2016-11-16", "endDate": "2016-11-30" }, "amountPaid": "450" },
        { "employeeId": "4", "payPeriod": { "startDate": "2016-12-01", "endDate": "2016-12-15" }, "amountPaid": "150" },
        { "employeeId": "4", "payPeriod": { "startDate": "2016-12-16", "endDate": "2016-12-31" }, "amountPaid": "450" }
    ],
    PAYROLL_SERVICE_REPORT_QUERY_DATA: [
        { "employee_id": "1", "start_date": "2016-11-01", "end_date": "2016-11-15", "amount_paid": "150.0" },
        { "employee_id": "1", "start_date": "2016-11-16", "end_date": "2016-11-30", "amount_paid": "220" },
        { "employee_id": "1", "start_date": "2016-12-01", "end_date": "2016-12-15", "amount_paid": "150.0" },
        { "employee_id": "1", "start_date": "2016-12-16", "end_date": "2016-12-31", "amount_paid": "220" },
        { "employee_id": "2", "start_date": "2016-11-01", "end_date": "2016-11-15", "amount_paid": "930" },
        { "employee_id": "2", "start_date": "2016-12-01", "end_date": "2016-12-15", "amount_paid": "930" },
        { "employee_id": "3", "start_date": "2016-11-01", "end_date": "2016-11-15", "amount_paid": "590.0" },
        { "employee_id": "3", "start_date": "2016-12-01", "end_date": "2016-12-15", "amount_paid": "470.0" },
        { "employee_id": "4", "start_date": "2015-02-16", "end_date": "2015-02-28", "amount_paid": "100" },
        { "employee_id": "4", "start_date": "2016-02-16", "end_date": "2016-02-29", "amount_paid": "150" },
        { "employee_id": "4", "start_date": "2016-11-01", "end_date": "2016-11-15", "amount_paid": "150" },
        { "employee_id": "4", "start_date": "2016-11-16", "end_date": "2016-11-30", "amount_paid": "450" },
        { "employee_id": "4", "start_date": "2016-12-01", "end_date": "2016-12-15", "amount_paid": "150" },
        { "employee_id": "4", "start_date": "2016-12-16", "end_date": "2016-12-31", "amount_paid": "450" }
    ]
}