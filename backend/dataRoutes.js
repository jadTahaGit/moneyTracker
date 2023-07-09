const filePath = './data.xlsm';
const sheetName = 'Bank Transactions';
const cellRange = 'N10:X2026';

const calculateCategoryTotals = require('./Cat_utlities/CatTotalsCalculator');
const assignCategories = require('./Cat_utlities/catAssigner');

const {
  readExcelFile,
  filterDataByMonth,
  filterDataByYear,
  calculateMonthlyExpense,
  calculateMonthlyIncome,
  filterPositiveDataByMonth,
  filterNegativeDataByMonth,
  filterMonthlyExpensesOfASpecificYear,
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

function getexpenseCategoriesByMonth(req, res) {
  const { month, year } = req.params;
  const result = readExcelFile(filePath, sheetName, cellRange);
  const filteredData = filterDataByMonth(
    result,
    parseInt(month),
    parseInt(year)
  );
  const transactionsWithCategories = assignCategories(filteredData);
  const cat_Totals = calculateCategoryTotals(transactionsWithCategories);

  res.json(cat_Totals);
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

function getNegativeDataByYear_MonthlyBased(req, res) {
  const { year } = req.params;
  const result = readExcelFile(filePath, sheetName, cellRange);
  const filteredData = filterMonthlyExpensesOfASpecificYear(
    result,
    parseInt(year)
  );
  res.json(filteredData);
}

module.exports = {
  getDataByMonth,
  getDataByYear,
  getExpenseByMonth,
  getexpenseCategoriesByMonth,
  getIncomeByMonth,
  getPositiveDataByMonth,
  getNegativeDataByMonth,
  getNegativeDataByYear_MonthlyBased,
};
