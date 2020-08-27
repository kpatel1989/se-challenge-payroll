const CSV_HEADER = {
    'date': 'date',
    'hours worked': 'hours_worked',
    'employee id': 'employee_id',
    'job group': 'job_group'
}
module.exports.Parse = (rawData) => {
    try {
        rawData = rawData.split('\r\n');
        const header = rawData[0].split(',');
        validateHeaders(header);
        rawData.shift();
        return rawData.reduce((parsedData, dataRow, i) => {
            const dataFields = dataRow.split(',');
            if (dataRow != '' && dataFields.length === header.length) {
                parsedData.push(
                    dataRow.split(',').reduce((dataItem, item, index) => {
                        dataItem[CSV_HEADER[header[index]]] = item;
                        return dataItem;
                    }, {})
                );
            }
            return parsedData;
        }, []);
    } catch (e) {
        throw new Error(e.message);
    }
}

function validateHeaders(header) {
    Object.keys(CSV_HEADER).forEach(key => {
        if (!header.includes(key)) {
            throw new Error('Headers are not valid');
        }
    });
    return true;
}