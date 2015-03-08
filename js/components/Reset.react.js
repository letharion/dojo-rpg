var GameActions = require('../actions/GameActions');

// @TODO Use pure renderer.
var ResetButton = React.createClass({

  reset: function() {
    GameActions.reset();
  },

  render: function() {
    return <a href="#" onClick={this.reset}>Reset game</a>
  }
});

module.exports = ResetButton;
