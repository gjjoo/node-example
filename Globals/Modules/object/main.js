var hello = require('./greeting');
hello.hello();
hello.hello();

var hello2 = require('./greeting2');
var greeting2 = hello2.createGreeting();
greeting2.hello('Steve');