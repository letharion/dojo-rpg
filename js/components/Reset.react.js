var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var GameActions = require('../actions/GameActions');

var ResetButton = React.createClass({
  mixins: [PureRenderMixin],

  reset: function() {
    GameActions.reset();
  },

  render: function() {
    return <a href="#" onClick={this.reset}>Reset game</a>
  }
});

module.exports = ResetButton;
