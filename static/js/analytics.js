// ========================================
// Analytics Dashboard
// ========================================

// Sample Data (Replace with Flask API later)

const totalReviews = 120;
const positiveReviews = 75;
const negativeReviews = 30;
const neutralReviews = 15;

// ===============================
// Update Statistics Cards
// ===============================

document.getElementById("totalReviews").innerText = totalReviews;
document.getElementById("positiveReviews").innerText = positiveReviews;
document.getElementById("negativeReviews").innerText = negativeReviews;
document.getElementById("neutralReviews").innerText = neutralReviews;


// ===============================
// Pie Chart
// ===============================

const pieCtx = document.getElementById("pieChart");

new Chart(pieCtx, {

    type: "pie",

    data: {

        labels: [

            "Positive",

            "Negative",

            "Neutral"

        ],

        datasets: [

            {

                data: [

                    positiveReviews,

                    negativeReviews,

                    neutralReviews

                ],

                backgroundColor: [

                    "#22c55e",

                    "#ef4444",

                    "#f59e0b"

                ],

                borderWidth: 2

            }

        ]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                position: "bottom"

            }

        }

    }

});


// ===============================
// Bar Chart
// ===============================

const barCtx = document.getElementById("barChart");

new Chart(barCtx, {

    type: "bar",

    data: {

        labels: [

            "Positive",

            "Negative",

            "Neutral"

        ],

        datasets: [

            {

                label: "Reviews",

                data: [

                    positiveReviews,

                    negativeReviews,

                    neutralReviews

                ],

                backgroundColor: [

                    "#22c55e",

                    "#ef4444",

                    "#f59e0b"

                ],

                borderRadius: 8

            }

        ]

    },

    options: {

        responsive: true,

        scales: {

            y: {

                beginAtZero: true

            }

        }

    }

});