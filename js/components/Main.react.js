var PureRenderMixin = require('react/addons').addons.PureRenderMixin,
  ResourceList = require('./ResourceList.react'),
  ResetButton = require('./Reset.react'),
  ActionList = require('./ActionList.react'),
  UpgradeList = require('./UpgradeList.react'),
  InventoryItem = require('./InventoryItem.react'),
  mui = require('material-ui'),
  Tabs = mui.Tabs,
  Tab = mui.Tab
;

var Main = React.createClass({
  mixins: [PureRenderMixin],

  // Hidden until there are buildings.
  /*
  React.render(
    <BuildingList />,
    document.getElementById('building-list')
  );
  */

  render: function() {
    var size = this.props.size;

    if (size === 'tiny') {
      return (
        <Tabs tabWidth="100%">
          <Tab label="Resources">
            <ResourceList size={size} />
          </Tab>
          <Tab label="Actions">
            <ActionList size={size} />
          </Tab>
          <Tab label="Upgrades">
            <UpgradeList size={size} />
          </Tab>
        </Tabs>
      );
    }
    else if (size === 'small') {
      return (
        <div>
          <ResetButton />
          <Tabs tabWidth="100%">
            <Tab label="Resources">
              <ResourceList size={size} />
            </Tab>
            <Tab label="Actions">
              <ActionList size={size} />
            </Tab>
            <Tab label="Upgrades">
              <UpgradeList size={size} />
            </Tab>
          </Tabs>
        </div>
      );
    }
    else if (size === "medium") {
      return (
        <div>
          <ResetButton />
          <ResourceList size={size} />
          <Tabs tabWidth="100%">
            <Tab label="Actions">
              <ActionList size={size} />
            </Tab>
            <Tab label="Upgrades">
              <UpgradeList size={size} />
            </Tab>
          </Tabs>
        </div>
      );
    }
    else if (size === "large") {
      return (
        <div>
          <ResetButton />
          <ResourceList size={size} />
          <UpgradeList size={size} />
          <ActionList size={size} />
        </div>
      );
    }
  }
});

module.exports = Main;
