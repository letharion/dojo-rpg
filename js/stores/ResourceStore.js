var Immutable = require('immutable');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

// Resources
var resources = new Immutable.Map();

//////////////////
// Store itself //
//////////////////
var ResourceStore = _.extend({}, EventEmitter.prototype, {
  listResources: function() {
    return [ 'safety', 'thoughts' ];
  },

  getResources: function() {
    return resources;
  },
  getResource: function(resource) {
    return resources.get(resource);
  },

  start: function() {
    var self = this;
    setInterval(function() {
      self.update();
      self.emitChange();
    }, 1000);
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // @TODO Hide from external callers
  update: function() {
    var allRes = this.listResources();
    for (var i = 0; i < allRes.length; i++) {
      // @TODO Move this out to a generic resource producer.
      inc = 1;
      if (allRes[i] === 'safety') {
        inc = -1;
      }
      var value = resources.get(allRes[i]) || 0;
      resources = resources.set(allRes[i], value + inc);
    }
  },
});

///////////////////////
// Private functions //
///////////////////////
var storageKey = 'resources';
var save = function() {
  localStorage.setItem(
    storageKey,
    JSON.stringify(resources.toJS())
  );
};

var load = function() {
  data = localStorage.getItem(storageKey);

  if (data === null) {
    return;
  }
  resources = new Immutable.Map(JSON.parse(data));

  for (var i = 0; i < ResourceStore.listResources().length; i++) {
    if (resources.get(ResourceStore.listResources()[i]) === undefined) {
      resources = resources.set(ResourceStore.listResources()[i], 0);
    }
  }
};

var reset = function() {
  resources = new Immutable.Map([
    [ 'safety', 0 ],
    [ 'thoughts', 0 ]
  ]);
  ResourceStore.emitChange();
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

    case "focus":
      resources = resources.set('thoughts', resources.get('thoughts') - 10);
      ResourceStore.emitChange();
      break;

    default:
      return true;
  }

  return true;
});

load();
ResourceStore.start();

module.exports = ResourceStore;
