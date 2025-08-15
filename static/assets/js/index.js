
function project(){
	//paexchart
	setTimeout(() => {

		

		var options1 = {
			series: [
				{
					name:"مقدار استفاده شده",
					data: [40, 35, 78, 50, 75, 48, 62, 47, 80, 56, 40, 50]
				},
				{
					name: "کل بودجه",
					data: [45, 30, 65, 35, 50, 70, 38, 60, 36, 65, 32, 45]
				},
			],
		chart: {
			height: 330,
			type: 'area',
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
			curve:'smooth',
			dashArray: [0, 0],
		},
		legend: {
			show: true,
			position: 'top',
			horizontalAlign: 'center',
			fontWeight: 600,
			tooltipHoverFormatter: function(val, opts) {
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
		document.getElementById('project-budget').innerHTML = ''; 
		var chart1 = new ApexCharts(document.querySelector("#project-budget"), options1);
		chart1.render();
	}, 300);
	
	}
	
/* Chartjs (#chartDonut) */
function chart() {
	'use strict';
	var options = {
		series: [{
		data: [448, 470, 540, 580, 690, 1100, 1200]
	  }],
		chart: {
		type: 'bar',
		height: 345,
	  },
	  plotOptions: {
		bar: {
		  borderRadius: 1,
		  horizontal: true,
		}
	  },
	  colors:[myVarVal],
	  dataLabels: {
		enabled: false
	  },
	  xaxis: {
		categories: ['اذربایجان شرقی','اذربایجان غربی','تهران','مرکزی','مشهد','لرستان','اورمیه'
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
	  grid: {
		  borderColor: 'rgba(119, 119, 142, 0.1)',
	  }
	  };

	  var chart = new ApexCharts(document.querySelector("#chart-1"), options);
	  chart.render();
	
};


	