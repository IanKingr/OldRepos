var Board = require("./board.js");

function SnakeView(board, DOM) {
  this.DOM = DOM;
  this.board = board;

  $(this.DOM).append(this.setup());
  this.render();
}

SnakeView.prototype.handleKeyEvent = function(event) {
  var currentKey = event.keyCode;
  switch (currentKey){
    case 37:
      this.board.snake.turn("LEFT");
      break;
    case 38:
      this.board.snake.turn("UP");
      break;
    case 39:
      this.board.snake.turn("RIGHT");
      break;
    case 40:
      this.board.snake.turn("DOWN");
      break;
  }
};


SnakeView.prototype.setup = function() {
  var $grid = $("<ul>").addClass("group");

  for (var i = 0; i < 5; i++) {
    var $div = $("<div>");
    for (var j = 0; j < 5; j++) {
      var $li = $("<li>").attr("data-pos", [i,j] );
      $div.append($li);
    }
    $grid.append($div);
  }
  return $grid;
};


SnakeView.prototype.render = function() {
  this.board.draw();
  this.board.board.forEach(function(el, i){
    for (var j = 0; j < el.length; j++) {
      if(el[j] === "s"){
        var $row = $("ul div").eq(i);
        $row.find('li').eq(j).addClass("snakebody");
      } else {
        var $row = $("ul div").eq(i);
        $row.find('li').eq(j).removeClass("snakebody");
      }
    }
  });
};

module.exports = SnakeView;
