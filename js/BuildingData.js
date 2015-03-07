module.exports = new Map([
  //----------------------------------- Food production ----------------------------------------
  [ "Dojo", {
    variations: [ "Shelter", "Shack", "Log cabin", "Dojo" ],
    prices: new Map([[ "catnip", 10 ]]),
    effects: new Map([
      [ "production", [ { "safety": 0.1 }]]
    ]),
  } ],
]);
