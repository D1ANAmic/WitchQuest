
import Sprite from "./Sprite.js";

export default class Player extends Sprite {

    /**
     * Static method to load player assets without instanciating player
     * @param scene
     */
    static loadAssets(scene){
        //load player as atlas
        scene.load.atlas('witch', 'assets/images/witch.png', 'assets/images/witch_atlas.json');
        // load animations built from atlas
        scene.load.animation('witch_anim', 'assets/images/witch_anim.json');

        scene.load.spritesheet('items', 'assets/images/tiles-64_edited.png', {frameWidth:64, frameHeight:64});
        scene.load.audio('player', 'assets/audio/witch.mp3');
    }

    constructor(data) {
        let {scene, x, y, texture, frame} = data;
        super({...data, health:10, drops:[], name:'player'});
        //add Player to scene
        // this.scene.add.existing(this);
        this.touching = [];

        //weapon
        this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'items', 43);
        //mirror hammer image on x axis
        this.spriteWeapon.setFlip(true, false);
        // move weapon origin down for more realistic position
        this.spriteWeapon.setOrigin(.0, .75);
        this.spriteWeapon.setScale(.8);
        this.spriteWeapon.depth = 0;
        this.scene.add.existing(this.spriteWeapon);

        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x, this.y, 32,{isSensor:false, label:'playerCollider'});
        var playerSensor = Bodies.circle(this.x, this.y, 64,{isSensor:true, label:'playerSensor'});

        const compoundBody = Body.create({
            parts:[playerCollider, playerSensor],
            frictionAir:.35
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();

        this.CreateMiningCollisions(playerSensor);

        this.CreatePickupCollisions(playerCollider);

    }

    onDeath = () =>{
        this.anims.stop();
        this.setTexture('items', 7);
        this.setOrigin(.5);
        this.spriteWeapon.destroy;
    };

    update(){
        if(this.dead) return;
        //player movement
        const speed = 2.5;
        // define velocity as 2-dimensional vector
        let playerVelocity = new Phaser.Math.Vector2();
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
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);
        //play animation depending on player velocity
        if (Math.abs(this.body.velocity.x) > 0 || Math.abs(this.body.velocity.y) > 0 ){
            this.anims.play('witch_walk', true);
        } else {
            this.anims.play('witch_idle', true);
        }
        this.spriteWeapon.setPosition(this.x, this.y);
        this.weaponRotate();


    }

    weaponRotate(){
        let pointer = this.inputKeys.attack;
        // let pointer = this.scene.input.activePointer;
        if(pointer.isDown) {
            this.weaponRotation += 6;
        }else {
            this.weaponRotation = 0;
        }
        if(this.weaponRotation > 100){
            this.attack();
            this.weaponRotation = 0;
        }
        if(this.flipX){
            this.spriteWeapon.setAngle(-this.weaponRotation -90 );
        }else{
            this.spriteWeapon.setAngle(this.weaponRotation);
        }

    }

    CreateMiningCollisions(playerSensor){

        this.scene.matterCollision.addOnCollideStart({
            objectA:[playerSensor],
            callback:other => {
                // if sensor is not collider, nothing happens
                if(other.bodyB.isSensor) return;
                this.touching.push(other.gameObjectB);
                console.log("###########",this.touching.length, other.gameObjectB.name);
            },
            context: this.scene,
        });
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

    CreatePickupCollisions(playerCollider){

        this.scene.matterCollision.addOnCollideStart({
            objectA:[playerCollider],
            callback:other => {
                //if object/resource exists and has a pickup method on it
                if(other.gameObjectB && other.gameObjectB.pickup) other.gameObjectB.pickup();

            },
            context: this.scene,
        });
        this.scene.matterCollision.addOnCollideActive({
            objectA:[playerCollider],
            callback: other => {
                if(other.gameObjectB && other.gameObjectB.pickup) other.gameObjectB.pickup();
            },
            context: this.scene,
        })
    }

    attack(){
        this.touching = this.touching.filter(gameObject => gameObject.hit && !gameObject.dead);
        this.touching.forEach(gameobject =>{
            gameobject.hit();
            if(gameobject.dead) gameobject.destroy();
        })
    }

}