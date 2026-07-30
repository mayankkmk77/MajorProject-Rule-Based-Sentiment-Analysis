from flask import Flask, render_template, request, jsonify
from nlp.sentiment import analyze
from models.database import init_db, save_review, get_analytics, get_recent_reviews

app = Flask(__name__)

init_db()


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/analytics")
def analytics():
    return render_template("analytics.html")


@app.route("/analyze", methods=["POST"])
def analyze_review():
    data = request.get_json()
    product = data.get("product", "").strip()
    review  = data.get("review", "").strip()

    if not product or not review:
        return jsonify({"error": "Product name and review are required."}), 400

    result = analyze(review)

    save_review(
        product,
        review,
        result["sentiment"],
        result["pos_score"],
        result["neg_score"],
        result["confidence"]
    )

    return jsonify(result)


@app.route("/api/analytics")
def api_analytics():
    return jsonify(get_analytics())


@app.route("/api/reviews")
def api_reviews():
    return jsonify(get_recent_reviews())


if __name__ == "__main__":
    app.run(debug=True)
