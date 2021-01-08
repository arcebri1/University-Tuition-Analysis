var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chosenXAxis = d3.select("#state").node().value;
var chosenYAxis = d3.select("#career").node().value;

function xScale(Tuition_Cost, chosenXAxis) {
    // create X scale
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(Tuition_Cost, d => d[chosenXAxis]) * 0.9,
        d3.max(Tuition_Cost, d => d[chosenXAxis]) * 1.1
      ])
      .range([0, width]);
  
    return xLinearScale;
  
  }

function yScale(Tuition_Cost, chosenYAxis) {
    // create Y scale
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(Tuition_Cost, d => d[chosenYAxis]) * 0.9, 
      d3.max(Tuition_Cost, d => d[chosenYAxis]) * 1.1])  
      .range([height, 0]);  
  
    return yLinearScale;
  
  }

// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }
  
// function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

    circlesGroup.transition()
      .duration(500)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr('cy', d => newYScale(d[chosenYAxis]))
      
  
    return circlesGroup;
  }  


function renderLine(lineGroup){
  if(lineGroup.attr("y1") == 345){
    console.log(lineGroup.attr("y1"));

    lineGroup.transition()
      .duration(500)
      .attr("x1", 100)
      .attr("y1", 300)
      .attr("x2", 700)
      .attr("y2", 225)
      }
  
  else if(lineGroup.attr("y1") == 300){

    lineGroup.transition()
      .duration(500)
      .attr("x1", 100)
      .attr("y1", 345)
      .attr("x2", 700)
      .attr("y2", 225)
  }
return lineGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

    var labelX;
    var labelY;
  
    if (chosenXAxis === "in_state_tuition") {
      labelX = "In-State Tuition:";
    }
    else {
      labelX = "Out-of-State Tuition:";  
    } 
    
    
    if (chosenYAxis === "early_career_pay") {
      labelY = "Early Career Pay ($):";
    }
     
    else {
      labelY = "Mid Career Pay:";
    };
    
  
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-20, 20])
      .html(function(d) {
        return (`Name: ${d.name}</br>
                ${labelX} ${d[chosenXAxis]} </br>
                ${labelY} ${d[chosenYAxis]}`);
      });
  
    // Step 2: Create the tooltip in chartGroup.
    chartGroup.call(toolTip);
  
    // Step 3: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) {
      toolTip.show(d, this);
    })
    // Step 4: Create "mouseout" event listener to hide tooltip
      .on("mouseout", function(d) {
        toolTip.hide(d);
      });
  
  
    return circlesGroup;
  }
///

d3.csv("tuition_vs_salary.csv").then(function(Tuition_Cost) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    Tuition_Cost.forEach(function(data) {
      data.in_state_tuition = +data.in_state_tuition;
      data.out_of_state_tuition = +data.out_of_state_tuition;
      data.early_career_pay = +data.early_career_pay;
      data.mid_career_pay = +data.mid_career_pay;
      if(data.type === "Public"){
          data.color = "Blue"
      }
      else if(data.type === "Private"){
            data.color = "Blue"
      }
      else{data.color = "Blue"}
    });

      // xLinearScale function above csv import
  var xLinearScale = xScale(Tuition_Cost, chosenXAxis);

  // Create y scale function
  var yLinearScale = yScale(Tuition_Cost, chosenYAxis);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .call(leftAxis);
   
  var labelsGroup = chartGroup.append("g")
  .attr("transform", `translate(${width / 2}, ${height + 20})`);
    
  var xlabel = labelsGroup.append("text")
  .attr("x", 0)
  .attr("y", 20)
  .attr("value", "hair_length") // value to grab for event listener
  .text("Tuition Costs ($/year");

  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2) - 50)
  .attr("dy", "1em")
  .classed("axis-text", true)
  .text("Salary Potentia ($/year)");



  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(Tuition_Cost)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 5)
    .attr("fill", d=>d.color)
    .attr("opacity", 0.5)

  var lineGroup = chartGroup.selectAll("line")
    .data(Tuition_Cost)
    .enter()
    .append("line")
    .attr("x1", 100)
    .attr("y1", 345)
    .attr('x2', 700)
    .attr("y2", 225)
    .attr("stroke", "orange")
    .attr("stroke-width", 4)

    circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // x axis labels event listener
    d3.select("#state")
    .on("change", function() {
    // get value of selection
    var valueX = d3.selectAll("#state").node().value;
    
    chosenXAxis = valueX;   
        
    console.log(chosenXAxis)
    
    xLinearScale = xScale(Tuition_Cost, chosenXAxis);

    // updates x axis with transition
    xAxis = renderXAxes(xLinearScale, xAxis);

    // updates circles with new x, y values
    circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
    lineGroup = renderLine(lineGroup);

    circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
})

d3.select("#career")
    .on("change", function() {
    // get value of selection
    var valueY = d3.selectAll("#career").node().value;
    
    chosenYAxis = valueY;   
        
    console.log(chosenYAxis)
    
    yLinearScale = yScale(Tuition_Cost, chosenYAxis);

    // updates x axis with transition
    yAxis = renderYAxes(yLinearScale, yAxis);

    // updates circles with new x, y values
    circlesGroup = renderCircles(circlesGroup, xLinearScale, yLinearScale, chosenXAxis, chosenYAxis);
    
    

    circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
})

});
