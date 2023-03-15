#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .arguments('<filePath1> <filePath2>')
  .action((filePath1, filePath2) => {
    const diff = gendiff(filePath1, filePath2);
    console.log(diff);
  });
program.parse();
