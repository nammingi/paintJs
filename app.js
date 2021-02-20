const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

//const variables
const CANVAS_SIZE = 700;
const INITAL_COLOR = "#2c2c2c"


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
ctx.strokeStyle = INITAL_COLOR;
ctx.fillStyle = INITAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}
function stopPainting() {
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        //ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseUp(event) {
    stopPainting();
    const x = event.offsetX;
    const y = event.offsetY;
    console.log(x,y,painting)    
}

function handleColorClick(event) {
    //console.log(event.target.style); 
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function setWidth(event) {
    const width = event.target.value;
    ctx.lineWidth = width;
}

function handleModeClick(event) {
    if (filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText="Paint"
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png")
    const link = document.createElement("a");
    link.href = image;
    link.download = "mypainting";
    link.click();
    console.log(link)
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM)
}
if (range) {
    range.addEventListener("click", setWidth);
}
if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if (save) {
    save.addEventListener("click", handleSaveClick)
}
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))