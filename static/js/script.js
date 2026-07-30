// =========================================
// Rule-Based Sentiment Analysis UI Script
// =========================================

const analyzeBtn   = document.getElementById("analyzeBtn");
const productInput = document.getElementById("product");
const reviewInput  = document.getElementById("review");
const sentiment    = document.getElementById("sentiment");
const positive     = document.getElementById("positive");
const negative     = document.getElementById("negative");
const confidence   = document.getElementById("confidence");
const matchedWords = document.getElementById("matchedWords");


analyzeBtn.addEventListener("click", async function () {

    const product = productInput.value.trim();
    const review  = reviewInput.value.trim();

    if (!product || !review) {
        alert("Please enter Product Name and Customer Review.");
        return;
    }

    sentiment.innerHTML    = "Analyzing...";
    positive.innerHTML     = "-";
    negative.innerHTML     = "-";
    confidence.innerHTML   = "-";
    matchedWords.innerHTML = "<li>Processing...</li>";

    const res  = await fetch("/analyze", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ product, review })
    });

    const data = await res.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    const emoji = data.sentiment === "Positive" ? "😊" : data.sentiment === "Negative" ? "😞" : "😐";

    sentiment.innerHTML  = emoji + " " + data.sentiment;
    positive.innerHTML   = data.pos_score;
    negative.innerHTML   = data.neg_score;
    confidence.innerHTML = data.confidence + "%";

    matchedWords.innerHTML = "";

    if (data.matched.length === 0) {
        matchedWords.innerHTML = "<li>No matching keywords found.</li>";
    } else {
        data.matched.forEach(item => {
            const li = document.createElement("li");
            li.textContent = (item.type === "positive" ? "✅ " : "❌ ") + item.word;
            matchedWords.appendChild(li);
        });
    }
});
