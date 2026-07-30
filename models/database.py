import sqlite3
from config import DATABASE_PATH


def get_connection():
    return sqlite3.connect(DATABASE_PATH)


def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reviews (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            product     TEXT NOT NULL,
            review      TEXT NOT NULL,
            sentiment   TEXT NOT NULL,
            pos_score   INTEGER NOT NULL,
            neg_score   INTEGER NOT NULL,
            confidence  REAL NOT NULL,
            created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()


def save_review(product, review, sentiment, pos_score, neg_score, confidence):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO reviews (product, review, sentiment, pos_score, neg_score, confidence)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (product, review, sentiment, pos_score, neg_score, confidence))
    conn.commit()
    conn.close()


def get_analytics():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM reviews")
    total = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reviews WHERE sentiment = 'Positive'")
    positive = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reviews WHERE sentiment = 'Negative'")
    negative = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reviews WHERE sentiment = 'Neutral'")
    neutral = cursor.fetchone()[0]

    conn.close()
    return {"total": total, "positive": positive, "negative": negative, "neutral": neutral}


def get_recent_reviews(limit=10):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT product, review, sentiment, pos_score, neg_score, confidence, created_at
        FROM reviews ORDER BY created_at DESC LIMIT ?
    """, (limit,))
    rows = cursor.fetchall()
    conn.close()
    keys = ["product", "review", "sentiment", "pos_score", "neg_score", "confidence", "created_at"]
    return [dict(zip(keys, row)) for row in rows]
