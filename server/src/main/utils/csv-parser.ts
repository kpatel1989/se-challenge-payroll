const CSV_HEADER = {
  date: 'date',
  'hours worked': 'hoursWorked',
  'employee id': 'employeeId',
  'job group': 'jobGroup',
};

function validateHeaders(header) : boolean | Error {
  Object.keys(CSV_HEADER).forEach((key) => {
    if (!header.includes(key)) {
      throw new Error('Headers are not valid');
    }
  });
  return true;
}

export const Parse = (rawData: any) : any | Error => {
  try {
    const data: Array<string> = rawData.split('\r\n');
    const header = data[0].split(',');
    validateHeaders(header);
    data.shift();
    return data.reduce((parsedData, dataRow) => {
      const dataFields: Array<string> = dataRow.split(',');
      if (dataRow !== '' && dataFields.length === header.length) {
        parsedData.push(
          /* eslint no-param-reassign: ["error", { "props": false }] */
          dataRow.split(',').reduce((dataItem, item, index) => {
            dataItem[CSV_HEADER[header[index]]] = item;
            return dataItem;
          }, {}),
        );
      }
      return parsedData;
    }, []);
  } catch (e) {
    throw new Error(e.message);
  }
};

