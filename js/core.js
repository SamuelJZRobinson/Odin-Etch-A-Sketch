// Set Canvas
const CANVAS_SIZE = 600;
const CELL_BORDER_SIZE = 1;
let gridSize = 16;

const MAIN_CONTAINER = document.querySelector("#main-container");

const CANVAS = document.querySelector("#canvas");
MAIN_CONTAINER.style.width = CANVAS.style.width = CANVAS.style.height = `${CANVAS_SIZE}px`;

function changeBgColour(){
  this.style.backgroundColor = "black";
}

function createGridCells(){
  const TOTAL_CELLS = gridSize * gridSize;
  const CELL_SIZE = `${(CANVAS_SIZE/gridSize) - (CELL_BORDER_SIZE*2)}px`;

  for(let i = 0; i < (TOTAL_CELLS); i++){
    const GRID_CELL = document.createElement("div");

    GRID_CELL.style.width = GRID_CELL.style.height = CELL_SIZE;
    GRID_CELL.classList.add("cell");

    CANVAS.appendChild(GRID_CELL);

    GRID_CELL.addEventListener("mouseover", changeBgColour);
  }

  console.log("Created grid");
}
createGridCells();

function clearGridCells(){
  while (CANVAS.firstChild) {
    CANVAS.removeChild(CANVAS.firstChild);
  }
  
  console.log("Cleared grid");
}

// Set Options
const BUT_CLEAR = document.querySelector("#But-Clear");

const SLIDER_CONTAINER = document.querySelector("#slider-container");
const SLIDER = document.querySelector("#grid-size-slider");
const SLIDER_VALUE = document.querySelector("#grid-size-value");
SLIDER_VALUE.textContent = `Size: ${SLIDER.value} x ${SLIDER.value}`;

SLIDER.oninput = function(){
  SLIDER.innerHTML = SLIDER_VALUE.textContent = `Size: ${this.value} x ${this.value}`;
  gridSize = this.value
  clearGridCells();
  createGridCells();
}