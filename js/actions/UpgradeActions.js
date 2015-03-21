var AppDispatcher = require('../dispatcher/AppDispatcher'),
  UpgradeConstants = require('../constants/UpgradeConstants'),
  ResourceStore = require('../stores/ResourceStore')
;

var UpgradeActions = {
  upgrade: function(upgrade) {
    AppDispatcher.handleAction({
      actionType: UpgradeConstants.PERFORM_UPGRADE,
      data: upgrade
    })
  },
}

module.exports = UpgradeActions;
