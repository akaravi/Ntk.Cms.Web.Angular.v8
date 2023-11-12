var pieChart = document.getElementById('pie-chart')
var doughnutChart = document.getElementById('doughnut-chart')
var polarChart = document.getElementById('polar-chart')


var pieDemoChart = new Chart(pieChart, {
    type: 'pie',
    data: {
        labels: ["فیسبوک", "تویتر", "واتساپ"],
        datasets: [{
            backgroundColor: ["#4A89DC", "#4FC1E9", "#A0D468"],
            borderColor: "rgba(255,255,255,0.5)",
            data: [7000, 3000, 2000]
  }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontSize: 13,
                padding: 15,
                boxWidth: 12
            },
        },
        tooltips: {
            enabled: true
        },
        animation: {
            duration: 1500
        }
    }
});

var doughnutDemoChart = new Chart(doughnutChart, {
    type: 'doughnut',
    data: {
        labels: ["اپل", "سامسونگ", "گوگل"],
        datasets: [{
            backgroundColor: ["#CCD1D9", "#5D9CEC", "#FC6E51"],
            borderColor: "rgba(255,255,255,0.5)",
            data: [5500, 4000, 3000]
  }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontSize: 13,
                padding: 15,
                boxWidth: 12
            },
        },
        tooltips: {
            enabled: true
        },
        animation: {
            duration: 1500
        },
        layout: {
            padding: {
                bottom: 30
            }
        }
    }
});

var polarDemoChart = new Chart(polarChart, {
    type: 'polarArea',
    data: {
        labels: ["ویندوز", "مک", "لینوکس"],
        datasets: [{
            backgroundColor: ["#CCD1D9", "#5D9CEC", "#FC6E51"],
            borderColor: "rgba(255,255,255,0.5)",
            data: [7000, 10000, 5000]
  }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontSize: 13,
                padding: 15,
                boxWidth: 12
            },
        },
        tooltips: {
            enabled: true
        },
        animation: {
            duration: 1500
        },
        layout: {
            padding: {
                bottom: 30
            }
        }
    }
});