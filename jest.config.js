module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: {
        jsx: 'react',
      },
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/cypress',
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageDirectory: './.coverage/',
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/'],
};
