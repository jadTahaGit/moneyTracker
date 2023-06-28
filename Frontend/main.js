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
const month = 4;
const year = 2022;

let dataProcessed;

async function fetchData(month, year) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/data/${month}/${year}`
    );
    const data = await response.json();
    dataProcessed = prepareDataForD3(data);
    // console.log(dataProcessed);

    // dataProcessed = [
    //   { day: 1, amount: 20 },
    //   { day: 2, amount: 35 },
    //   { day: 3, amount: 10 },
    //   { day: 4, amount: 45 },
    //   { day: 5, amount: 30 },
    //   { day: 6, amount: 25 },
    //   { day: 7, amount: 40 },
    // ];

    console.log(dataProcessed);

    const xScale = d3
      .scaleLinear()
      .domain([1, dataProcessed.length])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataProcessed, (d) => d.amount)])
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => xScale(d.day))
      .y((d) => yScale(d.amount));

    svg
      .append('path')
      .datum(dataProcessed)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // // Add labels to the graph
    // svg
    //   .selectAll('.label')
    //   .data(dataProcessed)
    //   .enter()
    //   .append('text')
    //   .attr('class', 'label')
    //   .attr('x', (d) => xScale(d.day))
    //   .attr('y', (d) => yScale(d.amount) - 10) // Adjust the y position based on your preference
    //   .text((d) => d.amount)
    //   .attr('text-anchor', 'middle');

    // Find the maximum and minimum values
    var maxAmount = d3.max(dataProcessed, (d) => d.amount);
    var minAmount = d3.min(dataProcessed, (d) => d.amount);

    // Add labels for maximum and minimum values
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', xScale(dataProcessed[dataProcessed.length - 1].day))
      .attr('y', yScale(maxAmount) - 10)
      .text(maxAmount)
      .attr('text-anchor', 'middle');

    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', xScale(dataProcessed[0].day))
      .attr('y', yScale(minAmount) - 10)
      .text(minAmount)
      .attr('text-anchor', 'middle');

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Create x-axis
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    // Create y-axis
    svg.append('g').attr('class', 'y-axis').call(yAxis);

    // Additional code for handling the axes if needed
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData(month, year);
