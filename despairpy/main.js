// Canvas Setup

let canvas = document.getElementById("game_window");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// Drawing Functions

function clear (context, color) {
    context.fillStyle = color;
    context.fillRect(0, 0, 1200, 1600);
}

function drawSprite (context, sprite, x, y, scale) {
    context.drawImage(sprite, x, y, sprite.width * scale, sprite.height * scale);
}

// Game Setup

clear(ctx, "#bfbfff");

let gameObjects = [];

let player = {
    texture: document.getElementById("spr_0"),
    x: 0,
    y: 0
}

gameObjects.push(player);

window.setInterval(function () {
    for (let obj of gameObjects) {
        drawSprite(ctx, obj.texture, obj.x, obj.y, 2);
    }
}, 50);