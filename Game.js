import { OPTIONS } from "./index.js";

export class Game {
    constructor(sound) {
        this.sound = sound;
        this.score = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.index = 1;
        this.sign;
        this.speed;
        this.apple_coordinates = [];
        this.arr_head = [];
        this.arr_body = [];
        this.body_direction = [];
        this.grass_coordinates = [];
        setInterval(() => { this.logo_animation() }, 20);
    }
    logo_animation() {
        if (this.index == OPTIONS.img_in_gif) {
            this.sign = OPTIONS.minus;
        } else if (this.index == 1) {
            this.sign = OPTIONS.plus;
        }
        if (this.sign == OPTIONS.plus) {
            this.index++;
        } else if (this.sign == OPTIONS.minus) {
            this.index--;
        }
        let img = new Image();
        img.src = `${OPTIONS.image_folder}gif/${this.index}.png`;
        document.querySelector(".logo").replaceChildren(img);
    }
    run_speed_up() {
        this.speed = setInterval(() => { this.speed_up() }, 10000);
    }
    speed_up() {
        OPTIONS.game_speed = OPTIONS.game_speed - 10;
        this.sound.lvl_up.play();
        if (OPTIONS.game_speed == 60) {
            OPTIONS.apple_spawn_speed = 1000;
        }
        if (OPTIONS.game_speed == 30) {
            OPTIONS.apple_spawn_speed = 500;
            clearInterval(this.speed);
        }
    }
    run_score() {
        setInterval(() => {
            this.score++;
            let counter = document.querySelector(".counter_score");
            let output = "";
            for (let i = 0; i < OPTIONS.count_zero - this.score.toString().length; i++) {
                output += "0";
            }
            counter.innerHTML = output + this.score;
        }, 100);
    }
    run_time() {
        setInterval(() => {
            this.seconds++;
            let timer = document.querySelector(".timer");
            let num_length = this.seconds.toString().length;
            if (this.seconds == 60) {
                this.seconds = 0;
                this.minutes++;
            }
            if (num_length == 1) {
                timer.innerHTML = `${this.minutes}:0${this.seconds}`;
            };
            if (num_length == 2) {
                timer.innerHTML = `${this.minutes}:${this.seconds}`;
            };
        }, 1000)
    }
    random_index(array) {
        return array[Math.floor((Math.random() * array.length))];
    }
    random_num(value) {
        return Math.floor(Math.random() * value)
    }
}