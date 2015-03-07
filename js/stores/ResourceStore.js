var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var safety = 0;
var ResourceStore = _.extend({}, EventEmitter.prototype, {

  getSafety: function() {
    return safety;
  },

  start: function() {
    var self = this;
    setInterval(function() {
      safety -= 1;
      self.emit('tick');
    }, 1000);
  },

  addChangeListener: function(callback) {
    this.on('tick', callback);
  },
});

ResourceStore.start();

module.exports = ResourceStore;
