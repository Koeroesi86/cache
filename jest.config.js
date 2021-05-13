/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  cache: true,
  cacheDirectory: "./.cache/jest",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "html"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};

module.exports = config;
