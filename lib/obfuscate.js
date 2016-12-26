'use strict';

const _ = require('lodash');

const CHUNK_SIZE = 4;
const CHUNK_REGEX = new RegExp(`.{1,${CHUNK_SIZE}}`, 'g');

/**
 * Returns an alphabet character from a number,
 *  assuming that the number is <= 52
 */
function intToChar(num) {
  return String.fromCharCode(num +
    (num < 26 ? 65 : 71)
  );
}

/**
 * Uses the given number to generate an alphabetic identifier
 *  that always ends with the letter z.
 */
function generateId(num) {
  let res = '';
  while(num > 0 || res.length == 0) {
    // Use 51 because there are 26 * 2 - 1 alphabet letters,
    //  not including z.
    res += intToChar(num % 51);
    num = Math.floor(num / 51);
  }
  res += 'z';
  return res;
}

function chunkify(str) {
  return str.match(CHUNK_REGEX);
}

module.exports = {
  obfuscate(script) {
    let lines = script
      .split('\n');
    let counter = 0;
    const table = {};
    lines = lines
      .filter(line => line.length > 0)
      .map(line => {
        line = line.trim();
        if(line.length == 0) return;
        return chunkify(line)
          .map(chunk => {
            if(chunk in table) return '$' + table[chunk];
            const id = generateId(counter++);
            chunk = chunk.replace("'", "'\\\''");
            table[chunk] = id;
            return '$' + id;
          })
          .join('');
      });
    let res = 'z="\n";';
    _.each(table, (id, old) => {
      res += `${id}='${old}';`;
    });
    res += '\neval "' + lines.join('$z') + '"';
    return res;
  },
};
