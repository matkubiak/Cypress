const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  pageLoadTimeout: 180000,
  defaultCommandTimeout: 60000,
  e2e: {
    baseUrl: 'localhost'
  },
    retries: {
    runMode: 2,
  },
})
