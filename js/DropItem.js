/**
 * class for items dropped by enemies
 */
export default class DropItem extends Phaser.Physics.Matter.Sprite {

    constructor({scene, x, y, frame}) {

        super(scene.matter.world, x, y, 'items', frame);

        // scale items down
        this.setScale(.8);

        //add pickup sound
        this.sound = this.scene.sound.add('pickup');

        // create collider for pickup by player
        const {Bodies} = Phaser.Physics.Matter.Matter;
        const circleCollider = Bodies.circle(this.x, this.y, 10 ,{isSensor:false, label:'collider'});
        this.setExistingBody(circleCollider);

        // high friction, so that they don't go flying off
        // this.setFrictionAir(1);

        // add item to scene
        this.scene.add.existing(this);
    }

    // destroy items on pickup and play sound
    pickup = () => {
        this.destroy();
        this.sound.play();
        return true;
    }
}