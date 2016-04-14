var SnakeView = require ("./snake-view.js"),
    Board = require("./board.js");


$(function(){
  var rootEl = $('.snake');
  var board = new Board();
  var view = new SnakeView(board, rootEl);


  $(this).on("keydown", view.handleKeyEvent.bind(view));
  setInterval(board.step.bind(board), 500);
  setInterval(view.render.bind(view), 500);
}
);
