import { Field } from "./Field.js";
import { Grass } from "./Grass.js";
import { Snake } from "./Snake.js";
import { Apple } from "./Apple.js";
import { Sound } from "./Sound.js";
import { Game } from "./Game.js";

export const OPTIONS = {
    div_size: 10,
    field_x: 50,
    field_y: 50,
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
    apple_num: [1, 2, 3],
    grass_num: [1, 2, 3],
    game_speed: 100,
    apple_spawn_speed: 2000,
    body_size: 10,
    devive_list: /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/,
    buttons_size: 0,
};

//create field
let mobile_x_blocks = Math.round(document.documentElement.clientWidth / 10);
if (OPTIONS.devive_list.test(navigator.userAgent)) {
    OPTIONS.field_x = mobile_x_blocks - 2; // 2 = field right side margin

    let mobile_y_blocks = Math.round(document.documentElement.clientHeight / 10);
    let button_blocks = Math.round(mobile_y_blocks / 4);
    OPTIONS.field_y = mobile_y_blocks - button_blocks - 7; //50px = height of "head" and 20 phone interface
    OPTIONS.buttons_size = Math.floor(button_blocks / 2);
}

function field_size() {
    let field = document.querySelector(".field");
    let head = document.querySelector(".head");
    field.style = `background-image: url("${OPTIONS.image_folder}grass.png");`;
    field.style.width = OPTIONS.field_x * OPTIONS.div_size + "px";
    field.style.height = OPTIONS.field_y * OPTIONS.div_size + "px";
    head.style.width = OPTIONS.field_x * OPTIONS.div_size + "px";
}
field_size();
for (let j = OPTIONS.field_y; j > 0; j--) {
    for (let i = 0; i < OPTIONS.field_x; i++) {
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
    grass = new Grass(OPTIONS.field_x, OPTIONS.field_y, game);
};

let snake;
snake = new Snake(OPTIONS.field_x, OPTIONS.field_y, sound, game);

let apple;
apple = new Apple(OPTIONS.field_x, OPTIONS.field_y, sound, snake, game);

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

if (OPTIONS.devive_list.test(navigator.userAgent)) {
    let button = new Field;
    let name = ["up", "left", "down", "right"];
    for (let i = 0; i < name.length; i++) {
        button.create_button(name[i]);
        document.querySelector(`.${name[i]}`).addEventListener("touchstart", set_side);
        function set_side(e) {
            let name = e.changedTouches[0].target.className;
            let touch_name = name.charAt(0).toUpperCase() + name.slice(1);
            let touch = { key: "Arrow" + touch_name };
            check_key(touch);
        }
    }
}