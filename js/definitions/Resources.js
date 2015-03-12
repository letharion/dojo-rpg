var Immutable = require('immutable');

module.exports = new Immutable.Map({
  safety: {
    production: -1,
    def: -10
  },
  thoughts: {
    production: 1,
    def: 10
  },
  focus: {
    production: -1,
    def: 0
  }
});
