function buildMetadata() {
  d3.json("/merged_data").then(function(data) {
    
    // undefined?
    var metadata = [];    
    //schoolData.forEach(function(data){
      // var names = data.name[242];
      //   metadata.push(names);
      // var ranks = data.rank[242];
      //   metadata.push(ranks);
      // var apps = data.Apps[242];
      //   metadata.push(apps);
      // var accepts = data.Accept[242];
      //   metadata.push(accepts); 
      // var out_state_tuition = data.out_of_state_total[242];
      //   metadata.push(out_state_tuition);
      // var board_cost = data.room_and_board[242];

    data.forEach(function(data){
      var names = data.name_x;
 
        metadata.push(names);
      var ranks = data.rank;
        metadata.push(ranks);
      var apps = data.Apps;
        metadata.push(apps);
      var accepts = data.Accept;
        metadata.push(accepts); 
      var out_state_tuition = data.out_of_state_total;
        metadata.push(out_state_tuition);
      var board_cost = data.room_and_board;

        // dictionary has keys
        var dict = {
          "University": names,
          "Rank": ranks,
          "Applications Received": `$${apps}`,
          "Applications Accepted": `$${accepts}`,
          "Out-State Tuition": `$${out_state_tuition}`,
          "Room & Board Cost": `$${board_cost}`
      }
// array without keys, how can I add?
      var test = [
        names,
        ranks,
        apps,
        accepts, 
        out_state_tuition,
        board_cost
      ];

      var PANEL = d3.select("#school-metadata");
      console.log(names[242]);
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // append the Panel
      Object.entries(dict).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    })
  });
}

function buildCharts() {
  d3.json("/merged_data").then(function(schoolData) {
    var names = schoolData.map(school => school.name_x);
    var ranks = schoolData.map(school => school.rank);
    var apps = schoolData.map(school => school.Apps);
    var accepts = schoolData.map(school => school.Accept);
    var tuition = schoolData.map(school => school.out_of_state_total);
    var board_cost = schoolData.map(school => school.room_and_board);
// Rank
    // var rankData = [
    //   {
    //     y: ["Rank", "Apps Received", "Apps Accepted", "Tuition"].reverse(),
    //     x: [ranks[328], apps[328], accepts[328], tuition[328]].reverse(),
    //     text: names[328],
    //     type: "bar",
    //     orientation: "h"
    //   }
    // ];
    var rankData = [
      {
        y: ["Rank"],
        x: [ranks[328]],
        text: names[328],
        type: "bar",
        orientation: "h"
      }
    ];
    var rankLayout = {
      autosize: false,
      width: 800,
      height: 100,
      margin: {
        l: 20,
        r: 10,
        b: 10,
        t: 10,
        pad: 2
      },
      xaxis: {
        tickmode: "linear", //  If "linear", the placement of the ticks is determined by a starting position `tick0` and a tick step `dtick`
        tick0: 0.5,
        dtick: 0.5
      },
      margin: { t: 2, l: 50 }
    };

//Applications Received
    var appsData = [
      {
        y: ["Apps Received"],
        x: [apps[328]],
        
        text: names[328],
        type: "bar",
        orientation: "h"
      }
    ];

    var appsLayout = {
      autosize: false,
      width: 800,
      height: 100,
      margin: {
        l: 20,
        r: 10,
        b: 10,
        t: 10,
        pad: 2
      },
      xticks: [3000, 6000, 9000, 12000],
      margin: { t: 2, l: 50 }
    };

    //Applications Accepted
    var acceptData = [
      {
        y: ["Apps Accepted"],
        x: [accepts[328]],
        text: names[328],
        type: "bar",
        orientation: "h"
      }
    ];

    var acceptLayout = {
      autosize: false,
      width: 800,
      height: 100,
      margin: {
        l: 20,
        r: 10,
        b: 10,
        t: 10,
        pad: 2
      },
      margin: { t: 2, l: 50 }
    };

    //Tuition
    var tuitionData = [
      {
        y: ["Tuition"],
        x: [tuition[328]],
        text: names[328],
        type: "bar",
        orientation: "h"
      }
    ];

    var tuitionLayout = {
      autosize: false,
      width: 800,
      height: 100,
      margin: {
        l: 20,
        r: 10,
        b: 10,
        t: 10,
        pad: 2
      },
      margin: { t: 2, l: 50 }
    };

        //Room and Board
    var boardData = [
      {
        y: ["Room & Board"],
        x: [board_cost[328]],
        text: names[328],
        type: "bar",
        orientation: "h"
        }
    ];
    
    var boardLayout = {
        autosize: false,
        width: 800,
        height: 100,
        margin: {
          l: 20,
          r: 10,
          b: 10,
          t: 10,
          pad: 2
        },
        margin: { t: 2, l: 50 }
      };

    Plotly.newPlot("bar1", rankData, rankLayout);
    Plotly.newPlot("bar2", appsData, appsLayout);
    Plotly.newPlot("bar3", acceptData, acceptLayout);
    Plotly.newPlot("bar4", tuitionData, tuitionLayout);
    Plotly.newPlot("bar5", boardData, boardLayout);
  });
}


function init() {
  var selector = d3.select("#selDataset");

  // select option
  d3.json("/merged_data").then(function(data) {
    var names = data.map(data => data.name_x);
    names.forEach((school) => {
      selector
        .append("option")
        .text(school)
        .property("value", school);
    });

    // first school
    var firstSchool = names[242];
    buildCharts(firstSchool);
    buildMetadata(firstSchool);
  });
}

function optionChanged(newSchool) {
  // fetch new data for new school
  buildCharts(newSchool);
  buildMetadata(newSchool);
}

init();










































/* 

(function() {
  d3.csv("datasets/merged_data.csv").then(function(schoolData) {
      
    console.log(data);
    schoolData.forEach(function(data){
        names = data.name_x;
        rank = data.rank;
        apps = data.Apps;
        accepts = data.Accept;
        in_state_tuition = data.in_state_total;
        out_state_tuition = data.out_state_total;
        
    })
    d3.bullet = function() {
      var orient = "left", // TODO top & bottom
          reverse = false,
          duration = 0,
          ranges = rank,
          markers = bulletMarkers,
          measures = bulletMeasures,
          width = 380,
          height = 30,
          tickFormat = null;

      // For each small multiple…
      function bullet(g) {
        g.each(function(d, i) {
          console.log(d)
          console.log(i)
          console.log(this)
          console.log(ranges);
          console.log(ranges.call)
          console.log(ranges.call(this,d,i))
          console.log(markers);
          console.log(markers.call)
          console.log(markers.call(this,d,i))
          console.log(measures);
          console.log(measures.call)
          console.log(measures.call(this,d,i))

          var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
              markerz = markers.call(this, d, i).slice().sort(d3.descending),
              measurez = measures.call(this, d, i).slice().sort(d3.descending),
              g = d3.select(this);
    
          // Compute the new x-scale.
          var x1 = d3.scale.linear()
              .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])
              .range(reverse ? [width, 0] : [0, width]);
    
          // Retrieve the old x-scale, if this is an update.
          var x0 = this.__chart__ || d3.scale.linear()
              .domain([0, Infinity])
              .range(x1.range());
    
          // Stash the new scale.
          this.__chart__ = x1;
    
          // Derive width-scales from the x-scales.
          var w0 = bulletWidth(x0),
              w1 = bulletWidth(x1);
    
          // Update the range rects.
          var range = g.selectAll("rect.range")
              .data(rangez);
    
          range.enter().append("rect")
              .attr("class", function(d, i) { return "range s" + i; })
              .attr("width", w0)
              .attr("height", height)
              .attr("x", reverse ? x0 : 0)
            .transition()
              .duration(duration)
              .attr("width", w1)
              .attr("x", reverse ? x1 : 0);
    
          range.transition()
              .duration(duration)
              .attr("x", reverse ? x1 : 0)
              .attr("width", w1)
              .attr("height", height);
    
          // Update the measure rects.
          var measure = g.selectAll("rect.measure")
              .data(measurez);
    
          measure.enter().append("rect")
              .attr("class", function(d, i) { return "measure s" + i; })
              .attr("width", w0)
              .attr("height", height / 3)
              .attr("x", reverse ? x0 : 0)
              .attr("y", height / 3)
            .transition()
              .duration(duration)
              .attr("width", w1)
              .attr("x", reverse ? x1 : 0);
    
          measure.transition()
              .duration(duration)
              .attr("width", w1)
              .attr("height", height / 3)
              .attr("x", reverse ? x1 : 0)
              .attr("y", height / 3);
    
          // Update the marker lines.
          var marker = g.selectAll("line.marker")
              .data(markerz);
    
          marker.enter().append("line")
              .attr("class", "marker")
              .attr("x1", x0)
              .attr("x2", x0)
              .attr("y1", height / 6)
              .attr("y2", height * 5 / 6)
            .transition()
              .duration(duration)
              .attr("x1", x1)
              .attr("x2", x1);
    
          marker.transition()
              .duration(duration)
              .attr("x1", x1)
              .attr("x2", x1)
              .attr("y1", height / 6)
              .attr("y2", height * 5 / 6);
    
          // Compute the tick format.
          var format = tickFormat || x1.tickFormat(8);
    
          // Update the tick groups.
          var tick = g.selectAll("g.tick")
              .data(x1.ticks(8), function(d) {
                return this.textContent || format(d);
              });
    
          // Initialize the ticks with the old scale, x0.
          var tickEnter = tick.enter().append("g")
              .attr("class", "tick")
              .attr("transform", bulletTranslate(x0))
              .style("opacity", 1e-6);
    
          tickEnter.append("line")
              .attr("y1", height)
              .attr("y2", height * 7 / 6);
    
          tickEnter.append("text")
              .attr("text-anchor", "middle")
              .attr("dy", "1em")
              .attr("y", height * 7 / 6)
              .text(format);
    
          // Transition the entering ticks to the new scale, x1.
          tickEnter.transition()
              .duration(duration)
              .attr("transform", bulletTranslate(x1))
              .style("opacity", 1);
    
          // Transition the updating ticks to the new scale, x1.
          var tickUpdate = tick.transition()
              .duration(duration)
              .attr("transform", bulletTranslate(x1))
              .style("opacity", 1);
    
          tickUpdate.select("line")
              .attr("y1", height)
              .attr("y2", height * 7 / 6);
    
          tickUpdate.select("text")
              .attr("y", height * 7 / 6);
    
          // Transition the exiting ticks to the new scale, x1.
          tick.exit().transition()
              .duration(duration)
              .attr("transform", bulletTranslate(x1))
              .style("opacity", 1e-6)
              .remove();
        });
        d3.timer.flush();
      }
    
      // left, right, top, bottom
      bullet.orient = function(x) {
        if (!arguments.length) return orient;
        orient = x;
        reverse = orient == "right" || orient == "bottom";
        return bullet;
      };
    
      // ranges (bad, satisfactory, good)
      bullet.ranges = function(x) {
        if (!arguments.length) return ranges;
        ranges = x;
        return bullet;
      };
    
      // markers (previous, goal)
      bullet.markers = function(x) {
        if (!arguments.length) return markers;
        markers = x;
        return bullet;
      };
    
      // measures (actual, forecast)
      bullet.measures = function(x) {
        if (!arguments.length) return measures;
        measures = x;
        return bullet;
      };
    
      bullet.width = function(x) {
        if (!arguments.length) return width;
        width = x;
        return bullet;
      };
    
      bullet.height = function(x) {
        if (!arguments.length) return height;
        height = x;
        return bullet;
      };
    
      bullet.tickFormat = function(x) {
        if (!arguments.length) return tickFormat;
        tickFormat = x;
        return bullet;
      };
    
      bullet.duration = function(x) {
        if (!arguments.length) return duration;
        duration = x;
        return bullet;
      };
    
      return bullet;
    };
    
    function bulletRanges(d) {
      return d.ranges;
    }
    
    function bulletMarkers(d) {
      return d.markers;
    }
    
    function bulletMeasures(d) {
      return d.measures;
    }
    
    function bulletTranslate(x) {
      return function(d) {
        return "translate(" + x(d) + ",0)";
      }
    };
    
    function bulletWidth(x) {
      var x0 = x(0);
      return function(d) {
        return Math.abs(x(d) - x0);
      }
    };
})();



/* 
d3.select("#selDataset").on("change", nameInput);

function nameInput() {
    d3.csv("datasets/merged_data.csv").then(function(data){
        var names = data.name_x;
        var menu = d3.selectAll("#selDataset");
        for (i = 0; i < names.length; i++) {
            menu.append("option").text(names[i]).property("value", names[i]);
        };
        const firstUni = names[0];
        buildPlot(firstUni);
    })
};
nameInput();

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.csv("datasets/merged_data.csv").then(function(data){
    var schoolNames = data.names_x;

    schoolNames.forEach((school) => {
      selector
        .append("option")
        .text(school)
        .property("value", school);
    });

    // Use the first sample from the list to build the initial plots
    var firstSchool = schoolNames[0];
    buildCharts(firstSchool);
    buildMetadata(firstSchool);
  });
}

function optionChanged(newSchool) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSchool);
  buildMetadata(newSchool);
}

// Initialize the dashboard
init();
 */