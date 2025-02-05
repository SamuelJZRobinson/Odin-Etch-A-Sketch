// Set Variables
const CANVAS_SIZE = 600;
const CELL_BORDER_SIZE = 1;
let GRID_SIZE = 16;

// Set Canvas
const CANVAS = document.querySelector("#canvas");
CANVAS.style.width = `${CANVAS_SIZE}px`;
CANVAS.style.height = `${CANVAS_SIZE}px`;

// Set Grid Cells
function changeBgColour(){
  this.style.backgroundColor = "black";
}

function createGridCells(){
  for(let i = 0; i < (GRID_SIZE * GRID_SIZE); i++){
    const GRID_CELL = document.createElement("div");

    GRID_CELL.style.width = `${(CANVAS_SIZE/GRID_SIZE) - (CELL_BORDER_SIZE*2)}px`;
    GRID_CELL.style.height = `${(CANVAS_SIZE/GRID_SIZE) - (CELL_BORDER_SIZE*2)}px`;
    GRID_CELL.classList.add("cell");

    CANVAS.appendChild(GRID_CELL);

    GRID_CELL.addEventListener("mouseover", changeBgColour);
  }
}
createGridCells();