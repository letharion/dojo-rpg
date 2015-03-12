var Immutable = require('immutable');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Dice = require('../dice');
var _ = require('underscore');

// Resources
var items = new Immutable.Map();

//////////////////
// Store itself //
//////////////////
var PersonalInventoryStore = _.extend({}, EventEmitter.prototype, {
  getItems: function() {
    return items;
  },

  change: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },
});

///////////////////////
// Private functions //
///////////////////////
var storageKey = 'inventory';

// @TODO Move the save/load/reset to a mixin?
var save = function() {
  localStorage.setItem(
    storageKey,
    JSON.stringify(items.toJS())
  );
};

var load = function() {
  data = localStorage.getItem(storageKey);
  if (data === null) {
    return;
  }
  items = new Immutable.Map(JSON.parse(data));
};

var reset = function() {
  items = new Immutable.Map();
  save();
  PersonalInventoryStore.change();
};

var forage = function() {
  var roll = Dice.roll(2);
  if (roll < 6) {
    PersonalInventoryStore.change();
    items = items.set('stick', true);
  }
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

    case "forage":
      forage();
      break;

    default:
      return true;
  }

  return true;
});

load();

module.exports = PersonalInventoryStore;
