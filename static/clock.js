window.onload = function () {
	var clockGroup, fields, formatMinute, formatSecond, height, offSetX, offSetY, pi, render, scaleSecsMins, vis, width;

	var radius = 80;
	var tickLength = 10;
	var fromClock = 9;
	var toClock = 6;
	var circleDegree = 360;

	function degToRad(degrees) {
		return degrees * Math.PI / 180;
	}

	function clockToRad(clock, direction) {
		var unit = circleDegree / 12;
		var degree = direction > 0 ? unit * clock : unit * clock - circleDegree;
		return degToRad(degree);
	}

	function getCoordFromCircle(deg, cx, cy, r) {
		var rad = degToRad(deg);
		var x = cx + r * Math.cos(rad);
		var y = cy + r * Math.sin(rad);
		return [x, y];
	}

	function splitDegrees(num) {
		var angle = circleDegree / num;
		var degrees = [];

		for (var ang = 0; ang < circleDegree; ang += angle) {
			degrees.push(ang);
		}

		return degrees;
	}


	formatSecond = d3.time.format("%S");

	formatMinute = d3.time.format("%M");

	fields = function () {
		var d, data, minute, second;
		d = new Date();
		second = d.getSeconds();
		minute = d.getMinutes();
		return data = [{
			"unit": "seconds",
			"text": formatSecond(d),
			"numeric": second
		}, {
			"unit": "minutes",
			"text": formatMinute(d),
			"numeric": minute
		}];
	};

	width = 400;

	height = 200;

	offSetX = 100;

	offSetY = 100;

	pi = Math.PI;

	scaleSecsMins = d3.scale.linear()
		.domain([0, 59 + 59 / 60])
		.range([0, 2 * pi]);

	vis = d3.selectAll(".chart")
		.append("svg:svg")
		.attr("width", width)
		.attr("height", height);

	clockGroup = vis.append("svg:g")
		.attr("transform", "translate(" + offSetX + "," + offSetY + ")");

	var arc = d3.svg.arc()
		.innerRadius(0)
		.outerRadius(radius)
		.startAngle(clockToRad(fromClock, -1))
		.endAngle(clockToRad(toClock, 1));

	clockGroup.append('path')
		.attr('d', arc)
		.style('fill', 'white');

	clockGroup.append("svg:circle")
		.attr("r", radius)
		.attr("fill", "none")
		.attr("class", "clock outercircle")
		.attr("stroke", "black")
		.attr("stroke-width", 2);


	clockGroup.append('g')
		.attr('class', 'ticks')
		.selectAll('path')
		.data(splitDegrees(12))
		.enter()
		.append('path')
		.attr('d', function (d) {
			var coord = {
				outer: getCoordFromCircle(d, 0, 0, radius),
				inner: getCoordFromCircle(d, 0, 0, radius - tickLength)
			};
			return 'M' + coord.outer[0] + ' ' + coord.outer[1] + 'L' + coord.inner[0] + ' ' + coord.inner[1] + 'Z';
		})
		.attr('stroke', 'black');



	clockGroup.append("svg:circle")
		.attr("r", 4)
		.attr("fill", "black")
		.attr("class", "clock innercircle");



	render = function (data) {
		var minuteArc, secondArc;
		clockGroup.selectAll(".clockhand").remove();
		secondArc = d3.svg.arc()
			.innerRadius(0)
			.outerRadius(70)
			.startAngle(function (d) {
				return scaleSecsMins(d.numeric);
			}).endAngle(function (d) {
				return scaleSecsMins(d.numeric);
			});

		minuteArc = d3.svg.arc()
			.innerRadius(0)
			.outerRadius(70)
			.startAngle(function (d) {
				return scaleSecsMins(d.numeric);
			})
			.endAngle(function (d) {
				return scaleSecsMins(d.numeric);
			});

		clockGroup.selectAll(".clockhand")
			.data(data)
			.enter()
			.append("svg:path")
			.attr("d", function (d) {
				if (d.unit === "seconds") {
					return secondArc(d);
				} else if (d.unit === "minutes") {
					return minuteArc(d);
				}
			})
			.attr("class", "clockhand")
			.attr("stroke", "black")
			.attr("stroke-width", function (d) {
				if (d.unit === "seconds") {
					return 2;
				} else if (d.unit === "minutes") {
					return 3;
				}
			})
			.attr("fill", "none");
	};

	setInterval(function () {
		var data;
		data = fields();
		return render(data);
	}, 1000);
}