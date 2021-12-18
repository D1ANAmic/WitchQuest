import Button from "./Button.js"

/**
 * class for start screen
 */
export default class FinishScene extends Phaser.Scene {
    constructor() {
        super("FinishScene");
    }

    /**
     * Phaser class for preloading game assets
     */
    preload() {


        //load background
        this.load.image('bg', 'assets/images/start_bg.png');

        //load witch atlas
        this.load.image('witch_single', 'assets/images/witch_single.png', );



    }

    /**
     * Phaser class for creating game elements
     */
    create() {



        const bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0, 0);

        const style = { fontSize: '60px', fill: '#fff' }
        const logo = this.add.text(this.game.config.width/2,200, 'You did it!', style);
        logo.setOrigin(.5 ,.5);

        const witchImg = this.add.sprite (this.game.config.width/2, this.game.config.height/2, 'witch_single');

        const button = new Button(this.game.config.width/2, 700, 'Play again', this, () => this.clickButton());

    }

    clickButton(){
        this.scene.switch('StartScene');
    }


}