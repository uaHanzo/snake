import { OPTIONS } from "./index.js";

export class Sound {
    constructor() {
        this.hit = new Audio(`${OPTIONS.music_folder}hit.mp3`);
        this.fail = new Audio(`${OPTIONS.music_folder}fail.mp3`);
        this.music = new Audio(`${OPTIONS.music_folder}music.mp3`);
        this.lvl_up = new Audio(`${OPTIONS.music_folder}lvl_up.mp3`);
        this.pop = new Audio(`${OPTIONS.music_folder}pop.mp3`);
        this.music_interval;
    }
    play_music() {
        this.music.play();
        this.music_interval = setInterval(() => {
            this.music.stop();
            this.music.play();
        }, 122000);
    }
    stop_music() {
        this.music.stop();
        clearInterval(this.music_interval);
    }
}