var AppDispatcher = require('../dispatcher/AppDispatcher');
var Progress = require('react-progressbar');

var complete;
var intervalTracker;
// @TODO Work out how to get the mixin working here.
// var PureRenderMixin = React.addons.PureRenderMixin;
var Action = React.createClass({
  //mixins: [PureRenderMixin],
  componentDidMount: function() {
    complete = complete || 0;
    this.replaceState({ "complete": complete });
  },

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

    if (complete > 0) {
      return (
        <div className="action" >
        {this.props.label}
        </div>
      );
    }

    return (
      <div className="action" onClick={callback} >
        <Progress completed={complete} />
        {this.props.label}
      </div>
    );
  }
});

module.exports = Action;
