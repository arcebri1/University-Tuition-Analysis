let svgHeight = 500;
let svgWidth = 1000;

let margin = {
    top: 20,
    right: 40,
    bottom: 120,
    left: 100
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

//setting initial parameters for x axis
let chosenYAxis = "early_career_pay";

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

//function used to update yAxis-variable upon user-axis-click 
function renderAxes(newYScale, yAxis) {
    let leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}

//function to update circle group with a transition to new circles
function renderCircles(circlesGroup, newYScale, chosenYAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
}

//function to update circles group with new tooltip
function updatetoolTip(chosenYAxis, circlesGroup) {
    var label;

    if (chosenYAxis === "early_career_pay") {
        label = "Early Career Pay";
    }
    else {
        label = "Graduation Rate";
    }

    let toolTip = d3.tip()
        .attr("class","d3-tip")
        .offset([80,-60])
        .html(function(d) {
            return `<strong>${d.name_x}</strong><br>${label}: ${d[chosenYAxis]}`;
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

//reading in the csv data
d3.csv("./datasets/merged_data.csv").then(function(data, err) {
    if (err) throw err;

    //changing all required strings to int
    data.forEach(function(data) {
        data.out_of_state_total = +data.out_of_state_total;
        data.early_career_pay = +data.early_career_pay;
        data.Grad_Rate = +data.Grad_Rate;
    });

    //set the yLinearScale using the function above
    //inital parameter set to "early career pay" through chosenYAxis variable
    let yLinearScale = yScale(data, chosenYAxis);


    let xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d=> d.out_of_state_total)*.8,
            d3.max(data, d => d.out_of_state_total)*1.1])
        .range([0, width]);

    //create intial axis functions
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    //appending x axis
    let xAxis = chartGroup.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(bottomAxis);

    //appending y axis
    let yAxis = chartGroup.append("g")
        .call(leftAxis);

    //appending initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.out_of_state_total))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 8)
        .classed("university-circle", true)
    

    //create group for the two y-axis labels, center the text and push it away from the y axis
    let labelsGroup = chartGroup.append("g")
        //.attr("transform", "rotate(-90)")
        // .attr("dy", "1em")
        .classed("aText", true);

    //create two y-axis labels for selecting your dataset (pay, graduation rate)
    let payLabel = labelsGroup.append("text")
        .attr("value", "early_career_pay")
        .attr("transform", `translate(-70, ${height/2}) rotate(-90)`)
        .classed("active", true)
        .text("Early Career Pay")

    let gradRateLabel = labelsGroup.append("text")
        .attr("value", "Grad_Rate")
        .attr("transform", `translate(-50,${height/2}) rotate(-90)`)
        .classed("inactive", true)
        .text("Graduation Rate")  
        
    //append the x axis text
    chartGroup.append("text")
        .attr("transform", `translate(${width/2}, ${height+40})`)
        .classed("aText", true)
        .text("Total Out Of State Fees")

    //calling the updateToolTip function
    var circlesGroup = updatetoolTip(chosenYAxis, circlesGroup);


    //creating an event listener for the yaxis
    labelsGroup.selectAll("text")
        .on("click", function() {
            let selectionValue = d3.select(this).attr("value");
            
            if (selectionValue !== chosenYAxis) {
                chosenYAxis = selectionValue;

                yLinearScale = yScale(data, chosenYAxis);

                yAxis = renderAxes(yLinearScale, yAxis);

                circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);

                circlesGroup = updatetoolTip(chosenYAxis, circlesGroup);

                if(chosenYAxis === "early_career_pay") {
                    payLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    gradRateLabel
                        .classed("inactive", true)
                        .classed("active", false);
                }
                else {
                    payLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    gradRateLabel
                        .classed("inactive", false)
                        .classed("active", true);
                };
            };
        });  
}).catch(function(error) {
    console.log(error);
});

