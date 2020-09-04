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
    }]
}