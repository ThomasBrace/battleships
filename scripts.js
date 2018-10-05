
//setup inital game state
var game = {
    playIndex: 0,
    currentPlayer: 0,
    players:[],
    totalX: 6,
    totalY: 6,
    ships: [],
    //setup function to iterate turns and switch player.
    nextPlayer: function(currentPlayer){
        if (this.currentPlayer == 0){
            this.currentPlayer = 1;
        } else {
            this.currentPlayer = 0;
        }
        this.playIndex ++;
    },
    //setup function to build game grid
    renderGrid: function() {
      for (var p=0;p <= game.players.length-1; p++){
        var grid = "<div class='content'><div class='row'>";
        for (var i=0;i <= game.players[p].cells.length-1; i++){
            if (game.players[p].cells[i].x == game.totalX){
                grid += "<div class='cell' id=cell_" + game.players[p].type + "_" + game.players[p].cells[i].index +"></div></div><div class='row'>"
            } else {
                grid += "<div class='cell' id=cell_" + game.players[p].type + "_" + game.players[p].cells[i].index +"></div>"
            };
        };
        grid = grid.slice(0,grid.lastIndexOf("<div class='row'>")); //remove last unneeded row
        grid = grid + "<div>";
        document.getElementById("container").innerHTML = document.getElementById("container").innerHTML + grid; //render grid to container
      }
    },
    buildPlayers: function() {
        //create grid
        var cells = this.buildGrid();
        //create players and add cell objects.
        game.players.push(new Player("user", cells));
        game.players.push(new Player("alexa", cells));
    },
    buildShips: function() {
        game.ships.push(new Ship("aircraftCarrier", 5));
        game.ships.push(new Ship("battleship", 4));
        game.ships.push(new Ship("submarine", 3));
        game.ships.push(new Ship("cruiser", 3));
        game.ships.push(new Ship("destroyer", 2));
    },
    positionShips: function() {
      //Ships mesured from top left
      //get ship size and determin possible start locations
      var orientation = "";
      var shipY = 1;
      var shipX = 1;

      if (isHorrizontal()){
        orientation = "X";
        shipX = game.ships[0].size; //over write deafult with correct length
      } else {
        orientation = "Y";
        shipY = game.ships[0].size; //over write deafult with correct length
      }

      var currentPos = this.randomLocation(shipX,shipY);

      var tempGrid = this.buildGrid()

      var ShipArrayStartPos = (currentPos[0]+(currentPos[1]*game.totalX)-game.totalX)-1;
      tempGrid[ShipArrayStartPos].content = game.ships[0].type
      //mark grid cells with ship
      for (var i=1;i<=game.ships[0].size ;i++){

      }

      /// you got to here






    },
    randomLocation(shipX,shipY){
      //return a random location with in the currnet gird, if height and width are passed in retun a location the ship will fit into
      var width = this.totalX;
      var height = this.totalY;
      if (shipX > 0){
        width = width - shipX;
      }
      if (shipY > 0){
        height = height - shipY;
      }
      var xPos = Math.floor(Math.random() * width) + 1;
      var yPos = Math.floor(Math.random() * height) + 1;

      return [xPos,yPos]
    },
    buildGrid(){
      //create cell objetcs.
      var currentRow = 1;
      var cells = [];
      for (var i=1;i<=(game.totalX*game.totalY);i++) {
          var currentCol = i%game.totalX;
          if (currentCol == "0") {
              currentCol = game.totalX;
              cells.push(new Cell(currentCol,currentRow,i,null));
              currentRow ++;
          } else {
              cells.push(new Cell(currentCol,currentRow,i,null));
          }
      }
      return cells;
    }
}

function Cell(x,y,index,content){
    this.index = index,
    this.x = x,
    this.y = y,
    this.content = content
}
function Player(type,cells){
    this.type = type,
    this.index = 0,
    this.lines = 0,
    this.maxLength = 0,
    this.cells = cells
}
function Ship(type,size){
    this.type = type,
    this.size = size
}
function isHorrizontal(){
  return Math.random() < 0.5
}

game.buildPlayers();
game.buildShips();
game.renderGrid();
game.positionShips();
