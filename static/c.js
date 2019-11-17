// upon loading page, run this
window.onload = function () {
    /**
    * Get the current time
    */
    function getNow() {
        var now = new Date();

        return {
            hours: now.getHours() + now.getMinutes() / 60,
            minutes: now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600,
            seconds: now.getSeconds() * 12 / 60
        };
    }

    /**
     * Tick numbers
    */
    function pad(number, length) {
        // Create an array of the remaining length + 1 and join it with 0's
        return new Array((length || 2) + 1 - String(number).length).join(0) + number;
    }

    /**
     * Easing function from https://github.com/danro/easing-js/blob/master/easing.js
     */
    Math.easeOutBounce = function (pos) {
        if ((pos) < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        }
        if (pos < (2 / 2.75)) {
            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
        }
        if (pos < (2.5 / 2.75)) {
            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
        }
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
    };

    // variable to store the current time
    var now = getNow();

    // Create the chart
    Highcharts.chart('container', {
        tooltip: {
            enabled: false
        },

        chart: {
            type: 'gauge',
            plotBackgroundColor: "white",
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '80%'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        pane: {
            background: [{

            }, {
                // reflex for supported browsers
                backgroundColor: Highcharts.svg ? {
                    radialGradient: {
                        cx: 0.5,
                        cy: -0.4,
                        r: 1.9
                    },
                    stops: [
                        [1, 'rgba(255, 255, 255, 1)'],
                        [1, 'rgba(255, 255, 255, 1)']
                    ]
                } : null
            }]
        },

        yAxis: {
            labels: {
                distance: -20
            },
            min: 0,
            max: 12,
            lineWidth: 0,
            showFirstLabel: false,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 5,
            minorTickPosition: 'inside',
            minorGridLineWidth: 0,
            minorTickColor: '#666',

            tickInterval: 1,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',

        },

        series: [{
            data: [{
                id: 'hour',
                y: now.hours,
                dial: {
                    radius: '60%',
                    baseWidth: 4,
                    baseLength: '95%',
                    rearLength: 0
                }
            }, {
                id: 'minute',
                y: now.minutes,
                dial: {
                    baseLength: '95%',
                    rearLength: 0
                }
            }, {
                id: 'second',
                y: now.seconds,
                dial: {
                    radius: '100%',
                    baseWidth: 1,
                    rearLength: -1
                }
            }],
            animation: false,
            dataLabels: {
                enabled: false
            }
        }]
    },

        // Move
        function (chart) {
            setInterval(function () {

                now = getNow();

                if (chart.axes) { // not destroyed
                    var hour = chart.get('hour'),
                        minute = chart.get('minute'),
                        second = chart.get('second'),
                        // run animation unless we're wrapping around from 59 to 0
                        animation = now.seconds === 0 ?
                            false : {
                                easing: 'easeOutBounce'
                            };

            /* hour.update(now.hours, true, animation) */;
                    minute.update(now.minutes, true, animation);
                    second.update(now.seconds, true, animation);
                }
            }, 1000);
        });
};


var prev = 0;
var events = [
];

var addEvent = function (name, start, end, first) {
    if (first) {
        console.log("first time");
        var blank = { name: '', y: (end / 12) * 100, color: 'white' };
        var event = { name: name, y: (end - start) / 12 * 100 };
        events.push(blank);
        events.push(event);
        console.log(events);
    } else {
        var blank = { name: '', y: (end - prev) / 12 * 100, color: 'white' };
        var event = { name: name, y: (end - start) / 12 * 100 };
        prev = end;
        events.push(blank);
        events.push(event);
    }

    Highcharts.chart('container2', {
        chart: {
            height: 270,
            width: 270,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: ' + events[0][1] + " - " + events[0][2]
        },
        plotOptions: {
            pie: {
                size: 240,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: false,
                backgroundColor: 'transparent'
            }
        },
        series: [{
            name: 'Event',
            colorByPoint: true,
            data: events
        }],
        credits: {
            enabled: false
        }
    });
};


