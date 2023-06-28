const cors = require('cors');
const express = require('express');
const dataRoutes = require('./dataRoutes');
const app = express();
app.use(cors());

app.get('/api/data/:month/:year', dataRoutes.getDataByMonth);
app.get('/api/data/:year', dataRoutes.getDataByYear);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const {
  readExcelFile,
  filterDataByMonth,
  calculateMonthlyExpense,
  filterDataByYear,
} = require('./excelReader');

const filePath = './data.xlsm';
const sheetName = 'Bank Transactions';
const cellRange = 'N10:X1026';

const result = readExcelFile(filePath, sheetName, cellRange);
// console.log(result);

const data_April_2022 = filterDataByMonth(result, 4, 2022);

const AprilTotal = calculateMonthlyExpense(data_April_2022);

console.log(AprilTotal);
