var Dice = {
  roll: function(num) {
    return Math.round(this.rollRaw(num));
  },

  rollRaw: function(num) {
    var face;
    var total = 0;

    while (num > 0) {
      face = Math.random() * (6 - 1) + 1;
      if (face === 6) {
        num += 2;
      }
      total += face;
      num--;
    }

    return total;
  }
}
module.exports = Dice;
