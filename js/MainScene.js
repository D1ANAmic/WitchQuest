
import Player from "./Player.js";
import Enemy from "./Enemy.js";


export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
        this.enemies = [];
    }

    preload() {

        this.load.image('tiles', 'assets/images/tiles-64_edited_extruded.png');
        this.load.tilemapTiledJSON('map', 'assets/images/doodlemap2.json');

        //call static loadAssets methods in objects and pass the scene
        Player.loadAssets(this);
        Enemy.loadAssets(this);


    }

    create(){

        const map = this.make.tilemap({key: 'map'});
        this.map = map;
        //tileMargin and tileSpacing values set due to the extruded tile image
        const tileset = map.addTilesetImage('tiles-64_edited', 'tiles', 64, 64, 1, 2)
        const tileset_offset = map.addTilesetImage('tiles-64_edited-offset', 'tiles', 64, 64, 1, 2)
        const collider_layer = map.createLayer('Colliders', tileset, 0, 0);
        const ground1_layer = map.createLayer('Ground1', tileset, 0, 0);
        const edges1_layer = map.createLayer('Edges1', tileset_offset, 32, 32);
        const edges2_layer = map.createLayer('Edges2', tileset_offset, 32, 32);
        const decoration_layer = map.createLayer('Decoration', tileset, 0, 0);
        // const object_layer = this.map.getObjectLayer('Resources');

        console.log(map.heightInPixels);
        console.log(map.widthInPixels);

        //set map colliders based on property in map.json
        collider_layer.setCollisionByProperty({collides:true});
        this.matter.world.convertTilemapLayer(collider_layer);


        //set colliders for trees and rocks
        decoration_layer.setCollisionByProperty({collides:true});
        this.matter.world.convertTilemapLayer(decoration_layer);

        //create enemies

        const enemies = this.map.getObjectLayer('Enemies');
        enemies.objects.forEach(enemy => this.enemies.push(new Enemy({scene:this, enemy})));

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



        //add camera
        let camera = this.cameras.main;
        camera.zoom = 1.5;
        camera.startFollow(this.player);
        camera.setLerp(.1, .1);
        //avoid camera following on edges
        camera.setBounds(0,0, this.game.config.width, this.game.config.height)



    }

    update(){

        this.enemies.forEach(enemy => enemy.update());
        this.player.update();
    }

}