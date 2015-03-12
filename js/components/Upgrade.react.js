var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var AppDispatcher = require('../dispatcher/AppDispatcher');

var Upgrade = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var self = this;
    var callback = function() {
      // @TODO Should this be moved out to a pure action handler?
      AppDispatcher.handleAction({
        actionType: self.props.label,
      })
    }

    return <div className="upgrade" onClick={callback}>{this.props.label}</div>
  }
});

module.exports = Upgrade;
