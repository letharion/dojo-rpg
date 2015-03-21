var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var UpgradeTable = React.createClass({
  mixins: [PureRenderMixin],

  mapToStr: function(p, c, i, x) {
    return i + ": " + c;
  },

  render: function() {
    var upgrade = this.props.upgrade;

    return (
      <div className="upgradeTable">
        <div>Costs:</div>
        <div>{upgrade.costs.reduce(this.mapToStr, "")}</div>
        <div>{upgrade.effects.reduce(this.mapToStr, "")}</div>
        <div>{upgrade.requirements.reduce(this.mapToStr, "")}</div>
      </div>
    );
  }
});

module.exports = UpgradeTable;
