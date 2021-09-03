import { OPTIONS } from "./index.js";

export class Grass {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.spawn_coordinates();
        setInterval(() => {
            for (let item of this.game.grass_coordinates) {
                let element = document.getElementById(item).querySelector("img");
                element.style = "position: relative; z-index: 1;";
                element.setAttribute("src", `${OPTIONS.image_folder}grass_${this.game.random_index(OPTIONS.grass_num)}.png`);
            }
        }, 100);
    }
    spawn_coordinates() {
        this.grass_x = this.game.random_num(this.x);
        this.grass_y = this.game.random_num(this.y);
        if (this.grass_x == 0) {
            this.grass_x++;
        }
        if (this.grass_y == 0) {
            this.grass_y++;
        }
        this.game.grass_coordinates.push(`${this.grass_x},${this.grass_y}`);
    }
}