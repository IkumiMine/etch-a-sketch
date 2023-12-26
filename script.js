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
let isPainting = false;
let isRainbow = false;


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

rainbowBtn.addEventListener('click', toggleRainbow);

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

        if(isRainbow) {
            randomColor = getRandomRgbColor();
            grid.style.backgroundColor = `rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`;
        } else {
            grid.style.backgroundColor = selectColor.value;
        }
    }))
}

function clearDrawing() {
    grids.forEach(grid => grid.style.backgroundColor = '#fff');
}

function getRandomInteger(max) {
    return Math.floor(Math.random()*(max+1));
}

function getRandomRgbColor() {
    let r = getRandomInteger(255);
    let g = getRandomInteger(255);
    let b = getRandomInteger(255);
    return [r,g,b];
}

function toggleRainbow() {
    if(!isRainbow) {
        isRainbow = true;
        rainbowBtn.classList.add('active');
    } else {
        isRainbow = false;
        rainbowBtn.classList.remove('active');
    }
}