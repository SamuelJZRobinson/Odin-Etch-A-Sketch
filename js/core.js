// Set Variables
const GRID_SIZE = 600;
const CELL_BORDER_SIZE = 1;
let rows = 16;
let cols = 16;

// Set Canvas
const CANVAS = document.querySelector("#canvas");
CANVAS.style.width = `${GRID_SIZE}px`;
CANVAS.style.height = `${GRID_SIZE}px`;

// Set Grid Cells
function changeBgColour(){
  this.style.backgroundColor = "black";
}

function createGridCells(){
  for(let i = 0; i < (rows * cols); i++){
    const GRID_CELL = document.createElement("div");

    GRID_CELL.style.width = `${(GRID_SIZE/cols) - (CELL_BORDER_SIZE*2)}px`;
    GRID_CELL.style.height = `${(GRID_SIZE/rows) - (CELL_BORDER_SIZE*2)}px`;
    GRID_CELL.classList.add("cell");

    CANVAS.appendChild(GRID_CELL);

    GRID_CELL.addEventListener("mouseover", changeBgColour);
  }
}
createGridCells();