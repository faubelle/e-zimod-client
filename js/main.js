$(function() {

    var r = Raphael("chart");

    function showChart(elements, tmax) {

        // Flot

        var es = $.map(elements, function(e, i) {
            return { data: e, label: " " }
        });

        var plot = $.plot("#flot", es, {
            hoverable: true,
            shadowSize: 0,
            crosshair: {
                mode: "x"
            },
            grid: {
                hoverable: true,
                autoHighlight: false
            },
            xaxis: {
                min: 0,
                max: tmax,
                label: "Time (s)"
            },
            yaxis: {
                label: "Power (W)"
            },
             series: {
                lines: { show: true, fill: true }
            }
        });

        var legends = $("#flot .legendLabel");

        legends.each(function () {
            // fix the widths so they don't jump around
            $(this).css('width', $(this).width());
        });

        var updateLegendTimeout = null;
        var latestPosition = null;

        $("#flot").mouseleave(function() {
            $("#flot .legend").hide();
        });

        $("#flot").mouseenter(function() {
            $("#flot .legend").show();
        });


        function updateLegend() {

            updateLegendTimeout = null;

            var pos = latestPosition;

            var axes = plot.getAxes();
            if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
                pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
                return;
            }

            var i, j, dataset = plot.getData();
            for (i = 0; i < dataset.length; ++i) {

                var series = dataset[i];

                // Find the nearest points, x-wise

                for (j = 0; j < series.data.length; ++j) {
                    if (series.data[j][0] > pos.x) {
                        break;
                    }
                }

                // Now Interpolate

                var y,
                    p1 = series.data[j - 1],
                    p2 = series.data[j];

                if (p1 == null) {
                    y = p2[1];
                } else if (p2 == null) {
                    y = p1[1];
                } else {
                    y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
                }

                legends.eq(i).text(series.label = (/.*/, "" + y.toFixed(2) + " W"));
            }
        }

        $("#flot").bind("plothover",  function (event, pos, item) {
            latestPosition = pos;
            if (!updateLegendTimeout) {
                updateLegendTimeout = setTimeout(updateLegend, 50);
            }
        });

        // GRaphael

        r.clear();

        var xs = $.map(elements, function(x, i) { return [$.map(x, function(y, j) { return [y[1]]; })]; });
        var ys = $.map(elements, function(x, i) { return [$.map(x, function(y, j) { return [y[0]]; })]; });

        var chart = r.linechart(50, 50, 500, 300, ys, xs, {
            smooth: false, 
            symbol: 'circle', 
            width: 1, 
            axis: '0 0 1 1', 
            shade: true,
            axisxstep: 60,
            axisystep: 5
        });
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

    function getFridge(n, ps) {
        $.ajax({
            url: "http://localhost:8000/fridge?callback=?",
            data: {upto: n, times: "[" + ps + "]"},
            dataType: "jsonp",
            success: function(ps) {
                showChart([ps], n);
            },
        });
    }

    function getRandomProfiles(n) {
        $.ajax({
            url: "http://localhost:8000/randomProfile?callback=?",
            data: {n: n},
            dataType: "jsonp",
            success: function(ps) {
                showChart(ps, 3600);
            },
        });
    }

    $("#fetchBtn").click(function() {
        getRandomProfiles(Math.min($("#n").val(), 10));
    });

    $("#getFridge").click(function() {
        getFridge($("#upto").val(), $("#times").val());
    });
});