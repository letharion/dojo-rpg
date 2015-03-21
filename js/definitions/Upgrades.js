var Immutable = require('immutable');
var map = Immutable.Map;

module.exports = new Immutable.OrderedMap([
  [ 'calm', {
    name: 'calm',
    label: 'Calm',
    effects: new map([[ "focus", 0.1 ]]),
    costs: new map([[ "focus", 1000 ]]),
    requirements: new map([[ "thoughts", 0 ]]),
    description: "Calm permanently increases your focus, decreasing the influx of thoughts."
  }],
  [ 'mantra', {
    name: 'mantra',
    label: 'Mantra',
    effects: new map([[ "focus", 0.1 ]]),
    costs: new map([[ "focus", 1000 ]]),
    requirements: new map([[ "thoughts", 0 ]]),
    description: "Mantra permanently increases your focus, decreasing the influx of thoughts."
  }]
]);
