var AppDispatcher = require('../dispatcher/AppDispatcher');
var PersonalInventoryStore = require('../stores/PersonalInventoryStore');

var item;
//
// @TODO Work out how to get the mixin working here.
// var PureRenderMixin = React.addons.PureRenderMixin;
var InventoryItem = React.createClass({
  //mixins: [PureRenderMixin],

  getInitialState: function() {
    return PersonalInventoryStore.getItems();
  },

  componentDidMount: function() {
    PersonalInventoryStore.addChangeListener(this.onChange);
  },

  onChange: function() {
    this.replaceState(PersonalInventoryStore.getItems());
  },

  render: function() {
    // @TODO Create a actions list component and move the button content out of here.
    var stick = this.state.get('stick');
    if (stick === undefined) {
      return <div />;
    }
    return (
      <div className="item" >
        "stick"
      </div>
    );
  }
});

module.exports = InventoryItem;
