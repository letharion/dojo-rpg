var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Action = require('./Action.react');

var ActionList = React.createClass({
  mixins: [PureRenderMixin],

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
