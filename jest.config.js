// jest.config.js
const path = require('path')

// Testing Mongoose with Jest ... https://mongoosejs.com/docs/jest.html
module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: [
    // '<rootDir>',
    'node_modules',
    'src'
  ],
  modulePaths: [
    '<rootDir>'
    // '<rootDir>/node_modules',
  ],
  notify: false,
  roots: [
    '<rootDir>',
    path.join(__dirname, 'tests')
  ],
  setupFiles: ['./tests/environment.js']
  // testURL: 'http://localhost:5000',
}
