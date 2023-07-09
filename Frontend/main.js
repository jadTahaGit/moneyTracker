let dataProcessed;

async function fetchDataByMonthAndYear(month, year) {
  try {
    const svg = initializeD3();

    const response = await fetch(
      `http://localhost:3000/api/data/${month}/${year}`
    );
    const data = await response.json();
    dataProcessed = prepareDataForD3(data);

    console.log(dataProcessed);

    let xScale = scaleX(dataProcessed);
    let yScale = scaleY(dataProcessed);
    let line = constructLine(xScale, yScale);
    drawLineGraph(svg, dataProcessed, line);

    addMinMaxLabels(svg, dataProcessed, xScale, yScale);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    createXAxis(svg, xAxis, height);
    createYAxis(svg, yAxis);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchDataByYear(year) {
  try {
    const svg = initializeD3();

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

    let xScale = scaleX(dataProcessed);
    let yScale = scaleY(dataProcessed);
    let line = constructLine(xScale, yScale);
    drawLineGraph(svg, dataProcessed, line);

    addMinMaxLabels(svg, dataProcessed, xScale, yScale);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    createXAxis(svg, xAxis, height);
    createYAxis(svg, yAxis);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
