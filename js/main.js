
$(function() {

	var r = Raphael("chart");

	function showChart(elements) {

		r.clear();

		var xs = $.map(elements, function(x, i) { return [$.map(x, function(y, j) { return [y[1]]; })]; });
		var ys = $.map(elements, function(x, i) { return [$.map(x, function(y, j) { return [y[0]]; })]; });

		var chart = r.linechart(50, 50, 700, 500, ys, xs, {smooth: false, symbol: 'circle', width: 1, axis: '0 0 1 1', shade: true});
		chart.hoverColumn(function () {
	        this.tags = r.set();

	        for (var i = 0, ii = this.y.length; i < ii; i++) {
	            this.tags.push(r.flag(this.x, this.y[i], this.values[i] + " W", 0, 10).insertBefore(this));
	        }
	    }, function () {
	        this.tags && this.tags.remove();
	    });

	    return chart;
	}

	function getRandomProfiles(n) {
		$.ajax({
			url: "http://localhost:8000/randomProfile?callback=?",
			data: {n: n},
			dataType: "jsonp",
			success: function(ps) {
				showChart(ps);
			},
		});
	}

	$("#fetchBtn").click(function() {
		getRandomProfiles(Math.min($("#n").val(), 30));
	})
});