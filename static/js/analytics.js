// ========================================
// Analytics Dashboard
// ========================================

async function loadAnalytics() {

    const res  = await fetch("/api/analytics");
    const data = await res.json();

    document.getElementById("totalReviews").innerText    = data.total;
    document.getElementById("positiveReviews").innerText = data.positive;
    document.getElementById("negativeReviews").innerText = data.negative;
    document.getElementById("neutralReviews").innerText  = data.neutral;

    // Pie Chart
    new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels: ["Positive", "Negative", "Neutral"],
            datasets: [{
                data: [data.positive, data.negative, data.neutral],
                backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: "bottom" } }
        }
    });

    // Bar Chart
    new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: ["Positive", "Negative", "Neutral"],
            datasets: [{
                label: "Reviews",
                data: [data.positive, data.negative, data.neutral],
                backgroundColor: ["#22c55e", "#ef4444", "#f59e0b"],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}

loadAnalytics();
