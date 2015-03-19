var AppDispatcher = require('../dispatcher/AppDispatcher');
var UpgradeConstants = require('../constants/UpgradeConstants');

var UpgradeActions = {
  upgrade: function(upgrade) {
    AppDispatcher.handleAction({
      actionType: UpgradeConstants.PERFORM_UPGRADE,
      data: upgrade
    })
  },
}

module.exports = UpgradeActions;
