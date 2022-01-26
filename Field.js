import { OPTIONS } from "./index.js";

export class Field {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    create_field() {
        this.element = document.createElement("div");
        this.element.style = `float: left; width: ${OPTIONS.div_size}px; height: ${OPTIONS.div_size}px;`;
        document.querySelector(".field").appendChild(this.element);
        this.element.style.top = this.y * OPTIONS.div_size + "px";
        this.element.style.left = this.x * OPTIONS.div_size + "px";
        this.element.setAttribute("id", `${this.x + 1},${this.y}`);
    }
    create_image() {
        this.element_img = document.createElement("img");
        this.element_img.style = "position: absolute; display: block;"
        document.getElementById(`${this.x + 1},${this.y}`).appendChild(this.element_img);
    }
    create_button(name) {
        this.element = document.createElement("button");
        this.element.style = `width: ${OPTIONS.buttons_size * OPTIONS.div_size}px; height: ${OPTIONS.buttons_size * OPTIONS.div_size}px;`;
        document.querySelector(".button").appendChild(this.element);
        this.element.setAttribute("class", `${name}`);

        this.element_img = document.createElement("img");
        this.element_img.style.height = `${OPTIONS.buttons_size * OPTIONS.div_size - 15}px`;
        this.element_img.style.width = `${OPTIONS.buttons_size * OPTIONS.div_size - 15}px`;
        this.element_img.setAttribute("class", `${name}`);
        this.element_img.setAttribute("src", `${OPTIONS.image_folder}arrow_${name}.png`)
        document.querySelector(`.${name}`).appendChild(this.element_img);

    }
}