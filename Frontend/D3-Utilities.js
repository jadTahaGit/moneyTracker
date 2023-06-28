const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const lineGraphWidth = 800 - margin.left - margin.right;
const lineGraphHeight = 400 - margin.top - margin.bottom;

const initializeD3 = () => {
  const svg = d3
    .select('#line-graph')
    .append('svg')
    .attr('width', lineGraphWidth + margin.left + margin.right)
    .attr('height', lineGraphHeight + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  return svg;
};

const scaleX = (dataProcessed) => {
  const xScale = d3
    .scaleLinear()
    .domain([1, dataProcessed.length])
    .range([0, lineGraphWidth]);
  return xScale;
};

const scaleY = (dataProcessed) => {
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataProcessed, (d) => d.amount)])
    .range([lineGraphHeight, 0]);

  return yScale;
};

const constructLine = (xScale, yScale) => {
  let line = d3
    .line()
    .x((d) => xScale(d.day))
    .y((d) => yScale(d.amount));

  return line;
};

const addAllLabels = (svg, dataProcessed, xScale, yScale) => {
  svg
    .selectAll('.label')
    .data(dataProcessed)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', (d) => xScale(d.day))
    .attr('y', (d) => yScale(d.amount) - 10)
    .text((d) => d.amount)
    .attr('text-anchor', 'middle');
};

const addMinMaxLabels = (svg, dataProcessed, xScale, yScale) => {
  var maxAmount = d3.max(dataProcessed, (d) => d.amount);
  var minAmount = d3.min(dataProcessed, (d) => d.amount);

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
};

const drawLineGraph = (svg, dataProcessed, line) => {
  svg
    .append('path')
    .datum(dataProcessed)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-lineGraphWidth', 2)
    .attr('d', line);
};

const createXAxis = (svg, xAxis, lineGraphHeight) => {
  svg
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + lineGraphHeight + ')')
    .call(xAxis);
};

const createYAxis = (svg, yAxis) => {
  svg.append('g').attr('class', 'y-axis').call(yAxis);
};

const resetGraph = () => {
  // Clear the SVG container
  d3.select('#line-graph').html('');
};
