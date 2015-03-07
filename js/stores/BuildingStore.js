var Buildings = require('../BuildingData');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var BuildingStore = _.extend({}, EventEmitter.prototype, {

  getBuildingItems: function() {
    return Buildings;
  },
});

module.exports = BuildingStore;
