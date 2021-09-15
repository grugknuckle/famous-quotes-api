const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema, model } = require('mongoose')
const Author = require('./../lib/Author')

//https://mongoosejs.com/docs/schematypes.html#schematype-options

const structure = {
  fullName: { type: String, required: true, trim: true, unique: true, index: true },
  firstName: { type: String, required: false, trim: true },
  middleName: { type: String, required: false, trim: true },
  lastName: { type: String, required: false, trim: true },
  born: { type: Date, required: false },
  died: { type: Date, required: false },
  profession: { type: String, trim: true },
  bio: { type: String, trim: true },
  reference: { type: String, trim: true },
  imageURL: { type: String, trim: true }
}
const options = { timestamps: true }

const authorSchema = new Schema(structure, options)
authorSchema.loadClass(Author)
authorSchema.plugin(mongoosePaginate)
const AuthorModel = model('Author', authorSchema)

module.exports = AuthorModel
