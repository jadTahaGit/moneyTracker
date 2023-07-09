const XLSX = require('xlsx');

function readExcelFile(filePath, sheetName, cellRange) {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  const range = XLSX.utils.decode_range(cellRange);

  const data = [];
  const headers = [
    'My Bank Account',
    'Booking Date',
    'Validation Date',
    'Booking Text',
    'Purpose of Transaction',
    'Payer/Receiver',
    'Target Bank Account/IBAN',
    'BIC (SWIFT-Code)',
    'Amount',
    'Currency',
    'Info',
  ];

  for (let row = range.s.r + 1; row <= range.e.r; row++) {
    const rowData = {};
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = { c: col, r: row };
      const cell = worksheet[XLSX.utils.encode_cell(cellAddress)];
      const header = headers[col - range.s.c];
      rowData[header] = cell ? cell.v : undefined;
    }
    data.push(rowData);
  }

  return data;
}

function filterDataByMonth(data, month, year) {
  const excelNumberRange = getExcelNumberFromMonthAndYear(month, year);
  const excelNumberFirstDay = excelNumberRange[0];
  const excelNumberLastDay = excelNumberRange[1];

  return data.filter((item) => {
    const bookingDate = item['Booking Date'];

    return (
      bookingDate >= excelNumberFirstDay && bookingDate <= excelNumberLastDay
    );
  });
}

function filterPositiveDataByMonth(data, month, year) {
  const excelNumberRange = getExcelNumberFromMonthAndYear(month, year);
  const excelNumberFirstDay = excelNumberRange[0];
  const excelNumberLastDay = excelNumberRange[1];

  return data.filter((item) => {
    const bookingDate = item['Booking Date'];
    const amount = item['Amount'];
    return (
      bookingDate >= excelNumberFirstDay &&
      bookingDate <= excelNumberLastDay &&
      amount > 0
    );
  });
}

function filterNegativeDataByMonth(data, month, year) {
  const excelNumberRange = getExcelNumberFromMonthAndYear(month, year);
  const excelNumberFirstDay = excelNumberRange[0];
  const excelNumberLastDay = excelNumberRange[1];

  return data.filter((item) => {
    const bookingDate = item['Booking Date'];
    const amount = item['Amount'];
    return (
      bookingDate >= excelNumberFirstDay &&
      bookingDate <= excelNumberLastDay &&
      amount < 0
    );
  });
}

function filterDataByYear(data, year) {
  const excelNumberRange = getExcelNumberFromYear(year);
  const excelNumberFirstDay = excelNumberRange[0];
  const excelNumberLastDay = excelNumberRange[1];

  return data.filter((item) => {
    const bookingDate = item['Booking Date'];
    return (
      bookingDate >= excelNumberFirstDay && bookingDate <= excelNumberLastDay
    );
  });
}

function filterPositiveDataByYear(data, year) {
  const excelNumberRange = getExcelNumberFromYear(year);
  const excelNumberFirstDay = excelNumberRange[0];
  const excelNumberLastDay = excelNumberRange[1];

  return data.filter((item) => {
    const bookingDate = item['Booking Date'];
    const amount = item['Amount'];

    return (
      bookingDate >= excelNumberFirstDay &&
      bookingDate <= excelNumberLastDay &&
      amount > 0
    );
  });
}

function filterNegativeDataByYear(data, year) {
  const excelNumberRange = getExcelNumberFromYear(year);
  const excelNumberFirstDay = excelNumberRange[0];
  const excelNumberLastDay = excelNumberRange[1];

  return data.filter((item) => {
    const bookingDate = item['Booking Date'];
    const amount = item['Amount'];
    return (
      bookingDate >= excelNumberFirstDay &&
      bookingDate <= excelNumberLastDay &&
      amount > 0
    );
  });
}

function filterMonthlyExpensesOfASpecificYear(data, year) {
  const excelNumberRange = getExcelNumberFromYear(year);
  const excelNumberFirstDay = excelNumberRange[0];
  const excelNumberLastDay = excelNumberRange[1];

  const filteredData = data.filter((item) => {
    const bookingDate = item['Booking Date'];
    const amount = item['Amount'];
    return (
      bookingDate >= excelNumberFirstDay &&
      bookingDate <= excelNumberLastDay &&
      amount < 0
    );
  });

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthlyData = Array.from({ length: 12 }).map((_, i) => ({
    Month: months[i],
    Amount: 0,
  }));

  filteredData.forEach((item) => {
    const bookingDate = getDateFromExcelNumber(item['Booking Date']);
    const bookingDateObject = new Date(bookingDate);
    const monthIndex = bookingDateObject.getMonth();
    monthlyData[monthIndex].Amount += item['Amount'];
  });

  return monthlyData;
}

function calculateMonthlyExpense(data) {
  let totalExpense = 0;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const amount = item['Amount'];

    if (amount < 0) {
      totalExpense += parseFloat(amount);
    }
  }

  return totalExpense;
}

function calculateMonthlyIncome(data) {
  let totalExpense = 0;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const amount = item['Amount'];
    const targetBank = item['Target Bank Account/IBAN'];

    if (amount > 0 && targetBank != '1005936800') {
      totalExpense += parseFloat(amount);
    }
  }

  return totalExpense;
}

function getDateFromExcelNumber(number) {
  const excelEpoch = new Date(Date.UTC(1900, 0, 0));
  const date = new Date(
    excelEpoch.getTime() + (number - 1) * 24 * 60 * 60 * 1000
  );
  return date.toISOString().split('T')[0];
}

function getExcelNumberFromDayMonthAndYear(day, month, year) {
  const excelEpoch = new Date(Date.UTC(1900, 0, 0));
  const inputDate = new Date(year, month - 1, day);
  const diffInDays =
    Math.floor((inputDate - excelEpoch) / (24 * 60 * 60 * 1000)) + 1;
  return diffInDays;
}

//Month
function getExcelNumberFromMonthAndYear(month, year) {
  const firstDayOfMonth = new Date(year, month - 1, 2);
  const firstDayExcelNumber = getExcelNumberFromDateObject(firstDayOfMonth);

  const lastDayOfMonth = new Date(year, month, 1);
  const lastDayExcelNumber = getExcelNumberFromDateObject(lastDayOfMonth);

  return [firstDayExcelNumber, lastDayExcelNumber];
}

//year
function getExcelNumberFromYear(year) {
  const firstDayOfYear = new Date(year, 0, 1);
  const firstDayExcelNumber = getExcelNumberFromDateObject(firstDayOfYear);

  const lastDayOfYear = new Date(year, 11, 31);
  const lastDayExcelNumber = getExcelNumberFromDateObject(lastDayOfYear);

  return [firstDayExcelNumber, lastDayExcelNumber];
}

// Help Function
function getExcelNumberFromDateObject(date) {
  const excelEpoch = new Date(Date.UTC(1900, 0, 0)); // Excel epoch for 1900 date system
  const diffInDays =
    Math.floor((date - excelEpoch) / (24 * 60 * 60 * 1000)) + 2;
  return diffInDays;
}

module.exports = {
  readExcelFile,
  filterDataByMonth,
  filterPositiveDataByMonth,
  filterNegativeDataByMonth,
  filterDataByYear,
  filterPositiveDataByYear,
  filterNegativeDataByYear,
  filterMonthlyExpensesOfASpecificYear,
  calculateMonthlyExpense,
  calculateMonthlyIncome,
};
