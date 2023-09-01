import nltk
# nltk.download('punkt')
import numpy as np
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize

stemmer = PorterStemmer()

def tokenize(data):
  return word_tokenize(data)

def stem(word):
  return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentence, all_word):
  tokenized_sentence = [stem(w) for w in tokenized_sentence]
  bag = np.zeros(len(all_word),dtype=np.float32)
  for idx, word in enumerate(all_word):
    if word in tokenized_sentence:
      bag[idx] = 1.0
  return bag

#   pip install nltk