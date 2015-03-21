var Immutable = require('immutable'),
  EventEmitter = require('events').EventEmitter,
  _ = require('underscore'),

  AppDispatcher = require('../dispatcher/AppDispatcher'),
  ResourceDefinitions = require('../definitions/Resources'),
  UpgradeStore = require('../stores/UpgradeStore'),
  UpgradeConstants = require('../constants/UpgradeConstants')
;

var resources = new Immutable.Map();
var upgradesPayedFor = new Immutable.Map();

var ResourceStore = _.extend({}, EventEmitter.prototype, {
  dispatchToken: '',

  listResources: function() {
    return [ 'safety', 'thoughts', 'focus' ];
  },

  getResources: function() {
    return resources;
  },

  getResource: function(resource) {
    return resources.get(resource);
  },

  getUpgradePayedFor: function(upgrade) {
    return upgradesPayedFor.get(upgrade);
  },

  validateResourceAvailability: function(requirements) {
    for (var key of requirements.keys()) {
      var price = requirements.get(key);
      if (this.getResource(key) < price) {
        return false;
      }
    }
    return true;
  },

  consumeResources: function(resources) {
    // Do we have enough?
    for (var key of resources.keys()) {
      var price = resources.get(key);
      if (this.getResource(key) < price) {
        return false;
      }
    }

    // All resources available, consume them.
    for (var key of resources.keys()) {
      var price = resources.get(key);
      incrementResource(key, -price);
    }

    return true;
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

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
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

ResourceStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case "RESET":
      reset();
      break;

    case "SAVE":
      save();
      break;

    case UpgradeConstants.PERFORM_UPGRADE:
      if (upgradesPayedFor.get(action.data.name) === true) {
        console.log('This upgrade has already been payed for.');
        break;
      }
      if (ResourceStore.consumeResources(action.data.costs)) {
        upgradesPayedFor = upgradesPayedFor.set(action.data.name, true); 
        ResourceStore.emitChange();
      }
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
