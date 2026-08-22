let win = false;

let globalScale = 2;

// Inventory
let inventory = [];
function addItem (item) {
    inventory.push(item);
}

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

// Collision

function pointIsInWall (x, y, floorplan) {
    let tilex = Math.floor(x / (32 * 3));
    let tiley = Math.floor(y / (32 * 3));
    return floorplan[tiley][tilex] == '#';
}

function getObjectOnTile (x, y, objects) {
    for (let obj of objects) {
        let tilex = Math.floor(obj.x / (32 * 3));
        let tiley = Math.floor(obj.y / (32 * 3));
        if (tilex == x && tiley == y) {
            return obj;
        }
    }
    return null;
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

let spr_little_guy_up = document.getElementById("spr_little_guy_up");
let spr_little_guy_down = document.getElementById("spr_little_guy_down");

let spr_floor = document.getElementById("spr_floor");
let spr_wall = document.getElementById("spr_wall");

let spr_blacklight = document.getElementById("spr_blacklight");
let spr_door = document.getElementById("spr_door");
let spr_closet_0 = document.getElementById("spr_closet_0");
let spr_closet_1 = document.getElementById("spr_closet_1");
let spr_paper_0  = document.getElementById("spr_paper_0");
let spr_paper_1  = document.getElementById("spr_paper_1");
let spr_desk  = document.getElementById("spr_desk");

let spr_backgrounda = document.getElementById("spr_backgrounda");

// Game Setup

clear(ctx, "#bfbfff");

let gameObjects = [];

let player = {
    texture: document.getElementById("spr_little_guy_walk_left_0"),
    x: 240 * (3/2),
    y: 280 * (3/2),
    direction: 0
}

let blacklight = {
    texture: spr_blacklight,
    x: 224 * (3/2),
    y: 208 * (3/2),
    direction: 0
}

let closet = {
    texture: spr_closet_0,
    x: 276 * (3/2),
    y: 208 * (3/2),
    direction: 0
}

let paper = {
    texture: spr_paper_0,
    x: 340 * (3/2),
    y: 208 * (3/2),
    direction: 0
}

let door = {
    texture: spr_door,
    x: -1,
    y: 320 * (3/2),
    direction: 270
}

gameObjects.push(player);
gameObjects.push(blacklight);
gameObjects.push(closet);
gameObjects.push(door);

let walls = [
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
];

let stepSize = 6;

document.body.addEventListener("keydown", function (e) {

    let lookingAtX = Math.floor(gameObjects[0].x / (32 * 3));
    let lookingAtY = Math.floor(gameObjects[0].y / (32 * 3));
    switch (gameObjects[0].direction) {
        case 0: {
            lookingAtX += 0;
            lookingAtY += -1;
        }
        break;
        case 90: {
            lookingAtX += 1;
            lookingAtY += 0;
        }
        break;
        case 180: {
            lookingAtX += 0;
            lookingAtY += 1;
        }
        case 270: {
            lookingAtX += -1;
            lookingAtY += 0;
        }
    }

    switch (e.key) {

        // Movement

        case 'ArrowUp': {
            if (!pointIsInWall(gameObjects[0].x, gameObjects[0].y - stepSize, walls)) {
                gameObjects[0].y -= stepSize;
                gameObjects[0].texture = spr_little_guy_up;
                gameObjects[0].direction = 0;
            }
        };
        break;
        case 'ArrowDown': {
            if (!pointIsInWall(gameObjects[0].x, gameObjects[0].y + stepSize, walls)) {
                gameObjects[0].y += stepSize;
                gameObjects[0].texture = spr_little_guy_down;
                gameObjects[0].direction = 180;
            }
        };
        break;
        case 'ArrowLeft': {
            if (!pointIsInWall(gameObjects[0].x - stepSize, gameObjects[0].y, walls)) {
                gameObjects[0].x -= stepSize;
                stepsLeft++;
                gameObjects[0].texture = walkAnimationLeft[stepsLeft % 4];
                gameObjects[0].direction = 270;
            }
        };
        break;
        case 'ArrowRight': {
            if (!pointIsInWall(gameObjects[0].x + stepSize, gameObjects[0].y, walls)) {
                gameObjects[0].x += stepSize;
                stepsRight++;
                gameObjects[0].texture = walkAnimationRight[stepsRight % 4];
                gameObjects[0].direction = 90;
            }
        };
        break;

        // Interaction

        case 'z': {
            let interacted = getObjectOnTile(lookingAtX, lookingAtY, gameObjects);

            // Blacklight
            if (interacted != null && interacted.texture == spr_blacklight) {
                addItem(interacted);
                console.log(inventory);
                gameObjects = gameObjects.slice(0, gameObjects.indexOf(interacted)).concat(gameObjects.slice(gameObjects.indexOf(interacted) + 1));
            }

            // Closet
            if (interacted != null && interacted.texture == spr_closet_0) {
                gameObjects[gameObjects.indexOf(interacted)].texture = spr_closet_1;
                gameObjects.push(paper);
            }

            // Paper
            if (interacted != null && interacted.texture == spr_paper_0 && inventory.includes(blacklight)) {
                console.log(spr_paper_1);
                gameObjects[gameObjects.indexOf(interacted)].texture = spr_paper_1;
            }

            console.log (interacted);

            // Door
            if (interacted != null && interacted.texture == spr_door) {
                console.log("code time");
                if (window.prompt("Enter code:") == "1986") {
                    win = true;
                    window.alert("YOU WIN!!!");
                }
                else {
                    window.alert("Incorrect answer.");
                }
            }
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
    if (!win) {
        clear(ctx, "#bfbfff");
        drawBackground(ctx, spr_backgrounda, 3);
        drawTile(ctx, spr_desk, 3, 3, 3);
        for (let obj of gameObjects) {
            drawSprite(ctx, obj.texture, obj.x, obj.y, 3);
        }
        }
    else {
        clear(ctx, "#00ff00");
        ctx.fillStyle = "#000000";
        ctx.font = "50px serif";
        ctx.fillText("You beat Despair.", 20, 50, 10000);
    }
}, 50);