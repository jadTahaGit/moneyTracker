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
