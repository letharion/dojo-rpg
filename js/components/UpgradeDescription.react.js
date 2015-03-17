var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var AppDispatcher = require('../dispatcher/AppDispatcher');

var UpgradeDescription = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var text = "Calm permanently increases your focus, decreasing the influx of thoughts. Price 10 focus. Pre-requisite: =< 0 thoughts.";
    return <div className="upgrade-description">{text}</div>
  }
});

module.exports = UpgradeDescription;
