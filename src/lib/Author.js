class Author {
  constructor() {}

  // get fullName() { return `${this.firstName} ${this.lastName}` }

  format() {
    const formatted = {
      id: this._id,
      fullName: this.fullName,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      born: this.born,
      died: this.died,
      profession: this.profession,
      bio: this.bio,
      reference: this.reference,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      revision: this._v
    }
    return formatted
  }

  patch(body) {
    this.fullName = body.fullName ?? this.fullName
    this.firstName = body.firstName ?? this.firstName
    this.middleName = body.middleName ?? this.middleName
    this.lastName = body.lastName ?? this.lastName
    this.born = new Date(body.born) ?? this.born
    this.died = new Date(body.died) ?? this.died
    this.profession = body.profession ?? this.profession
    this.bio = body.bio ?? this.bio
    this.reference = body.reference ?? this.reference
    this.increment()
  }

  static parseQuery(query) {
    let filter = {}
    if (query.fullName) {
      filter.fullName = { $regex: `${query.fullName}`, $options: 'i' }
    }

    if (query.firstName) {
      filter.firstName = { $regex: `${query.firstName}`, $options: 'i' }
    }
    if (query.lastName) {
      filter.lastName = { $regex: query.lastName, $options: 'i' }
    }
    const options = {
      page: parseInt(query.page ?? 1),
      limit: parseInt(query.limit ?? 50),
      populate: ''
    }
    return { filter, options }
  }

  static parseInput(body) {
    const data = {
      fullName: body.fullName,
      firstName: body.firstName,
      middleName: body.middleName,
      lastName: body.lastName,
      born: body.born ?? null,
      died: body.died ?? null,
      profession: body.profession,
      bio: body.bio,
      reference: body.reference
    }
    return data
  }

  static jsonSchema() {
    return {}
  }
}

module.exports = Author