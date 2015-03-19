window.React = require('react');

var injectTapEventPlugin = require("react-tap-event-plugin"),
  Main = require("./components/Main.react")
;

// @TODO It would probably be prudent to force load all stores here
// as currently they only load if a component depends on them.

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo: https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

main = function(e) {
  var w = Math.max(document.documentElement.clientWidth,  window.innerWidth  || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  // @TODO Replace with 'enums'.
  var size = 'tiny';
  if (w > 900) {
    size = 'large';
  }
  else if (w > 600) {
    size = 'medium';
  }
  else if (w > 300) {
    size = 'small';
  }

  React.render(
    <Main size={size} />,
    document.getElementById('main')
  );
}

main();

// Re-render if the viewport size changes.
(function() {
  var waiting;
  var handleResize = function(e) {
    if (waiting !== undefined) {
      clearTimeout(waiting);
    }

    waiting = setTimeout(function() {
      clearTimeout(waiting);
      // @TODO What exactly is the consequence on the stores here?
      main();
    }, 500);
  }
  window.addEventListener('resize', handleResize);
})();
