#!/usr/bin/env node
'use strict';

const fs = require('fs');
const obfuscate = require('../main');
const argv = require('yargs')
  .usage('Usage: $0 <inputFilename> [options]')
  .alias('o', 'out')
  .describe('o', 'Output file')
  .alias('c', 'chunk-size')
  .describe('c', 'Chunk size (for variables in obfuscated code)')
  .default('c', 4)
  .demand(1)
  .argv;


try {
  const script = fs.readFileSync(argv._[0], 'utf8');
  const output = obfuscate(script, argv.c);
  if(!argv.o) {
    console.log(output);
  } else {
    fs.writeFileSync(argv.o, output, 'utf8');
  }
} catch(err) {
  errorMsg(err.message);
}


function errorMsg(msg) {
  console.error(msg);
  process.exit(1);
}
