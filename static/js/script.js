// =========================================
// Rule-Based Sentiment Analysis UI Script
// =========================================

const analyzeBtn = document.getElementById("analyzeBtn");

const productInput = document.getElementById("product");
const reviewInput = document.getElementById("review");

const sentiment = document.getElementById("sentiment");
const positive = document.getElementById("positive");
const negative = document.getElementById("negative");
const confidence = document.getElementById("confidence");
const matchedWords = document.getElementById("matchedWords");


// Demo positive & negative words
const positiveWords = [
    "good",
    "excellent",
    "great",
    "amazing",
    "awesome",
    "love",
    "best",
    "perfect",
    "nice",
    "worth",
    "happy",
    "fantastic"
];

const negativeWords = [
    "bad",
    "poor",
    "worst",
    "hate",
    "terrible",
    "slow",
    "broken",
    "waste",
    "cheap",
    "problem",
    "disappointed",
    "awful"
];


// Analyze Button
analyzeBtn.addEventListener("click", function () {

    const product = productInput.value.trim();
    const review = reviewInput.value.trim();

    if (product === "" || review === "") {

        alert("Please enter Product Name and Customer Review.");

        return;
    }

    // Loading Effect
    sentiment.innerHTML = "Analyzing...";
    positive.innerHTML = "-";
    negative.innerHTML = "-";
    confidence.innerHTML = "-";
    matchedWords.innerHTML = "<li>Processing...</li>";

    setTimeout(() => {

        analyzeReview(review);

    }, 1000);

});


// Function
function analyzeReview(review) {

    let reviewText = review.toLowerCase();

    let words = reviewText.split(/\s+/);

    let positiveScore = 0;
    let negativeScore = 0;

    let matched = [];

    words.forEach(word => {

        let cleanWord = word.replace(/[.,!?]/g, "");

        if (positiveWords.includes(cleanWord)) {

            positiveScore++;

            matched.push("✅ " + cleanWord);

        }

        if (negativeWords.includes(cleanWord)) {

            negativeScore++;

            matched.push("❌ " + cleanWord);

        }

    });

    let result = "";
    let confidenceScore = 0;

    if (positiveScore > negativeScore) {

        result = "😊 Positive";

        confidenceScore = Math.round(
            (positiveScore / (positiveScore + negativeScore || 1)) * 100
        );

    }

    else if (negativeScore > positiveScore) {

        result = "😞 Negative";

        confidenceScore = Math.round(
            (negativeScore / (positiveScore + negativeScore || 1)) * 100
        );

    }

    else {

        result = "😐 Neutral";

        confidenceScore = 50;

    }

    sentiment.innerHTML = result;

    positive.innerHTML = positiveScore;

    negative.innerHTML = negativeScore;

    confidence.innerHTML = confidenceScore + "%";

    matchedWords.innerHTML = "";

    if (matched.length === 0) {

        matchedWords.innerHTML = "<li>No matching keywords found.</li>";

    }

    else {

        matched.forEach(item => {

            let li = document.createElement("li");

            li.textContent = item;

            matchedWords.appendChild(li);

        });

    }

}