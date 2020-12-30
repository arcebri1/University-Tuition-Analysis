
d3.csv("datasets/mergednoindex_data.csv").then(function (schoolData) {

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

    let avgPrivateTuition = Math.round(totalPrivateTuition / totalData)
    console.log(avgPrivateTuition)

    let avgPublicTuition = Math.round(totalPublicTuition / totalData)
    console.log(avgPublicTuition)


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
            labels: ['Private & Public'],
            datasets: [{
                label: 'Private',
                // type: 'bar',
                backgroundColor: '#00FFFF',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'green',
                data: [avgPrivateTuition],
                order: 1
            },
            {
                label: 'Public',
                // type: 'bar',
                backgroundColor: '#7FFFD4',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'red',
                data: [avgPublicTuition],
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
                text: 'Avg Cost of In-State Tuition for Public & Private Schools',
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


    var ctx = document.getElementById('myChart3').getContext('2d');
    var chartjs = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Private & Public'],
            datasets: [{
                label: 'Private',
                // type: 'bar',
                backgroundColor: '#2F4F4F',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'green',
                data: [totalAvgPrivateTuition],
                order: 1
            },
            {
                label: 'Public',
                // type: 'bar',
                backgroundColor: '#E9967A',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'red',
                data: [totalAvgPublicTuition],
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
                text: 'Avg Total Cost of In-State Tuition for Public & Private Schools',
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

    function select2Yr(school) {
        return school.degree_length === '2 Year'
    }

    // console.log(select2Yr)

        let twoYrSchools = schoolData.filter(select2Yr)
        console.log(twoYrSchools)

        let twoYrTuition = twoYrSchools.map(d => d.in_state_tuition)
        console.log(twoYrTuition)

    //     //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    //     let totalPrivateTuition = privateTuition.reduce(
    //         function (t, s) {
    //             return parseInt(t) + parseInt(s);
    //         }
    //     );

    //     console.log(totalPrivateTuition)

    //     function selectPublic(school) {
    //         return school.type === 'Public'
    //     }
    //     let publicSchools = schoolData.filter(selectPublic)
    //     console.log(publicSchools)

    //     let publicTuition = publicSchools.map(d => d.in_state_tuition)
    //     console.log(publicTuition)

    //     //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    //     let totalPublicTuition = publicTuition.reduce(
    //         function (t, s) {
    //             return parseInt(t) + parseInt(s);
    //         }
    //     );

    //     console.log(totalPublicTuition)

    //     let avgPrivateTuition = Math.round(totalPrivateTuition / totalData)
    //     console.log(avgPrivateTuition)

    //     let avgPublicTuition = Math.round(totalPublicTuition / totalData)
    //     console.log(avgPublicTuition)

})