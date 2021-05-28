// jest.config.js
const { defaults } = require('jest-config')
const path = require('path')

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: [
    // '<rootDir>',
    'node_modules',
    'src'
  ],
  modulePaths: [
    '<rootDir>',
    // '<rootDir>/node_modules',
  ],
  notify: false,
  roots: [
    '<rootDir>',
    path.join(__dirname, 'tests')
  ],
  setupFiles: [ './tests/environment.js' ],
  // testURL: 'http://localhost:5000',
}