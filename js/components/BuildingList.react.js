var BuildingStore = require('../stores/BuildingStore.js');
var ResourceStore = require('../stores/ResourceStore.js');
var Building = require('./Building.react');

// @TODO Use pure renderer.
var BuildingList = React.createClass({

  componentDidMount: function() {
    ResourceStore.addChangeListener(this.onChange);
  },

  onChange: function() {
    var newState = this.getBuildingState();
    this.replaceState(newState);
  },

  // @TODO Make state rely on a immutable structure.
  getBuildingState: function() {
    var bld = BuildingStore.getBuildingItems();
    bld.set('safety', ResourceStore.getSafety());
    return bld;
  },

  getInitialState: function() {
    var initialState = this.getBuildingState();
    return initialState;
  },

  render: function() {
    var dojo = this.state.get('Dojo');
    var safety = this.state.get('safety');
    return <Building bld={dojo} safety={safety} />
  }
});

module.exports = BuildingList;
