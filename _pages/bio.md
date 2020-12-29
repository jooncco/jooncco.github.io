---
permalink: /bio/
title: "JunHa Jeong (jooncco)"
excerpt: "About developer jooncco."
layouts_gallery:
  - url: /assets/images/bio_pic_1.jpg
    image_path: /assets/images/bio_pic_1.jpg
    alt: "bio #1"
  - url: 
    image_path:
    alt: 
last_modified_at: 2020-12-18T17:36:00+09:00
toc: true
toc_sticky: true
share: false
---

{% include gallery id="layouts_gallery" %}

> | 1992. 02. | Created                                                            |
> | 2004.     | Took 3rd place in student president election (out of 4)            |
> | 2011. 03. | Bio Medical Engineering B.E. @Yonsei, Wonju                        |
> | 2014. 11. | SGT JEONG ETS @Camp Humphreys, US ARMY Hooah                       |
> | 2016. 03. | Computer Science B.S. @Yonsei, Seoul                               |
> | 2017. 02. | The most geeky, passionate Intern @LG CNS                          |
> | 2017. 12. | First prize: thesis project "EYEAR" @Yonsei, Seoul                 |
> | 2019. 01. | Enterprise Application Development Associate @LG CNS               |

## Languages

🎹 <cite> Java8, c++11, c, python, javascript, postgre SQL </cite><br>
💬 <cite> Korean, English </cite>

## Engineering Experience
* Spring 5 (webflux)
* Spring boot 2
* AWS (EC2, S3, RDS, DocumentDB, CodeCommit, Sumerian)
* React 16
* Angular 5
* PostgreSQL
* MongoDB

## Competitive Programming

> ### _Codeforces_

<canvas id='chartCanvas' height= '300'></canvas>
* Current Rating: <span id='myRating' style='font-weight:bold;font-style:italic;'>- </span>,
                  <span id='myRatingName' style='font-weight:bold;font-style:italic;'> - </span>
* Profile Link: [🔗](http://codeforces.com/profile/jooncco)

> ### _Baekjoon Online Judge_

* Solved: 1245 problems
* Profile Link: [🔗](https://www.acmicpc.net/user/jooncco)

## Project / Study

<cite>"Smart order service OKIMOKI (2020)"</cite>
:    #Spring5 #Spring-Boot2 #webflux #java8 #JPA #AWS #EC2 #CodeCommit #RDS #S3 #MSA #React #smart-order #LGCNS

<cite>"File I/O cloud migration (2019)"</cite>
:    #AWS #EC2 #S3 #java #File-I/O #LGCNS

<cite>"Event monitor dashboard (2019)"</cite>
:    #Angular5 #typescript #javascript #Spring-boot2 #java #JPA #postgre #LGCNS

<cite>"User guide for Robot Service Platform (2019)"</cite>
:    #Angular5 #typescript #tooltip #LGCNS

<cite>"Daily workout community page design (2018)"</cite> [[link]](https://github.com/jooncco/VISOP_pages)
:    #JSP #Servlet #Oracle #SQL #bootstrap4 #html5 #css3 #jQuery #chart.js #canvas.js

<cite>"Simple cache simulator (2018)"</cite> [[link]](https://github.com/jooncco/Cache_simul)
:    #c #simulation

<cite>"Answering is-A question in Korean" (2017)</cite> [[link]](https://github.com/jooncco/NLP_is-A)
:    #NLP #natural-language-processing #word-embedding #fastText #CSI4108

<cite>"Coindrop game online AI agent" (2017)</cite> [[link]](https://github.com/jooncco/Q-learning_coindrop)
:    #reinforcement-learning #Q-learning #AI #python #CSI4108

<cite>"Bitcoin price prediction using ML" (2017)</cite> [[link]](https://github.com/jooncco/Bitcoin_price/blob/master/.ipynb_checkpoints/source-checkpoint.ipynb)
:    #deep-learning #LSTM-RNN #regression-models #keras #CSI4117

<cite>"Assembly programming" (2016)</cite>
:    #MIPS #gem5 #simulator #ubuntu #CSI3102

<cite>"Digital calculator with assembly code" (2016)</cite>
:    #assembly-language #urvine32 #MASM #CSI2107

<cite>"Hand grab detection module" (2015)</cite>
:    #firmware #ATmega128 #7-segment #strain-gauge #UART/USART #MBE3015




<!--------------------------------------------- scripts -->
<script type='text/javascript'>

    const ratingNames= [
        'newbie',
        'pupil',
        'specialist',
        'expert',
        'candidate master',
        'master',
        'international master',
        'grandmaster',
        'international grandmaster',
        'legendary grandmaster'
    ];
    const ratingColor= [
        'rgb(204,204,204)',
        'rgb(14, 106, 55)',
        'rgb(35,169,176)',
        'rgb(16,0,230)',
        'rgb(122,35,128)',
        'rgb(252,190,86)',
        'rgb(252,190,86)',
        'rgb(229,13,18)',
        'rgb(229,13,18)',
        'rgb(229,13,18)'
    ];
    const cutOffs= [0, 1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000];

    var chartData= [];
    var dateTimes= [];
    var contestNames= [];
    var ratingData= [];
    var ratingChangeData= [];
    var rankData= [];
    var currentRating;
    var currentRatingColor;
    var currentRatingName;

    // fetch contest data
    fetch("https://codeforces.com/api/user.rating?handle=jooncco")
        .then(res => res.json())
        .then(res => {
            const ratingsData= res['result'];

            // process data
            for (let i= 0; i < ratingsData.length; ++i) {
                let part= ratingsData[i];
                let dateTime= new Date(part['ratingUpdateTimeSeconds']*1000);

                dateTimes.push(dateTime.toISOString());
                contestNames.push(part['contestName']);
                ratingData.push(part['newRating']);
                ratingChangeData.push(part['newRating']-part['oldRating']);
                rankData.push(part['rank']);

                if (i == ratingData.length-1) {
                    currentRating= part['newRating'];
                }
            }
            chartData= {
                labels: dateTimes,
                datasets: [
                    {
                        label: ' new rating',
                        borderWidth: 2.5,
                        borderColor: '#e4a831',
                        pointBackgroundColor: '#dddddd',
                        lineTension: 0,
                        fill: false,
                        data: ratingData
                    },
                ]
            };

            for (let i= cutOffs.length-1; i >= 0; --i) {
                if (currentRating >= cutOffs[i]) {
                    currentRatingName= ratingNames[i];
                    currentRatingColor= ratingColor[i];
                    break;
                }
            }

            // draw chart
            const chartOption= {
                legend: {
                    display: false
                },
                title: {
                    text: currentRatingName+' jooncco',
                    fontColor: currentRatingColor,
                    fontSize: 20,
                    fontWeight: 'bold',
                    position: 'top',
                    display: true
                },
                scales: {
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            min: 800,
                            max: 2500
                        }
                    }],
                    xAxes: [{
                        type: 'time',
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
                            backgroundColor: 'rgba(204,204,204,0.85)'
                        },
                        {
                            type: 'box',
                            drawTime: 'beforeDatasetsDraw',
                            id: 'pupil-area',
                            yScaleID: 'y-axis-0',
                            yMin: 1200,
                            yMax: 1400,
                            backgroundColor: 'rgba(119,255,119,0.85)'
                        },
                        {
                            type: 'box',
                            drawTime: 'beforeDatasetsDraw',
                            id: 'specialist-area',
                            yScaleID: 'y-axis-0',
                            yMin: 1400,
                            yMax: 1600,
                            backgroundColor: 'rgba(120,221,187,0.85)'
                        },
                        {
                            type: 'box',
                            drawTime: 'beforeDatasetsDraw',
                            id: 'expert-area',
                            yScaleID: 'y-axis-0',
                            yMin: 1600,
                            yMax: 1900,
                            backgroundColor: 'rgba(176,167,255,0.85)'
                        },
                        {
                            type: 'box',
                            drawTime: 'beforeDatasetsDraw',
                            id: 'candidate-master-area',
                            yScaleID: 'y-axis-0',
                            yMin: 1900,
                            yMax: 2100,
                            backgroundColor: 'rgba(254,136,255,0.85)'
                        },
                        {
                            type: 'box',
                            drawTime: 'beforeDatasetsDraw',
                            id: 'master-area',
                            yScaleID: 'y-axis-0',
                            yMin: 2100,
                            yMax: 2300,
                            backgroundColor: 'rgba(254,204,135,0.85)'
                        },
                        {
                            type: 'box',
                            drawTime: 'beforeDatasetsDraw',
                            id: 'international-master-area',
                            yScaleID: 'y-axis-0',
                            yMin: 2300,
                            yMax: 2400,
                            backgroundColor: 'rgba(252,190,86,0.85)'
                        },
                        {
                            type: 'box',
                            drawTime: 'beforeDatasetsDraw',
                            id: 'grandmaster-area',
                            yScaleID: 'y-axis-0',
                            yMin: 2400,
                            yMax: 2600,
                            backgroundColor: 'rgba(255,119,115,0.85)'
                        },
                        {
                            type: 'box',
                            drawTime: 'beforeDatasetsDraw',
                            id: 'international-grandmaster-area',
                            yScaleID: 'y-axis-0',
                            yMin: 2600,
                            yMax: 3000,
                            backgroundColor: 'rgba(255,51,52,0.85)'
                        },
                        {
                            type: 'box',
                            drawTime: 'beforeDatasetsDraw',
                            id: 'legendary-grandmaster-area',
                            yScaleID: 'y-axis-0',
                            yMin: 3000,
                            yMax: 4000,
                            backgroundColor: 'rgba(170,0,0,0.85)'
                        }
                    ]
                }
            };

            // render
            const myRating= document.getElementById('myRating').textContent= currentRating;
            const myRatingName= document.getElementById('myRatingName').textContent= currentRatingName;
            const canvas= document.getElementById('chartCanvas');
            const myBarChart= new Chart(canvas, {
                type: 'line',
                data: chartData,
                options: chartOption
            });
        })
        .catch(err => console.log("[GET] user.rating", err));
</script>