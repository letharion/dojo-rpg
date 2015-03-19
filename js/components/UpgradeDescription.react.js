var PureRenderMixin = require('react/addons').addons.PureRenderMixin,
  UpgradeTable = require('./UpgradeTable.react')
;

// @TODO Simplify this component by letting the parent decide what to render?
var UpgradeDescription = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var output, data, ret,
      upgrade = this.props.upgrade,
      size = this.props.size,
      desc = <div className="upgrade-description">{this.props.upgrade.description}</div>,
      data = <UpgradeTable upgrade={upgrade} />,
      perform = <div className="upgrade-perform" onClick={this.props.upgradeCallback}>Perform upgrade</div>
    ;

    if (this.props.retCallback !== undefined) {
      ret = <div className="upgrade-return" onClick={this.props.retCallback}>Return</div>
    }

    if (size === "tiny") {
      output = <div>
        {ret}
        {data}
        {perform}
      </div>
    }
    else {
      output = <div>
        {ret}
        {desc}
        {data}
        {perform}
      </div>
    }

    return output
  }
});

module.exports = UpgradeDescription;
