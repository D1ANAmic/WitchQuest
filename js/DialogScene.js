import Button from "./Button.js"

/**
 * parent class for all dialog scenes
 */
export default class DialogScene extends Phaser.Scene {
    constructor(sceneName, bgPath, imageKey, imagePath, titleText, descText, buttonText) {
        super(sceneName);

        this.bgPath = bgPath;
        this.imageKey = imageKey;
        this.imagePath = imagePath;
        this.titleText = titleText;
        this.descText = descText;
        this.buttonText = buttonText;
    }

    preload() {

        // load background image
        this.load.image('bg', this.bgPath);

        // load main image
        this.load.image(this.imageKey, this.imagePath);

    }


    create() {
        // add background
        const bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0, 0);

        // add dialog title
        const style = { fontSize: '90px', fill: '#fff' }
        const title = this.add.text(this.game.config.width / 2, 140, this.titleText, style);
        title.setOrigin(.5, .5);

        // add description
        const descStyle = { fontSize: '30px', fill: '#fff', align: 'center' }
        const desc = this.add.text(this.game.config.width / 2, 280, this.descText, descStyle);
        desc.setOrigin(.5, .5);

        const witchImg = this.add.sprite(this.game.config.width / 2, 520, this.imageKey);

        const button = new Button(this.game.config.width / 2, 750, this.buttonText, this, () => this.clickButton());

    }

}