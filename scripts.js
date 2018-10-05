
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
        var grid = "<div class='content'>";
        for (var i=0;i <= game.players[p].cells.length-1; i++){
          grid += "<div class='row'>";
          for (var x=0;x <= game.players[p].cells[i].length-1; x++){
            grid += "<div class='cell' id=cell_" + game.players[p].type + "_" + game.players[p].cells[i][x].index +"></div>";
          }
          grid += "</div>";
        }
        grid += "</div>";
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
      //Grid mesured from top left
      //get ship size and determin possible start locations
      var orientation = "";
      var shipY = 1;
      var shipX = 1;

      if (isHorrizontal()){
        orientation = "X";
        shipX = game.ships[0].size; //overwrite deafult width correct length
      } else {
        orientation = "Y";
        shipY = game.ships[0].size; //overwrite deafult width correct length
      }

      var currentPos = this.randomLocation(shipX,shipY);

      var tempGrid = this.buildGrid()

      tempGrid[currentPos[0]][currentPos[1]].content = game.ships[0].type

      console.log(tempGrid)

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
      var cells = [[]];
      for (var i=1;i<=(game.totalY*game.totalX);i++) {
          var currentCol = i%game.totalX;
          if (currentCol == "0") {
              cells.push(new Array())
              currentCol = game.totalX;
              cells[currentRow-1].push(new Cell(currentCol,currentRow,i,null));
              currentRow ++; //move to next sub array
          } else {
              cells[currentRow-1].push(new Cell(currentCol,currentRow,i,null));
          }
      }
      cells.splice(-1,1) //remove last random array entry
      return cells


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
