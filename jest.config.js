module.exports = {
  // testEnvironment: 'node',
  setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
  // globals: {
  //   window: true,
  //   document: true,
  // },
  testURL: 'http://localhost',
  moduleNameMapper: {
    '^.+\\.s?css': 'identity-obj-proxy',
    '^.+\\.(jpe?g|png|gif|svg)': 'identity-obj-proxy',
    '^.+\\.(eot|ttf|otf|woff|woff2)': 'identity-obj-proxy',
  },
  setupFiles: ['<rootDir>/__tests__/setup.js'],
  modulePathIgnorePatterns: ['./fixtures/', './setup', './mock.js']
};
