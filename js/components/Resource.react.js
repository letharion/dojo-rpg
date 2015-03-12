var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Resource = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var displayValue = (this.props.value / 100);
    return <div className="resource">{this.props.label}: {displayValue}</div>
  }
});

module.exports = Resource;
