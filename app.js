const cors = require("cors");
const express = require("express");
const dataRoutes = require("./dataRoutes");
const assignCategories = require("./Cat_utlities/catAssigner");
const calculateCategoryTotals = require("./Cat_utlities/CatTotalsCalculator");
const app = express();
app.use(cors());

app.get("/api/data/:month/:year", dataRoutes.getDataByMonth);
app.get("/api/positive-data/:month/:year", dataRoutes.getPositiveDataByMonth);
app.get("/api/negative-data/:month/:year", dataRoutes.getNegativeDataByMonth);
app.get("/api/expense/:month/:year", dataRoutes.getExpenseByMonth);
app.get(
  "/api/expenseCategories/:month/:year",
  dataRoutes.getexpenseCategoriesByMonth
);

app.get(
  "/api/expenseCategoriesDetailed/:month/:year",
  dataRoutes.getExpenseCategoriesByMonthWithDetails
);

app.get(
  "/api/expensePillers/:month/:year",
  dataRoutes.getCategoryTotalsWithPillers
);

app.get("/api/income/:month/:year", dataRoutes.getIncomeByMonth);
app.get("/api/data/:year", dataRoutes.getDataByYear);
app.get(
  "/api/data-monthlyBased/:year",
  dataRoutes.getNegativeDataByYear_MonthlyBased
);

// app.get("/api/income/:month/:year", )

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const {
  readExcelFile,
  filterDataByMonth,
  calculateMonthlyExpense,
  filterDataByYear,
} = require("./excelReader");

// const result = readExcelFile(filePath, sheetName, cellRange);
// const data_April_2022 = filterDataByMonth(result, 4, 2022);
// const AprilTotal = calculateMonthlyExpense(data_April_2022);
// const transactionsWithCategories = assignCategories(result);
// const cat_Totals = calculateCategoryTotals(transactionsWithCategories);
