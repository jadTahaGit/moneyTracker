function shortenMonthName(data) {
  return data.map((item) => {
    var date = new Date(item.Month + ' 1, 1970'); // Arbitrary year, only month is important
    var shortMonth = date.toLocaleString('default', { month: 'short' });
    return {
      ...item,
      Month: shortMonth,
    };
  });
}

function formatAmount(data) {
  return data.map((item) => {
    var formattedAmount = parseFloat(item.Amount.toFixed(2));
    return {
      ...item,
      Amount: formattedAmount,
    };
  });
}

function updateIncomeWidget(sum) {
  const sumElement = document.getElementById('totalIncome');
  sumElement.textContent = sum;
}

function updateExpenseWidget(sum) {
  const sumElement = document.getElementById('totalExpense');
  sumElement.textContent = sum;
}

function renderGraph(data) {
  var svg = d3.select('svg'),
    margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom;

  var x = d3
    .scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.2) // Set inner padding
    .paddingOuter(1); // Set outer padding

  y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  x.domain(
    data.map(function (d) {
      return d.Month;
    })
  );
  y.domain([
    0,
    d3.max(data, function (d) {
      return -d.Amount;
    }),
  ]);

  g.append('g').call((g) =>
    g
      .selectAll('text')
      .data(y.ticks())
      .join('text')
      .attr('transform', (d) => `translate(0,${y(-d)})`)
      .attr('dy', '0.32em')
      .attr('x', -6)
      .attr('text-anchor', 'end')
      .text(y.tickFormat())
  );

  g.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) {
      return x(d.Month);
    })
    .attr('y', function (d) {
      return y(-d.Amount);
    })
    .attr('width', x.bandwidth())
    .attr('height', function (d) {
      return height - y(-d.Amount);
    });

  // Add labels
  g.selectAll('.label')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', function (d) {
      return x(d.Month) + x.bandwidth() / 2;
    })
    .attr('y', function (d) {
      return y(-d.Amount) - 5;
    })
    .attr('text-anchor', 'middle')
    .text(function (d) {
      return -d.Amount;
    });

  x.domain(
    data.map(function (d) {
      return d.Month;
    })
  );
  y.domain([
    0,
    d3.max(data, function (d) {
      return -d.Amount;
    }),
  ]);

  // Add the X Axis
  g.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

  // Add the Y Axis
  g.append('g').call(d3.axisLeft(y));
}

function createTable(data) {
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
    const url1 = `http://localhost:3000/api/data/${month}/${year}`;
    const url2 = `http://localhost:3000/api/data-monthlyBased/${year}`;

    const [tableDataResponse, lineGraphDataResponse] = await Promise.all([
      fetch(url1),
      fetch(url2),
    ]);

    const tableData = await tableDataResponse.json();
    const lineGraphData = await lineGraphDataResponse.json();
    createTable(tableData);
    renderGraph(formatAmount(shortenMonthName(lineGraphData)));
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

    CreateTable(data);
    renderGraph(data);
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
