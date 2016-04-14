var Snake = require("./snake.js");

function Board() {
  this.snake = new Snake();
  this.board = this.setup();
}

Board.prototype.setup = function() {
  return Array.from(Array(5), function(el){
    return Array(5);
  });
};


Board.prototype.draw = function(){
  var self = this;
  this.snake.segments.forEach(function(el){
    self.board[el[0]][el[1]] = "s"; //take out old sss
  });
};

Board.prototype.step = function() {
  this.snake.move();
};

module.exports = Board;
