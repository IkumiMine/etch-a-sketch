//variables and create elements
const displaySize = document.querySelector("#display-size");
let sizeRange = document.querySelector("#size");
let selectColor = document.querySelector('#color');
const rainbowBtn = document.querySelector('#rainbow-btn');
const rainbowCheck = document.querySelector('#rainbow');
const clearBtn = document.querySelector('#clear');

const container = document.querySelector(".container");
const gridElement = document.createElement('div');
gridElement.classList.add('grids');
let grids;

//Initialize setting on the first loading
displaySize.textContent = `Grid size: ${sizeRange.value}`;
createGrids(sizeRange.value);
changeBgColor();

//Event Listeners
sizeRange.addEventListener("change", () => {
    displaySize.textContent = `Grid size: ${sizeRange.value}`;
    removeAllGrids();
    createGrids(sizeRange.value);
    changeBgColor();
})

rainbowBtn.addEventListener('click', getRandomColor);

clearBtn.addEventListener('click', clearDrawing);

//Functions
function createGrids(gridNum) {
    let sizeOfGrid = container.clientWidth/gridNum;

    gridElement.style.width = `${sizeOfGrid}px`;
    gridElement.style.height = `${sizeOfGrid}px`;

    for(let i=0; i<gridNum; i++){
        for(let j=0; j<gridNum; j++){
            container.appendChild(gridElement.cloneNode(true));
        }       
    }
}

function removeAllGrids() {
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

function changeBgColor() {
    grids = document.querySelectorAll(".grids");
    let isPainting = false;
    
    grids.forEach(grid => grid.addEventListener('mousedown',() => {
        isPainting = true;
    }))
    
    grids.forEach(grid => grid.addEventListener('mouseup',() => {
        isPainting = false;
    }))
    
    grids.forEach(grid => grid.addEventListener('mousemove', () => {
        if(!isPainting){
            return;
        }
        grid.style.backgroundColor = '#fff';
        grid.style.backgroundColor = selectColor.value;
    }))
}

function clearDrawing() {
    grids.forEach(grid => grid.style.backgroundColor = '#fff');
}

function getRandomColor() {
    console.log('each interaction should randomize the square’s RGB value entirely');
}