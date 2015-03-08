window.React = require('react');

var BuildingList = require('./components/BuildingList.react');
var ResetButton = require('./components/Reset.react');

React.render(
  <BuildingList />,
  document.getElementById('building-list')
);

React.render(
  <ResetButton />,
  document.getElementById('controls')
)
