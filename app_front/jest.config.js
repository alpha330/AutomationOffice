module.exports = {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    transformIgnorePatterns: ["/node_modules/"]
  };