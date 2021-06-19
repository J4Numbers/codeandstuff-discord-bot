module.exports = {
  _reportDir: './coverage/ts/',
  lines: 80,
  statements: 80,
  functions: 80,
  branches: 80,
  'check-coverage': false,
  include: [
    'src/**/*.ts',
  ],
  all: true,
  reporter: [
    'lcov',
    'cobertura',
    'text',
    'text-summary',
  ],
};
