import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

nltk.download("stopwords")

def preprocess_text(text):
    stop_words = set(stopwords.words("english"))
    stemmer = PorterStemmer()
    words = text.lower().split()
    filtered = [stemmer.stem(w) for w in words if w not in stop_words]
    return " ".join(filtered)