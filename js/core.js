// Set Variables
const CANVAS_SIZE = 600;
const CELL_BORDER_SIZE = 1;
let GRID_SIZE = 16;

// Set Canvas
const CANVAS = document.querySelector("#canvas");
CANVAS.style.width = CANVAS.style.height = `${CANVAS_SIZE}px`;

// Set Grid Cells
function changeBgColour(){
  this.style.backgroundColor = "black";
}

function createGridCells(){
  const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
  const CELL_SIZE = `${(CANVAS_SIZE/GRID_SIZE) - (CELL_BORDER_SIZE*2)}px`;

  for(let i = 0; i < (TOTAL_CELLS); i++){
    const GRID_CELL = document.createElement("div");

    GRID_CELL.style.width = GRID_CELL.style.height = CELL_SIZE;
    GRID_CELL.classList.add("cell");

    CANVAS.appendChild(GRID_CELL);

    GRID_CELL.addEventListener("mouseover", changeBgColour);
  }
}
createGridCells();