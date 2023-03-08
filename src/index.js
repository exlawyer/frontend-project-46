import { readFileSync } from 'node:fs';
import _ from 'lodash';
import { cwd } from 'node:process';
import path from 'node:path';

const genDiff = (obj1, obj2) => {
  const allEntries = [...Object.entries(obj1), ...Object.entries(obj2)];
  const nodes = [];
  allEntries
    .map((entry) => {
      const [key, value] = entry;
      const node = {};
      if (!_.hasIn(obj1, key) && _.hasIn(obj2, key)) {
        node.key = [key];
        node.value = [value];
        node.status = 'added';
      } else if (_.hasIn(obj1, key) && !_.hasIn(obj2, key)) {
        node.key = [key];
        node.value = [value];
        node.status = 'deleted';
      } else if (obj1[key] !== obj2[key]) {
        node.key = [key];
        node.value = [value];
        node.status = 'changed';
      } else {
        node.key = [key];
        node.value = [value];
        node.status = 'unchanged';
      }
      return nodes.push(node);
    });
  const sortedNodes = _.sortBy(nodes, 'key');
  let result = '';
  sortedNodes.map((node) => {
    switch (node.status) {
      case 'deleted':
        result += `\n - ${node.key}: ${node.value}`;
        break;
      case 'unchanged':
        if (!result.includes(node.key)) {
          result += `\n   ${node.key}: ${node.value}`;
          break;
        } else {
          return '';
        }
      case 'changed':
        if (!result.includes(node.key)) {
          result += `\n - ${node.key}: ${node.value}`;
        } else {
          result += `\n + ${node.key}: ${node.value}`;
        }
        break;
      case 'added':
        result += `\n + ${node.key}: ${node.value}`;
        break;
      default: throw new Error(`Unknown status: '${node.key}'!`);
    }
    return result;
  });
  return `{${result}\n}`;
};

const getPath = (filepath) => path.resolve(cwd(), filepath);

export default (filePath1, filePath2) => {
  const getFileContent1 = readFileSync(getPath(filePath1), 'utf8');
  const getFileContent2 = readFileSync(getPath(filePath2), 'utf8');
  const parsedFile1 = JSON.parse(getFileContent1);
  const parsedFile2 = JSON.parse(getFileContent2);

  return genDiff(parsedFile1, parsedFile2);
};
