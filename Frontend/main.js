let dataProcessed;

function updateIncomeWidget(sum) {
  const sumElement = document.getElementById('totalIncome');
  sumElement.textContent = sum;
}

function updateExpenseWidget(sum) {
  const sumElement = document.getElementById('totalExpense');
  sumElement.textContent = sum;
}

function renderGraph(dataProcessed) {
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select('#line-graph')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  let xScale = scaleX(dataProcessed);
  let yScale = scaleY(dataProcessed);
  let line = constructLine(xScale, yScale);
  drawLineGraph(svg, dataProcessed, line);

  addMinMaxLabels(svg, dataProcessed, xScale, yScale);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  createXAxis(svg, xAxis, height);
  createYAxis(svg, yAxis);
}

function CreateTable(data) {
  new Tabulator('#table', {
    data: data,
    columns: [
      { title: 'My Bank Account', field: 'My Bank Account' },
      { title: 'Booking Date', field: 'Booking Date' },
      { title: 'Validation Date', field: 'Validation Date' },
      { title: 'Booking Text', field: 'Booking Text' },
      { title: 'Purpose of Transaction', field: 'Purpose of Transaction' },
      { title: 'Payer/Receiver', field: 'Payer/Receiver' },
      { title: 'Target Bank Account/IBAN', field: 'Target Bank Account/IBAN' },
      { title: 'BIC (SWIFT-Code)', field: 'BIC (SWIFT-Code)' },
      { title: 'Amount', field: 'Amount' },
      { title: 'Currency', field: 'Currency' },
      { title: 'Info', field: 'Info' },
    ],
  });
}

async function fetchDataByMonthAndYear(month, year) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/data/${month}/${year}`
    );
    const data = await response.json();

    dataProcessed = prepareDataForD3(data);
    CreateTable(data);
    renderGraph(dataProcessed);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchDataByYear(year) {
  try {
    let url;
    if (year) {
      url = `http://localhost:3000/api/data/${year}`;
    } else {
      const selectedYear = document.getElementById('yearSelector').value;
      const selectedMonth = document.getElementById('monthSelector').value;
      if (!selectedYear) {
        alert('Please choose a year');
        return;
      }
      if (selectedMonth) {
        url = `http://localhost:3000/api/data/${selectedMonth}/${selectedYear}`;
      } else {
        url = `http://localhost:3000/api/data/${selectedYear}`;
      }
    }

    const response = await fetch(url);
    const data = await response.json();
    dataProcessed = prepareDataForD3(data);

    CreateTable(data);
    renderGraph(dataProcessed);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchIncomeByMonthAndYear(month, year) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/income/${month}/${year}`
    );
    const data = await response.json();

    updateIncomeWidget(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchExpenseByMonthAndYear(month, year) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/expense/${month}/${year}`
    );
    const data = await response.json();

    updateExpenseWidget(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
