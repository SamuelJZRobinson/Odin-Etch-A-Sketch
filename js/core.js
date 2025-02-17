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
BUT_CLEAR_CANVAS.addEventListener("click",(e) =>{
  createCanvas();
})

BUT_TOOLS.forEach(button => {
  button.addEventListener("click",(e) =>{
    const TOOL = button.dataset.tool ;
    setTool(TOOL);
    updateToolUI(e);
  })
})

BUT_COLOURS.forEach(button => {
  button.addEventListener("click",(e) =>{
    const COLOUR = button.dataset.colour;
    setColour(COLOUR);
  });
})

SLIDER.addEventListener("change", (e) => setGridSize());
SLIDER_VALUE.textContent = `Size: ${SLIDER.value} x ${SLIDER.value}`;

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
createCanvas();
BUT_TOOLS[0].classList.add("active");

/**
 * Clears all cells in the canvas.
 */
function clearCanvas(){
  while (CANVAS.firstChild) {
    CANVAS.removeChild(CANVAS.firstChild);
  }
  console.log("Cleared canvas");
}

/**
 * Generates a grid of cells in the canvas.
 * Each cell listens to mouse events and sets the background colour.
 */
function createCanvas() {
  clearCanvas();

  const TOTAL_CELLS = gridSize * gridSize;

  CANVAS.style.gridTemplateColumns = CANVAS.style.gridTemplateRows = `repeat(${gridSize},1fr)`;

  for(let i = 0; i < (TOTAL_CELLS); i++){
    const GRID_CELL = document.createElement("div");

    GRID_CELL.classList.add("cell");
    CANVAS.appendChild(GRID_CELL);

    GRID_CELL.addEventListener("mousedown", (e)=> setBgColour(e));
    GRID_CELL.addEventListener("mouseover", (e)=> setBgColour(e));
    GRID_CELL.addEventListener("mouseup", (e)=> isDrawing = false);
    GRID_CELL.addEventListener("dragstart", (e) => (e.preventDefault()));
  }

  console.log("Created canvas");
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

/**
 * Sets the active tool that interacts with the canvas.
 * 
 * @param {*} tool - The name of the tool being selected that is given an active class.
 */
function setTool(tool){
  selectedTool = tool;
  console.log("Set tool:",tool);
}

/**
 * Sets all tool buttons to a default state to prepare for another selection.
 * Purely cosmetic and ensures only the selected tool is highlighted.
 */
function updateToolUI(e) {
  BUT_TOOLS.forEach(button =>{
    button.classList.remove("active");
  })

  e.currentTarget.classList.add("active");
}

/**
 * Set the quantity of grid cells generated after a change is made to the slider.
 */
function setGridSize() {
  gridSize = SLIDER.value
  createCanvas();
}

/**
 * Dynamically change slider grid size values independent of grid updates.
 */
function updateGridSizeUI(e) {
  const GRID_SIZE_VALUE = e.target.value;
  SLIDER.innerHTML = SLIDER_VALUE.textContent = `Size: ${GRID_SIZE_VALUE} x ${GRID_SIZE_VALUE}`;
}

/**
 * Set the active colour applied to the canvas.
 * Doesn't apply to the eraser tool.
 * 
 * @param {*} colour - The colour being selected that is applied to the canvas using the drawing tool.
 */
function setColour(colour) {
  selectedColour = colour;
  console.log("Set colour:",colour);
}