import DropItem from "./DropItem.js";
import Player from "./Player.js";

/**
 * parent class for all game sprites
 */
export default class Sprite extends Phaser.Physics.Matter.Sprite{

    constructor({name, scene, x, y, health, drops, texture, frame, depth, scoreLabel, healthLabel}){

        super(scene.matter.world, x, y, texture, frame);
        // additional position adjustments
        // this.x += this.width/2;
        // this.y -= this.height/2;
        this.name = name;
        this.depth = depth || 1;
        this.health = health;
        this.drops = drops;

        // add scoreLabel to add points
        this.scoreLabel = scoreLabel;

        // assign points for each enemy's dropItem based on enemy's health points
        this.dropItemScore = health;

        this.healthLabel = healthLabel;


        //vector for position (with underscore for private property -> use getter)
        this.spritePosition = new Phaser.Math.Vector2(this.x, this.y);

        // if sprite has a name, it also has a sound
        if(this.name){
            this.sound = this.scene.sound.add(this.name);
        }
        
        // add sprite to scene
        this.scene.add.existing(this);
    }

    //getters
    get position(){
        this.spritePosition.set(this.x, this.y);
        return this.spritePosition;
    }

    get velocity(){
        return this.body.velocity;
    }

    get dead(){
        return this.health <= 0;
    }

    // function definition for the inheriting objects
    onDeath = () =>{};


    /**
     * gets called everytime a sprite gets hit
     */
    hit = () =>{
        // play hitting sound
        if(this.sound) this.sound.play();
        // decrease sprite's health
        this.health--;
        console.log(`Hitting:${this.name} Health:${this.health}`);
        if(this instanceof Player){
            this.healthLabel.setHealth(this.health);
        }
        if(this.dead){
            // call onDeath if it's defined for sprite (e.g. player)
            this.onDeath();
            // drop items
            this.drops.forEach((drop, index) => {
                // position drop items apart from each other
                const distance = (index === 0? 0 :10);
                new DropItem({scene:this.scene, x:this.x+distance, y:this.y, frame:drop, scoreLabel:this.scoreLabel, dropItemScore:this.dropItemScore})
            });
        }
    }

}