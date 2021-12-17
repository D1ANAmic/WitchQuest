import Button from "./Button.js"

/**
 * class for start screen
 */
export default class GameOverSceneScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    /**
     * Phaser class for preloading game assets
     */
    preload() {

        // load background
        this.load.image('bg', 'assets/images/game_over_bg.png');

        // load witch atlas
        this.load.image('witch_single_dead', 'assets/images/witch_single_dead.png', );

    }

    /**
     * Phaser class for creating game elements
     */
    create() {

        const bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0, 0);

        const style = { fontSize: '60px', fill: '#923f28ff' }
        const logo = this.add.text(this.game.config.width/2,200, 'GAME OVER', style);
        logo.setOrigin(.5 ,.5);

        const witchImg = this.add.sprite (this.game.config.width/2, this.game.config.height/2, 'witch_single_dead');

        const button = new Button(this.game.config.width/2, 700, 'Play again', this, () => this.clickButton());

    }

    clickButton(){
        const mainScene = this.scene.get('MainScene')
        const startScene = this.scene.get('StartScene')

        // clear enemy array
        mainScene.enemies = [];

        // restart MainScene
        mainScene.scene.restart();

        // switch back to startScene and then MainScene
        this.scene.switch(startScene);
    }

}