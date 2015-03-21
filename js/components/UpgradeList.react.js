var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var ResourceStore = require('../stores/ResourceStore'),
  UpgradeDefinitions = require('../definitions/Upgrades'),
  Upgrade = require('./Upgrade.react'),
  UpgradeDescription = require('./UpgradeDescription.react'),
  UpgradeActions = require('../actions/UpgradeActions'),
  UpgradeStore = require('../stores/UpgradeStore')
;

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
    this.setState(this.getState());
  },

  getState: function() {
    return {
      resources: ResourceStore.getResources(),
      upgrades: UpgradeStore.getUpgrades()
    };
  },

  render: function() {
    var self = this,
      upgrades = [],
      size = this.props.size
    ;

    var retCallback = function() {
      self.setState({ currentUpgrade: undefined });
    };

    var upgradeCallback = function() {
      UpgradeActions.upgrade(self.state.currentUpgrade);
    };

    var selectUpgradeCallback = function(upgrade) {
      self.setState({currentUpgrade: upgrade});
    }

    UpgradeDefinitions.map(function(value, key, map) {
      upgrades.push(<Upgrade upgrade={value} key={key} label={key} callback={selectUpgradeCallback} />);
    });

    if (size === "tiny" || size === "small") {
      if (this.state.currentUpgrade) {
        return (
          <div className="UpgradeDescription">
            <UpgradeDescription
              size={size}
              name={currentUpgrade}
              upgrade={UpgradeDefinitions.get(this.state.currentUpgrade)}
              retCallback={retCallback}
              upgradeCallback={upgradeCallback}
            />
          </div>
        );
      }

      return (
        <div className="upgrades">
          <div className="upgradesList">
            {upgrades}
          </div>
        </div>
      );
    }
    else {
      var desc;
      if (this.state.currentUpgrade) {
        desc =
          <div className="UpgradeDescription">
            <UpgradeDescription
              size={size}
              name={currentUpgrade}
              upgrade={this.state.currentUpgrade}
              retCallback={retCallback}
              upgradeCallback={upgradeCallback}
            />
          </div>
        ;
      }

      return (
        <div className="upgrades">
          <div className="upgradesList">
            {upgrades}
          </div>
          {desc}
        </div>
      );
    }
  }
});

module.exports = UpgradeList;
