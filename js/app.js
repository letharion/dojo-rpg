window.React = require('react');

var BuildingList = require('./components/BuildingList.react');
var ResetButton = require('./components/Reset.react');
var ActionButton = require('./components/Action.react');

React.render(
  <BuildingList />,
  document.getElementById('building-list')
);

React.render(
  <ResetButton />,
  document.getElementById('controls')
)

React.render(
  <ActionButton />,
  document.getElementById('actions')
)
