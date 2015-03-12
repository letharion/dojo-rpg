var ResourceStore = require('../stores/ResourceStore.js');
var Resource = require('./Resource.react');

// @TODO Use pure renderer.
var ResourceList = React.createClass({

  componentDidMount: function() {
    ResourceStore.addChangeListener(this.onChange);
  },

  getInitialState: function() {
    return ResourceStore.getResources();
  },

  onChange: function() {
    this.replaceState(ResourceStore.getResources());
  },

  render: function() {
    var resources = Array.from(this.state.entries()).map(function(a, b, c) {
      return <Resource key={b} label={a[0]} value={a[1]} />
    });

    return (
      <div>
        {resources}
      </div>
    );
  }
});



module.exports = ResourceList;
