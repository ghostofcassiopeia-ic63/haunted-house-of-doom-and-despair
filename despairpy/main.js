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
    texture: document.getElementById("spr_little_guy_walk_left_0"),
    x: 0,
    y: 0
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

gameObjects.push(player);

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
    gameObjects[0].texture = document.getElementById("spr_little_guy_walk_left_0");
    stepsLeft = 0;
    stepsRight = 0;
});

window.setInterval(function () {
    for (let obj of gameObjects) {
        clear(ctx, "#bfbfff");
        drawSprite(ctx, obj.texture, obj.x, obj.y, 2);
        console.log("drawn");
    }
}, 50);