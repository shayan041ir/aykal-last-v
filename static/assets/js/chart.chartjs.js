$(function() {
	'use strict'
	/*LIne-Chart */
	var ctx = document.getElementById("chartLine").getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"],
			datasets: [{
				label: 'Profits',
				data: [20, 320, 110, 350, 480, 320, 480],
				borderWidth: 2,
				backgroundColor: 'transparent',
				borderColor: '#623aa2',
				borderWidth: 3,
				pointBackgroundColor: '#ffffff',
				pointRadius: 2,
				fill: false,
				lineTension: 0.3,
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					labels: {
						fontColor: " rgba(119, 119, 142, 0.2)"
					},
				},
			},

			scales: {
				x: {
					ticks: {
						fontColor: " rgba(119, 119, 142, 0.2)",
					 },
					display: true,
					grid: {
						color: 'rgba(171, 167, 167,0.2)'
					}
				},
				y: {
					ticks: {
						fontColor: " rgba(119, 119, 142, 0.2)",
					 },
					display: true,
					grid: {
						color: 'rgba(171, 167, 167,0.2)'
					},
					scaleLabel: {
						display: false,
						labelString: 'Thousands',
						fontColor: 'rgba(171, 167, 167,0.2)'
					}
				}
			},
		}
	});

	/* Bar-Chart1 */
	var ctx = document.getElementById("chartBar1").getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
			datasets: [{
				label: 'Sales',
				data: [200, 450, 290, 367, 256, 543, 345],
				borderWidth: 2,
				backgroundColor: '#623aa2',
				borderColor: '#623aa2',
				borderWidth: 2.0,
				pointBackgroundColor: '#ffffff',

			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display: true
			},
			scales: {
				y: {
					ticks: {
						beginAtZero: true,
						stepSize: 150,
						fontColor: " rgba(119, 119, 142, 0.2)",
					},
					grid: {
						color: 'rgba(171, 167, 167,0.2)'
					}
				},
				x: {
					ticks: {
						display: true,
						fontColor: " rgba(119, 119, 142, 0.2)",
					},
					grid: {
						display: false,
						color: 'rgba(171, 167, 167,0.2)'
					}
				}
			},
			legend: {
				labels: {
					fontColor: " rgba(119, 119, 142, 0.2)"
				},
			},
		}
	});

	/* Bar-Chart2*/
	var ctx = document.getElementById("chartBar2");
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
			datasets: [{
				label: "Data1",
				data: [65, 59, 80, 81, 56, 55, 40],
				borderColor: "#623aa2",
				borderWidth: "0",
				backgroundColor: "#623aa2"
			}, {
				label: "Data2",
				data: [28, 48, 40, 19, 86, 27, 90],
				borderColor: "#53caed",
				borderWidth: "0",
				backgroundColor: "#53caed"
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					ticks: {
						fontColor: " rgba(119, 119, 142, 0.2)",
					 },
					grid: {
						color: 'rgba(171, 167, 167,0.2)'
					}
				},
				y: {
					ticks: {
						beginAtZero: true,
						fontColor: " rgba(119, 119, 142, 0.2)",
					},
					grid: {
						color: 'rgba(171, 167, 167,0.2)'
					},
				}
			},
			legend: {
				labels: {
					fontColor: " rgba(119, 119, 142, 0.2)"
				},
			},
		}
	});

	/* Area Chart*/
	var ctx = document.getElementById("chartArea");
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
			datasets: [{
				label: "Data1",
				borderColor: "rgba(68, 86, 195, 0.9)",
				borderWidth: "1",
				backgroundColor: "rgba(68, 86, 195, 0.5)",
				data: [20, 42, 61, 40, 72, 45, 40],
				fill: true,
				lineTension: 0.3,
			}, {
				label: "Data2",
				borderColor: "rgba(235, 111, 51 ,0.9)",
				borderWidth: "1",
				backgroundColor: "rgba(241, 56, 139, 0.5)",
				pointHighlightStroke: "rgba(241, 56, 139, 0.9)",
				data: [17, 35, 35, 25, 52, 33, 40],
				fill: true,
				lineTension: 0.3,
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			tooltips: {
				mode: 'index',
				intersect: false
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				x: {
					ticks: {
						fontColor: " rgba(119, 119, 142, 0.2)",
					 },
					grid: {
						color: 'rgba(171, 167, 167,0.2)'
					}
				},
				y: {
					ticks: {
						beginAtZero: true,
						fontColor: " rgba(119, 119, 142, 0.2)",
					},
					grid: {
						color: 'rgba(171, 167, 167,0.2)'
					},
				}
			},
			legend: {
				labels: {
					fontColor: " rgba(119, 119, 142, 0.2)"
				},
			},
		}
	});

	/* Pie Chart*/
	var datapie = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
		datasets: [{
			data: [15, 20, 20, 10, 20, 15],
			backgroundColor: ['#623aa2', '#53caed', '#01b8ff', '#f16d75', '#29ccbb', '#f1388b']
		}]
	};
	var optionpie = {
		maintainAspectRatio: false,
		responsive: true,
		legend: {
			display: false,
		},
		animation: {
			animateScale: true,
			animateRotate: true
		}
	};

	/* Doughnut Chart*/
	var ctx6 = document.getElementById('chartPie');
	var myPieChart6 = new Chart(ctx6, {
		type: 'doughnut',
		data: datapie,
		options: optionpie
	});

	/* Pie Chart*/
	var ctx7 = document.getElementById('chartDonut');
	var myPieChart7 = new Chart(ctx7, {
		type: 'pie',
		data: datapie,
		options: optionpie
	});

	/* Radar chart*/
	var ctx = document.getElementById("chartRadar");
	var myChart = new Chart(ctx, {
		type: 'radar',
		data: {
			labels: [

				["Eating", "Dinner"],
				["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running",

			],
			datasets: [{

				label: "Data1",
				data: [65, 59, 66, 45, 56, 55, 40],
				borderColor: "rgba(113, 76, 190, 0.9)",
				borderWidth: "1",
				backgroundColor: "rgba(113, 76, 190, 0.5)"
			}, {
				label: "Data2",
				data: [28, 12, 40, 19, 63, 27, 87],
				borderColor: "rgba(235, 111, 51,0.8)",
				borderWidth: "1",
				backgroundColor: "rgba(235, 111, 51,0.4)"
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display:false
			},
			scales: {
				r: {
				  grid: {
					color: 'rgba(171, 167, 167,0.2)'
				  }
				}
			  },

		}
	});

	/* polar chart */
	var ctx = document.getElementById("chartPolar");
	var myChart = new Chart(ctx, {
		type: 'polarArea',
		data: {
			datasets: [{
				data: [18, 15, 9, 6, 19],
				backgroundColor: ['#623aa2', '#53caed', '#01b8ff', '#f16d75', '#29ccbb'],
				hoverBackgroundColor: ['#623aa2', '#53caed', '#01b8ff', '#f16d75', '#29ccbb'],
				borderColor:'transparent',
			}],
			labels: ["Data1", "Data2", "Data3", "Data4"]
		},
		options: {
			scale: {
				grid: {
						color: 'rgba(171, 167, 167,0.2)'
				}
			},
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				labels: {
					fontColor: " rgba(119, 119, 142, 0.2)"
				},
			},
		}
	});

});