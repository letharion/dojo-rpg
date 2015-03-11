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

    // @TODO Should this be moved out to a pure action handler?
    AppDispatcher.handleAction({
      actionType: 'forage',
    })

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
    // @TODO Create a actions list component and move the button content out of here.
    if (complete > 0) {
      return (
        <div className="action" >
        <Progress completed={complete} />
        Forage
        </div>
      );
    }

    return (
      <div className="action" onClick={this.trigger} >
        <Progress completed={complete} />
        Forage
      </div>
    );
  }
});

module.exports = Action;
