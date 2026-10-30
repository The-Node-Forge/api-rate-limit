module.exports = {
  preset: 'ts-jest', // Use ts-jest to handle TypeScript files
  testEnvironment: 'node', // Use Node.js environment for tests
  moduleFileExtensions: ['ts', 'js'], // Recognize TypeScript and JavaScript files
  testMatch: ['**/tests/**/*.test.ts'], // Match test files
  collectCoverageFrom: ['src/**/*.ts'], // Include files no test imports, so gaps are visible
  coverageThreshold: {
    global: { statements: 100, branches: 100, functions: 100, lines: 100 },
  },
  verbose: true, // Show detailed test results
};
