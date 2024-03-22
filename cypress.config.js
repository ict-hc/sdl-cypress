const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173/#/",
    video: true,
    videoCompression: true,
    videosFolder: "cypress/videos",
    testIsolation: false,
    retries: {
      runMode: 1,
      openMode: 1,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
});
