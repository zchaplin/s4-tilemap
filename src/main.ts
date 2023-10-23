import "./style.css";


//setting up the multiple canvases
const gridCanvas = document.getElementById("gridCanvas") as HTMLCanvasElement;
const gridCtx = gridCanvas.getContext("2d") as CanvasRenderingContext2D;

const selectCanvas = document.getElementById("selectCanvas") as HTMLCanvasElement;
const selectCtx = selectCanvas.getContext("2d") as CanvasRenderingContext2D;


//defining the textures to use
const customTextures = [
    "/public/tile1.png",
    "/public/tile2.png",
    "/public/tile3.png",
    "/public/tile4.png",
    "/public/tile5.png",
    "/public/tile6.png",
    "/public/tile7.png",
    "/public/tile8.png"
    
];


//defining the size of the main grid
const numTiles = 8;
const tileSize = gridCanvas.width / numTiles;


//defining the size of the select grid
const numSelectables = customTextures.length;
const selectHeight = selectCanvas.height / numSelectables;


//create the tilemap nested array
let tilemap = new Array(numTiles);

for(let i = 0; i < numTiles; i++) {
    let row = new Array(numTiles);
    for (let j = 0; j < numTiles; j++) { row[j] = 0; }
    tilemap[i] = row;
}

//track the selected tile
let currentTile = 0;

//draw the initial canvases
redrawTilemap();
drawSelectCanvas();



//Function that draws a texture to a specific canvas ctx
function drawTexture(row: number, col: number, ctx: CanvasRenderingContext2D, imageIndex: number, width: number, height: number, cellSize: number) {
    const image = new Image();
    image.src = customTextures[imageIndex]
    image.onload = () => {ctx.drawImage(image, row * cellSize, col * cellSize, width, height)};
}




// DRAWING THE MAIN CANVAS FUNCTIONS


function redrawTilemap()
{
    gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    for (let i = 0; i < numTiles; i++) {
        for (let j = 0; j < numTiles; j++) {
            drawTexture(i, j, gridCtx, tilemap[i][j], gridCanvas.width / numTiles, gridCanvas.height / numTiles, tileSize);
        }
    }
}

gridCanvas.addEventListener("click", (e) => {
    const coordX = Math.trunc(e.offsetX / tileSize);
    const coordY = Math.trunc(e.offsetY / tileSize);

    if(tilemap[coordX][coordY] != currentTile)
    {
      tilemap[coordX][coordY] = currentTile;
      redrawTilemap();
    }
})


// DRAWING THE SELECTABLE CANVAS

// Loop through the selectable tiles and draw textures in each cell
function drawSelectCanvas()
{
    for (let i = 0; i < numTiles; i++) {
        drawTexture(0, i, selectCtx, i, selectCanvas.width, selectHeight, 64);
    }
}

selectCanvas.addEventListener("click", (e) => {
    const coordY = Math.trunc(e.offsetY / selectHeight);
    currentTile = coordY;
})