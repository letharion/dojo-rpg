var AppDispatcher = require('../dispatcher/AppDispatcher');
var Action = require('./Action.react');

// @TODO Work out how to get the mixin working here.
// var PureRenderMixin = React.addons.PureRenderMixin;
var ActionList = React.createClass({
  //mixins: [PureRenderMixin],
  componentDidMount: function() {
  },

  render: function() {
    var actions = allActions.map(function(resource, resourceId, resources) {
      return <Action key={resource} label={resource} />;
    });

    return (
      <div className="actionList" >
        {actions}
      </div>
    );
  }
});

var allActions = [ "forage", "focus" ];

module.exports = ActionList;
