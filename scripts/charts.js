$(document).ready(function(){
    
    // Growth Chart
    var gcc = $('#growth-chart-container')

    var growthChart = new Chart(gcc, {
        type: 'line',
        data: {
            labels: ['Month 0', 'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
            datasets: [{
                label: 'School Only',
                data: [0, 50, 100, 150, 200, 250],
                backgroundColor: [
                    '#cccccc'
                ],
                borderColor: [
                    '#cccccc'
                ],
                borderWidth: 2
            },
            {
                label: 'Chun Tutors Program',
                data: [0, 75, 175, 300, 450, 600],
                backgroundColor: [
                    'rgba(43, 173, 130, 1)'
                ],
                borderColor: [
                    'rgba(43, 173, 130, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            maintainAspectRatio: false,
        }
    });


    // Skill Chart
    var scc = $('#skill-chart-container');

    var skillChart = new Chart(scc, {
        type: 'radar',
        data: {
            labels: [
                'Retention',
                'Time Management',
                'Communication',
                'Exams',
                'Consolidation',
                'Deductive Reasoning',
                'Research',
            ],
            datasets: [{
                data: [85, 40, 100, 75, 60, 80, 45],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 0.8)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true
                }
            },
            maintainAspectRatio: false,
        }
    })


})