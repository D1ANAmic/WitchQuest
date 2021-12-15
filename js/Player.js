import Sprite from "./Sprite.js";
import HealthLabel from "./HealthLabel.js";

/**
 * player character class
 */
export default class Player extends Sprite {

    /**
     * Static method to load player assets without instanciating player object
     * @param scene
     */
    static loadAssets(scene){

        //load player atlas
        scene.load.atlas('witch', 'assets/images/witch.png', 'assets/images/witch_atlas.json');

        // load animations built from atlas
        scene.load.animation('witch_anim', 'assets/images/witch_anim.json');

        // load tileset as spritesheet to access items
        scene.load.spritesheet('items', 'assets/images/tiles-64_edited.png', {frameWidth:64, frameHeight:64});

        //load player audio for sounds when player gets hit
        scene.load.audio('player', 'assets/audio/witch.mp3');
    }

    constructor({scene, x, y, texture, frame, healthLabel}) {

        const startHealth = 10;

        super({scene, x, y, texture, frame, health:startHealth, drops:[], name:'player', healthLabel});

        // array to collect all other objects that player touches
        this.touching = [];

        // health label for player
        this.healthLabel = healthLabel;
        this.healthLabel.setHealth(startHealth);

        //create weapon based on spritesheet
        this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'items', 43);
        //mirror hammer image on x axis
        this.spriteWeapon.setFlip(true, false);

        // move weapon origin down for more realistic position
        this.spriteWeapon.setOrigin(.0, .75);
        this.spriteWeapon.setScale(.8);

        //position weapon behind player
        this.spriteWeapon.depth = 0;

        // add weapon to scene
        this.scene.add.existing(this.spriteWeapon);

        // create player radar: sensor and collider
        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        const playerCollider = Bodies.circle(this.x, this.y, 32,{isSensor:false, label:'playerCollider'});
        const playerSensor = Bodies.circle(this.x, this.y, 64,{isSensor:true, label:'playerSensor'});

        const compoundBody = Body.create({
            parts:[playerCollider, playerSensor],
            frictionAir:.35
        });
        // set player to use compoundBody
        this.setExistingBody(compoundBody);

        // avoid player rotating on collision
        this.setFixedRotation();

        this.detectTouchingObjects(playerSensor);

        this.detectDropItems(playerCollider);

    }

    // if player dies
    onDeath = () =>{

        // stop player animations
        this.anims.stop();
        // display dead player image
        this.setTexture('items', 7);
        // remove weapon
        this.spriteWeapon.destroy();
    };

    update(){

        //check if player is already dead
        if(this.dead) return;

        // define velocity as 2-dimensional vector
        let playerVelocity = new Phaser.Math.Vector2();

        // change player direction based on input keys
        if(this.inputKeys.left.isDown){
            playerVelocity.x = -1;
            this.setFlipX(true);
        } else if (this.inputKeys.right.isDown){
            playerVelocity.x = 1;
            this.setFlipX(false);
        }        if(this.inputKeys.up.isDown){
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown){
            playerVelocity.y = 1;
        }

        // fix increased speed in diagonal direction (because of pythagoras results in sqrt(2))
        playerVelocity.normalize();

        //player speed
        const speed = 2.5;
        playerVelocity.scale(speed);

        // set player velocity
        this.setVelocity(playerVelocity.x, playerVelocity.y);

        // play animation depending on player velocity
        if (Math.abs(this.body.velocity.x) > 0 || Math.abs(this.body.velocity.y) > 0 ){
            this.anims.play('witch_walk', true);
        } else {
            this.anims.play('witch_idle', true);
        }

        // set weapon position to player's coordinates
        this.spriteWeapon.setPosition(this.x, this.y);
        this.weaponRotate();


    }

    /**
     * create weapon movement through rotation when hitting attack key
     * when angle reaches 100 degrees, attack method is called and weapon rotates back to original position
     */
    weaponRotate(){

        let attackKey = this.inputKeys.attack;

        // rotate weapon only if attack key is down
        if(attackKey.isDown) {
            this.weaponRotation += 6;
        }else {
            this.weaponRotation = 0;
        }

        // reset weapon rotation at 100 degrees and call attack function
        if(this.weaponRotation > 100){
            this.attack();
            this.weaponRotation = 0;
        }

        // adjust rotation angle according to direction that player faces
        if(this.flipX){
            this.spriteWeapon.setAngle(-this.weaponRotation -90 );
        }else{
            this.spriteWeapon.setAngle(this.weaponRotation);
        }

    }

    /**
     * detects objects within player's collider circle and add them to an array
     * @param playerSensor
     */
    detectTouchingObjects(playerSensor){

        // if objects come into player's collider circle, add them to touching array
        this.scene.matterCollision.addOnCollideStart({
            objectA:[playerSensor],
            callback:other => {
                // if sensor is not collider, nothing happens
                if(other.bodyB.isSensor) return;
                this.touching.push(other.gameObjectB);
                console.log(this.touching.length, other.gameObjectB.name);
            },
            context: this.scene,
        });

        // if objects leave player's collider circle, remove them from touching array
        this.scene.matterCollision.addOnCollideEnd({
            objectA:[playerSensor],
            callback: other => {
                // filter out the resource player moves away from
                this.touching = this.touching.filter(gameObject => gameObject !== other.gameObjectB);
                console.log(this.touching.length);
            },
            context: this.scene,
        })
    }

    /**
     * detects if drop items are within player's collider circle and if so picks them up
     * @param playerCollider
     */
    detectDropItems(playerCollider){

        // pickup when drop items enter collider
        this.scene.matterCollision.addOnCollideStart({
            objectA:[playerCollider],
            callback:other => {
                //if object/resource exists and has a pickup method on it
                if(other.gameObjectB && other.gameObjectB.pickup) other.gameObjectB.pickup();

            },
            context: this.scene,
        });

        // pickup when drop items leave collider
        this.scene.matterCollision.addOnCollideActive({
            objectA:[playerCollider],
            callback: other => {
                if(other.gameObjectB && other.gameObjectB.pickup) other.gameObjectB.pickup();
            },
            context: this.scene,
        })
    }

    /**
     * attack objects within touching reach
     */
    attack(){
        // filter for objects that are currently hit and not already dead
        this.touching = this.touching.filter(gameObject => gameObject.hit && !gameObject.dead);
        this.touching.forEach(gameobject =>{
            gameobject.hit();
            // remove sprite if dead
            if(gameobject.dead) gameobject.destroy();
        })
    }

}