const jsonfile = require('jsonfile')
const natural = require('natural')
const sw = require('stopword')

/**
 * TfIdf Indexer
 */
class Indexer {

  /**
   * Build a Term Frequency - Inverse Document Frequency (TfIdf) index for a collection of
   * (English) texts.
   * 
   * @param {Object[]} corpus An array of documents whose texts you want to index.
   * @param {string} corpus[].id The unique identifier for the document.document
   * @param {string} corpus[].text The body of the document.
   */
  constructor(corpus) {
    console.log(`Initializing new Tf-Idf Index with ${corpus.length} documents.`)

    const TfIdf = natural.TfIdf
    this._tfidf = new TfIdf()
    this._tokenizer = new natural.WordTokenizer()
    this._corpus = corpus
      .map(x => {
        return { id: x.id, text: x.text }
      })

    for(let i=0; i<corpus.length; i++) {
      const document = this._corpus[i]
      const tokens = sw.removeStopwords(this._tokenizer.tokenize(document.text))
      const stems = tokens.map(token => natural.LancasterStemmer.stem(token))
      this._tfidf.addDocument(stems)
    }
  }

  /**
   * Word tokenizer
   */
  get tokenizer() {
    return this._tokenizer
  }

  /**
   * The (loaded) TfIdf object.
   * See ... https://naturalnode.github.io/natural/tfidf.html
   */
  get tfidf() {
    return this._tfidf
  }

  /**
   * An array of document IDs
   */
  get corpus() {
    return this._corpus
  }

  /**
   * Tokenize and remove stopwords from english text.  
   * 
   * @param {string} text The body of the text you wish to tokenize and stem. 
   * @returns {string[]} an array of (english) word stems computed from the text.
   */
  tokenizeAndStem(text) {
    const tokens = sw.removeStopwords(this.tokenizer.tokenize(text))
    const stems = tokens.map(token => natural.LancasterStemmer.stem(token))
    return stems
  }

  /**
   * Save the document corpus and the Tf-Idf index to JSON.
   * 
   * @param {string} filename 
   */
  saveToFile(filename) {
    const data = { corpus: this.corpus, tfidf: this.tfidf }
    return jsonfile.writeFile(filename, data, { spaces: 2 })
  }

  /**
   * Rank the documents in the corpus by Tf-Idf against the passed string parameter.
   * 
   * @param {string} searchString The string you wish to search the documents with.
   * @returns {Object[]} An array of documents which have a non-zero Tf-Idf similarity with the search string.
   */
  rankDocuments(searchString) {
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