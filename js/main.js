 function showChartWeek(week) {
        var es = $.map(week, function(e, i) {
            return { data: e, label: " " }
        });
        var plot = $.plot("#flot0", [{data:week[0],bars:{show: true, barWidth:1 }},{data:week[1],color:'#111',points:{show:true},bars:{show: true, barWidth:0.0001 },yaxis:2}], {
            hoverable: true,
            shadowSize: 0,
            crosshair: {
                mode: "x"
            },
            grid: {
                clickable:true,
                hoverable: true,
                autoHighlight: false
            },
            xaxis: {
                min: 0,
                max: 7,
                label: "Time (1 day)"
            },
            yaxes: [{
                label: "Power (W)"
            } ,{label:"Power (W)",position:'right'}]
        });

        var legends = $("#flot0 .legendLabel");

        legends.each(function () {
            // fix the widths so they don't jump around
            $(this).css('width', $(this).width());
        });

        var updateLegendTimeout = null;
        var latestPosition = null;

        $("#flot0").mouseleave(function() {
            $("#flot0 .legend").hide();
        });

        $("#flot0").mouseenter(function() {
            $("#flot0 .legend").show();
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

        $("#flot0").bind("plothover",  function (event, pos, item) {
            latestPosition = pos;
            if (!updateLegendTimeout) {
                updateLegendTimeout = setTimeout(updateLegend, 50);
            }
        });

    $("#flot0").bind("plotclick", function (event, pos, item) {
        
        if (item) {
            //getDetailsDay(item.dataindex);
            getday(getId(),60*60*24*item.dataIndex,showChartDay);
            plot.highlight(item.series, item.datapoint);
        }
    });

    }


    function showChartDay(day) {

        elementsDay = day;

        var es = $.map(elementsDay, function(e, i) {
            return { data: e, label: " " }
        });

        var plot = $.plot("#flot", [{data:day[0],bars:{show: true, barWidth:1 }},{data:day[1],color:'#111',points:{show:true},bars:{show: true, barWidth:0.0001 },yaxis:2}], {
            hoverable: true,
            shadowSize: 0,
            crosshair: {
                mode: "x"
            },
            grid: {
                clickable:true,
                hoverable: true,
                autoHighlight: false
            },
            xaxis: {
                min: 0,
                max: 96,
                label: "Time (15 min)"
            },
            yaxes: [{
                label: "Power (W)"
            } ,{label:"Power (W)",position:'right'}],
            series:{ bars:{show: true, barWidth:1 }}, 
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

        $("#flot").bind("plotclick", function (event, pos, item) {
        
          if (item) {
             getquarter(getId(),60*15*item.dataindex,showChart);
             plot.highlight(item.series, item.datapoint);
          }
        });

      }

      function getId() {
        var prof = $('#pList')[0].selectedOptions[0].value
        return prof.match(/^\d+/)[0]
      }

      function simule() {
        getweek(getId(),0,showChartWeek);
      }

    function showChart(elements) {
        arg2 = 3600

        var es = $.map(elements[0], function(e, i) {
            return { data: e, label: " " }
        });

        var plot = $.plot("#flot2", es, {
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
                max: arg2,
                label: "Time (s)"
            },
            yaxis: {
                label: "Power (W)"
            },
             series: {
                lines: { show: true, fill: true }
            }
        });

        var legends = $("#flot2 .legendLabel");

        legends.each(function () {
            // fix the widths so they don't jump around
            $(this).css('width', $(this).width());
        });

        var updateLegendTimeout = null;
        var latestPosition = null;

        $("#flot2").mouseleave(function() {
            $("#flot2 .legend").hide();
        });

        $("#flot2").mouseenter(function() {
            $("#flot2 .legend").show();
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
        

        $("#flot2").bind("plothover",  function (event, pos, item) {
            latestPosition = pos;
            if (!updateLegendTimeout) {
                updateLegendTimeout = setTimeout(updateLegend, 50);
            }
        });
    }

    $("#fetchBtn").click(function() {
        getRandomProfiles(Math.min($("#n").val(), 10));
    });

    $("#getFridge").click(function() {
        getFridge($("#upto").val(), $("#times").val());
    });
