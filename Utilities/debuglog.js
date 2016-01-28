/**
 * util.debuglog(section)
 * 'section' String the section of the program to bo debugged.
 * Returns: Function The logging function
 */
var util = require('util');

var debuglog = util.debuglog('foo');

var bar = 123;
debuglog('hello from foo [%d]', bar);