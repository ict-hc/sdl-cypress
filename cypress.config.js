const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173/#/",
    testIsolation: false,
    retries: {
      runMode: 1,
      openMode: 1,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
});
