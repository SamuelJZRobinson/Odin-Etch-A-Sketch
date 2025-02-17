// Tutorials Used:
// Marvin Botchway.(16 October 2023).Etch a sketch JavaScript (Part 4).YouTube.https://www.youtube.com/watch?v=18gRh7-qg3w

// DOM
const MAIN_CONTAINER = document.querySelector("#container");

const BUT_CLEAR_CANVAS = document.querySelector("button#clear-canvas");
const BUT_TOOLS = document.querySelectorAll("button.tools");
const BUT_COLOURS = document.querySelectorAll("button.colours");
const SLIDER = document.querySelector("#grid-size-slider");
const SLIDER_VALUE = document.querySelector("#grid-size-value");

const CANVAS = document.querySelector("#canvas");

// Events
// Clear canvas
BUT_CLEAR_CANVAS.addEventListener("click",(e) =>{
  createCanvas();
})

// Select tool
BUT_TOOLS.forEach(button => {
  button.addEventListener("click",(e) =>{
    const TOOL = button.dataset.tool ;
    setTool(TOOL);
    updateToolUI(e);
  })
})

// Select colour
BUT_COLOURS.forEach(button => {
  button.addEventListener("click",(e) =>{
    const COLOUR = button.dataset.colour;
    setColour(COLOUR);
  });
})

// Select grid size
SLIDER.addEventListener("change", (e) => setGridSize());
SLIDER_VALUE.textContent = `Size: ${SLIDER.value} x ${SLIDER.value}`;

// Update grid size text
SLIDER.oninput = (e) => {
  updateGridSizeUI(e);
}

// Global Variables
const CANVAS_SIZE = CANVAS.offsetWidth;
let gridSize = 16;
const CELL_BORDER_SIZE = 1;
let isDrawing = false;
let selectedTool = "draw";
let selectedColour = "black";

// Core Logic
// Set default values
createCanvas();
BUT_TOOLS[0].classList.add("active");

/**
 * Clears all canvas cells by deleting them
 */
function clearCanvas() {
  while (CANVAS.firstChild) {
    CANVAS.removeChild(CANVAS.firstChild);
  }

  console.log("Cleared canvas");
}

/**
 * Generates cells and inserts them into the canvas.
 * Each cell listens to mouse events and sets the background colour.
 */
function createCanvas() {
  clearCanvas();
  const TOTAL_CELLS = gridSize * gridSize;
  CANVAS.style.gridTemplateColumns = CANVAS.style.gridTemplateRows = `repeat(${gridSize},1fr)`;

  for(let i = 0; i < TOTAL_CELLS; i++) {
    const GRID_CELL = document.createElement("div");
    GRID_CELL.classList.add("cell");
    GRID_CELL.addEventListener("mousedown", (e)=> setBgColour(e));
    GRID_CELL.addEventListener("mouseover", (e)=> setBgColour(e));
    GRID_CELL.addEventListener("mouseup", (e)=> isDrawing = false);
    GRID_CELL.addEventListener("dragstart", (e) => (e.preventDefault()));
    CANVAS.appendChild(GRID_CELL);
  }

  console.log("Created canvas");
}

/**
 * Sets the background colours of cells based on the selected tool and selected colour.
 * 
 * @param {*} e mouse event grid cell
 */
function setBgColour(e) {
  // Preserve the selected colour when using the eraser.
  let colorToApply = (selectedTool === "draw") ? selectedColour : "white";

  if (e.type === "mousedown") {
    isDrawing = true;
    e.target.style.backgroundColor = colorToApply;
  }

  if (e.type === "mouseover" && isDrawing) {
    e.target.style.backgroundColor = colorToApply;
  }
}

/**
 * Sets the active tool that interacts with the canvas.
 * 
 * @param {*} tool string tool name
 */
function setTool(tool){
  selectedTool = tool;
  console.log("Set tool:",tool);
}

/**
 * Updates the selected tool button with the active class to highlight it.
 */
function updateToolUI(e) {
  BUT_TOOLS.forEach(button =>{
    button.classList.remove("active");
  })

  e.currentTarget.classList.add("active");
}

/**
 * Set the quantity of grid cells generated based on the slider value and updates the canvas.
 */
function setGridSize() {
  gridSize = SLIDER.value
  createCanvas();
}

/**
 * Dynamically changes the slider grid size value independent of canvas updates.
 */
function updateGridSizeUI(e) {
  const GRID_SIZE_VALUE = e.target.value;
  SLIDER.innerHTML = SLIDER_VALUE.textContent = `Size: ${GRID_SIZE_VALUE} x ${GRID_SIZE_VALUE}`;
}

/**
 * Set the active colour applied to the canvas.
 * 
 * @param {*} colour string colour name
 */
function setColour(colour) {
  selectedColour = colour;
  console.log("Set colour:",colour);
}