var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var ResourceStore = require('../stores/ResourceStore.js');
var Resource = require('./Resource.react');

var ResourceList = React.createClass({
  mixins: [PureRenderMixin],

  componentDidMount: function() {
    ResourceStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    ResourceStore.removeChangeListener(this.onChange);
  },

  getInitialState: function() {
    return ResourceStore.getResources();
  },

  onChange: function() {
    this.replaceState(ResourceStore.getResources());
  },

  render: function() {
    var resources = [];
    this.state.map(function(value, key, map) {
      resources.push(<Resource key={key} label={key} value={value} />);
    });

    return (
      <div className="resource-list">
        {resources}
      </div>
    );
  }
});

module.exports = ResourceList;
