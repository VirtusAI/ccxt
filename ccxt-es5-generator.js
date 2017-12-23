'use strict';

const path = require('path');
const fs = require('fs');
const inputFile = path.join(__dirname, 'ccxt.js');
const outputFile = path.join(__dirname, 'ccxt-es5.js');

let data = fs.readFileSync(inputFile, 'utf8');
	
let result = data.replace(/(require\s?\('(?:\.\/)?)js(\/.*'\))/g, '$1js-es5$2');

fs.writeFileSync(outputFile, result, 'utf8');
