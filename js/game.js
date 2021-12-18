import MainScene from "./MainScene.js";
import StartScene from "./StartScene.js";
import GameOverScene from "./GameOverScene.js";
import FinishScene from "./FinishScene.js";

/// <reference path="defs/phaser.d.ts" />
/// <reference path="defs/matter.d.ts" />
/// <reference path="defs/spine.d.ts" />
/// <reference path="defs/spine-canvas.d.ts" />
/// <reference path="defs/spine-webgl.d.ts" />
/// <reference path="defs/SpineContainer.d.ts" />
/// <reference path="defs/SpineFile.d.ts" />
/// <reference path="defs/SpineGameObject.d.ts" />
/// <reference path="defs/SpinePlugin.d.ts" />

const config = {
    width: 1280,
    height: 896,
    backgroundColor: '#bbb',
    type: Phaser.AUTO,
    // id of parent div
    parent: 'witch-quest',
    scene: [StartScene, MainScene, GameOverScene, FinishScene],
    // scale game container
    // scale:{
    // zoom:.7,
    // },
    physics: {
        // use Matter.js Physics engine instead of default
        default: 'matter',
        matter: {
            debug: false,
            // zero gravity due to top down game not platformer
            gravity: { y: 0 },
        }
    },
    plugins: {
        scene: [
            {   //plugin for easier collision detection with Matter.js
                plugin: PhaserMatterCollisionPlugin.default,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }
        ]
    }
}

new Phaser.Game(config);
