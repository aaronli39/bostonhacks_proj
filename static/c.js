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

        plotOptions: {
            series: {
                marker: {
                    radius: 1
                }
            }
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
                    radius: '94%',
                    baseWidth: 6,
                    baseLength: '95%',
                    rearLength: 0
                }
            },
            {
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

                    hour.update(now.hours, true, animation);
                    // minute.update(now.minutes, true, animation);
                    second.update(now.seconds, true, animation);
                }
            }, 1000);
        });

    // Create the chart
    Highcharts.chart('container3', {
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
                    radius: '94%',
                    baseWidth: 6,
                    baseLength: '95%',
                    rearLength: 0
                }
            },
            {
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

                    hour.update(now.hours, true, animation);
                    // minute.update(now.minutes, true, animation);
                    second.update(now.seconds, true, animation);
                }
            }, 1000);
        });
};

// AFTER WINDOW.ONLOAD --------------------------------------------------------------------

var prev = 0;
var eventsAM = [];
var eventsPM = [];
var eventTimes = [];

var addEvent = function (name, start, end, am, am1, first) {
    var container = "";
    if (first) {
        var temp = start.split(":");
        start1 = parseInt(temp[0]) + (parseInt(temp[1]) / 60);
        temp = end.split(":");
        end1 = parseInt(temp[0]) + (parseInt(temp[1]) / 60);
        if (am != am1) {
            if (am && !am1) {
                var amPart = 12 - start1;
                var pmPart = end1;
                var time = [name, start + "am", end + "pm"];
                prev = end;
                eventTimes.push(time);
                console.log("DEBUGGG: " + eventTimes);

                // AM CLOCK
                var blank = { name: '', y: 100 - ((amPart / 12) * 100), color: 'white' };
                var event = { name: name, y: amPart / 12 * 100, start: start, end: end };

                eventsAM.push(blank);
                eventsAM.push(event);

                Highcharts.chart('container2', {
                    chart: {
                        height: 200,
                        width: 200,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                    },
                    plotOptions: {
                        pie: {
                            size: 180,
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
                        data: eventsAM
                    }],
                    credits: {
                        enabled: false
                    }
                });

                // PM CLOCK 
                event = { name: name, y: end1 / 12 * 100, start: start, end: end };
                blank = { name: '', y: 100 - pmPart / 12 * 100, color: 'white' };

                eventsPM.push(event);
                eventsPM.push(blank);

                Highcharts.chart('container4', {
                    chart: {
                        height: 200,
                        width: 200,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                    },
                    plotOptions: {
                        pie: {
                            size: 180,
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
                        data: eventsPM
                    }],
                    credits: {
                        enabled: false
                    }
                });
                eventTimes = [];
            } else if (!am && am1) {
                var amPart = start1;
                var pmPart = 12 - start1;
                var time = [name, start + "pm", end + "am"];
                eventTimes.push()
                console.log("DEBUGGG: " + eventTimes);
                prev = end;

                // PM CLOCK
                var blank = { name: '', y: (start1 / 12) * 100, color: 'white' };
                var event = { name: name, y: pmPart / 12 * 100, start: start, end: end };

                eventsPM.push(blank);
                eventsPM.push(event);

                Highcharts.chart('container4', {
                    chart: {
                        height: 200,
                        width: 200,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                    },
                    plotOptions: {
                        pie: {
                            size: 180,
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
                        data: eventsPM
                    }],
                    credits: {
                        enabled: false
                    }
                });

                // AM CLOCK 
                event = { name: name, y: end1 / 12 * 100, start: start, end: end };
                blank = { name: '', y: 100 - end1 / 12 * 100, color: 'white' };

                eventsAM.push(event);
                eventsAM.push(blank);

                Highcharts.chart('container2', {
                    chart: {
                        height: 200,
                        width: 200,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                    },
                    plotOptions: {
                        pie: {
                            size: 180,
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
                        data: eventsAM
                    }],
                    credits: {
                        enabled: false
                    }
                });
                eventTimes = [];
            }
        } else if (am && am1) {
            var temp = start.split(":");
            start1 = parseInt(temp[0]) + (parseInt(temp[1]) / 60);
            temp = end.split(":");
            end1 = parseInt(temp[0]) + (parseInt(temp[1]) / 60);
            console.log("DEBUG: " + start1 + " " + end1);
            var blank = { name: '', y: (start1 / 12) * 100, color: 'white' };
            var event = { name: name, y: (end1 - start1) / 12 * 100, start: start, end: end };
            var time = [name, start + "am", end + "am"];
            eventTimes.push(time);
            eventsAM.push(blank);
            eventsAM.push(event);
            blank = { name: name, y: 100 - ((end1 - start1) / 12 * 100) - (start1 / 12 * 100), color: 'white' };
            eventsAM.push(blank);

            Highcharts.chart('container2', {
                chart: {
                    height: 200,
                    width: 200,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                },
                plotOptions: {
                    pie: {
                        size: 180,
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
                    data: eventsAM
                }],
                credits: {
                    enabled: false
                }
            });

            eventsAM = [];
        } else {
            var temp = start.split(":");
            start1 = parseInt(temp[0]) + (parseInt(temp[1]) / 60);
            temp = end.split(":");
            end1 = parseInt(temp[0]) + (parseInt(temp[1]) / 60);

            var blank = { name: '', y: (start1 / 12) * 100, color: 'white' };
            var event = { name: name, y: (end1 - start1) / 12 * 100, start: start, end: end };
            var time = [name, start + "pm", end + "pm"];

            eventTimes.push(time);
            eventsPM.push(blank);
            eventsPM.push(event);
            blank = { name: name, y: 100 - ((end1 - start1) / 12 * 100) - (start1 / 12 * 100), color: 'white' };
            eventsPM.push(blank);
            Highcharts.chart('container4', {
                chart: {
                    height: 200,
                    width: 200,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                },
                plotOptions: {
                    pie: {
                        size: 180,
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
                    data: eventsPM
                }],
                credits: {
                    enabled: false
                }
            });

            eventsPM = [];
        }
    } else {
        console.log("not first");

        if (am != am1) {
            if (am && !am1) {
                var amPart = 12 - start1;
                var pmPart = end1;
                var time = [name, start + "am", end + "pm"];
                prev = end;
                eventTimes.push(time);
                console.log("DEBUGGG: " + eventTimes);

                // AM CLOCK
                var blank = { name: '', y: (start1 - prev) / 12 * 100, color: 'white' };
                var event = { name: name, y: amPart / 12 * 100, start: start, end: end };

                eventsAM.push(blank);
                eventsAM.push(event);

                Highcharts.chart('container2', {
                    chart: {
                        height: 200,
                        width: 200,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                    },
                    plotOptions: {
                        pie: {
                            size: 180,
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
                        data: eventsAM
                    }],
                    credits: {
                        enabled: false
                    }
                });

                // PM CLOCK 
                event = { name: name, y: end1 / 12 * 100, start: start, end: end };
                blank = { name: '', y: 100 - pmPart / 12 * 100, color: 'white' };

                eventsPM.push(event);
                eventsPM.push(blank);

                Highcharts.chart('container4', {
                    chart: {
                        height: 200,
                        width: 200,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                    },
                    plotOptions: {
                        pie: {
                            size: 180,
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
                        data: eventsPM
                    }],
                    credits: {
                        enabled: false
                    }
                });
                eventTimes = [];
                prev = end1;
            } else if (!am && am1) {
                var amPart = start1;
                var pmPart = 12 - start1;
                var time = [name, start + "pm", end + "am"];
                eventTimes.push()
                console.log("DEBUGGG: " + eventTimes);
                prev = end;

                // PM CLOCK
                var blank = { name: '', y: (start1 - prev) / 12 * 100, color: 'white' };
                var event = { name: name, y: pmPart / 12 * 100, start: start, end: end };

                eventsPM.push(blank);
                eventsPM.push(event);

                Highcharts.chart('container4', {
                    chart: {
                        height: 200,
                        width: 200,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                    },
                    plotOptions: {
                        pie: {
                            size: 180,
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
                        data: eventsPM
                    }],
                    credits: {
                        enabled: false
                    }
                });

                // AM CLOCK 
                event = { name: name, y: end1 / 12 * 100, start: start, end: end };
                blank = { name: '', y: 100 - end1 / 12 * 100, color: 'white' };

                eventsAM.push(event);
                eventsAM.push(blank);

                Highcharts.chart('container2', {
                    chart: {
                        height: 200,
                        width: 200,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: ''
                    },
                    tooltip: {
                        pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                    },
                    plotOptions: {
                        pie: {
                            size: 180,
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
                        data: eventsAM
                    }],
                    credits: {
                        enabled: false
                    }
                });
                eventTimes = [];
                prev = end1;
            }
        } else if (am && am1) {
            var temp = start.split(":");
            start1 = parseInt(temp[0]) + (parseInt(temp[1]) / 60);
            temp = end.split(":");
            end1 = parseInt(temp[0]) + (parseInt(temp[1]) / 60);
            console.log("DEBUG: " + start1 + " " + end1);
            var blank = { name: '', y: (start1 - prev) / 12 * 100, color: 'white' };
            var event = { name: name, y: (end1 - start1) / 12 * 100, start: start, end: end };
            var time = [name, start + "am", end + "am"];
            eventTimes.push(time);
            eventsAM.push(blank);
            eventsAM.push(event);
            blank = { name: name, y: 100 - ((end1 - start1) / 12 * 100) - (start1 / 12 * 100), color: 'white' };
            eventsAM.push(blank);

            Highcharts.chart('container2', {
                chart: {
                    height: 200,
                    width: 200,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                },
                plotOptions: {
                    pie: {
                        size: 180,
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
                    data: eventsAM
                }],
                credits: {
                    enabled: false
                }
            });

            eventsAM = [];
            prev = end1;
        } else {
            var temp = start.split(":");
            start1 = parseInt(temp[0]) + (parseInt(temp[1]) / 60);
            temp = end.split(":");
            end1 = parseInt(temp[0]) + (parseInt(temp[1]) / 60);

            var blank = { name: '', y: (start1 - prev) / 12 * 100, color: 'white' };
            var event = { name: name, y: (end1 - start1) / 12 * 100, start: start, end: end };
            var time = [name, start + "pm", end + "pm"];

            eventTimes.push(time);
            eventsPM.push(blank);
            eventsPM.push(event);
            blank = { name: name, y: 100 - ((end1 - start1) / 12 * 100) - (start1 / 12 * 100), color: 'white' };
            eventsPM.push(blank);
            Highcharts.chart('container4', {
                chart: {
                    height: 200,
                    width: 200,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: ' + eventTimes[0][1] + " - " + eventTimes[0][2]
                },
                plotOptions: {
                    pie: {
                        size: 180,
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
                    data: eventsPM
                }],
                credits: {
                    enabled: false
                }
            });

            eventsPM = [];
            prev = end1;
        }
    };
}

