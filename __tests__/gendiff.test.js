import { describe, expect, test } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
// import { dirname } from 'path';

import gendiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yaml', 'yml'];

describe('test gendiff', () => {
  test.each(formats)('gendiff with %s format', (format) => {
    const file1Path = getFixturePath(`file1.${format}`);
    const file2Path = getFixturePath(`file2.${format}`);
    const result = readFile(`testFixture-${format}.txt`);
    expect(gendiff(file1Path, file2Path)).toBe(result);
  });
});
