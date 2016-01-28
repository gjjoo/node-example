/**
 * util.format(format[, ...])
 * %s: String.
 * %d: Number(both integer and float).
 * %j: JSON.Replaced with the string '[Circular]' if the argument contains circular references.
 * %%: single percent sign ('%'). This does not consume an argument.
 */
var util = require('util');

// Number Format
var numberFormat = util.format('%d + %d = %d', 1, 2, (1+2));
console.log('- numberFormat:', numberFormat);

// JSON Format
var obj = { name:'IU', job:'singer' };
var jsonFormat = util.format('%j', obj);
console.log('- jsonFormat:', jsonFormat);

// String Format
var stringFormat = util.format('%s %s', 'Hello', 'World');
console.log('- stringFormat:', stringFormat);

// empty Format
var emptyFormat = util.format(1, 2, 3, 4, 5);
console.log('- emptyFormat:', emptyFormat);