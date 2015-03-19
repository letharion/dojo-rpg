var Immutable = require('immutable');
var map = Immutable.Map;

module.exports = new Immutable.OrderedMap([
  [ 'calm', {
    label: 'Calm',
    effects: new map([[ "focus", 0.1 ]]),
    cost: new map([[ "focus", 10 ]]),
    requirements: new map([[ "thoughts", 0 ]]),
    description: "Calm permanently increases your focus, decreasing the influx of thoughts."
  }],
  [ 'mantra', {
    label: 'Mantra',
    effects: new map([[ "focus", 0.1 ]]),
    cost: new map([[ "focus", 10 ]]),
    requirements: new map([[ "thoughts", 0 ]]),
    description: "Mantra permanently increases your focus, decreasing the influx of thoughts."
  }]
]);
