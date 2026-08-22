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

function drawTile (context, tile, x, y, scale) {
    context.drawImage(tile, x * 32 * scale, y * 32 * scale, tile.width * scale, tile.height * scale);
}

function drawBackground (context, bg, scale) {
    context.drawImage(bg, 0, 0, 320 * scale, 240 * scale);
}

// Loaded Sprites

let spr_little_guy_walk_left_0 = document.getElementById("spr_little_guy_walk_left_0");
let spr_little_guy_walk_left_1 = document.getElementById("spr_little_guy_walk_left_1");
let spr_little_guy_walk_left_2 = document.getElementById("spr_little_guy_walk_left_2");
let spr_little_guy_walk_left_3 = document.getElementById("spr_little_guy_walk_left_3");

let walkAnimationLeft = [spr_little_guy_walk_left_0, spr_little_guy_walk_left_1, spr_little_guy_walk_left_2, spr_little_guy_walk_left_3];
let stepsLeft = 0;

let spr_little_guy_walk_right_0 = document.getElementById("spr_little_guy_walk_right_0");
let spr_little_guy_walk_right_1 = document.getElementById("spr_little_guy_walk_right_1");
let spr_little_guy_walk_right_2 = document.getElementById("spr_little_guy_walk_right_2");
let spr_little_guy_walk_right_3 = document.getElementById("spr_little_guy_walk_right_3");

let walkAnimationRight = [spr_little_guy_walk_right_0, spr_little_guy_walk_right_1, spr_little_guy_walk_right_2, spr_little_guy_walk_right_3];
let stepsRight = 0;

let spr_floor = document.getElementById("spr_floor");
let spr_wall = document.getElementById("spr_wall");

let spr_blacklight = document.getElementById("spr_blacklight");
let spr_dresser = document.getElementById("spr_dresser");
let spr_closet = document.getElementById("spr_closet");
let spr_key  = document.getElementById("spr_key");
let spr_paper_0  = document.getElementById("spr_paper_0");
let spr_paper_1  = document.getElementById("spr_paper_1");
let spr_desk  = document.getElementById("spr_desk");

let spr_backgrounda = document.getElementById("spr_backgrounda");

// Game Setup

clear(ctx, "#bfbfff");

let gameObjects = [];

let player = {
    texture: document.getElementById("spr_little_guy_walk_left_0"),
    x: 0,
    y: 0
}

let blacklight = {
    texture: spr_blacklight,
    x: 224,
    y: 208
}

gameObjects.push(player);
gameObjects.push(blacklight);

let stepSize = 4;

document.body.addEventListener("keydown", function (e) {
    console.log(e.key);
    switch (e.key) {
        case 'ArrowUp': {
            gameObjects[0].y -= stepSize;
        };
        break;
        case 'ArrowDown': {
            gameObjects[0].y += stepSize;
        };
        break;
        case 'ArrowLeft': {
            gameObjects[0].x -= stepSize;
            stepsLeft++;
            gameObjects[0].texture = walkAnimationLeft[stepsLeft % 4];
        };
        break;
        case 'ArrowRight': {
            gameObjects[0].x += stepSize;
            stepsRight++;
            gameObjects[0].texture = walkAnimationRight[stepsRight % 4];
        };
        break;
    }
});

document.body.addEventListener("keyup", function (e) {
    switch (e.key) {
        case 'ArrowLeft': {
            gameObjects[0].texture = walkAnimationLeft[0];
        };
        break;
        case 'ArrowRight': {
            gameObjects[0].texture = walkAnimationRight[0];
        };
        break;
    }
    stepsLeft = 0;
    stepsRight = 0;
});

window.setInterval(function () {
    clear(ctx, "#bfbfff");
    drawBackground(ctx, spr_backgrounda, 2);
    drawTile(ctx, spr_desk, 3, 3, 2);
    for (let obj of gameObjects) {
        drawSprite(ctx, obj.texture, obj.x, obj.y, 2);
    }
}, 50);