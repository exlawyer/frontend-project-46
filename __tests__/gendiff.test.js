import { expect, jest, test } from '@jest/globals';
import { readFileSync } from 'node:fs';
// import { fileURLToPath } from 'url';
import { resolve, dirname, path } from 'node:path';
// import { cwd } from 'node:process';

import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
// const getFixturesPath = (filepath) => resolve(cwd(), '__fixtures__', filepath);

test('gendiff', () => {
  const file1Path = './__fixtures__/file1.json';
  const file2Path = './__fixtures__/file2.json';
  const result = readFile('testFixtureJson.txt');
  expect(gendiff(file1Path, file2Path)).toBe(result);
});
