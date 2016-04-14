/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var SnakeView = __webpack_require__ (1),
	    Board = __webpack_require__(2);


	$(function(){
	  var rootEl = $('.snake');
	  var board = new Board();
	  var view = new SnakeView(board, rootEl);


	  $(this).on("keydown", view.handleKeyEvent.bind(view));
	  setInterval(board.step.bind(board), 500);
	  setInterval(view.render.bind(view), 500);
	}
	);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(3);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Snake() {
	  this.direction = ["N", "E", "S", "W"];
	  this.segments = [ [1, 3], [1, 4] ];
	  this.currentDirection = "N";
	  this.length = this.segments.length;
	}

	Snake.prototype.move = function() {
	  var coord = undefined;
	  if(this.currentDirection === "N"){
	    coord = [-1, 0];
	  } else if(this.currentDirection === "S"){
	    coord = [1, 0];
	  } else if (this.currentDirection === "E"){
	    coord = [0, 1];
	  } else {
	    coord = [0, -1];
	  }
	  this.segments.unshift(Coord.plus(this.segments[0], coord));
	  this.segments.pop();
	};

	Snake.prototype.turn = function(intendedDirection) {
	  switch(intendedDirection){
	    case "UP":
	      if (this.currentDirection !== "S"){
	        this.currentDirection = "N";
	      }
	      break;
	    case "DOWN":
	      if (this.currentDirection !== "N"){
	        this.currentDirection = "S";
	      }
	      break;
	    case "LEFT":
	      if (this.currentDirection !== "E"){
	        this.currentDirection = "W";
	      }
	      break;
	    case "RIGHT":
	      if (this.currentDirection !== "W"){
	        this.currentDirection = "E";
	      }
	      break;
	  }
	};

	module.exports = Snake;

	function Coord() {

	}

	Coord.plus = function(coord1, coord2) {
	  return [coord1[0] + coord2[0], coord1[1] + coord2[1]];
	};

	Coord.prototype.equals = function(coord1, coord2) {
	  return coord1 === coord2;
	};

	Coord.prototype.isOpposite = function() {

	};


/***/ }
/******/ ]);