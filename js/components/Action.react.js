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
    intervalTracker = setInterval(this.progress, 50);
  },

  progress: function() {
    complete += 1;
    if (complete >= 100) {
      clearInterval(intervalTracker);
      complete = 0;
    }
    this.replaceState({ "complete": complete });
  },

  render: function() {
    // @TODO Create a actions list component and move the button content out of here.
    return (
      <div className="action" onClick={this.trigger} >
        <Progress completed={complete} />
        Forage
      </div>
    );
  }
});

module.exports = Action;
