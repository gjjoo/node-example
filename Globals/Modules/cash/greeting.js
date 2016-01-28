var helloCount = 0;
exports.howAreYou = function() {
  console.log('Fine Thank you and you?' + helloCount++);
}