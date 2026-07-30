import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATABASE_PATH = os.path.join(BASE_DIR, "reviews.db")

POSITIVE_WORDS_PATH = os.path.join(BASE_DIR, "dataset", "positive_words.txt")
NEGATIVE_WORDS_PATH = os.path.join(BASE_DIR, "dataset", "negative_words.txt")
STOPWORDS_PATH      = os.path.join(BASE_DIR, "dataset", "stopwords.txt")
