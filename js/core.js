// Set Main Container
const MAIN_CONTAINER = document.querySelector("#main-container");

// Set Canvas
const CANVAS_SIZE = 600;
let gridSize = 16;
const CELL_BORDER_SIZE = 1;
let isDrawing = false;
let selectedTool = null;
let selectedColour = "black";

const CANVAS = document.querySelector("#canvas");
MAIN_CONTAINER.style.width = CANVAS.style.width = CANVAS.style.height = `${CANVAS_SIZE}px`;

function createGrid(){
  const TOTAL_CELLS = gridSize * gridSize;
  const CELL_SIZE = (CANVAS_SIZE/gridSize) - (CELL_BORDER_SIZE*2);

  for(let i = 0; i < (TOTAL_CELLS); i++){
    const GRID_CELL = document.createElement("div");

    GRID_CELL.style.width = GRID_CELL.style.height = `${CELL_SIZE}px`;
    GRID_CELL.classList.add("cell");
    CANVAS.appendChild(GRID_CELL);

    GRID_CELL.addEventListener("mousedown", (e)=> setBgColour(e));
    GRID_CELL.addEventListener("mouseover", (e)=> setBgColour(e));
    GRID_CELL.addEventListener("mouseup", (e)=> isDrawing = false);
    GRID_CELL.addEventListener("dragstart", (e) => (e.preventDefault()));
  }

  console.log("Created grid");
}
createGrid();

function clearGrid(){
  while (CANVAS.firstChild) {
    CANVAS.removeChild(CANVAS.firstChild);
  }
  
  console.log("Cleared grid");
}

function setBgColour(e){
  // Set Colour
  if (selectedTool == "draw"){
    selectedColour = "black";
  }

  if (selectedTool == "erase"){
    selectedColour = "white";
  }

  // Mouse Event
  if (e.type === "mousedown"){
    isDrawing = true;
    e.target.style.backgroundColor = selectedColour;
  }

  if (e.type === "mouseover" && isDrawing){
    e.target.style.backgroundColor = selectedColour;
  }
}

// Set Options
const BUT_DRAW = document.querySelector("#but-draw");
const BUT_ERASE = document.querySelector("#but-erase");

function setDefaultToolBgColour(){
  BUT_DRAW.classList.remove("active");
  BUT_ERASE.classList.remove("active");
}

function setTool(toolName){
  selectedTool = toolName;

  setDefaultToolBgColour();

  if (selectedTool === "draw") {
    BUT_DRAW.classList.add("active");
  } else if (selectedTool === "erase") {
    BUT_ERASE.classList.add("active");
  }
}
setTool("draw");

const SLIDER_CONTAINER = document.querySelector("#slider-container");
const SLIDER = document.querySelector("#grid-size-slider");
const SLIDER_VALUE = document.querySelector("#grid-size-value");
SLIDER_VALUE.textContent = `Size: ${SLIDER.value} x ${SLIDER.value}`;

SLIDER.oninput = function(){
  SLIDER.innerHTML = SLIDER_VALUE.textContent = `Size: ${this.value} x ${this.value}`;
  gridSize = this.value
  clearGrid();
  createGrid();
}