import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yaml', 'yml'];

describe('test gendiff', () => {
  test.each(formats)('gendiff with %p', (format) => {
    const file1Path = getFixturePath(`file1.${format}`);
    const file2Path = getFixturePath(`file2.${format}`);
    const result = readFile(`testFixture-${format}.txt`);
    expect(gendiff(file1Path, file2Path)).toBe(result);
  });
});
