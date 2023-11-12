var dashboardChart = document.getElementById('dashboard-chart')

var dashboardChart = new Chart(dashboardChart, {
    type: 'bar',
    data: {
      labels: ["1390", "1395", "1400",],
      datasets: [
        {
          label: "iOS",
          backgroundColor: "#A0D468",
          data: [900,1000,1150]
        }, {
          label: "اندروید",
          backgroundColor: "#4A89DC",
          data: [890,950,1100]
        }
      ]
    },
    options: {
        responsive: true, maintainAspectRatio:false,
        legend: {display: true, position:'bottom', labels:{fontSize:13, padding:15,boxWidth:12},},
        title: {display: false}
    }
});	
    
