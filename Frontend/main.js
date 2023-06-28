let dataProcessed;

async function fetchData(month, year) {
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
