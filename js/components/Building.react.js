var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Building = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var displayValue = (this.props.safety / 100);
    return <div className="building">{this.props.bld.variations[0]} Safety: {displayValue}</div>
  }
});

module.exports = Building;
