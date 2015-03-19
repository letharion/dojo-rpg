var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var AppDispatcher = require('../dispatcher/AppDispatcher');

var Upgrade = React.createClass({
  mixins: [PureRenderMixin],

  callback: function() {
    this.props.callback(this.props.label);
  },

  render: function() {
    return <div className="upgrade" onClick={this.callback}>{this.props.label}</div>
  }
});

module.exports = Upgrade;
