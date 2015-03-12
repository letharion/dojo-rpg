var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var ResourceStore = require('../stores/ResourceStore');
var UpgradeDefinitions = require('../definitions/Upgrades');
var UpgradeStore = require('../stores/UpgradeStore');
var Upgrade = require('./Upgrade.react');

var UpgradeList = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount: function() {
    ResourceStore.addChangeListener(this.onChange);
    UpgradeStore.addChangeListener(this.onChange);
  },

  getInitialState: function() {
    return this.getState();
  },

  onChange: function() {
    this.replaceState(this.getState());
  },

  getState: function() {
    return {
      resources: ResourceStore.getResources(),
      upgrades: UpgradeStore.getUpgrades()
    };
  },

  render: function() {
    var upgrades = [];
    UpgradeDefinitions.map(function(value, key, map) {
      upgrades.push(<Upgrade key={key} label={key} />);
    });

    return (
      <div className="upgradeslist">
        {upgrades}
      </div>
    );
  }
});

module.exports = UpgradeList;
