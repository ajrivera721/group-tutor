
# Data management packages
import pandas as pd
import json

# Natural Language Processing packages
import nltk
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk.stem.snowball

# Constants
MAX_GROUP_SIZE = 4
THRESHOLD = 0.3

stemmer = nltk.stem.snowball.SnowballStemmer('english')
tokenizer = nltk.tokenize.WordPunctTokenizer()
stopwords = nltk.corpus.stopwords.words('english')
stopwords.extend(string.punctuation)
stopwords.append('')

def cosine_sim(text1, text2):
    tokens_a = [token.lower().strip(string.punctuation) for token in tokenizer.tokenize(text1) \
                    if token.lower().strip(string.punctuation) not in stopwords]
    tokens_b = [token.lower().strip(string.punctuation) for token in tokenizer.tokenize(text2) \
                    if token.lower().strip(string.punctuation) not in stopwords]
    stems_a = [stemmer.stem(token) for token in tokens_a]
    stems_b = [stemmer.stem(token) for token in tokens_b]
    ratio = len(set(stems_a).intersection(stems_b)) / float(len(set(stems_a).union(stems_b)))
    return ratio

def parse_json(data, context):
    q = pd.read_csv("queues.csv", names=["course","names","topic","tag", "location","descriptions"])
    with open(data['name'], 'r') as f:
        j = json.load(f)
    for index,ticket in q.iterrows():
        if j["topic"] == ticket["topic"] and j["tag"] == ticket["tag"] and len(ticket["names"]) < MAX_GROUP_SIZE:
            for d in ticket["descriptions"]:
                similarity = cosine_sim(j["descriptions"], d)
                if similarity > THRESHOLD:
                    q.loc[index, "names"].append(j["name"])
                    q.loc[index, "descriptions"].append(j["description"])
                    q.to_csv("queues.csv", index=False, header=False)
                    return
    q = q.append({"course":j["course"],"names":[j["name"]],"topic":j["topic"],"tag":j["tag"], "location":j["location"],"descriptions":[j["description"]]}, ignore_index=True)