import { OPTIONS } from "./index.js";

export class Apple {
    constructor(x, y, sound, snake, game) {
        this.game = game;
        this.snake = snake;
        this.x = x;
        this.y = y;
        this.sound = sound;
        this.apple_count = 5;
        for (let i = 0; i < this.apple_count; i++) {
            this.apple_spawn(this.game.random_index(OPTIONS.apple_num));
        }
        setInterval(() => { this.apple_hit() }, 1);
    }
    apple_spawn(param) {
        let check = 0;
        let apple_x = this.game.random_num(this.x);
        let apple_y = this.game.random_num(this.y);
        while (apple_x < this.apple_count) {
            apple_x++;
        };
        while (apple_y < this.apple_count) {
            apple_y++;
        };
        while (apple_x > this.x - this.apple_count) {
            apple_x--;
        };
        while (apple_y > this.y - this.apple_count) {
            apple_y--;
        };
        let apple_string = apple_x.toString() + "," + apple_y.toString();
        for (let i = 0; i < this.game.arr_body.length; i++) {
            if (apple_string == this.game.apple_coordinates[i] && apple_string == this.game.arr_body[i]) {
                continue;
            } else {
                check++;
            }
            if (check == OPTIONS.body_size) {
                let coordinates = document.getElementById(apple_string).querySelector("img");
                coordinates.setAttribute("src", `${OPTIONS.image_folder}apple_${param}.png`);
                coordinates.style = "position: relative; margin-left: -15px; margin-top: -15px;";
                this.game.apple_coordinates.push([apple_x, apple_y]);
            }
        }
    }
    apple_hit() {
        for (let k = 0; k < this.game.apple_coordinates.length; k++) {
            let x = this.game.apple_coordinates[k][0];
            let y = this.game.apple_coordinates[k][1];
            let target_apple = document.getElementById(this.game.apple_coordinates[k]).querySelector("img")
            let radius = [
                [x - 1, y + 1],
                [x, y + 1],
                [x + 1, y + 1],
                [x - 1, y],
                [x + 1, y],
                [x - 1, y - 1],
                [x, y - 1],
                [x + 1, y - 1]];
            for (let i = 0; i < radius.length; i++) {
                if (this.game.arr_head[0] == radius[i][0] && this.game.arr_head[1] == radius[i][1]) {
                    if (target_apple.getAttribute("src").indexOf("fake") > -1) {
                        target_apple.setAttribute("src", "");
                        this.snake.game_over();
                        return;
                    } else {
                        target_apple.setAttribute("src", "");
                        this.game.apple_coordinates.splice(k, 1);
                        this.sound.hit.stop();
                        this.sound.hit.play();
                        this.game.score = this.game.score + 1000;
                        OPTIONS.body_size++;// ???
                        return;
                    }
                }
            }
        }
    }
    run_apple_spawn() {
        setInterval(() => { this.apple_spawn(this.game.random_index(OPTIONS.apple_num)); this.sound.pop.play(); }, OPTIONS.apple_spawn_speed);
        setInterval(() => { this.fake_apple(); this.sound.pop.play(); }, 7000);
    }
    fake_apple() {
        this.apple_spawn("fake");
        let coordinates = this.game.apple_coordinates[this.game.apple_coordinates.length - 1]
        setTimeout(() => {
            let index = this.game.apple_coordinates.indexOf(coordinates);
            document.getElementById(coordinates).querySelector("img").setAttribute("src", "");
            this.game.apple_coordinates.splice(index, 1);
        }, 5000);
    }
}