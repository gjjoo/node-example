exports.createGreeting = function() {
  var obj = {
    hello: function(who) {
      console.log('Hello ' + who);
    }
  };
  return obj;
};