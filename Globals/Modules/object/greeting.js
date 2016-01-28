var hello = {
  _count: 0,
  hello: function() {
    console.log('Hello: ', this._count++);
  }
};

module.exports = hello;