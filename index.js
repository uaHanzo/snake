import { Field } from "./Field.js";
import { Grass } from "./Grass.js";
import { Snake } from "./Snake.js";
import { Apple } from "./Apple.js";
import { Sound } from "./Sound.js";
import { Game } from "./Game.js";

export const OPTIONS = {
    div_size: 10,
    image_folder: "image/",
    music_folder: "sound/",
    key_left: "ArrowLeft",
    key_right: "ArrowRight",
    key_up: "ArrowUp",
    key_down: "ArrowDown",
    left: "left",
    right: "right",
    up: "up",
    down: "down",
    plus: "plus",
    minus: "minus",
    count_zero: 6,
    img_in_gif: 14,
    apple_num: [1, 2, 3],
    grass_num: [1, 2, 3],
    game_speed: 100,
    apple_spawn_speed: 2000,
    body_size: 10,
};

//create field
const field_x = 50;
const field_y = 50;
function field_size() {
    let field = document.querySelector(".field");
    let head = document.querySelector(".head");
    field.style = `background-image: url("${OPTIONS.image_folder}grass.png");`;
    field.style.width = field_x * OPTIONS.div_size + "px";
    field.style.height = field_y * OPTIONS.div_size + "px";
    head.style.width = field_x * OPTIONS.div_size + "px";
}
field_size();
for (let j = field_y; j > 0; j--) {
    for (let i = 0; i < field_x; i++) {
        let field;
        field = new Field(i, j);
        field.create_field();
        field.create_image();
    };
};

let sound;
sound = new Sound();

let game;
game = new Game(sound);

//stop for sounds
HTMLAudioElement.prototype.stop = function () {
    this.pause();
    this.currentTime = 0.0;
};

const grass_count = 10;
for (let i = 0; i < grass_count; i++) {
    let grass;
    grass = new Grass(field_x, field_y, game);
};

let snake;
snake = new Snake(field_x, field_y, sound, game);

let apple;
apple = new Apple(field_x, field_y, sound, snake, game);

function check_key(e) {
    if (game.score == 0) {
        if (e.key == OPTIONS.key_right || e.key == OPTIONS.key_down || e.key == OPTIONS.key_up) {
            game.run_score();
            game.run_time();
            game.run_speed_up();
            sound.play_music();
            apple.run_apple_spawn();
        }
    }
    let direction = game.body_direction[0];
    if (direction == OPTIONS.right && e.key == OPTIONS.key_left) {
        return;
    }
    if (direction == OPTIONS.left && e.key == OPTIONS.key_right) {
        return;
    }
    if (direction == OPTIONS.up && e.key == OPTIONS.key_down) {
        return;
    }
    if (direction == OPTIONS.down && e.key == OPTIONS.key_up) {
        return;
    }
    if (e.key == OPTIONS.key_up) {
        go(OPTIONS.up);
    };
    if (e.key == OPTIONS.key_down) {
        go(OPTIONS.down);
    };
    if (e.key == OPTIONS.key_right) {
        go(OPTIONS.right);
    };
    if (e.key == OPTIONS.key_left) {
        go(OPTIONS.left);
    };
}
function go(param) {
    clearInterval(snake.interval);
    snake.move(param);
    snake.interval = setInterval(() => { snake.move(param) }, OPTIONS.game_speed);
}
document.querySelector("body").onkeydown = check_key;