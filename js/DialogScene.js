import Button from "./Button.js"

/**
 * class for all dialog scenes
 */
export default class DialogScene extends Phaser.Scene {
    constructor(sceneName, bgPath, imageKey, imagePath, logoText, descText, buttonText) {
        super(sceneName);

        this.bgPath = bgPath;
        this.imageKey = imageKey;
        this.imagePath = imagePath;
        this.logoText = logoText;
        this.descText = descText;
        this.buttonText = buttonText;
    }

    preload() {

        //load background
        this.load.image('bg', this.bgPath);

        //load image atlas
        this.load.image(this.imageKey, this.imagePath);

    }


    create() {

        const bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0, 0);

        const style = { fontSize: '60px', fill: '#fff' }
        const logo = this.add.text(this.game.config.width/2,160, this.logoText , style);
        logo.setOrigin(.5 ,.5);

        const descStyle = {fontSize: '30px', fill: '#fff'}
        const desc = this.add.text(this.game.config.width/2, 240 ,this.descText, descStyle);
        desc.setOrigin(.5, .5);

        const witchImg = this.add.sprite (this.game.config.width/2, this.game.config.height/2, this.imageKey);

        const button = new Button(this.game.config.width/2, 700, this.buttonText, this, () => this.clickButton());

    }

}