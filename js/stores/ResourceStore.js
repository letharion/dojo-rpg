var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

// Resources
var safety = 0;

//////////////////
// Store itself //
//////////////////
var ResourceStore = _.extend({}, EventEmitter.prototype, {
  getSafety: function() {
    return safety;
  },

  start: function() {
    var self = this;
    setInterval(function() {
      self.update();
      self.tick();
    }, 1000);
  },

  tick: function() {
    this.emit('tick');
  },

  addChangeListener: function(callback) {
    this.on('tick', callback);
  },

  // @TODO Hide from external callers
  update: function() {
    safety -= 1;
  },
});

///////////////////////
// Private functions //
///////////////////////
var storageKey = 'resources';
var save = function() {
  data = new Map([[ "safety", safety ]]);
  localStorage.setItem(
    storageKey,
    JSON.stringify(Array.from(data.entries()))
  );
};

var load = function() {
  data = localStorage.getItem(storageKey);
  if (data === null) {
    return;
  }
  data = new Map(JSON.parse(data));
  safety = data.get('safety');
};

var reset = function() {
  safety = 0;
  ResourceStore.tick();
};

///////////////////
// Event handler //
///////////////////
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case "RESET":
      reset();
      break;

    case "SAVE":
      save();
      break;

    default:
      return true;
  }

  return true;
});

load();
ResourceStore.start();

module.exports = ResourceStore;
