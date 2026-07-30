import re
from nlp.utils import get_stopwords

_stopwords = get_stopwords()


def preprocess(text):
    text = text.lower()
    text = re.sub(r"[^a-z\s]", "", text)
    tokens = text.split()
    tokens = [t for t in tokens if t not in _stopwords]
    return tokens
