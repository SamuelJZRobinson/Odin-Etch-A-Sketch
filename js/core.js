// Main Container
const MAIN_CONTAINER = document.querySelector("#main-container");

// Canvas
const CANVAS_SIZE = 600;
let gridSize = 16;
const CELL_BORDER_SIZE = 1;
let isDrawing = false;
let selectedTool = null;
let selectedColour = null;

const CANVAS = document.querySelector("#canvas");
MAIN_CONTAINER.style.width = CANVAS.style.width = CANVAS.style.height = `${CANVAS_SIZE}px`;

/**
 * Generates a grid of cells in the canvas.
 * Each cell listens to mouse events and sets the background colour.
 */
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
// Default canvas grid
createGrid();

/**
 * Deletes all cells in the canvas.
 */
function clearGrid(){
  while (CANVAS.firstChild) {
    CANVAS.removeChild(CANVAS.firstChild);
  }
  
  console.log("Cleared grid");
}

/**
 * Sets the background colours of cells based on the selected tool and selected colour.
 * A temporary colour variable is set to preserve the selected colour when using the eraser.
 * 
 * @param {*} e - Triggered mouse event.
 */
function setBgColour(e){
  let colorToApply = (selectedTool === "draw") ? selectedColour : "white";

  // Mouse Event
  if (e.type === "mousedown"){
    isDrawing = true;
    e.target.style.backgroundColor = colorToApply;
  }

  if (e.type === "mouseover" && isDrawing){
    e.target.style.backgroundColor = colorToApply;
  }
}

// Settings
const BUT_DRAW = document.querySelector("#but-draw");
const BUT_ERASE = document.querySelector("#but-erase");

/**
 * Sets all tool buttons to a default state to prepare for another selection.
 * Purely cosmetic and ensures only the selected tool is highlighted.
 */
function deactivateTools(){
  BUT_DRAW.classList.remove("active");
  BUT_ERASE.classList.remove("active");
}

/**
 * Sets the active tool that interacts with the canvas.
 * 
 * @param {*} toolName - The name of the tool being selected that is given an active class.
 */
function setTool(toolName){
  selectedTool = toolName;

  deactivateTools();

  if (selectedTool === "draw") {
    BUT_DRAW.classList.add("active");
  } else if (selectedTool === "erase") {
    BUT_ERASE.classList.add("active");
  }
}
// Default tool
setTool("draw");

const SLIDER_CONTAINER = document.querySelector("#slider-container");
const SLIDER = document.querySelector("#grid-size-slider");
const SLIDER_VALUE = document.querySelector("#grid-size-value");
SLIDER_VALUE.textContent = `Size: ${SLIDER.value} x ${SLIDER.value}`;
SLIDER.addEventListener("change", (e) => setGridSize());

/**
 * Set the quantity of grid cells generated after a change is made to the slider.
 */
function setGridSize(){
  SLIDER.innerHTML = SLIDER_VALUE.textContent = `Size: ${SLIDER.value} x ${SLIDER.value}`;
  gridSize = SLIDER.value
  clearGrid();
  createGrid();
}

/**
 * Dynamically change slider grid size values independent of grid updates.
 */
SLIDER.oninput = function(){
  SLIDER.innerHTML = SLIDER_VALUE.textContent = `Size: ${this.value} x ${this.value}`;
}

/**
 * Set the active colour applied to the canvas.
 * Doesn't apply to the eraser tool.
 * 
 * @param {*} colourName - The name of the colour being selected that is applied to the canvas using the drawing tool.
 */
function setColour(colourName){
  selectedColour = colourName;
}
// Default colour
setColour("black");