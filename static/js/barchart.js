// getData()

// async function getData() {
//     const response = await fetch('datasets/mergednoindex_data.csv');
//     const data = await response.text();
//     console.log(data)

//     const table = data.split('\n').slice(1);
//     table.forEach(row => {
//         const columns = row.split(' , ');
//         // const type = columns[1];
//         // const temp = columns[1];
//         console.log(columns);
//     })
//     // console.log(rows);
// }

d3.csv("datasets/mergednoindex_data.csv").then(function (schoolData) {


    // let types = schoolData.map(function (d) {
    //     return d.type
    // })

    // console.log(types)

    // let typesPrivate = schoolData.map(function (d) {
    //     return d.type === 'Private'
    // })

    // console.log(typesPrivate)

    // let typesColor = schoolData.map(function (d) {
    //     return d.type === 'Private' ? '#F15F36' : '#19A0AA';
    // })

    // console.log(typesColor)

    // let tuition = schoolData.map(function (d) {
    //     return +d.in_state_tuition
    // })

    // console.log(tuition)

    // let schoolName = schoolData.map(function (d) {
    //     return d.name_x
    // })

    // console.log(schoolName)

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

    console.log([privates, publics])

    let privateSum = privates.length
    console.log(privateSum)

    let publicSum = publics.length
    console.log(publicSum)

    let totalData = schoolData.length
    console.log(totalData)

    function selectPrivate(school) {
        return school.type === 'Private'
    }

    // console.log(selectPrivate)

    let privateSchools = schoolData.filter(selectPrivate)
    console.log(privateSchools)

    let privateTuition = privateSchools.map(d => d.in_state_tuition)
    console.log(privateTuition)

    //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    let totalPrivateTuition = privateTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    console.log(totalPrivateTuition)

    function selectPublic(school) {
        return school.type === 'Public'
    }
    let publicSchools = schoolData.filter(selectPublic)
    console.log(publicSchools)

    let publicTuition = publicSchools.map(d => d.in_state_tuition)
    console.log(publicTuition)

    //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    let totalPublicTuition = publicTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    console.log(totalPublicTuition)

    

    // // chart options
    // const options = {
    //     chart: {
    //         height: 450,
    //         width: '100%',
    //         type: 'bar',
    //         background: '#f4f4f4',
    //         foreColor: '#333'
    //     },
    //     series: [{
    //         name: 'Tuition',
    //         data: [12500, 23654]
    //     }],
    //     xaxis: {
    //         categories: [
    //             'Private',
    //             'Public']
    //     },
    //     plotOptions: {
    //         bar: {
    //             horizontal: false
    //         }
    //     },
    //     fill: {
    //         colors: ['#f44336']
    //     },
    //     dataLabels: {
    //         enabled: false
    //     },
    //     title: {
    //         text: 'Top 300 Universities/Colleges in US',
    //         align: 'center',
    //         margin: 20,
    //         offsetY: 20,
    //         style: {
    //             fontSize: '25px'
    //         }
    //     }
    // }

    // // init chart
    // const chart = new ApexCharts(document.querySelector('#chart'), options);

    // // render chart
    // chart.render();

    // //create event method
    // document.querySelector('button').addEventListener('click', () => chart.updateOptions({
    //     plotOptions: {
    //         bar: {
    //             horizontal: true
    //         }
    //     }
    // }))

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
                backgroundColor: 'rgb(0,99,132',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'green',
                data: [privateSum, totalData],
                order: 1
            },
            {
                label: 'Public',
                // type: 'bar',
                // backgroundColor: 'rgb(2, 99, 132)',
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
            labels: ['Private & Public'],
            datasets: [{
                label: 'Private',
                // type: 'bar',
                backgroundColor: 'rgb(0,99,132',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'green',
                data: [privateSum, totalData],
                order: 1
            },
            {
                label: 'Public',
                // type: 'bar',
                // backgroundColor: 'rgb(2, 99, 132)',
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
                text: 'Avg Tuition for Public & Private Schools',
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



})