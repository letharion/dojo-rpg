window.React = require('react');

var BuildingList = require('./components/BuildingList.react');
var ResetButton = require('./components/Reset.react');
var ActionButton = require('./components/Action.react');
var InventoryItem = require('./components/InventoryItem.react');

// @TODO It would probably be prudent to force load all stores here
// as currently they only load if a component depends on them.

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

React.render(
  <InventoryItem />,
  document.getElementById('inventory')
)
