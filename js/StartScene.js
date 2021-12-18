import DialogScene from "./DialogScene.js";


export default class StartScene extends DialogScene {
    constructor() {

        const SCENE_NAME = "StartScene";
        const BG_PATH = "assets/images/start_bg.png";
        const IMAGE_KEY = "witch_single";
        const IMAGE_PATH = "assets/images/witch_single.png";
        const LOGO_TEXT = "WitchQuest";
        const DESC_TEXT = "Use the arrow keys to move around and space to hit";
        const BUTTON_TEXT = "Start Game";

        super(SCENE_NAME, BG_PATH, IMAGE_KEY, IMAGE_PATH, LOGO_TEXT, DESC_TEXT, BUTTON_TEXT);
    }

    clickButton(){
        this.scene.switch('MainScene');
    }


}