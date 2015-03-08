var AppDispatcher = require('../dispatcher/AppDispatcher');

var GameActions = {
  reset: function() {
    AppDispatcher.handleAction({
      actionType: 'RESET',
    })
  },

  save: function() {
    AppDispatcher.handleAction({
      actionType: 'SAVE'
    })
  }
}

// Save every minute.
setInterval(function() {
  GameActions.save();
}, 60000);

module.exports = GameActions;
