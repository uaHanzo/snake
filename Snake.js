import { OPTIONS } from "./index.js";

export class Snake {
    constructor(x, y, sound, game) {
        this.x = x;
        this.y = y;
        this.sound = sound;
        this.game = game;
        this.snake_coordinates();
        setInterval(() => { this.snake_render() }, 1);
        this.interval;
        this.checker = setInterval(() => { this.head_check() }, 1);
    }
    snake_coordinates() {
        let head_x = this.game.random_num(this.x - OPTIONS.body_size);
        let head_y = this.game.random_num(this.y - OPTIONS.body_size);
        while (head_x <= OPTIONS.body_size) {
            head_x += head_x + OPTIONS.body_size;
        }
        while (head_y <= OPTIONS.body_size) {
            head_y += head_y + OPTIONS.body_size;
        }
        this.game.arr_head.push(head_x, head_y);
        for (let i = 0; i < OPTIONS.body_size; i++) {
            this.game.arr_body.push(`${head_x},${head_y}`);
            this.game.body_direction.push(OPTIONS.right);
            document.getElementById(this.game.arr_body[i]).querySelector("img").setAttribute("src", `${OPTIONS.image_folder}body_horizontal.png`);
            head_x = head_x - 1;
        }
    }
    snake_render() {
        let snake_style = "position: relative; margin-left: -15px; margin-top: -15px; z-index:";
        let snake_head = document.getElementById(this.game.arr_body[0]).querySelector("img");
        snake_head.setAttribute("src", `${OPTIONS.image_folder}head_${this.game.body_direction[0]}.png`);
        snake_head.style = `${snake_style} 10;`;
        let snake_tail = document.getElementById(this.game.arr_body[this.game.arr_body.length - 1]).querySelector("img")
        snake_tail.setAttribute("src", `${OPTIONS.image_folder}tail_${this.game.body_direction[this.game.body_direction.length - 1]}.png`);
        snake_tail.style = `${snake_style} 10;`;
        for (let k = 0; k < this.game.body_direction.length; k++) {
            let target = "";
            if (k == this.game.body_direction.length - 1) {
                target = document.getElementById(this.game.arr_body[k]).querySelector("img")
            } else {
                target = document.getElementById(this.game.arr_body[k + 1]).querySelector("img");
            }
            if (this.game.body_direction[k] == OPTIONS.down && this.game.body_direction[k + 1] == OPTIONS.right ||
                this.game.body_direction[k] == OPTIONS.left && this.game.body_direction[k + 1] == OPTIONS.up) {
                this.render_turn(OPTIONS.right, OPTIONS.down, target, snake_style);
            }
            if (this.game.body_direction[k] == OPTIONS.down && this.game.body_direction[k + 1] == OPTIONS.left ||
                this.game.body_direction[k] == OPTIONS.right && this.game.body_direction[k + 1] == OPTIONS.up) {
                this.render_turn(OPTIONS.left, OPTIONS.down, target, snake_style);
            }
            if (this.game.body_direction[k] == OPTIONS.left && this.game.body_direction[k + 1] == OPTIONS.down ||
                this.game.body_direction[k] == OPTIONS.up && this.game.body_direction[k + 1] == OPTIONS.right) {
                this.render_turn(OPTIONS.right, OPTIONS.up, target, snake_style);
            }
            if (this.game.body_direction[k] == OPTIONS.up && this.game.body_direction[k + 1] == OPTIONS.left ||
                this.game.body_direction[k] == OPTIONS.right && this.game.body_direction[k + 1] == OPTIONS.down) {
                this.render_turn(OPTIONS.left, OPTIONS.up, target, snake_style);
            }
            if (k == 0 || k == this.game.arr_body.length - 1) {

            } else {
                if (document.getElementById(this.game.arr_body[k]).querySelector("img").getAttribute("src").indexOf("turn") > -1) {

                } else {
                    let body_side = "";
                    let snake_body = document.getElementById(this.game.arr_body[k]).querySelector("img");
                    if (this.game.body_direction[k] == OPTIONS.right || this.game.body_direction[k] == OPTIONS.left) {
                        body_side = "horizontal"
                    } else if (this.game.body_direction[k] == OPTIONS.up || this.game.body_direction[k] == OPTIONS.down) {
                        body_side = "vertical";
                    }
                    snake_body.setAttribute("src", `${OPTIONS.image_folder}body_${body_side}.png`);
                    snake_body.style = `${snake_style} 1;`;
                }
            }
        }
        let x = this.game.arr_head[0];
        let y = this.game.arr_head[1];
        let head_radius = [
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 2, y + 2],
            [x - 1, y + 2],
            [x, y + 2],
            [x + 1, y + 2],
            [x - 2, y + 2],
            [x - 2, y + 1],
            [x + 2, y + 1],
            [x - 2, y],
            [x + 2, y],
            [x - 2, y - 1],
            [x + 2, y - 1],
            [x - 2, y - 2],
            [x - 1, y - 2],
            [x, y - 2],
            [x + 1, y - 2],
            [x - 2, y - 2]
        ];
        for (let i = 0; i < this.game.apple_coordinates.length; i++) {
            for (let j = 0; j < head_radius.length; j++) {
                this.render_open_head(this.game.body_direction[0], i, head_radius[j]);
            }
        }
    }
    render_turn(horizontal, vertical, target, snake_style) {
        target.setAttribute("src", `${OPTIONS.image_folder}turn_${horizontal}_${vertical}.png`);
        target.style = `${snake_style} 1`;
    }
    render_open_head(direction, index, head_radius) {
        let head = document.getElementById(this.game.arr_head).querySelector("img");
        if (this.game.body_direction[0] == direction && this.game.apple_coordinates[index] == head_radius.toString()) {
            head.setAttribute("src", `${OPTIONS.image_folder}head_${direction}_open.png`);
        }
    }
    move(param) {
        this.game.body_direction.unshift(param);
        if (this.game.body_direction.length != OPTIONS.body_size) {
            this.game.body_direction.pop();
        };
        if (param == OPTIONS.left) {
            if (this.game.arr_head[0] - 1 == 1) {
                this.game_over();
            } else {
                this.game.arr_head[0] = this.game.arr_head[0] - 1;
                this.add_head_cut_tail();
            }
        } else if (param == OPTIONS.right) {
            if (this.game.arr_head[0] + 1 > this.x) {
                this.game_over();
            } else {
                this.game.arr_head[0] = this.game.arr_head[0] + 1;
                this.add_head_cut_tail();
            }
        } else if (param == OPTIONS.up) {
            if (this.game.arr_head[1] + 1 == this.y) {
                this.game_over();
            } else {
                this.game.arr_head[1] = this.game.arr_head[1] + 1;
                this.add_head_cut_tail();
            }
        } else if (param == OPTIONS.down) {
            if (this.game.arr_head[1] - 1 == 0) {
                this.game_over();
            } else {
                this.game.arr_head[1] = this.game.arr_head[1] - 1;
                this.add_head_cut_tail();
            }
        }
    }
    add_head_cut_tail() {
        this.game.arr_body.unshift(this.game.arr_head.toString());
        if (this.game.arr_body.length != OPTIONS.body_size) {
            document.getElementById(this.game.arr_body[this.game.arr_body.length - 1]).querySelector("img").setAttribute("src", "");
            this.game.arr_body.pop();
        }
    }
    game_over() {
        this.sound.fail.play();
        this.sound.stop_music();
        alert(`Game over !   Your score: ${this.game.score}. Time: ${this.game.minutes}: ${this.game.seconds}. Press "Ok" to play again.`);
        clearInterval(this.interval);
        window.location.reload();
    }
    head_check() {
        for (let i = 1; i < this.game.arr_body.length; i++) {
            if (this.game.arr_head.toString() == this.game.arr_body[i]) {
                clearInterval(this.checker);
                this.game_over();
            }
        }
    }
}