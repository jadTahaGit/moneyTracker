// Get references to the selectors and filter button
const yearSelector = document.getElementById('yearSelector');
const monthSelector = document.getElementById('monthSelector');
const filterButton = document.getElementById('filterButton');
const dataContainer = document.getElementById('dataContainer');

// Add event listener to the filter button
filterButton.addEventListener('click', () => {
  const selectedYear = yearSelector.value;
  const selectedMonth = monthSelector.value;

  if (selectedYear && selectedMonth) {
    fetchDataByMonthAndYear(selectedMonth, selectedYear);
    fetchIncomeByMonthAndYear(selectedMonth, selectedYear);
    fetchExpenseByMonthAndYear(selectedMonth, selectedYear);
  } else if (selectedYear) {
    fetchDataByYear(selectedYear);
  } else {
    // Year is not selected, show error message
    dataContainer.innerHTML = 'Please choose a year';
  }
});
