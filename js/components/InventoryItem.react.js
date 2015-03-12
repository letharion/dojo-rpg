var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var PersonalInventoryStore = require('../stores/PersonalInventoryStore');

var item;

var InventoryItem = React.createClass({
  mixins: [PureRenderMixin],

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
