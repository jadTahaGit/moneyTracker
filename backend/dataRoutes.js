const filePath = './data.xlsm';
const sheetName = 'Bank Transactions';
const cellRange = 'N10:X2026';

const {
  readExcelFile,
  filterDataByMonth,
  filterDataByYear,
  calculateMonthlyExpense,
  calculateMonthlyIncome,
  filterPositiveDataByMonth,
  filterNegativeDataByMonth,
} = require('./excelReader');

function getDataByMonth(req, res) {
  const { month, year } = req.params;
  const result = readExcelFile(filePath, sheetName, cellRange);
  const filteredData = filterDataByMonth(
    result,
    parseInt(month),
    parseInt(year)
  );
  res.json(filteredData);
}
function getPositiveDataByMonth(req, res) {
  const { month, year } = req.params;
  const result = readExcelFile(filePath, sheetName, cellRange);
  const filteredData = filterPositiveDataByMonth(
    result,
    parseInt(month),
    parseInt(year)
  );
  res.json(filteredData);
}

function getNegativeDataByMonth(req, res) {
  const { month, year } = req.params;
  const result = readExcelFile(filePath, sheetName, cellRange);
  const filteredData = filterNegativeDataByMonth(
    result,
    parseInt(month),
    parseInt(year)
  );
  res.json(filteredData);
}

function getExpenseByMonth(req, res) {
  const { month, year } = req.params;
  const result = readExcelFile(filePath, sheetName, cellRange);
  const filteredData = filterDataByMonth(
    result,
    parseInt(month),
    parseInt(year)
  );
  const expense = calculateMonthlyExpense(filteredData);
  res.json(expense);
}

function getIncomeByMonth(req, res) {
  const { month, year } = req.params;
  const result = readExcelFile(filePath, sheetName, cellRange);
  const filteredData = filterDataByMonth(
    result,
    parseInt(month),
    parseInt(year)
  );
  const income = calculateMonthlyIncome(filteredData);
  res.json(income);
}

function getDataByYear(req, res) {
  const { year } = req.params;
  const result = readExcelFile(filePath, sheetName, cellRange);
  const filteredData = filterDataByYear(result, parseInt(year));
  res.json(filteredData);
}

module.exports = {
  getDataByMonth,
  getDataByYear,
  getExpenseByMonth,
  getIncomeByMonth,
  getPositiveDataByMonth,
  getNegativeDataByMonth,
};
