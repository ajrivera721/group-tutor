from collections import defaultdict
import pandas as pd
import nltk
from nltk.util import ngrams

queue = defaultdict

# Function to generate n-grams from sentences.
def extract_ngrams(data, num):
    n_grams = ngrams(nltk.word_tokenize(data), num)
    return [ ' '.join(grams) for grams in n_grams]

def process_ngram(ngram):


data = pd.read_csv(csv)
print(data.head())
