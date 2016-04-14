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
