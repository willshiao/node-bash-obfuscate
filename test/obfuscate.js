'use strict';

/***********************
 * Test dependencies
 ***********************/
const obfuscate = require('../main.js');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs')
const chai = require('chai');
chai.should();

const SCRIPT_DIR = path.join(__dirname, 'scripts');
const scriptFiles = fs.readdirSync(SCRIPT_DIR);

/***********************
 * Tests
 ***********************/
describe('obfuscate', function() {
  scriptFiles.forEach((scriptFile) => {
    it(`runs ${scriptFile} correctly`, function() {
      const args = ''
      const fullPath = path.join(SCRIPT_DIR, scriptFile);
      const expected = shell.exec(fullPath + args, { silent: true }).stdout;
      const fileContents = fs.readFileSync(fullPath, 'utf-8');

      const obfuscated = obfuscate(fileContents, 5, true);
      fs.writeFileSync('temp.sh', obfuscated);
      shell.chmod('+x', 'temp.sh')

      const actual = shell.exec('./temp.sh' + args, { silent: true });
      actual.should.equal(expected);
      fs.unlinkSync('temp.sh');
    });
  });
});
