
import Player from "./Player.js"


export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
        // this.enemies = [];
    }

    preload() {
        //call prelaod method in Player object and send it the scene
        Player.preload(this);
        this.load.image('tiles', 'assets/images/tiles-64_edited.png');
        this.load.tilemapTiledJSON('map', 'assets/images/doodlemap.json');
    }

    create(){

        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('tiles-64_edited', 'tiles', 64, 64, 0, 0)
        const tileset_offset = map.addTilesetImage('tiles-64_edited-offset', 'tiles', 64, 64, 0, 0)
        const ground1_layer = map.createStaticLayer('Ground1', tileset, 0, 0);
        const edges1_layer = map.createStaticLayer('Edges1', tileset_offset, 32, 32);
        const edges2_layer = map.createStaticLayer('Edges2', tileset_offset, 32, 32);
        const decoration_layer = map.createStaticLayer('Decoration', tileset, 0, 0);
        this.player = new Player({scene:this, x:200, y:200, texture:'witch', frame:'witch_idle1'});
        // place player in front of weapon
        this.player.setDepth(1);
        // this.add.existing(this.player);
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE
        })


        // //add camera
        // let camera = this.cameras.main;
        // camera.zoom = 2;
        // camera.startFollow(this.player);
        // camera.setLerp(.1, .1);
        // //avoid camera following on edges
        // camera.setBounds(0,0, this.game.config.width, this.game.config.height)



    }

    update(){
        this.player.update();
    }

}