import MainScene from "./MainScene.js";
import DialogScene from "./DialogScene.js";

/**
 * class for start screen
 */
export default class GameOverSceneScene extends DialogScene {
    constructor() {

        const SCENE_NAME = "GameOverScene";
        const BG_PATH = "assets/images/game_over_bg.png";
        const IMAGE_KEY = "witch_single_dead";
        const IMAGE_PATH = "assets/images/witch_single_dead.png";
        const LOGO_TEXT = "GAME OVER";
        const DESC_TEXT = "Oh no, they got you!";
        const BUTTON_TEXT = "Play again";

        super(SCENE_NAME, BG_PATH, IMAGE_KEY, IMAGE_PATH, LOGO_TEXT, DESC_TEXT, BUTTON_TEXT);
    }

    clickButton(){
        const mainScene = this.scene.get('MainScene')
        const startScene = this.scene.get('StartScene')

        // clear enemy array
        mainScene.enemies = [];

        // restart MainScene
        mainScene.scene.restart();
        MainScene.resetGame();

        // switch back to startScene and then MainScene
        this.scene.switch(startScene);
    }

}