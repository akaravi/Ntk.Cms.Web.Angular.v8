var verticalChart = document.getElementById('vertical-chart')
var horizontalChart = document.getElementById('horizontal-chart')
var lineChart = document.getElementById('line-chart')


var verticalDemoChart = new Chart(verticalChart, {
    type: 'bar',
    data: {
        labels: ["1400", "1395", "1400", "1405"],
        datasets: [
            {
                label: "iOS",
                backgroundColor: "#A0D468",
                data: [900, 1000, 1200, 1400]
    }, {
                label: "اندروید",
                backgroundColor: "#4A89DC",
                data: [890, 950, 1100, 1300]
    }
  ]
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
        title: {
            display: false
        }
    }
});


var horizontalDemoChart = new Chart(horizontalChart, {
    type: 'horizontalBar',
    data: {
        labels: ["1400", "1393", "1396", "1400"],
        datasets: [
            {
                label: "موبایل",
                backgroundColor: "#BF263C",
                data: [330, 400, 580, 590]
    }, {
                label: "واکنشگرا",
                backgroundColor: "#EC87C0",
                data: [390, 450, 550, 570]
    }
  ]
    },
    options: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontSize: 13,
                padding: 15,
                boxWidth: 12
            },
        },
        title: {
            display: false
        }
    }
});


var lineDemoChart = new Chart(lineChart, {
    type: 'line',
    data: {
        labels: [2000, 2005, 2010, 2015, 2010],
        datasets: [{
                data: [500, 400, 300, 200, 300],
                label: "دسکتاب",
                borderColor: "#D8334A"
  }, {
                data: [0, 100, 300, 400, 500],
                label: "وب اپلکیشن",
                borderColor: "#4A89DC"
  }
]
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
        title: {
            display: false
        }
    }
});
