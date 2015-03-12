window.React = require('react');

var ResourceList = require('./components/ResourceList.react');
var ResetButton = require('./components/Reset.react');
var ActionList = require('./components/ActionList.react');
var UpgradeList = require('./components/UpgradeList.react');
var InventoryItem = require('./components/InventoryItem.react');

// @TODO It would probably be prudent to force load all stores here
// as currently they only load if a component depends on them.

// Hidden until there are buildings.
/*
React.render(
  <BuildingList />,
  document.getElementById('building-list')
);
*/

React.render(
  <ResetButton />,
  document.getElementById('controls')
)

React.render(
  <ResourceList />,
  document.getElementById('resourceList')
);

React.render(
  <ActionList />,
  document.getElementById('actionList')
)

React.render(
  <InventoryItem />,
  document.getElementById('inventory')
)

React.render(
  <UpgradeList />,
  document.getElementById('upgradeList')
)
