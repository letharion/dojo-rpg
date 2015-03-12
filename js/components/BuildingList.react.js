var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var BuildingStore = require('../stores/BuildingStore.js');
var ResourceStore = require('../stores/ResourceStore.js');
var Building = require('./Building.react');

var BuildingList = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount: function() {
    ResourceStore.addChangeListener(this.onChange);
  },

  onChange: function() {
    var newState = this.getBuildingState();
    this.replaceState(newState);
  },

  getBuildingState: function() {
    var bld = BuildingStore.getBuildingItems();
    return bld;
  },

  getInitialState: function() {
    var initialState = this.getBuildingState();
    return initialState;
  },

  render: function() {
    var dojo = this.state.get('Dojo');
    return <Building bld={dojo} />
  }
});

module.exports = BuildingList;
