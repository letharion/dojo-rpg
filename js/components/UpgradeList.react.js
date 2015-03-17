var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var ResourceStore = require('../stores/ResourceStore');
var UpgradeDefinitions = require('../definitions/Upgrades');
var UpgradeStore = require('../stores/UpgradeStore');
var Upgrade = require('./Upgrade.react');
var UpgradeDescription = require('./UpgradeDescription.react');

var currentUpgrade;
var activeUpgrade = function(label) {
  currentUpgrade = label;
}

var UpgradeList = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount: function() {
    ResourceStore.addChangeListener(this.onChange);
    UpgradeStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    ResourceStore.removeChangeListener(this.onChange);
    UpgradeStore.removeChangeListener(this.onChange);
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
    var upgradeDescription;
    if (currentUpgrade === 'calm') {
      upgradeDescription = <UpgradeDescription text='fepfoeaw' />
    }
    UpgradeDefinitions.map(function(value, key, map) {
      var callback = function() {
        activeUpgrade(key);
      }
      upgrades.push(<Upgrade key={key} label={key} callback={callback} />);
    });

    return (
      <div className="upgrades">
        <div className="upgradesList">
          {upgrades}
        </div>
        <div className="UpgradeDescription">
          {upgradeDescription}
        </div>
      </div>
    );
  }
});

module.exports = UpgradeList;
