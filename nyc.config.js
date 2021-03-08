module.exports = {
  lines:            80,
  statements:       80,
  functions:        80,
  branches:         80,
  'check-coverage': false,
  exclude:          [
    'nyc.config.js',
    '.eslintrc.js',
    'coverage/**',
    'node_modules/**',
    'test/**',
    'src/js/**',
    'config/**',
  ],
  reporter:         [
    'lcov',
    'cobertura',
    'text',
    'text-summary',
  ],
};
