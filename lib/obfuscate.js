'use strict';

const _ = require('lodash');

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

function chunkify(str, chunkSize) {
  const chunkRegex = new RegExp(`.{1,${chunkSize}}`, 'g');
  return str.match(chunkRegex);
}

module.exports = function obfuscate(script, chunkSize, shuffle) {
  let lines = script.split('\n');
  let counter = 0;
  const table = {};
  lines = lines
    .map(line => line.trim())
    .filter(line => {
      if(line.length == 0 || line[0] == '#') return false;
      return true;
    })
    .map(line => {
      return chunkify(line, chunkSize)
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
  let t = _(table).toPairs();
  if(shuffle) t = t.shuffle();

  t.each(pair => {
    res += `${pair[1]}='${pair[0]}';`;
  });
  res += '\neval "' + lines.join('$z') + '"';
  return res;
};
