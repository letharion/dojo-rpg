var Immutable = require('immutable');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ResourceDefinitions = require('../definitions/Resources');
var UpgradeStore = require('../stores/UpgradeStore');

// Resources
var resources = new Immutable.Map();

//////////////////
// Store itself //
//////////////////
var ResourceStore = _.extend({}, EventEmitter.prototype, {
  listResources: function() {
    return [ 'safety', 'thoughts', 'focus' ];
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
      var baseRes = ResourceDefinitions.get(allRes[i]);
      if (baseRes.production === undefined) {
        continue;
      }

      var value = resources.get(allRes[i]) || 0;
      resources = resources.set(allRes[i], value + baseRes.production);
    }
    if (UpgradeStore.getUpgrades().get('calm')) {
      incrementResource('focus', 1);
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
  resources = new Immutable.Map();
  save();
  ResourceStore.emitChange();
};

var incrementResource = function (res, value) {
  var current = resources.get(res) || ResourceDefinitions.get(res).def;
  resources = resources.set(res, current + value);
}

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
      incrementResource('thoughts', -5);
      incrementResource('focus', 10);
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
