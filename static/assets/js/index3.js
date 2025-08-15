function growthcompany() {
    setTimeout(() => {
        var options1 = {
            series: [
                {
                    name: 'استفاده شده',
                    data: [40, 35, 78, 50, 75, 48, 62, 47, 80, 56, 40, 50]
                },
                {
                    name: "کل بودجه",
                    data: [45, 30, 65, 35, 50, 70, 38, 60, 36, 65, 32, 45]
                },
            ],
            chart: {
                height: 330,
                type: 'line',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false,
                },
                dropShadow: {
                    enabled: false,
                    enabledOnSeries: undefined,
                    top: 5,
                    left: 0,
                    blur: 0,
                    color: '#000',
                    opacity: 0,
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [3, 3],
                curve: 'smooth',
                dashArray: [0, 0],
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'center',
                fontWeight: 600,
                tooltipHoverFormatter: function (val, opts) {
                    return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                },
                labels: {
                    colors: '#74767c',
                },
                markers: {
                    width: 9,
                    height: 9,
                    strokeWidth: 0,
                    radius: 12,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            markers: {
                size: [0, 0],
                hover: {
                    sizeOffset: 4
                }
            },
            colors: [myVarVal, '#fb8d34'],
            xaxis: {
                categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر',
                    'دی', 'بهمن', 'اسفند'
                ],
                axisBorder: {
                    show: true,
                    color: 'rgba(119, 119, 142, 0.05)',
                },
                axisTicks: {
                    show: true,
                    color: 'rgba(119, 119, 142, 0.05)',
                },
            },
            tooltip: {
                y: [
                    {
                        title: {
                            formatter: function (val) {
                                return val + " (تومان)"
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val + " در هر جلسه"
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val;
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: 'rgba(119, 119, 142, 0.1)',
            }
        };
        document.getElementById('growthcompany').innerHTML = '';
        var chart1 = new ApexCharts(document.querySelector("#growthcompany"), options1);
        chart1.render();
    }, 300);

};

function chartcompany() {
    'use strict';
    var options = {
        series: [{
            data: [500, 700, 418, 570, 640, 780, 990, 1100, 1200, 1380, 840, 580, 690, 1380, 840,]
        }],
        chart: {
            type: 'bar',
            height: 300,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 1,
                horizontal: false,
                colwidth: '20%'
            }
        },
        colors: [myVarVal],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            labels: {
                show: false,
            },
            categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'
            ],
            axisBorder: {
                show: true,
                color: 'rgba(119, 119, 142, 0.05)',
            },
        },
        grid: {
            borderColor: 'rgba(119, 119, 142, 0.1)',
        }
    };
    document.getElementById('chart-company').innerHTML = '';
    var chart = new ApexCharts(document.querySelector("#chart-company"), options);
    chart.render();

};


if ($('.chart-circle').length) {
    $('.chart-circle').each(function () {
        let $this = $(this);
        $this.circleProgress({
            fill: {
                color: $this.attr('data-color')
            },
            size: $this.height(),
            startAngle: -Math.PI / 4 * 2,
            emptyFill: '#f6f6f6',
            lineCap: 'round'
        });
    });
}

