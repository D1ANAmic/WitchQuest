import Player from "./Player.js";
import Enemy from "./Enemy.js";
import ScoreLabel from "./ScoreLabel.js";
import HealthLabel from "./HealthLabel.js";


let score = 0;
let level = 1;

/**
 * class for main game scene
 */
export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
        this.enemies = [];
    }

    /**
     * Phaser class for preloading game assets
     */
    preload() {

        // load map and tileset, map was created in Tiled
        this.load.image('tiles', 'assets/images/tiles-64_edited_extruded.png');
        this.load.tilemapTiledJSON('level1', 'assets/images/level1.json');
        this.load.tilemapTiledJSON('level2', 'assets/images/level2.json');
        this.load.tilemapTiledJSON('level3', 'assets/images/level3.json');

        //call static loadAssets methods in objects and pass the scene
        Player.loadAssets(this);
        Enemy.loadAssets(this);

    }


    getLevelAssets(){

    }

    /**
     * Phaser class for creating game elements
     */
    create(){

        //create map
        this.map = this.make.tilemap({key: `level${level}`});

        //tileMargin and tileSpacing values set due to extruded tile image
        const tileset = this.map.addTilesetImage('tiles-64_edited', 'tiles', 64, 64, 1, 2)
        const tileset_offset = this.map.addTilesetImage('tiles-64_edited-offset', 'tiles', 64, 64, 1, 2)

        //create map layers
        const collider_layer = this.map.createLayer('Colliders', tileset, 0, 0);
        const ground_layer = this.map.createLayer('Ground', tileset, 0, 0);
        // edges layers with tileset offset to create a smooth transition between map structures
        const edges1_layer = this.map.createLayer('Edges1', tileset_offset, 32, 32);
        const edges2_layer = this.map.createLayer('Edges2', tileset_offset, 32, 32);
        const decoration_layer = this.map.createLayer('Decoration', tileset, 0, 0);


        const style = { fontSize: '32px', fill: '#fff' }
        //create scoreLabel
        this.scoreLabel = new ScoreLabel(this, 220, 160, score, style)
        //add the lable into scene
        this.add.existing(this.scoreLabel);

        // fix label to camera view
        this.scoreLabel.setScrollFactor(0);
        // display score in front of everything
        this.scoreLabel.setDepth(10);

        //create healthLabel
        this.healthLabel = new HealthLabel(this, 800, 160, 0, style)
        this.add.existing(this.healthLabel);

        // fix label to camera view
        this.healthLabel.setScrollFactor(0);
        // display score in front of everything
        this.healthLabel.setDepth(10);


        //set map colliders based on property in map.json
        collider_layer.setCollisionByProperty({collides:true});
        this.matter.world.convertTilemapLayer(collider_layer);

        //set colliders for trees and rocks
        decoration_layer.setCollisionByProperty({collides:true});
        this.matter.world.convertTilemapLayer(decoration_layer);

        //create enemies based on layer and push them into array
        const enemies = this.map.getObjectLayer('Enemies');
        enemies.objects.forEach(enemy => this.enemies.push(new Enemy({scene:this, enemy, scoreLabel:this.scoreLabel})));

        //create player character
        this.player = new Player({scene:this, x:200, y:200, texture:'witch', frame:'witch_idle1', healthLabel:this.healthLabel});

        // define player control keys
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE
        })

        //add camera
        let camera = this.cameras.main;
        // zoom in
        camera.zoom = 1.5;
        camera.startFollow(this.player);
        // set latency to camera movement for more realistic effect
        camera.setLerp(.1, .1);
        //avoid camera following player on map borders
        camera.setBounds(0,0, this.game.config.width, this.game.config.height)

    }


    /**
     * Phaser class for updating scene, gets called in a loop
     */
    update(){

        this.player.update();
        this.enemies.forEach(enemy => enemy.update());

        if (this.allEnemiesDead()){

            if (level === 3){

                this.scene.switch('FinishScene');
            } else {

                this.scene.restart(this.scoreLabel.score);
                score = this.scoreLabel.score
                level++;
            }

        };

    }

    allEnemiesDead(){
        const allEnemiesDead = (currentValue) => !currentValue.active;

        return this.enemies.every(allEnemiesDead);

    }

    static resetGame(){
        score = 0;
        level = 1;
    }


}