const {
  readExcelFile,
  filterDataByMonth,
  calculateMonthlyExpense,
} = require('./excelReader');

const filePath = './data.xlsm';
const sheetName = 'Bank Transactions';
const cellRange = 'N10:X1026';

const result = readExcelFile(filePath, sheetName, cellRange);
// console.log(result);

const data_April_2022 = filterDataByMonth(result, 4, 2022);

const AprilTotal = calculateMonthlyExpense(data_April_2022);

console.log(AprilTotal);
