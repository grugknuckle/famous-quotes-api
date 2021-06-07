let data = [
  {
    name: 'Quotes',
    description: `A curated collection of meaningful quotes from famous people.`,
    group: 'Collections'
  },
  {
    name: 'Authors',
    description: `The people who (allegedly) said the famous words found in the quotes collection.`,
    group: 'Collections'
  }
]

module.exports = {
  tags: data.map(x => {
    return {
      name: x.name,
      description: x.description
    }
  }),
  'x-tagGroups': [
    {
      name: 'Collections',
      tags: data.filter(x => x.group === 'Collections').map(x => x.name)
    },
  ]
}