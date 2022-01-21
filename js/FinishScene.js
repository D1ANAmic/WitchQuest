import DialogScene from './DialogScene.js';
import MainScene from './MainScene.js';

/**
 * class for finish scene
 */
export default class FinishScene extends DialogScene {
	constructor() {
		const SCENE_NAME = 'FinishScene';
		const BG_PATH = 'assets/images/start_bg.png';
		const IMAGE_KEY = 'witch_single';
		const IMAGE_PATH = 'assets/images/witch_single.png';
		const TITLE_TEXT = 'You did it!';
		const DESC_TEXT = 'Great, you finished the game. New levels are coming soon.';
		const BUTTON_TEXT = 'Play again';

		super(SCENE_NAME, BG_PATH, IMAGE_KEY, IMAGE_PATH, TITLE_TEXT, DESC_TEXT, BUTTON_TEXT);
	}

	clickButton() {
		const mainScene = this.scene.get('MainScene');
		const startScene = this.scene.get('StartScene');

		// clear enemy array
		mainScene.enemies = [];

		// restart MainScene
		mainScene.scene.restart();
		MainScene.resetGame();

		// switch back to startScene and then MainScene
		this.scene.switch(startScene);
	}


}
