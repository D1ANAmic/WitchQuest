
export default class Player extends Phaser.Physics.Matter.Sprite {

    constructor(data) {
        let {scene, x, y, texture, frame} = data;
        super(scene.matter.world,x, y, texture, frame);
        //add Player to scene
        this.scene.add.existing(this);

        //weapon
        this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 100, 100, 'items', 43);
        //mirror hammer image on x axis
        this.spriteWeapon.setFlip(true, false);
        // move weapon origin down for more realistic position
        this.spriteWeapon.setOrigin(.0, .75);
        this.spriteWeapon.setScale(.8);
        this.spriteWeapon.depth = 0;
        this.scene.add.existing(this.spriteWeapon);

        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x, this.y, 40,{isSensor:false, label:'playerCollider'});
        var playerSensor = Bodies.circle(this.x, this.y, 64,{isSensor:true, label:'playerSensor'});

        const compoundBody = Body.create({
            parts:[playerCollider, playerSensor],
            frictionAir:.35
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();

    }

    /**
     * Static method to load player assets without instanciating player
     * @param scene
     */
    static preload(scene){
        //load player as atlas
        scene.load.atlas('witch', 'assets/images/witch.png', 'assets/images/witch_atlas.json');
        // load animations built from atlas
        scene.load.animation('witch_anim', 'assets/images/witch_anim.json');

        scene.load.spritesheet('items', 'assets/images/tiles-64_edited.png', {frameWidth:64, frameHeight:64});
        scene.load.audio('player', 'assets/audio/player.mp3');
    }

    update(){
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
            // this.attack();
            this.weaponRotation = 0;
        }
        if(this.flipX){
            this.spriteWeapon.setAngle(-this.weaponRotation -90 );
        }else{
            this.spriteWeapon.setAngle(this.weaponRotation);
        }

    }

    // attack(){
    //     this.touching = this.touching.filter(gameObject => gameObject.hit && !gameObject.dead);
    //     this.touching.forEach(gameobject =>{
    //         gameobject.hit();
    //         if(gameobject.dead) gameobject.destroy();
    //     })
    // }

}