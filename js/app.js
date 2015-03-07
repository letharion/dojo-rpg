window.React = require('react');

var BuildingList = require('./components/BuildingList.react');

React.render(
  <BuildingList />,
  document.getElementById('building-list')
);
