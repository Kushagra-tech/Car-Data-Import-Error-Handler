module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testTimeout: 20000,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
};
