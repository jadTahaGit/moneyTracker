const filePath = './data.xlsm';
const sheetName = 'Bank Transactions';
const cellRange = 'N10:X1026';

const {
  readExcelFile,
  filterDataByMonth,
  filterDataByYear,
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

function getDataByYear(req, res) {
  const { year } = req.params;
  const result = readExcelFile(filePath, sheetName, cellRange);
  const filteredData = filterDataByYear(result, parseInt(year));
  res.json(filteredData);
}

module.exports = { getDataByMonth, getDataByYear };
