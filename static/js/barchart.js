// console.log("Testing")


d3.csv("/datasets/merged_data.csv").then(function (schoolData) {

    let inStateTuition = 'in_state_tuition';

    let privates = [], publics = []

    schoolData.forEach(row => {
        // console.log(row)
        if (row.type === 'Private') {
            privates.push({ x: row.type, y: row[inStateTuition] })
        }
        else if (row.type === 'Public') {
            publics.push({ x: row.type, y: row[inStateTuition] })
        }


    });

    // console.log([privates, publics])

    let privateSum = privates.length
    console.log(privateSum)

    let publicSum = publics.length
    console.log(publicSum)

    let totalData = schoolData.length
    console.log(totalData)

    //IN & OUT STATE AVG TUITION FOR PRIVATE AND PUBLIC

    function selectPrivate(school) {
        return school.type === 'Private'
    }

    // console.log(selectPrivate)

    let privateSchools = schoolData.filter(selectPrivate)
    console.log(privateSchools)

    let privateTuition = privateSchools.map(d => d.in_state_tuition)
    console.log(privateTuition)

    let outStatePrivateTuition = privateSchools.map(d => d.out_of_state_tuition)
    console.log(outStatePrivateTuition)

    let totalOutStatePrivateTuitions = privateSchools.map(d => d.out_of_state_total)
    console.log(totalOutStatePrivateTuitions)

    //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    let totalPrivateTuition = privateTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    console.log(totalPrivateTuition)

    let totalOutStatePrivateTuition = outStatePrivateTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    console.log(totalOutStatePrivateTuition)

    let totalOutStatePrivTuition = totalOutStatePrivateTuitions.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    console.log(totalOutStatePrivTuition)

    function selectPublic(school) {
        return school.type === 'Public'
    }
    let publicSchools = schoolData.filter(selectPublic)
    console.log(publicSchools)

    let publicTuition = publicSchools.map(d => d.in_state_tuition)
    console.log(publicTuition)

    let outStatePublicTuition = publicSchools.map(d => d.out_of_state_tuition)
    console.log(outStatePublicTuition)

    let totalOutStatePublicTuition = publicSchools.map(d => d.out_of_state_tuition)
    console.log(totalOutStatePublicTuition)

    //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    let totalPublicTuition = publicTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    console.log(totalPublicTuition)

    let sumOutStatePublicTuition = outStatePublicTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    console.log(sumOutStatePublicTuition)

    let totalSumOutStatePublicTuition = totalOutStatePublicTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    console.log(totalSumOutStatePublicTuition)

    let avgPrivateTuition = Math.round(totalPrivateTuition / totalData)
    console.log(avgPrivateTuition)

    let avgPublicTuition = Math.round(totalPublicTuition / totalData)
    console.log(avgPublicTuition)

    let outStateAvgPrivateTuition = Math.round(totalOutStatePrivateTuition / totalData)
    console.log(outStateAvgPrivateTuition)

    // let totalOutStateAvgPrivateTuition = Math.round(totalOutStatePrivTuition / totalData)
    // console.log(totalOutStateAvgPrivateTuition)

    let outStateAvgPublicTuition = Math.round(sumOutStatePublicTuition / totalData)
    console.log(outStateAvgPublicTuition)

    // let totalOutStateAvgPublicTuition = Math.round(totalSumOutStatePublicTuition / totalData)
    // console.log(totalOutStateAvgPublicTuition)
    


    //chart.js

    var ctx = document.getElementById('myChart').getContext('2d');
    var chartjs = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Private & Public'],
            datasets: [{
                label: 'Private',
                // type: 'bar',
                backgroundColor: '#00008B',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'green',
                data: [privateSum, totalData],
                order: 1
            },
            {
                label: 'Public',
                // type: 'bar',
                backgroundColor: '#B8860B',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'red',
                data: [publicSum],
                order: 2
            },
            ]
        },


        // Configuration options go here
        options: {
            tooltips: {
                mode: 'index',
            },
            title: {
                display: true,
                text: 'Number of Public & Private Schools',
                fontSize: 15
            },
            legend: {
                position: 'right',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    bottom: 0,
                    top: 0
                }
            },

        }
    });

    var ctx = document.getElementById('myChart2').getContext('2d');
    var chartjs = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['In-State', 'Out-State'],
            datasets: [{
                label: 'Private',
                // type: 'bar',
                backgroundColor: '#00FFFF',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'green',
                data: [avgPrivateTuition, outStateAvgPrivateTuition],
                order: 1
            },
            {
                label: 'Public',
                // type: 'bar',
                backgroundColor: '#7FFFD4',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'red',
                data: [avgPublicTuition, outStateAvgPublicTuition],
                order: 3
            },
            
            ]
        },


        // Configuration options go here
        options: {
            tooltips: {
                mode: 'index',
            },
            title: {
                display: true,
                text: 'Avg Cost of In-State & Out-State Tuition for Public & Private Schools',
                fontSize: 15
            },
            legend: {
                position: 'right',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    bottom: 0,
                    top: 0
                }
            },

        }
    });



    let totalPriTuition = privateSchools.map(d => d.in_state_total)
    console.log(totalPriTuition)

    //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    let totalCoursePrivateTuition = totalPriTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    console.log(totalCoursePrivateTuition)

    let totalPubTuition = publicSchools.map(d => d.in_state_total)
    console.log(totalPubTuition)

    //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    let totalCoursePublicTuition = totalPubTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    console.log(totalCoursePublicTuition)

    let totalAvgPrivateTuition = Math.round(totalCoursePrivateTuition / totalData)
    console.log(totalAvgPrivateTuition)

    let totalAvgPublicTuition = Math.round(totalCoursePublicTuition / totalData)
    console.log(totalAvgPublicTuition)


    // var ctx = document.getElementById('myChart3').getContext('2d');
    // var chartjs = new Chart(ctx, {
    //     // The type of chart we want to create
    //     type: 'bar',

    //     // The data for our dataset
    //     data: {
    //         labels: ['In-State', 'Out-State'],
    //         datasets: [{
    //             label: 'Private',
    //             // type: 'bar',
    //             backgroundColor: '#2F4F4F',
    //             borderColor: 'black',
    //             borderWidth: 1,
    //             hoverBackgroundColor: 'green',
    //             data: [totalAvgPrivateTuition, totalOutStateAvgPrivateTuition],
    //             order: 1
    //         },
    //         {
    //             label: 'Public',
    //             // type: 'bar',
    //             backgroundColor: '#E9967A',
    //             borderColor: 'black',
    //             borderWidth: 1,
    //             hoverBackgroundColor: 'red',
    //             data: [totalAvgPublicTuition, totalOutStateAvgPublicTuition],
    //             order: 2
    //         },
    //         ]
    //     },


    //     // Configuration options go here
    //     options: {
    //         tooltips: {
    //             mode: 'index',
    //         },
    //         title: {
    //             display: true,
    //             text: 'Avg Total Cost of In-State & Out-State Tuition for Public & Private Schools',
    //             fontSize: 15
    //         },
    //         legend: {
    //             position: 'right',
    //             labels: {
    //                 fontColor: '#000'
    //             }
    //         },
    //         layout: {
    //             padding: {
    //                 left: 10,
    //                 right: 10,
    //                 bottom: 0,
    //                 top: 0
    //             }
    //         },

    //     }
    // });

    function select2Yr(school) {
        return school.degree_length === '2 Year'
    }

    // console.log(select2Yr)

        let twoYrSchools = schoolData.filter(select2Yr)
        console.log(twoYrSchools)

        let twoYrTuition = twoYrSchools.map(d => d.in_state_tuition)
        console.log(twoYrTuition)

        let totalTwoYrColleges = twoYrTuition.length
        console.log(totalTwoYrColleges)
    
        let totalTwoYrTuition = parseInt(twoYrTuition)

        console.log(totalTwoYrTuition)

        function select4Yr(school) {
            return school.degree_length === '4 Year'
        }

        //  console.log(select4Yr)

        let fourYrSchools = schoolData.filter(select4Yr)
        console.log(fourYrSchools)

        let fourYrTuition = fourYrSchools.map(d => d.in_state_tuition)
        console.log(fourYrTuition)

        let totalFourYrColleges = fourYrTuition.length
        console.log(totalFourYrColleges)

    //     //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
        let totalFourYrTuition = fourYrTuition.reduce(
            function (t, s) {
                return parseInt(t) + parseInt(s);
            }
        );

        console.log(totalFourYrTuition)

        let avg2YrTuition = Math.round(totalTwoYrTuition / totalData)
        console.log(avg2YrTuition)

        let avg4YrTuition = Math.round(totalFourYrTuition / totalData)
        console.log(avg4YrTuition)



        // var ctx = document.getElementById('myChart4').getContext('2d');
        // var chartjs = new Chart(ctx, {
        //     // The type of chart we want to create
        //     type: 'bar',
    
        //     // The data for our dataset
        //     data: {
        //         labels: ['4 Year & 2 Year'],
        //         datasets: [{
        //             label: '4 Year',
        //             // type: 'bar',
        //             backgroundColor: '#4B0082',
        //             borderColor: 'black',
        //             borderWidth: 1,
        //             hoverBackgroundColor: 'green',
        //             data: [totalFourYrColleges],
        //             order: 1
        //         },
        //         {
        //             label: '2 Year',
        //             // type: 'bar',
        //             backgroundColor: '#F0E68C',
        //             borderColor: 'black',
        //             borderWidth: 1,
        //             hoverBackgroundColor: 'red',
        //             data: [totalTwoYrColleges],
        //             order: 2
        //         },
        //         ]
        //     },
    
    
        //     // Configuration options go here
        //     options: {
        //         tooltips: {
        //             mode: 'index',
        //         },
        //         title: {
        //             display: true,
        //             text: 'Number of 4 Year & 2 Year Schools',
        //             fontSize: 15
        //         },
        //         legend: {
        //             position: 'right',
        //             labels: {
        //                 fontColor: '#000'
        //             }
        //         },
        //         layout: {
        //             padding: {
        //                 left: 10,
        //                 right: 10,
        //                 bottom: 0,
        //                 top: 0
        //             }
        //         },
    
        //     }
        // });

        // var ctx = document.getElementById('myChart5').getContext('2d');
        // var chartjs = new Chart(ctx, {
        //     // The type of chart we want to create
        //     type: 'bar',
    
        //     // The data for our dataset
        //     data: {
        //         labels: ['4 Year & 2 Year'],
        //         datasets: [{
        //             label: '4 Year',
        //             // type: 'bar',
        //             backgroundColor: '#800000',
        //             borderColor: 'black',
        //             borderWidth: 1,
        //             hoverBackgroundColor: 'green',
        //             data: [avg4YrTuition],
        //             order: 1
        //         },
        //         {
        //             label: '2 Year',
        //             // type: 'bar',
        //             backgroundColor: '#66CDAA',
        //             borderColor: 'black',
        //             borderWidth: 1,
        //             hoverBackgroundColor: 'red',
        //             data: [avg2YrTuition],
        //             order: 2
        //         },
        //         ]
        //     },
    
    
        //     // Configuration options go here
        //     options: {
        //         tooltips: {
        //             mode: 'index',
        //         },
        //         title: {
        //             display: true,
        //             text: 'Avg Cost of In-State Tuition for 4 Year & 2 Year Schools',
        //             fontSize: 15
        //         },
        //         legend: {
        //             position: 'right',
        //             labels: {
        //                 fontColor: '#000'
        //             }
        //         },
        //         layout: {
        //             padding: {
        //                 left: 10,
        //                 right: 10,
        //                 bottom: 0,
        //                 top: 0
        //             }
        //         },
    
        //     }
        // });

        let total2YrTuition = twoYrSchools.map(d => d.in_state_total)
        console.log(total2YrTuition)

        let totalCost2YrTuition = parseInt(total2YrTuition)
        console.log(totalCost2YrTuition)

        let totalAvg2YrTuition = Math.round(totalCost2YrTuition / totalData)
        console.log(totalAvg2YrTuition)

        let total4YrTuition = fourYrSchools.map(d => d.in_state_total)
        console.log(total4YrTuition)

    //     //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
        let totalCostFourYrTuition = total4YrTuition.reduce(
            function (t, s) {
                return parseInt(t) + parseInt(s);
            }
        );
        console.log(totalCostFourYrTuition)

        let totalAvg4YrTuition = Math.round(totalCostFourYrTuition / totalData)
        console.log(totalAvg4YrTuition)

        // var ctx = document.getElementById('myChart6').getContext('2d');
        // var chartjs = new Chart(ctx, {
        //     // The type of chart we want to create
        //     type: 'bar',
    
        //     // The data for our dataset
        //     data: {
        //         labels: ['4 Year & 2 Year'],
        //         datasets: [{
        //             label: '4 Year',
        //             // type: 'bar',
        //             backgroundColor: '#FF4500',
        //             borderColor: 'black',
        //             borderWidth: 1,
        //             hoverBackgroundColor: 'green',
        //             data: [totalAvg4YrTuition, 45500],
        //             order: 1
        //         },
        //         {
        //             label: '2 Year',
        //             // type: 'bar',
        //             backgroundColor: '#6B8E23',
        //             borderColor: 'black',
        //             borderWidth: 1,
        //             hoverBackgroundColor: 'red',
        //             data: [totalAvg2YrTuition],
        //             order: 2
        //         },
        //         ]
        //     },
    
    
        //     // Configuration options go here
        //     options: {
        //         tooltips: {
        //             mode: 'index',
        //         },
        //         title: {
        //             display: true,
        //             text: 'Avg Total Cost of In-State Tuition for 4 Year & 2 Year Schools',
        //             fontSize: 15
        //         },
        //         legend: {
        //             position: 'right',
        //             labels: {
        //                 fontColor: '#000'
        //             }
        //         },
        //         layout: {
        //             padding: {
        //                 left: 10,
        //                 right: 10,
        //                 bottom: 0,
        //                 top: 0
        //             }
        //         },
    
        //     }
        // });





})