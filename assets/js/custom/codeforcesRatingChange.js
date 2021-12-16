const ratings= [
    {
        cutOff: 0,
        name: 'newbie',
        color: '#cccccc'
    },
    {
        cutOff: 1200,
        name: 'pupil',
        color: '#0e6a37'
    },
    {
        cutOff: 1400,
        name: 'specialist',
        color: '#23a9b0'
    },
    {
        cutOff: 1600,
        name: 'expert',
        color: '#1000e6'
    },
    {
        cutOff: 1900,
        name: 'candidate master',
        color: '#7a2380'
    },
    {
        cutOff: 2100,
        name: 'master',
        color: '#fcbe56'
    },
    {
        cutOff: 2300,
        name: 'international master',
        color: '#fcbe56'
    },
    {
        cutOff: 2400,
        name: 'grandmaster',
        color: '#e50d12'
    },
    {
        cutOff: 2600,
        name: 'international grandmaster',
        color: '#e50d12'
    },
    {
        cutOff: 3000,
        name: 'legendary grandmaster',
        color: '#e50d12'
    }
];

const dateTimes= [];
const contestNames= [];
const newRatings= [];
const ranks= [];
let chartData= [];
let currentRating, currentRatingName, currentRatingColor;

// fetch contest data and draw chart
fetch("https://codeforces.com/api/user.rating?handle=jooncco")
    .then(res => res.json())
    .then(res => {
        const roundResults= res['result'];

        // process data
        roundResults.forEach(result => {
            const dateTime= new Date(result['ratingUpdateTimeSeconds']*1000);
            dateTimes.push(dateTime.toISOString());

            contestNames.push(result['contestName']);
            newRatings.push(result['newRating']);
            ranks.push(result['rank']);

            currentRating= result['newRating'];
        });

        ratings.forEach(rating => {
            if (currentRating >= rating.cutOff)  {
                currentRatingName = rating.name;
                currentRatingColor = rating.color;
            }
        });

        chartData= {
            labels: dateTimes,
            datasets: [
                {
                    label: ' New rating',
                    borderWidth: 2.5,
                    borderColor: '#f5a742',
                    pointBackgroundColor: '#dddddd',
                    lineTension: 0,
                    fill: false,
                    data: newRatings,
                    contestNames: contestNames,
                    ranks: ranks
                }
            ]
        };

        // prepare chart
        const chartOption= {
            legend: {
                display: false
            },
            title: {
                text: 'no response from codeforces.com',
                fontColor: ratings[0].color,
                fontSize: 20,
                fontWeight: 'bold',
                position: 'top',
                display: true
            },
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        min: 800,
                        max: 2500,
                        stepSize: 100
                    },
                    gridLines: {
                        display: true,
                        color: 'rgba(255,99,132,0.1)'
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'month',
                        unitStepSize: '3',
                        tooltipFormat: '🗓 YYYY-MM-DD hh:mm ddd'
                    },
                    gridLines: {
                        display: true,
                        color: 'rgba(255,99,132,0.1)'
                    }
                }]
            },
            annotation: {
                annotations: [
                    {
                        type: 'box',
                        drawTime: 'beforeDatasetsDraw',
                        id: 'newbie-area',
                        yScaleID: 'y-axis-0',
                        yMin: 0,
                        yMax: 1200,
                        backgroundColor: 'rgba(204,204,204,0.8)'
                    },
                    {
                        type: 'box',
                        drawTime: 'beforeDatasetsDraw',
                        id: 'pupil-area',
                        yScaleID: 'y-axis-0',
                        yMin: 1200,
                        yMax: 1400,
                        backgroundColor: 'rgba(119,255,119,0.8)'
                    },
                    {
                        type: 'box',
                        drawTime: 'beforeDatasetsDraw',
                        id: 'specialist-area',
                        yScaleID: 'y-axis-0',
                        yMin: 1400,
                        yMax: 1600,
                        backgroundColor: 'rgba(120,221,187,0.8)'
                    },
                    {
                        type: 'box',
                        drawTime: 'beforeDatasetsDraw',
                        id: 'expert-area',
                        yScaleID: 'y-axis-0',
                        yMin: 1600,
                        yMax: 1900,
                        backgroundColor: 'rgba(176,167,255,0.8)'
                    },
                    {
                        type: 'box',
                        drawTime: 'beforeDatasetsDraw',
                        id: 'candidate-master-area',
                        yScaleID: 'y-axis-0',
                        yMin: 1900,
                        yMax: 2100,
                        backgroundColor: 'rgba(254,136,255,0.8)'
                    },
                    {
                        type: 'box',
                        drawTime: 'beforeDatasetsDraw',
                        id: 'master-area',
                        yScaleID: 'y-axis-0',
                        yMin: 2100,
                        yMax: 2300,
                        backgroundColor: 'rgba(254,204,135,0.8)'
                    },
                    {
                        type: 'box',
                        drawTime: 'beforeDatasetsDraw',
                        id: 'international-master-area',
                        yScaleID: 'y-axis-0',
                        yMin: 2300,
                        yMax: 2400,
                        backgroundColor: 'rgba(252,190,86,0.8)'
                    },
                    {
                        type: 'box',
                        drawTime: 'beforeDatasetsDraw',
                        id: 'grandmaster-area',
                        yScaleID: 'y-axis-0',
                        yMin: 2400,
                        yMax: 2600,
                        backgroundColor: 'rgba(255,119,115,0.8)'
                    },
                    {
                        type: 'box',
                        drawTime: 'beforeDatasetsDraw',
                        id: 'international-grandmaster-area',
                        yScaleID: 'y-axis-0',
                        yMin: 2600,
                        yMax: 3000,
                        backgroundColor: 'rgba(255,51,52,0.8)'
                    },
                    {
                        type: 'box',
                        drawTime: 'beforeDatasetsDraw',
                        id: 'legendary-grandmaster-area',
                        yScaleID: 'y-axis-0',
                        yMin: 3000,
                        yMax: 4000,
                        backgroundColor: 'rgba(170,0,0,0.8)'
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    footer: (tooltipItem, data) => data.datasets[0]?.contestNames[tooltipItem[0]?.index] || ''
                }
            }
        };

        // render chart
        chartOption['title']['text']= currentRatingName+' jooncco';
        chartOption['title']['fontColor']= currentRatingColor;
        const canvas= document.getElementById('codeforcesRatingChangeChart');
        const rederedChart= new Chart(canvas, {
            type: 'line',
            data: chartData,
            options: chartOption
        });

        // write my rating
        document.getElementById('myRating').textContent= currentRating;
        document.getElementById('myRatingName').textContent= currentRatingName;
    })
    .catch(err => {
        console.error("[GET] user.rating: ", err);
        document.getElementById('myRatingName').textContent= '(failed to fetch from codeforces)';
    });