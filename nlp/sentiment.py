from nlp.preprocess import preprocess
from nlp.utils import get_positive_words, get_negative_words

_positive_words = get_positive_words()
_negative_words = get_negative_words()


def analyze(text):
    tokens = preprocess(text)

    pos_score = 0
    neg_score = 0
    matched = []

    for token in tokens:
        if token in _positive_words:
            pos_score += 1
            matched.append({"word": token, "type": "positive"})
        elif token in _negative_words:
            neg_score += 1
            matched.append({"word": token, "type": "negative"})

    total = pos_score + neg_score

    if total == 0:
        sentiment = "Neutral"
        confidence = 50.0
    elif pos_score > neg_score:
        sentiment = "Positive"
        confidence = round((pos_score / total) * 100, 2)
    elif neg_score > pos_score:
        sentiment = "Negative"
        confidence = round((neg_score / total) * 100, 2)
    else:
        sentiment = "Neutral"
        confidence = 50.0

    return {
        "sentiment":  sentiment,
        "pos_score":  pos_score,
        "neg_score":  neg_score,
        "confidence": confidence,
        "matched":    matched
    }
