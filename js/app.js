window.React = require('react');

var ResourceList = require('./components/ResourceList.react'),
  ResetButton = require('./components/Reset.react'),
  ActionList = require('./components/ActionList.react'),
  UpgradeList = require('./components/UpgradeList.react'),
  InventoryItem = require('./components/InventoryItem.react'),
  mui = require('material-ui'),
  Tabs = mui.Tabs,
  Tab = mui.Tab,
  injectTapEventPlugin = require("react-tap-event-plugin")
;

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo: https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


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

if (w < 900) {
React.render(
  <Tabs tabWidth="100%">
    <Tab label="Upgrades">
      <UpgradeList />
    </Tab>
    <Tab label="Resources">
      <ResourceList />
    </Tab>
    <Tab label="Actions">
      <ActionList />
    </Tab>
  </Tabs>,
  document.getElementById('mainTabs')
);
}
else {
React.render(
  <Tabs tabWidth="33%">
    <Tab label="Upgrades">
      <UpgradeList />
    </Tab>
    <Tab label="Resources">
      <ResourceList />
    </Tab>
    <Tab label="Actions">
      <ActionList />
    </Tab>
  </Tabs>,
  document.getElementById('mainTabs')
);
}
