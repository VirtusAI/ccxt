'use strict';

const path = require('path');
const fs = require('fs');
const inputFile = path.join(__dirname, 'ccxt.js');
const outputFile = path.join(__dirname, 'ccxt-es5.js');

fs.readFile(inputFile, 'utf8', function (err, data) {
	if (err) {
		throw err;
	}
	
	let result = data.replace(/(require\s?\('(?:\.\/)?)js(\/.*'\))/g, '$1js-es5$2');

	fs.writeFile(outputFile, result, 'utf8', function (err) {
		if (err) {
			throw err;
		}
	});
});