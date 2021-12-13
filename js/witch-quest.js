import MainScene from "./MainScene.js";


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
    width:2048,
    height:2048,
    backgroundColor: '#bbb',
    type: Phaser.AUTO,
    // sepecify id of div
    parent: 'witch-quest',
    scene:[MainScene],
    // scale game container
    scale:{
        // zoom:.8,
    },
    physics: {
        // use Matter.js Physics engine instead of default
        default: 'matter',
        matter: {
            debug:true,
            // no gravity due to top down game not platformer
            gravity:{y:0},
        }
    },
    plugins: {
        scene:[
            {   //plugin for easier collision detection with Matter.js
                plugin:PhaserMatterCollisionPlugin.default,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }
        ]
    }
}

new Phaser.Game(config);
