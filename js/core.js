// Set Canvas
const CANVAS_SIZE = 600;
const CELL_BORDER_SIZE = 1;
let gridSize = 16;

const CANVAS = document.querySelector("#canvas");
CANVAS.style.width = CANVAS.style.height = `${CANVAS_SIZE}px`;

function changeBgColour(){
  this.style.backgroundColor = "black";
}

function createGridCells(_gridSize){
  const TOTAL_CELLS = _gridSize * _gridSize;
  const CELL_SIZE = `${(CANVAS_SIZE/_gridSize) - (CELL_BORDER_SIZE*2)}px`;

  for(let i = 0; i < (TOTAL_CELLS); i++){
    const GRID_CELL = document.createElement("div");

    GRID_CELL.style.width = GRID_CELL.style.height = CELL_SIZE;
    GRID_CELL.classList.add("cell");

    CANVAS.appendChild(GRID_CELL);

    GRID_CELL.addEventListener("mouseover", changeBgColour);
  }
}
createGridCells(gridSize);

function clearGridCells(){
  while (CANVAS.firstChild) {
    CANVAS.removeChild(CANVAS.firstChild);
  }
}

// Set Slider
const SLIDER_CONTAINER = document.querySelector("#slider-container");
const SLIDER = document.querySelector("#grid-size-slider");
const SLIDER_VALUE = document.querySelector("#grid-size-value");
SLIDER_VALUE.textContent = `Size: ${SLIDER.value} x ${SLIDER.value}`;

SLIDER.oninput = function(){
  SLIDER.innerHTML = SLIDER_VALUE.textContent = `Size: ${this.value} x ${this.value}`;
  clearGridCells();
  createGridCells(this.value);
}