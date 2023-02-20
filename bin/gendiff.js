#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('-v, --vers', 'output the current version')
  .option('-h, --help', 'display help for command')
  ;
program.parse();     