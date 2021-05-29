const width = window.innerWidth;
const height = window.innerHeight;
let active = d3.select(null);

const projection = d3.geoAlbersUsa()
  .scale(1600)
  .translate([width / 2, height / 2]);
  
const path = d3.geoPath()
  .projection(projection);

const zoom = d3.zoom()
  .scaleExtent([1, 8])
  .on('zoom', zoomed);

const svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .on('click', stopped, true);

// svg.append('rect')
//   .attr('class', 'background')
//   .attr('width', width)
//   .attr('height', height)
//   .on('click', reset);

const g = svg.append('g');

// delete this line to disable free zooming
// svg
//   .call(zoom);

// let counties;
d3.json('/states', (error, us) => {
  if (error) { throw error; }
  // counties = topojson.feature(us, us.objects.counties).features;
  g.selectAll('path')
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append('path')
    .attr('d', path)
    .attr('name', (d) => d.properties.name)
    .attr('class', 'feature')
    .on('click', clicked);

  g.append('path')
    .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
    .attr('class', 'mesh')
    .attr('d', path);
});

function clicked(d) {
  console.log(d.properties.name)

  if (active.node() === this) { return reset(); }
  active.classed('active', false);
  active = d3.select(this).classed('active', true);

  const bounds = path.bounds(d);
  const dx = bounds[1][0] - bounds[0][0];
  const dy = bounds[1][1] - bounds[0][1];
  const x = (bounds[0][0] + bounds[1][0]) / 2;
  const y = (bounds[0][1] + bounds[1][1]) / 2;
  const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)));
  const translate = [width / 2 - scale * x, height / 2 - scale * y];

  svg.transition()
    .duration(750)
    .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) );
}

function reset() {
  active.classed('active', false);
  active = d3.select(null);

  svg.transition()
    .duration(750)
    .call( zoom.transform, d3.zoomIdentity );
}

function zoomed() {
  g.style('stroke-width', 1.5 / d3.event.transform.k + 'px');
  g.attr('transform', d3.event.transform);
}

// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
  if (d3.event.defaultPrevented) { d3.event.stopPropagation(); }
}