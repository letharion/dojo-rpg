var PureRenderMixin = require('react/addons').addons.PureRenderMixin,
  ResourceStore = require('../stores/ResourceStore'),
  AppDispatcher = require('../dispatcher/AppDispatcher'),

  classNames = require('classnames')
;

var Upgrade = React.createClass({
  mixins: [PureRenderMixin],

  callback: function() {
    this.props.callback(this.props.upgrade);
  },

  render: function() {
    var canAfford = ResourceStore.validateResourceAvailability(
      this.props.upgrade.costs
    ) ? 'available' : 'unavailable';
    var names = classNames('upgrade', canAfford);
    return <div className={names} onClick={this.callback}>{this.props.label}</div>
  }
});

module.exports = Upgrade;
