const natural = require('natural')
const sw = require('stopword')

/**
 * Document object represents a body of texts which has been indexed.
 * @typedef {Object} Document
 * @property {string} id The unique identifier for the document
 * @property {string} text The document text which is to be indexed
 */

/**
 * TfIdf Indexer
 * @class
 */
class Indexer {
  /**
   * Build a Term Frequency - Inverse Document Frequency (TfIdf) index for a collection of
   * (English) texts.
   * @constructor
   * @param {Object[]} corpus An array of documents whose texts you want to index.
   * @param {string} corpus[].id The unique identifier for the document.document
   * @param {string} corpus[].text The body of the document.
   */
  constructor ({ corpus=[], stemmer='lancaster', tokenizer='word' }) {
    // console.log(`Initializing new Tf-Idf Index with ${corpus.length} documents.`)

    const TfIdf = natural.TfIdf
    this._tfidf = new TfIdf()
    
    this._corpus = corpus
      .map(x => {
        return { id: x.id, text: x.text }
      })

    // set the stemmer to use. default to no stemming.
    if (!stemmer || typeof stemmer !== 'string') {
      this._stemmer = { stem: (token) => token }
    }
    switch(stemmer.toLowerCase()) {
      case 'lancaster':
        this._stemmer = natural.LancasterStemmer
        break
      case 'porter':
        this._stemmer = natural.PorterStemmer
        break
      default:
        this._stemmer = { stem: (token) => token }
        break
    }

    // set the tokenizer to use. default to word tokenizer
    if (!tokenizer || typeof tokenizer !== 'string') {
      this._tokenizer = new natural.WordTokenizer()
    }
    switch(tokenizer.toLowerCase()) {
      case 'word':
        this._tokenizer = new natural.WordTokenizer()
        break
      case 'treebank':
        this._tokenizer = new natural.TreebankWordTokenizer()
        break
      case 'sentence':
        this._tokenizer = new natural.SentenceTokenizer()
        break
      case 'case':
        this._tokenizer = new natural.CaseTokenizer()
        break
      case 'aggressive':
        this._tokenizer = new natural.AggressiveTokenizer()
        break
      default:
        this._tokenizer = new natural.WordTokenizer()
        break
    }

    for (let i = 0; i < corpus.length; i++) {
      const document = this._corpus[i]
      const tokens = sw.removeStopwords(this._tokenizer.tokenize(document.text))
      const stems = tokens.map(token => this._stemmer.stem(token))
      this._tfidf.addDocument(stems)
    }
  }

  /**
   * The function used to split text into an array of tokens (words).
   */
  get tokenizer () {
    return this._tokenizer
  }

  /**
   * The function used to compute word / token stems
   */
  get stemmer() {
    return this._stemmer
  }

  /**
   * The (loaded) TfIdf object.
   * See ... https://naturalnode.github.io/natural/tfidf.html
   */
  get tfidf () {
    return this._tfidf
  }

  /**
   * The collection of (tokenized and stemmed) documents in the index.
   * @returns {Document[]}
   */
  get corpus () {
    return this._corpus
  }

  /**
   * The distribution of word tokens used in the corpus
   */
  get vocabulary() {
    const vocab = {}
    for (let document of this.corpus) {
      const tokenizer = new natural.WordTokenizer()
      const words = sw.removeStopwords(tokenizer.tokenize(document.text))
      for (const word of words) {
        vocab[word] = vocab[word] ? vocab[word] + 1 : 1
      }
    }
    return vocab
  }

  /**
   * The distribution of word-stems used in the corpus
   */
  get stems() {
    const vocab = {}
    for (let document of this.corpus) {
      const stems = this.tokenizeAndStem(document.text)
      for (const stem of stems) {
        vocab[stem] = vocab[stem] ? vocab[stem] + 1 : 1
      }
    }
    return vocab
  }

  /**
   * Tokenize and remove stopwords from english text.
   * @param {string} text The body of the text you wish to tokenize and stem.
   * @returns {string[]} an array of (english) word stems computed from the text.
   */
  tokenizeAndStem (text) {
    const tokens = sw.removeStopwords(this.tokenizer.tokenize(text))
    const stems = tokens.map(token => this.stemmer.stem(token))
    return stems
  }


  /**
   * Rank the documents in the corpus by Tf-Idf against the passed string parameter.
   * @param {string} searchString The string you wish to search the documents with.
   * @returns {Object[]} An array of documents which have a non-zero Tf-Idf similarity with the search string.
   */
  rankDocuments (searchString) {
    const results = []
    // tokenize and stem the search string (ENGLISH ONLY !)
    const searchStems = this.tokenizeAndStem(searchString)

    // compute the measures
    this.tfidf.tfidfs(searchStems, (i, measure) => {
      if (measure > 0) {
        const document = this.corpus[i]
        const id = document.id
        const text = document.text
        const result = { measure, id, text }
        results.push(result)
      }
    })
    return results.sort((a, b) => b.measure - a.measure)
  }
}
module.exports = Indexer
