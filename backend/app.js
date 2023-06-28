const express = require('express');
const app = express();

app.get('/api/data/:month/:year', (req, res) => {
  const { month, year } = req.params;
  const result = readExcelFile(filePath, sheetName, cellRange);
  const filteredData = filterDataByMonth(
    result,
    parseInt(month),
    parseInt(year)
  );
  res.json(filteredData);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

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
