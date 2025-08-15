
  $('#vmap-eco').vectorMap({
    map: 'world_en',
    backgroundColor: 'rgb(227, 225, 245)',
    color: '#ffffff',
    hoverOpacity: 0.7,
    selectedColor: '#666666',
    enableZoom: true,
    showTooltip: true,
    scaleColors: ['#285cf7', '#007bff'],
    normalizeFunction: 'polynomial'
});

function charteco() {
  var options = {
      series: [{
      name: 'Sales',
      type: 'column',
      data: [520, 435, 654, 341, 527, 313, 701, 472, 772, 390, 557, 330]
    }, {
      name: 'Profit',
      type: 'line',
      data: [23, 32, 50, 27, 43, 15, 57, 36, 55, 29, 42, 16]
    }],
      chart: {
      height: 400,
      type: 'line',
			toolbar: {
				show: false,
			},
    },
    stroke: {
      width: [0, 4]
    },
    title: {
      text: ''
    },
    plotOptions: {
      bar: {
        borderRadius: 1,
        horizontal: false,
        columnWidth:'25%'
      }
    },
    colors: [myVarVal , "#fb8d34"],
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1]
    },
    labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
    xaxis: {
      type: 'datetime',
      axisBorder: {
        show: true,
        color: 'rgba(119, 119, 142, 0.05)',
      },
      axisTicks: {
        show: true,
        color: 'rgba(119, 119, 142, 0.05)',
      },
    },
    yaxis: [{
      title: {
        text: 'وبسایت',
      },
    
    }, {
      opposite: true,
      title: {
        text: 'سازمان جتماعی'
      }
    }],
    grid: {
      borderColor: 'rgba(119, 119, 142, 0.1)',
    }
    };
    document.getElementById('chart-eco').innerHTML = '';
    var chart = new ApexCharts(document.querySelector("#chart-eco"), options);
    chart.render();

}