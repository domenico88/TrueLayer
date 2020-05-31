
module.exports = {
    moduleDirectories: [
      'node_modules',
      './src/test-utils/'
    ],
    
    testMatch: ['**/test-utils/**/*.js'],
    testPathIgnorePatterns: ['/test-utils/store_wrapper.js']
  }