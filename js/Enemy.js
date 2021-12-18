import Sprite from "./Sprite.js";

/**
 * enemy class
 */
export default class Enemy extends Sprite{

    static loadAssets(scene){

        scene.load.atlas('enemies', 'assets/images/enemies.png', 'assets/images/enemies_atlas.json');
        scene.load.animation('enemies_anim', 'assets/images/enemies_anim.json');
        scene.load.audio('bear', 'assets/audio/bear.mp3');
        scene.load.audio('goblin', 'assets/audio/goblin.mp3');
        scene.load.audio('skeleton', 'assets/audio/skeleton.mp3');
        scene.load.audio('ghost', 'assets/audio/ghost.mp3');
        scene.load.audio('devil', 'assets/audio/devil.mp3');
        scene.load.audio('pickup', 'assets/audio/pickup.mp3');
    }

    constructor({scene, enemy, scoreLabel}) {

        //get drop items based on enemy object properties
        let drops = JSON.parse(enemy.properties.find(p=>p.name=='drops').value);

        //get enemy health points based on enemy object properties
        let health = enemy.properties.find(p=>p.name=='health').value;

        super({scene, x:enemy.x,y:enemy.y, texture:'enemies', frame:`${enemy.name}1`,drops, health, name:enemy.name});

        this.scoreLabel = scoreLabel;

        // create enemy radar
        const {Body, Bodies} = Phaser.Physics.Matter.Matter;
        //create custom collider for enemy
        let enemyCollider = Bodies.circle(this.x, this.y, 20,{isSensor: false ,label:'enemyCollider'});
        // create player sensor
        let enemySensor = Bodies.circle(this.x, this.y, 200,{isSensor: true ,label:'enemySensor'});
        // assign sensor and collider to player
        const compoundBody = Body.create({
            parts:[enemyCollider, enemySensor],
            frictionAir: .35,
        });
        this.setExistingBody(compoundBody);

        //prevent enemy rotation on collision
        this.setFixedRotation();

        this.detectPlayer(enemySensor);
    }


    /**
     * detect if player is within enemy's reach if so attack
     * @param enemySensor
     */
    detectPlayer(enemySensor){
        this.scene.matterCollision.addOnCollideStart({
            objectA:[enemySensor],
            callback: other => {
                // console.log("gameObjectB: ", other.gameObjectB.name);
                if(other.gameObjectB && other.gameObjectB.name === 'player'){

                    this.attacking = other.gameObjectB;
                    // console.log("this.attacking: ", this.attacking.name);
                }},
            context:this.scene,
        });
    }


    attack = (target) => {

        if(target.dead || this.dead){
            clearInterval(this.attackTimer);
            return;
        }
        target.hit();
    }

    update(){

        if(this.dead) return;

        if(this.attacking){

            //subtract vectors to walk into player's direction
            let direction = this.attacking.position.subtract(this.position);

            //distance when enemy and player colliders touch
            if(direction.length()>52){

                // get unit vector from direction vector
                let v = direction.normalize();
                this.setVelocityX(direction.x);
                this.setVelocityY(direction.y);

                // if enemy moving towards player, clear attackTimer
                if(this.attackTimer){
                    clearInterval(this.attackTimer);
                    this.attackTimer =null;
                }
            }else{
                if(this.attackTimer == null){
                    // call attack method every half second and send it this.attacking
                    this.attackTimer = setInterval(this.attack, 500, this.attacking);
                }
            }
        }
        // flip enemy image based on direction they're headed
        this.setFlipX(this.velocity.x < 0);

        this.anims.play(`${this.name}`, true);
    }
}