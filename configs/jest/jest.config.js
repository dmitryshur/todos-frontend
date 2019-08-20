const path = require('path');

const rootFolder = path.resolve(__dirname, '..', '..');

module.exports = {
  roots: [path.resolve(rootFolder, 'src')],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/setupEnzyme.ts'],
  modulePaths: [path.resolve(rootFolder, 'src'), path.resolve(rootFolder, 'node_modules')],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
};
