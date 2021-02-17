module.exports = {

  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  globals: {
    pol: true,
    extra: true,
    article: true
  },

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [ './__mocks__/client.js' ],

  // The test environment that will be used for testing
  testEnvironment: "jest-environment-jsdom",
}