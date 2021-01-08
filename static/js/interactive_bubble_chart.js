let svgHeight = 500;
let svgWidth = 1000;

let margin = {
    top: 20,
    right: 40,
    bottom: 120,
    left: 150
};

let width = svgWidth - margin.right - margin.left;
let height = svgHeight - margin.top - margin.bottom;

let svg = d3
    .select("#bubble_chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//appending x axis
let xAxis = chartGroup.append("g")
    .attr("transform", `translate(0,${height})`);

//appending y axis
let yAxis = chartGroup.append("g");

let chartData = null;

//setting initial parameters for x axis
let chosenYAxis = "early_career_pay";
let chosenXAxis = "out_of_state_tuition"

//function to update yscale-variable upon user axis-label-click
function yScale(data, chosenYAxis) {
    //creating scales
    let yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenYAxis]),
        d3.max(data, d => d[chosenYAxis])
        ])
        .range([height,0]);
    return yLinearScale;
}

//function to update the xscale variable upon user axis-label-click
function xScale(data, chosenXAxis) {
    let xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d =>d[chosenXAxis]),
        d3.max(data, d => d[chosenXAxis])
        ])
        .range([0,width]);
    return xLinearScale;
}

//functions used to update yAxis-variable and x-axis-variable upon user-axis-click 
function renderAxes(newYScale, yAxis) {
    let leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}

function renderXAxes(newXScale, xAxis) {
    let bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis;
}

//function to update circle group with new data points
function  renderCircles(data, newYScale, chosenYAxis, newXScale, chosenXAxis) {
    
    const circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        
    const newCircles = circlesGroup.enter()
        .append("circle")
        .merge(circlesGroup)
        .attr("r", 8)
        .classed("university-circle", true)
        .attr("cy", d => newYScale(d[chosenYAxis]))
        .attr("cx", d => newXScale(d[chosenXAxis]));

    circlesGroup.exit().remove();

    updatetoolTip(chosenYAxis, newCircles);

}

//function to update circles group with new tooltip
function updatetoolTip(chosenYAxis, circlesGroup) {
    var label;

    if (chosenYAxis === "early_career_pay") {
        label = "Early Career Pay";
    }
    else if (chosenYAxis === "Acceptance_Rate")
        label = "Acceptance Rate";
    else {
        label = "Graduation Rate";
    }

    let toolTip = d3.tip()
        .attr("class","d3-tip")
        .offset([-30,-60])
        .html(function(d) {
            return `<strong>${d.name_x}</strong>
            <br>${label}: ${d[chosenYAxis]}
            <br>Yearly Tuition: ${d.out_of_state_tuition}`;
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(d) {
        toolTip.show(d, this);
    })
        .on("mouseout", function(d) {
            toolTip.hide(d);
        });

    return circlesGroup;
}

function renderNewChart(){

    yLinearScale = yScale(chartData, chosenYAxis);
    renderAxes(yLinearScale, yAxis);

    xLinearScale = xScale(chartData, chosenXAxis);
    renderXAxes(xLinearScale, xAxis);

    renderCircles(chartData, yLinearScale, chosenYAxis, xLinearScale, chosenXAxis);

}

//reading in the csv data
d3.csv("./datasets/merged_data.csv").then(function(data, err) {
    if (err) throw err;

    // show all data by default
    chartData = data;

    //changing all required strings to int
    data.forEach(function(data) {
        data.out_of_state_tuition = +data.out_of_state_tuition;
        data.early_career_pay = +data.early_career_pay;
        data.Grad_Rate = +data.Grad_Rate;
        data.Acceptance_Rate = +data.Acceptance_Rate
    });

    renderNewChart();

    //create group for the two y-axis labels, center the text and push it away from the y axis
    let labelsGroup = chartGroup.append("g")
        .classed("aText", true);

    //create two y-axis labels for selecting your dataset (pay, graduation rate)
    let payLabel = labelsGroup.append("text")
        .attr("value", "early_career_pay")
        .attr("transform", `translate(-90, ${height/2}) rotate(-90)`)
        .classed("active", true)
        .text("Early Career Pay")

    let gradRateLabel = labelsGroup.append("text")
        .attr("value", "Grad_Rate")
        .attr("transform", `translate(-70,${height/2}) rotate(-90)`)
        .classed("inactive", true)
        .text("Graduation Rate")
        
    let acceptanceLabel = labelsGroup.append("text")
        .attr("value", "Acceptance_Rate")
        .attr("transform", `translate(-50, ${height/2}) rotate(-90)`)
        .classed("inactive", true)
        .text("Acceptance Rate")
        
    //append the x axis text
    chartGroup.append("text")
        .attr("transform", `translate(${width/2}, ${height+40})`)
        .classed("aText", true)
        .text("Yearly Out of State Tuition")
    
    //event listener for the X axis
    d3.select("#select-bubble-dataset")
        .on("change", function() {
            let dropdownValue = d3.select(this).node().value;

            console.log(dropdownValue);

            if (dropdownValue === "under-25k"){
                chartData = data.filter(d => d.out_of_state_tuition <= 25000)
            }
            else if (dropdownValue === "25k-40k") {
                chartData = data.filter(d => d.out_of_state_tuition >= 25000 && d.out_of_state_tuition <= 40000)
            }
            else if (dropdownValue === "40k-50k") {
                chartData = data.filter(d => d.out_of_state_tuition >= 40000 && d.out_of_state_tuition <= 50000)
            }
            //else dropdownValue = +50k
            else if (dropdownValue === "50k+") {
                chartData = data.filter(d => d.out_of_state_tuition >= 50000)
            }
            else {
                chartData = data;
            }

            renderNewChart(chartData);
        });

    //creating an event listener for the yaxis
    labelsGroup.selectAll("text")
        .on("click", function() {
           
            let selectionValue = d3.select(this).attr("value");
            
            if (selectionValue !== chosenYAxis) {
                chosenYAxis = selectionValue;

                renderNewChart()
                
                if(chosenYAxis === "early_career_pay") {
                    payLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    gradRateLabel
                        .classed("inactive", true)
                        .classed("active", false);
                    acceptanceLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenYAxis === "Acceptance_Rate") {
                    gradRateLabel
                        .classed("inactive", true)
                        .classed("active", false);
                    payLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    acceptanceLabel
                        .classed("active", true)
                        .classed("inactive", false);
                }
                else {
                    payLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    gradRateLabel
                        .classed("inactive", false)
                        .classed("active", true);
                    acceptanceLabel
                        .classed("active", false)
                        .classed("inactive", true);
                };
            };
        });
}).catch(function(error) {
    console.log(error);
});

