var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var AppDispatcher = require('../dispatcher/AppDispatcher');

var complete;
var intervalTracker;

var Action = React.createClass({
  mixins: [PureRenderMixin],

  trigger: function() {
    // intervalTracker is set while the progressbar is running.
    if (intervalTracker !== undefined) {
      return;
    }

    intervalTracker = setInterval(this.progress, 10);
  },

  progress: function() {
    complete += 1;
    if (complete >= 100) {
      clearInterval(intervalTracker);
      intervalTracker = undefined;
      complete = 0;
    }
    this.replaceState({ "complete": complete });
  },

  render: function() {
    var self = this;
    var callback = function() {
      // @TODO Should this be moved out to a pure action handler?
      AppDispatcher.handleAction({
        actionType: self.props.label,
      })
      // No trigger effect until it can be redone with an animation, and work in Chrome.
      // self.trigger();
    }

    return (
      <div className="action" onClick={callback} >
        {this.props.label}
      </div>
    );
  }
});

module.exports = Action;
