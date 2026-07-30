from config import POSITIVE_WORDS_PATH, NEGATIVE_WORDS_PATH, STOPWORDS_PATH


def load_words(filepath):
    with open(filepath, "r") as f:
        return set(line.strip().lower() for line in f if line.strip())


def get_positive_words():
    return load_words(POSITIVE_WORDS_PATH)


def get_negative_words():
    return load_words(NEGATIVE_WORDS_PATH)


def get_stopwords():
    return load_words(STOPWORDS_PATH)
