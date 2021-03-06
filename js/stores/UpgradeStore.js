var Immutable = require('immutable'),
  _ = require('underscore'),
  EventEmitter = require('events').EventEmitter,
  AppDispatcher = require('../dispatcher/AppDispatcher'),
  UpgradeDefinitions = require('../definitions/Upgrades'),
  UpgradeConstants = require('../constants/UpgradeConstants')
;

var upgrades = new Immutable.Map();

var UpgradeStore = _.extend({}, EventEmitter.prototype, {
  getUpgrades: function() {
    return upgrades;
  },

  getUpgrade: function(upgrade) {
    return upgrades.get(upgrade);
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
});

///////////////////////
// Private functions //
///////////////////////
var storageKey = 'upgrades';

var save = function() {
  localStorage.setItem(
    storageKey,
    JSON.stringify(upgrades.toJS())
  );
};

var load = function() {
  data = localStorage.getItem(storageKey);

  if (data === null) {
    return;
  }
  upgrades = new Immutable.Map(JSON.parse(data));
};

var reset = function() {
  upgrades = new Immutable.Map();
  save();
  UpgradeStore.emitChange();
};

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

    case UpgradeConstants.PERFORM_UPGRADE:
      // @TODO Why doesn't it work to require this at the top?
      var ResourceStore = require('../stores/ResourceStore');
      // ResourceStore is responsible for ensuring we have consumed the
      // appropriate resoures before we enable the upgrade.
      AppDispatcher.waitFor([ ResourceStore.dispatchToken ]);
      var payed = ResourceStore.getUpgradePayedFor(action.data.name);
      if (payed === true) {
        upgrades = upgrades.set(action.data.name, true);
      }
      break;

    default:
      return true;
  }

  return true;
});

load();

module.exports = UpgradeStore;
